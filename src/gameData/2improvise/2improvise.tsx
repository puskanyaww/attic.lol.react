import './Main.scoped.css'
import '../replay.scoped.css'
import { socket, code } from '../../index.tsx';
import { useState, useEffect } from 'react';
import localization from './localization.json'
import { pub_name, mem } from '../../components/Enterer/Enterer.tsx';
import logoRu from './ru-logo.svg'
import theone from './avatars/theone.png'
import classNames from 'classnames';
import sob from './sob.png';
import angry from './angry.png';
import norm from './normal.png';
import React from 'react';
import { locale } from '../../utils/locale.ts';
const media = {
    ru: {
        logo: logoRu
    },
    en: {
        logo: logoRu
    }
}
let inLoc;
let logo;

function plural(value:number, key:string[]){
    const getPluralValues = (count:number, rules:string[]) => {const result = new Intl.PluralRules(locale.getCurrentLocale).select(count)
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

function req(todo, data){
    try{
        console.log(todo, data)
        socket.emit('do', {do:todo, param:data});
    } catch(error){
        console.log(error)
    };
}

function GetAvatar(props){
    return <img className='AvatarOnStick' src={theone}/>
}

function Waiting(props){
    return <div className="Waiting nav">
        {props.avatar ? <GetAvatar/> : null}
        <img className={props.avatar ? 'logo' : ""} src={logo}/>
        {props.text ? <h1>{props.text}</h1> : null}
    </div>
}

function SkipTutorial(){
    return <div className="Waiting nav">
        <img src={logo}/>
        <button onClick={() => req("skipTutorial", null)}>{inLoc.skipTutorial}</button> 
    </div>
}

function Post(props){
    return <div className="Post nav">
        <img src={logo} className='logo'/>
        <h1>{inLoc.thanksForPlaying}</h1>
        {props.isVip ? <div className="vipActions">
            <button onClick={() => req("startGame", null)}>{inLoc.retakeGame}</button>
            <button className='publishReplay'>{inLoc.publishReplay}</button>
            </div> : null}
    </div>
}

function Lobby(props){
    const [curScene, changeScene] = useState<string>()
    const changeGroup = (num:number, name:string) => {
        req("changeGroup", num)
        changeScene(name)
    }

    return (
        <div className="Lobby nav">
            <img src={logo} className='logo'/>
            <h2>{inLoc.chooseYourGroup}</h2>
            <div className='groups'>
                {
                    props.stageData.map((scene) => (
                        <div key={scene} className={classNames(scene, curScene === scene ? "chosen" : null)} onClick={() => changeGroup(props.stageData.indexOf(scene), scene)}>{curScene === scene ? <p>{inLoc.chosen}</p> : null}</div>
                    ))
                }
            </div>
            {props.isVip ? <button onClick={() => req("startGame", null)}>{inLoc.startGame}</button> : null}
        </div>
    )
}

function AreYouReady(props){
    return (
        <div className="AreYouReady nav">
            <h1>Нажмите кнопку ниже, как только будете готовы импровизировать.</h1>
            <button onClick={() => req("imReady", null)}>{inLoc.ready}</button>
            <GetAvatar/>
        </div>
    )
}

function TitleVoting(props){
    return (
        <div className="VoteTitle nav">
            <h2>{inLoc.chooseTitle}</h2>
            {
                props.titles.map(
                    title => <button key={title} onClick={() => req("voteTitle", props.titles.indexOf(title))}>{title}</button>
                )
            }
        </div>
    )
}

function Rating(){
    const [valueSliderPrompt, setValueSliderPrompt] = useState<number>(5)
    const [valueSliderScene, setValueSliderScene] = useState<number>(5)
    const [chosenEmote, choseEmote] = useState<string | null>(null)
    const changeSliderPrompt = (event) => setValueSliderPrompt(event.target.value)
    const changeSliderScene = (event) => setValueSliderScene(event.target.value)

    interface Emoji{
        name: string;
        src: string;
    }

    const emojies: Emoji[] = [
        {
            name: "Normal",
            src: norm
        },
        {
            name: "Sob",
            src: sob
        },
        {
            name: "Angry",
            src: angry
        }
    ]

    return <div className="Rating nav">

        <h2>{inLoc.rateByPrompt}</h2>

        <div>
            <input type="range" name="" value={valueSliderPrompt} onChange={changeSliderPrompt} id="" max={10} min={0} step={1}/>
            <p>{valueSliderPrompt} <span>{plural(valueSliderPrompt, inLoc.points)}</span></p>
        </div>

        <h2>{inLoc.rateByScene}</h2>

        <div>
            <input type="range" name="" value={valueSliderScene} onChange={changeSliderScene} id="" max={10} min={0} step={1}/>
            <p>{valueSliderScene} <span>{plural(valueSliderScene, inLoc.points)}</span></p>
        </div>

        <h2>{inLoc.rateByEmotion}</h2>

        <div>
            {emojies.map(emoji => <img key={emoji.name} className={chosenEmote === emoji.name ? "chosenEmoji" : ""} onClick={() => choseEmote(emoji.name)} src={emoji.src} alt={emoji.name}/>)}
        </div>
        <button onClick={() => req("vote", [valueSliderPrompt, valueSliderScene, chosenEmote])}>{inLoc.send}: <span>{valueSliderPrompt + valueSliderScene} {plural(valueSliderPrompt + valueSliderScene, inLoc.points)}</span> <img src={emojies.find(object => object.name === chosenEmote)?.src}/></button>

    </div>
}

function Improvising({theme = "Theme", role = null, opponent = "Attician"}){
    return <div className="Improvising nav">
        <h1 className='theme'><b>{inLoc.theme}</b> {theme}</h1>
        {role ? <h1 className='role'><b>Ваша роль:</b> {role}</h1> : null}
        <p>{inLoc.getReadyForPrompt.replace("{P}", opponent)}</p>
        <GetAvatar/>
    </div>
}


function Listenin(){
    return <div className="Rating">
        
    </div>
}



function Improvise2(){
    const [jsx, setJsx] = useState<JSX.Element>(<Waiting/>);

    //locale def
    inLoc = localization[locale.getCurrentLocale]
    logo = media[locale.getCurrentLocale].logo || "wip"
    socket.on("task", (data) => {
        console.log(data)
        if (!data) return
        const gameData = {
            lobby: <Lobby isVip={data.title.isVip} stageData={data.title.stageData}/>,
            voting: <Rating/>,
            skipTutorial: <SkipTutorial/>,
            wait: <Waiting text={data.title?.text}/>,
            ruaready: <AreYouReady/>,
            titles: <Post isVip={data.title.isVip}/>,
            titlevoting: <TitleVoting titles={data.title?.titles}/>,
            improvising: <Improvising theme={data.title.theme} role={data.title?.role} opponent={data?.title.opponent}/>
        }
        console.log(data.taskName, "balls")
        socket.off('task')
        setJsx(gameData[data.taskName]);
    })

    useEffect(() => {
        return () => {
            if(mem("hash")){
                socket.emit('requireReconnectTask', {code: mem("code"), hash: mem("hash")})
            }
        }
    }, [])


    return <div className="Imp2">
        {jsx}
        <p className='name'>{pub_name}</p>
    </div>
}

export default Improvise2