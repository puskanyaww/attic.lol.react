import axios from "axios";

class LocaleUtil{
    roomLocale: string | null = null;
    avaliableLocales:string[] = [
        "ru",
        "en"
    ]
    get getCurrentLocale(){
        const locale:string = this.roomLocale || localStorage.getItem("locale") || "en"
        return locale
    }

    changeLangAttribute(){
        document.getElementsByTagName("html")[0].setAttribute("lang", this.getCurrentLocale)
    }

    async getLocaleByIp(){
        try {
            const response = await axios.get('https://ipinfo.io/json?token=22e8f2beba59b3'); const {country} = response.data;
            const lc = {
                'US': 'en',
                'UK': 'en',
                'RU': 'ru',
                'UA': 'ru'
            };
            if(country ==="UA"){
                localStorage.setItem('ua_notif', "0")
            }
            const language = lc[country] || 'en';
            return language;
        } catch (error) {
            return 'en';
        }
    };
}

export const locale = new LocaleUtil()