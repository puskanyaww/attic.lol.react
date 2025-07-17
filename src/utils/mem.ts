import { ws } from "./web";

interface Codes {
    [code:string]: string;
}

export const mem = new class {
    set name(name:string){
        if(name === ""){
            localStorage.removeItem("name");
            return;
        }
        localStorage.setItem("name", name);
    }

    get name(): string{
        return localStorage.getItem("name") ?? "";
    }

    set twitch_token(code:string){
        localStorage.setItem("twitch", code);
    }

    get twitch_token(): string | null{
        return localStorage.getItem("twitch") ?? null;
    }

    lastToken:string = "";

    async getLastCode(): Promise<string> {
        let code:string = "";
        const b:string[] = await ws.filterCodes();
        let codes:Codes = {};
        b.forEach((a:string) => {
            codes[a] = this.codes[a];
        });
        this.codes = codes;
        if(Object.keys(this.codes).length > 0){
            code = Object.keys(this.codes)[0];
            this.lastToken = this.codes[code];
        }
        return code;
    }

    writeJoin(code:string, hash:string){
        localStorage.setItem("code", JSON.stringify(
            {
                ...this.codes,
                [code]: hash
            }
        ));
    }
    
    set codes(codes:Codes){
        localStorage.setItem("code", JSON.stringify(
            codes
        ));
    }

    get codes(): Codes{
        return JSON.parse(
            localStorage.getItem("code") || "{}"
        );
    }

    getHashByCode(code:string): string | undefined{
        return this.codes[code] ?? undefined;
    }
}