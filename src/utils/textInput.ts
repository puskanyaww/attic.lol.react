export const textInput = new class {
    sanitizeName(text:string){
        return text.replace(/[^a-zA-ZА-Яа-яЁё0-9!#@!$%&*.,= _+-=]/gi, "");
    }

    sanitizeRoomcode(text:string){
        return text.replace(/[^a-zA-Z]/gi, "");
    }
}