import { ws } from "../../../../utils/web"
import { ImproviseWrapper } from "../../styled"
import { ImproviseDarkButton } from "./styled"

export default function Voting(props:any){
    return <ImproviseWrapper>
        <div className="logo"/>
        <h2>Выберите заголовок:</h2>
        {
            props.titles.map((a:string) => <ImproviseDarkButton onClick={() => ws.request("voteTitle", props.titles.indexOf(a))}>{a}</ImproviseDarkButton>)
        }
    </ImproviseWrapper>
}