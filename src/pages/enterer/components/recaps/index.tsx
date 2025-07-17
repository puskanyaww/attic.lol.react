import { useTranslation } from "react-i18next";
import { EntererRecapsWrapper, RecapsContent } from "./styled";

export function EntererRecaps(){
    const { t } = useTranslation();
    return <EntererRecapsWrapper>
        <h1>{t("recaps")}</h1>
        <RecapsContent>
            
        </RecapsContent>
    </EntererRecapsWrapper>
}