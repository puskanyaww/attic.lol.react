import axios from "axios";

class cdn{
    toPreload:string[] = [
    ];

    preloaded:any = {};

    domain:string = "cdn.attic.lol";
    
    constructor(){
        this.toPreload.forEach((name:string) => {
            this.preloaded[name] = this.GET(name);
        });
    }

    async GET(name){
        const url = `${this.domain}/${name}.json`;
        const response = await axios.get(url);
        return response.status === 200 ? response.data : null;
    }
}

export const CDN = new cdn();