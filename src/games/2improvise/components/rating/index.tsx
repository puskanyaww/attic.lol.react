import { ChangeEvent, useState } from "react"
import { EmojiWrapper, RangeWrapper, RatingRange, SendButton } from "./styled"
import { locale } from "../../../../utils/locale";
import { useTranslation } from "react-i18next";
import { ws } from "../../../../utils/web";

import angry from "./angry.png";
import sob from "./sob.png";
import normal from "./normal.png";
import { ImproviseWrapper } from "../../styled";

export default function Rating(){
    const [themePts, setThemePts] = useState<number>(5);
    const [scenePts, setScenePts] = useState<number>(5);
    const [mood, setMood] = useState<string>("");
    const { t } = useTranslation();

    const emojis: {[key:string]: string} = {
        angry: angry, sob: sob, normal: normal
    }

    return <ImproviseWrapper>
        <div className="logo"/>
        <RangeBox text="На сколько хорошо пара справилась со своей темой?" rangeCallout={setThemePts}/>
        <RangeBox text="Как вы оцениваете сценку в целом?" rangeCallout={setScenePts}/>
        <SceneMood setMood={setMood}/>
        <SendButton
        onClick={() => ws.request("vote", [themePts, scenePts, mood])}
        >{t("send")} {themePts + scenePts} {locale.plural(themePts + scenePts, ["балл", "балла", "баллов"])} {mood !== "" && <img src={emojis[mood]}/>}</SendButton>
    </ImproviseWrapper>
}

function SceneMood({setMood}: {setMood: Function}){
    const [currentChosen, setChosen] = useState<string>("");

    const choseEmoji = (name:string) => {
        setChosen(name); setMood(name);
    }

    return <>
        <h1>Какой сценка была по настроению?</h1>
        <EmojiWrapper>
            <img src={normal} alt="Joy Emoji" data-chosen={currentChosen === "normal"} onClick={() => choseEmoji("normal")}/>
            <img src={sob} alt="Sob Emoji" data-chosen={currentChosen === "sob"} onClick={() => choseEmoji("sob")}/>
            <img src={angry} alt="Angry Emoji" data-chosen={currentChosen === "angry"} onClick={() => choseEmoji("angry")}/>
        </EmojiWrapper>
    </>
}

function RangeBox({text, rangeCallout}: {text:string, rangeCallout:Function}){
    const [value, setValue] = useState<number>(5);
    return <>
        <h1>{text}</h1>
        <RangeWrapper>
            <RatingRange max={10} name="" step={1} min={0} type="range" value={value || 0} onChange={(e:ChangeEvent<HTMLInputElement>) => {setValue(parseInt(e.target.value)); rangeCallout(parseInt(e.target.value))}}/>
            <div>
                <h1>{value}</h1>
                <span>{locale.plural(value, ["балл", "балла", "баллов"])}</span>
            </div>
        </RangeWrapper>
    </>
}