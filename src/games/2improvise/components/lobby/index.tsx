import { useState } from "react";
import { ImproviseButton } from "../interaction/styled";
import { GroupEl, GroupGrid } from "./styled";
import { ws } from "../../../../utils/web";
import { useTranslation } from "react-i18next";
import { ImproviseWrapper } from "../../styled";

export default function Lobby(props:any){
    const [chosenScene, setChosen] = useState<number>();
    const { t } = useTranslation();
    return <ImproviseWrapper>
        <div className="logo"/>
        <h1>Выберите группу</h1>

        <GroupGrid>
            {
                props.stageData.map(
                    (a:string) => <GroupEl
                    data-chosen={chosenScene === props.stageData.indexOf(a)}
                    className={a}
                    key={a}
                    onClick={() => {
                        setChosen(props.stageData.indexOf(a));
                        ws.request("changeGroup", props.stageData.indexOf(a))
                    }}>
                    </GroupEl>
                )
            }
        </GroupGrid>

        {props.isVip && <ImproviseButton onClick={() => ws.request("startGame")}>{t("startGame")}</ImproviseButton>}
    </ImproviseWrapper>
}