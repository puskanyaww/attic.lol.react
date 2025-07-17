import { ws } from "../../../../utils/web";
import { ImproviseWrapper } from "../../styled";
import { ImproviseButton } from "../interaction/styled";

export default function Tutorial(){
    return <ImproviseWrapper className="centered">
        <div className="logo"/>
        <ImproviseButton onClick={() => ws.request("skipTutorial")}>Пропустить туториал</ImproviseButton>
    </ImproviseWrapper>
}