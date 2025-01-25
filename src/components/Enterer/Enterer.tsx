import { useState, useEffect } from 'react';
import localization from './localization.json'
import logo from '../../logo.svg';
import settings from './settings.svg';
import './Main.scoped.css';
import sadman from './sadman.svg';
import classNames from 'classnames';
import recaps from './recaps.png'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import packageJSON from '../../../package.json'
import { socket } from '../../index.tsx';

import defNew01 from './thumb01mewhenlasagnapuskanyaww.png'
import imp2 from './2imp.png'
import React from 'react';
import { locale } from '../../utils/locale.ts';

let pub_name:string = "Attician1";
let code:string = "";
let isAudience:boolean = false;
const locales:string[] = Object.keys(localization);
const urlParams:URLSearchParams = new URLSearchParams(window.location.search);
const currentUrl:string = window.location.host

function mem(key:string){
    return localStorage.getItem(key)
} // localStorage or "Memory" saver

export function memSet(key:string, cond:string){
    return localStorage.setItem(key, cond)
}

export interface Localization{
    [key:string]: string | Localization | any
}

function Enterer(){
    const [curLoc, setCurLoc] = useState(mem("locale") || "ru")
    const [inLoc, setInLoc] = useState<Localization>(localization[curLoc]);
    const [rcValue, setRcValue] = useState<string>("");
    const [nameValue, setName] = useState<string>(mem("name") || "")
    const [joinButtonStatus, setJoinButtonStatus] = useState<number>(0);
    const [joinButtonIsActive, setJoinButtonctive] = useState<number>(0);
    const [curTheme, setCurTheme] = useState<string>(localStorage.getItem("theme") || "black")
    const [settingOpenStatus, setSettingOpenStatus] = useState<boolean>(false);
    const [settingOpenAnimSt, setSettingsAnim] = useState<boolean>(false);

    const [roomStatusDisplay, setRoomStatus] = useState("waiting");
    const [ruMR, setRuMr] = useState(Math.random());

    const toggleLanguage = () => {
        const newLocale = locales.indexOf(curLoc) + 1 < locales.length ? locales[locales.indexOf(curLoc) + 1] : locales[0];
        setCurLoc(newLocale);
        setInLoc(localization[newLocale]);
        memSet("locale", newLocale)
        setRuMr(Math.random());
        locale.changeLangAttribute()
    };

    const toggleSettings = () =>{
        setSettingOpenStatus(!settingOpenStatus);
        setSettingsAnim(true);
    };

    const changeTheme = () => {
        setCurTheme(curTheme ==="white" ? "black" : "white");
        memSet("theme", curTheme ==="white" ? "black" : "white")
    };

    const settingsAnimationEnd = (event) => {
        if(event.animationName.includes("hideSettings")){
            setSettingsAnim(false)
        }
    }

    const getSettingsList = () => {
        interface SettingsList{
            text: string;
            link: string;
            [key:string]: any
        }
        const list: SettingsList[] = [
            {
                text: "settings_ourSite",
                link: "https://puskanyaww.com",
                target: "_blank"
            },
            {
                text: "settings_theme",
                link: "",
                svgIcon: <svg version="1.1" x="0px" y="0px"
                viewBox="0 0 800 800"><path className="appearance" d="M400,781.8c-51.5,0-101.5-10.1-148.6-30c-45.5-19.2-86.3-46.8-121.4-81.8c-35.1-35.1-62.6-75.9-81.8-121.4
                c-19.9-47.1-30-97.1-30-148.6s10.1-101.5,30-148.6C67.4,205.9,94.9,165.1,130,130c35.1-35.1,75.9-62.6,121.4-81.8
                c47.1-19.9,97.1-30,148.6-30s101.5,10.1,148.6,30C594.1,67.4,634.9,94.9,670,130c35.1,35.1,62.6,75.9,81.8,121.4
                c19.9,47.1,30,97.1,30,148.6s-10.1,101.5-30,148.6c-19.2,45.5-46.8,86.3-81.8,121.4s-75.9,62.6-121.4,81.8
                C501.5,771.7,451.5,781.8,400,781.8z M400,81.8c-85,0-164.9,33.1-225,93.2c-60.1,60.1-93.2,140-93.2,225s33.1,164.9,93.2,225
                c60.1,60.1,140,93.2,225,93.2s164.9-33.1,225-93.2c60.1-60.1,93.2-140,93.2-225S685.1,235.1,625,175C564.9,114.9,485,81.8,400,81.8z
                "/><path className="appearance" d="M298.5,763.6L278.9,703c80.9-26.2,146.9-82.3,185.6-158.1c38.7-75.8,45.6-162,19.5-243
                c-15.4-47.7-42.4-91.7-77.8-127.2c-35.5-35.5-79.5-62.4-127.2-77.8l19.6-60.6c57.3,18.5,110.1,50.8,152.6,93.4s74.9,95.4,93.4,152.6
                c15.9,49.1,21.7,99.8,17.2,150.8c-4.3,49.2-17.9,96.6-40.5,140.8c-22.6,44.2-53,83-90.4,115.3C392.1,722.7,347.5,747.8,298.5,763.6z
                "/>
                </svg>,
                action: changeTheme
            },
            {
                text: "settings_language",
                link: "",
                svgIcon: <svg version="1.1" x="0px" y="0px"
                viewBox="0 0 800 800"><path className="globe" d="M44.5,395.5h711 M44.5,395.5C44.5,591.8,203.7,751,400,751 M44.5,395.5C44.5,199.2,203.7,40,400,40
                M755.5,395.5C755.5,591.8,596.3,751,400,751 M755.5,395.5C755.5,199.2,596.3,40,400,40 M400,751c-286.2-312.8-119.2-604.3,0-711
                M400,751c286.2-312.8,119.2-604.3,0-711"/></svg>,
                action: toggleLanguage
            }
        ];
        let block: any[] = [];
        list.forEach(element => {
            let icon;
            if(element.icon) icon = <img src={element.icon}/>;
            let svgIcon;
            if(element.svgIcon) svgIcon = element.svgIcon;
            if(element.action){
                block.push(<a key={element.text} onClick={element.action}><span>{inLoc[element.text]}</span>{icon}{svgIcon}</a>)
            }
            else if(element.link){
                block.push(<a key={element.text} onClick={() => setSettingOpenStatus(false)} href={element.link} target={element.target}><span>{inLoc[element.text]}</span>{icon}</a>)
            }
        });
        return <div className="headerModal"><div id="modalSettings" onAnimationEnd={settingsAnimationEnd} className={!settingOpenStatus ? "closing" : ""}>{block}</div></div>
    };

    const cyrillicToLatinReplacement = (string) => {
            const keys = {
                "Й":"Q", "Ц":"W",
                "У":"E", "К":"R", "Е":"T", "Н":"Y",
                "Г":"U", "Ш":"I", "Щ":"O", "З":"P",
                "Ф":"A", "Ы":"S", "В":"D", "А":"F",
                "П":"G", "Р":"H", "О":"J", "Л":"K",
                "Д":"L", "Я":"Z", "Ч":"X", "С":"C",
                "М":"V", "И":"B", "Т":"N", "Ь":"M"
        }
        const arr:string[] = Object.keys(keys)

        let pre_string:string = string
    
        arr.forEach(element => {
            pre_string = pre_string.replace(element, keys[element])
        });
    
        return pre_string
    };

    const codeOnInput = async (event) => {
        const accepted = /[^a-zA-Z]/;
        const data:string = event.target.value.toLocaleUpperCase()
        const pre_code:string = cyrillicToLatinReplacement(data)
        code = pre_code.replace(accepted, "");
        setRcValue(code);
        setJoinButtonStatus(0);
        setJoinButtonctive(0);
        setRoomStatus("waiting");
        if (data.length === 4) showGameInfo();
    };

    const checkIsRoomExists = async (rc:string) => {
        socket.emit("isRoomDef", rc);
        return new Promise((resolve) => {
            socket.on("isRoomDef", (isDef) => {
                resolve(isDef.res === "EXISTS");
            })
        })
    }

    const showGameInfo = async () => {
        const result = await checkIsRoomExists(code);
        if (code.length !== 4) return
        setRuMr(Math.random());
        if(result){
            setJoinButtonctive(1);
            if(code === mem('code')){
                setJoinButtonStatus(1);
            }
        }
        else{
            setRoomStatus("notFound")
        }
    }

    const onNameInput = (event:any) => {
        const txt = event.target.value;
        if(txt.length < 13){
            setName(txt);
            memSet("name", txt);
        }
    };

    const tryConnect = (event:any) => {
        event.preventDefault();
        if (rcValue.length !== 4) return;
        console.log("connecting to", rcValue);

        const hash:string = mem('hash') || "";
        const memCode:string = mem('code') || "";
        if(hash && memCode === rcValue){
            socket.emit('clientRelogin', {name: nameValue, code: rcValue, hash: hash});
        }
        else{
            socket.emit('clientLogin', {name: nameValue, code: rcValue});
        }
        socket.on('youJoined', (data) => {
            pub_name = data.name;
            isAudience = data.isAudience;
            memSet('code', rcValue);
            memSet('hash', data.hash);
        })
    }

    const checkRoomOnReconnect = async () => {
        const codeBlack = mem('code');
        if(!codeBlack){
            return;
        }
        setJoinButtonStatus(0);
        const result = await checkIsRoomExists(codeBlack);
        if(result){
            setRcValue(codeBlack);
            setJoinButtonctive(1);
            setJoinButtonStatus(1);
        }
        else{
            localStorage.removeItem("hash")
        }
        return;
    }

    useEffect(() => {
        checkRoomOnReconnect(); locale.changeLangAttribute();
    }, []);

    return (
        <div className={classNames("Enterer", "theme-" + curTheme)}>

            <div className="lol">
                <header>
                    <img src={logo} alt="logo" />
                    <img onClick={() => toggleSettings()} src={settings} className={classNames("settings", settingOpenStatus ? "spin" : null)} alt={inLoc.settings_alt} />
                    {settingOpenAnimSt ? getSettingsList() : null}
                </header>

                <form onSubmit={(e) => tryConnect(e)}>
                    <input type="text" autoCapitalize='off' autoComplete='off' autoCorrect='off' onInput={onNameInput} value={nameValue} placeholder={inLoc.nickname} maxLength={12}/>
                    <input type="text" autoCapitalize='on' autoComplete='off' autoCorrect='off' name='code' value={rcValue} onInput={codeOnInput} className="roomcode" placeholder={inLoc.roomcode} maxLength={4}/>
                    <input type='Submit' className={joinButtonIsActive ? "activeButton" : ""} defaultValue={inLoc[joinButtonStatus === 0 ? "play" : "reconnect"]}/>
                </form>
                <div className="socials">
                    <a href="https://discord.gg/Z4FARpFWDX/" target='__blank'>{inLoc.socials.ds}</a>·
                    <a href="https://puskanyaww.itch.io/" target='__blank'>Itch.io</a>
                </div>

                <div className={classNames("roomStatusActions", roomStatusDisplay)} key={ruMR}>
                    <div className={classNames("atticSad", roomStatusDisplay === "notFound" ? "wtf" : null)}>
                        <h2 id="roomNotFound">{inLoc.roomNotFound}</h2>
                        <div className='svgdiv'>
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 575 252">
                        <polygon className="notFoundBottom" points="470.5,242 176.5,242 86.5,169 380.5,169 "/>
                        <polygon className="notFoundTop" points="470.5,242 176.5,242 86.5,169 380.5,169">
                            <animate 
                                attributeName="points" 
                                from="470.5,242 176.5,242 86.5,169 380.5,169" 
                                to="455.5,27 161.5,27 86.5,169 380.5,169" 
                                dur=".7s" 
                                fill="freeze" 
                                begin=".1s"
                                calcMode="spline"
                                keyTimes="0;1"
                                keySplines="0.69 0.5 0.4 1" />
                        </polygon>
                        </svg>
                        <div className='sadmanoverflow'>
                            <img src={sadman}/>
                        </div>
                        </div>
                    </div>
                </div>

                <div className="news infoBlock">
                    <h2>{inLoc.lastNews}</h2>
                    <Swiper
                        loop={true} 
                        spaceBetween={5}
                        grabCursor={true}
                        modules={[Navigation, Autoplay]}
                        autoplay={{
                        delay: 10000,
                        disableOnInteraction: false,
                        }}
                        className="newsGallery">
                            <SwiperSlide>
                            <a className='newsPost' href="/outside">
                                <h1>{inLoc.defaultPost01}</h1>
                                <img src={defNew01} />
                            </a>
                            </SwiperSlide>
                            {
                                curLoc === "ru" ? <SwiperSlide>
                                <a className='newsPost'  href="/outside#gameCollection">
                                    <h1>{inLoc.defaultPost01}</h1>
                                    <img src={imp2} />
                                </a>
                                </SwiperSlide> : null
                            }
                    </Swiper>
                </div>

                <a className="recents infoBlock" href='/recaps'>
                    <h2>{inLoc.gameRecaps}</h2>
                    <div className="imgOverflower">
                        <div className='zoomDiv'>
                            <img src={recaps} alt="" />
                            <h1>{currentUrl}/recaps</h1>
                            <p>{inLoc.recapsText}</p>
                            <span className='StoSHKA'><h6>{inLoc.recapsStoshka}</h6></span>
                        </div>
                    </div>
                </a>

                <p>{inLoc.developersFckedUp}</p>

            </div>

            <h2 className='version'>version {packageJSON.version}</h2>
        </div>
    );
}

export default Enterer
export { mem, pub_name, isAudience }