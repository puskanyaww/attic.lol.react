class LocaleUtil{
    roomLocale: string | null = null
    get getCurrentLocale(){
        const locale:string = this.roomLocale || localStorage.getItem("locale") || "en"
        return locale
    }

    changeLangAttribute(){
        document.getElementsByTagName("html")[0].setAttribute("lang", this.getCurrentLocale)
    }
}

export const locale = new LocaleUtil()