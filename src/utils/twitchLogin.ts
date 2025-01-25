import { socket } from "../index.tsx";

class TwitchLogin{
    isLogined:boolean = false;
    info = {
        key: "jbuvobuhzor8wloh85lfu8syd7c88h",
        url: window.location.protocol + "//" + window.location.host,
    }

    access:string = "";
    refresh:string = "";

    async login(code){
        new Promise((a, b) => {
            socket.emit("TwitchToken", code)
            socket.on("TwitchSuccess", data => {
                this.isLogined = true;
                this.access = data.access_token
                this.refresh = data.refresh_token;
            })
        })
    }

    getLink(): string{
        return `https://id.twitch.tv/oauth2/authorize?client_id=${this.info.key}&redirect_uri=${this.info.url}&response_type=code&scope=user:read:email`
    }

    username:string = ""
    async setUserInfo(token){
        const response = await fetch("https://api.twitch.tv/helix/users", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Client-Id": "jbuvobuhzor8wloh85lfu8syd7c88h",
            },
        }).then(r => r.json())

        const data = response.data[0]
        
        this.username = data.display_name
    }
}

export const Twitch = new TwitchLogin();