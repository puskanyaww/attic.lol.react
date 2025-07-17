import { useTranslation } from "react-i18next";
import { ws } from "../../../../utils/web";
import { ImproviseButton } from "../interaction/styled";
import { ImproviseWrapper } from "../../styled";

export default function ReadyState(){
    const { t } = useTranslation();
    return <ImproviseWrapper>
        <div className="logo"/>
        <h1>Нажмите кнопку ниже, как только будете готовы.</h1>
        <ImproviseButton onClick={() => ws.request("imReady")}>{t("ready")}</ImproviseButton>
    </ImproviseWrapper>
}