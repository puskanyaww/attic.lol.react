import { useTranslation } from "react-i18next";
import { EntererSocial, EntererSocialsWrapper } from "./styled";

export default function EntererSocials(){
    const { t } = useTranslation();
    return <EntererSocialsWrapper>
        <EntererSocial target="__blank" href="https://discord.gg/Z4FARpFWDX">
            {t("discord")}
        </EntererSocial>
        ·
        <EntererSocial target="__blank" href="https://https://puskanyaww.itch.io/">
            Itch.io
        </EntererSocial>
        ·
        <EntererSocial href="https://puskanyaww.com/">
            puskanyaww.com
        </EntererSocial>
    </EntererSocialsWrapper>
}