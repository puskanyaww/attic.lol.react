import io, { Socket } from 'socket.io-client';
import { mem } from './mem';

export const ws = new class {
    isDevlog:boolean = true;
    isLocalTesting:boolean = false;
    serverUrl:string = this.isLocalTesting ? "http://localhost:4020" : "wss://trgu.ru";
    socket:Socket;

    isAudience:boolean = false;
    nickname:string = "";
    roomcode:string = "";

    constructor(){
        this.socket = io(this.serverUrl, { transports: ['websocket', 'polling', 'flashsocket'] });
        this.socket.onAny((name, data) => {
            this.devlog("socket.log:", name, data)
        })
    }

    async findRoom(code:string): Promise<boolean>{
        this.socket.emit("isRoomDef", code);
        return new Promise((resolve) => {
            this.socket.on("isRoomDef", (isDef) => {
                this.roomcode = code;
                resolve(isDef.res === "EXISTS");
            })
        });
    }

    async filterCodes(): Promise<string[]>{
        this.socket.emit("emitCodes", Object.keys(mem.codes));
        return new Promise((resolve) => {
            this.socket.on("emitCodes", (data) => {
                resolve(data);
            })
        });
    }

    connectToRoom(code:string){
        this.isAudience = false;
        this.socket.emit('clientLogin', {
            name: mem.name,
            code: code,
            token: mem.twitch_token
        });
        this.socket.on('youJoined', (data) => {
            this.nickname = data.name;
            this.isAudience = data.isAudience;
            mem.writeJoin(code, data.hash);
        })
        this.devlog("connecting to", code + "...");
    }

    reconnectToRoom(code:string, hash:string){
        this.isAudience = false;
        this.socket.emit('clientRelogin', {
            name: mem.name,
            code: code,
            token: mem.twitch_token,
            hash
        });
        this.socket.on('youJoined', (data) => {
            this.nickname = data.name;
            this.isAudience = data.isAudience;
            mem.writeJoin(code, data.hash);
            if(mem.lastToken) this.socket.emit('requireReconnectTask', {code: code, hash: mem.lastToken});
        })
        this.devlog("reconnecting to", code + "...");
    }

    request(todo:string, param:any = null){
        try {
            this.devlog("Emited:", todo, param);
            this.socket.emit('do', {
                do: todo,
                param: param
            });
        } catch(error){
            this.devlog(" error:", error);
        }
    }

    devlog(...data: any[]){
        if(this.isDevlog) console.log("%c [Socket WS] :: ", 'background: #222; color: #bada55', ...data);
    }
}