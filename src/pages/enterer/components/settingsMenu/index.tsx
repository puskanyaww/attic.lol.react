import { ReactNode } from "react";
import { SettingsCallable, SettingsLink, SettingsMenuWrapper } from "./styled";
import { useTranslation } from "react-i18next";
import { locale } from "../../../../utils/locale";
import { mem } from "../../../../utils/mem";

interface MenuItem {
    key: string,
    type: "link" | "callable",
    icon: ReactNode,
    fn?: Function,
    href?: string;
}

const MENU_ITEMS: MenuItem[] = [
    {
        key: mem.twitch_token ? "twitch_unlogin" : "twitch",
        icon: <div></div>,
        type: "link",
        href: `https://id.twitch.tv/oauth2/authorize?client_id=jbuvobuhzor8wloh85lfu8syd7c88h&redirect_uri=${window.location.href}&response_type=code&scope=user:read:email`
    },
    {
        key: "theme",
        icon: <div></div>,
        type: "callable",
        fn: locale.switchLanguage
    },
    {
        key: "lang",
        icon: <div></div>,
        type: "callable",
        fn: locale.switchLanguage
    }
];

export default function EntererSettingsMenu(){
    const { t } = useTranslation();

    return <SettingsMenuWrapper>
        {
            MENU_ITEMS.map((a:MenuItem) => a.type === "link" ?
            <SettingsLink key={a.key} target="__blank" href={a.href}>{t(a.key)}</SettingsLink>
            :
            <SettingsCallable key={a.key} onClick={() => a.fn && a.fn()}>{t(a.key)}</SettingsCallable>)
        }
    </SettingsMenuWrapper>
}