import { useTranslation } from "react-i18next";
import { EntererNewsWrapper, NewsContent } from "./styled";

export function EntererNews(){
    const { t } = useTranslation();
    return <EntererNewsWrapper>
        <h1>{t("news")}</h1>
        <NewsContent>

        </NewsContent>
    </EntererNewsWrapper>
}