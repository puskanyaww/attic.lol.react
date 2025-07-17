import i18n from "./i18n";

export const locale = new class {
    plural(value:number, key:string[]){
        const getPluralValues = (count:number, rules:string[]) => {const result = new Intl.PluralRules(i18n.language).select(count)
            switch(result){
                case 'one':
                    return rules[0];
                case 'few':
                    return rules[1];
                default:
                    return rules[2];
            }
        };

        return getPluralValues(value, key);
    }

    languages:string[] = [
        "ru",
        "en"
    ];

    get currentLocale(): string{
        return i18n.language || "en";
    }

    switchLanguage(){
        let curPos:number = locale.languages.indexOf(locale.currentLocale) + 1;
        if(curPos >= locale.languages.length) curPos = 0;
        localStorage.setItem("locale", locale.languages[curPos]);
        i18n.changeLanguage(locale.languages[curPos]);
    }
}