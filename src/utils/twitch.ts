import { mem } from "./mem";
import { ws } from "./web";

export const twitch = new class {
    isLogined:boolean = false;
    key:string = "jbuvobuhzor8wloh85lfu8syd7c88h";

    async setLogin(code:string, fn:Function){
        ws.socket.emit("TwitchToken", code);
        ws.socket.on("TwitchSuccess", (data) => {
            this.setUserInfo(data.access_token);
            fn(true);
        });
    }

    async setUserInfo(token:string){
        this.isLogined = false;
        const response:any = await fetch("https://api.twitch.tv/helix/users", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Client-Id": "jbuvobuhzor8wloh85lfu8syd7c88h",
            },
        })
        if(!response.ok) return;
        this.isLogined = true;
        const json = await response.json()
        const data = json?.data[0]
        mem.name = data.display_name;
        mem.twitch_token = token;
    }
}