import { useState, useEffect } from 'react';
import localization from './localization.json'
import logo from '../../shared/logo.svg';
import settings from './Assets/settings.svg';
import './Main.scoped.css';
import sadman from './Assets/sadman.svg';
import classNames from 'classnames';
import recaps from './Assets/recaps.png'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import packageJSON from '../../../package.json'
import {socket} from '../../index.tsx';
import defNew01 from './Assets/thumb01mewhenlasagnapuskanyaww.png'
import imp2 from './Assets/2imp.png'
import React from 'react';
import { locale } from '../../utils/locale.ts';
import { Twitch } from '../../utils/twitchLogin.ts';
import LoadingIcon from '../../shared/LoadingIcon/LoadingIcon.tsx';
import { CDN } from '../../utils/cdn.ts';

let pub_name:string = "Attician1";
let code:string = "";
let isAudience:boolean = false;
const locales:string[] = Object.keys(localization);
export const params:URLSearchParams = new URLSearchParams(
    new URL(window.location.href).search
)
const currentUrl:string = window.location.host
console.log(params)
function mem(key:string){
    return localStorage.getItem(key)
} // localStorage or "Memory" saver

export function memSet(key:string, cond:string){
    return localStorage.setItem(key, cond)
}

export interface Localization{
    [key:string]: string | Localization | any
}

export default function EntererLoader(): JSX.Element{
    const [jsx, setJSX] = useState<JSX.Element>(
        <div className="EntererLoader">
            <LoadingIcon/>
        </div>
    )
    const [isLoaded, setLoaded] = useState<boolean>(false)

    const twitchLogin = async () => {
        setLoaded(true)
        if(params.has("code") && params.has("scope")){
            const data = await Twitch.login(params.get("code"))
            socket.on("TwitchSuccess", () => {
                const url = Twitch.info.url;
                window.history.replaceState({ path: url }, "", url);
                memSet("TwitchToken", Twitch.access)
                renderEnterer()
            })
        }
        else{
            renderEnterer()
        }
    }

    const renderEnterer = async () => {
        const t:string | null = mem("TwitchToken")
        if(t){
            await Twitch.setUserInfo(t);
            return setJSX(<Enterer isTwitchLogined={Twitch.isLogined}/>)
        }
        setJSX(<Enterer isTwitchLogined={false}/>)
    }


    useEffect(() => {
        if(!isLoaded) twitchLogin();
    })

    return jsx
}

interface EntererBlock{
    isTwitchLogined:boolean,
    [key:string]: any
}

function Enterer({isTwitchLogined}:EntererBlock){
    const [curLoc, setCurLoc] = useState<string>(mem("locale") || "ru")
    const [inLoc, setInLoc] = useState<Localization>(localization[curLoc]);
    const [rcValue, setRcValue] = useState<string>(mem('code') || params.get("c") || "");
    const [nameValue, setName] = useState<string>(isTwitchLogined ? Twitch.username : mem("name") || "")
    const [joinButtonStatus, setJoinButtonStatus] = useState<number>(0);
    const [joinButtonIsActive, setJoinButtonctive] = useState<number>(0);
    const [curTheme, setCurTheme] = useState<string>(localStorage.getItem("theme") || "black")
    const [settingOpenStatus, setSettingOpenStatus] = useState<boolean>(false);
    const [settingOpenAnimSt, setSettingsAnim] = useState<boolean>(false);
    const [isTwitch, setIsTwitch] = useState<boolean>(isTwitchLogined)
    const [roomStatusDisplay, setRoomStatus] = useState("waiting");
    const [ruMR, setRuMr] = useState(Math.random());
    const [twitchReq, setTwitchReq] = useState<boolean>(false)
    const [ConnectionResolve, setUnresolved] = useState<boolean>(true)

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

    const TwitchAction = () => {
        if(isTwitch){
            localStorage.removeItem("TwitchToken");
            setIsTwitch(false)
            setName(mem("name") || "")
        }
        else{
            window.location.replace(Twitch.getLink());
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
                text: isTwitch ? "settings_twitch_logoff" : "settings_twitch_login",
                link: "",
                action: TwitchAction,
                svgIcon: <svg version="1.1" className='Twitch' xmlSpace='preserve' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 8192 2500">
                    <g>
                        <g id="Layer_1-2">
                            <polygon className="tw" points="596,840 595.8,319.1 0,319.1 0,1883 297.9,2180.9 1117,2181 1117,1585 596,1585 596,1436 1117,1436 
                                1117,840 		"/>
                            <polygon className="tw" points="2755,840 2755,1585 2606,1585 2606,840 2011,840 2011,1585 1862,1585 1862,840 1266,840 1266,1883 
                                1563.9,2180.9 3351,2181 3351,840 		"/>
                            <polygon className="tw" points="3500,840 4096,840 4096,2180.9 3500.2,2180.9 		"/>
                            <polygon className="tw" points="3500.2,319.1 4096,319.1 4096,692 3500,692 		"/>
                            <polygon className="tw" points="5809,840 5511,1138.3 5511,1883 5808.9,2180.9 6703,2181 6703,1585 6107,1585 6107,1436 6703,1436 
                                6703,840 		"/>
                            <polygon className="tw" points="7894,840 7448,840 7448,319 6852,319 6852,2181 7447,2181 7447,1436 7596,1436 7596,2181 
                                8192,2180.9 8192,1138.3 		"/>
                            <polygon className="tw" points="4841,840 4840.7,319.1 4245,319 4245,1883 4542.8,2180.9 5362,2180.9 5362,1585.1 4841,1585 
                                4841,1436 5362,1436 5362,840 		"/>
                        </g>
                    </g>
                </svg>
            },
            {
                text: "settings_theme",
                link: "",
                svgIcon: <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_350_2578)">
                        <path d="M15.0001 29.3176C13.0689 29.3176 11.1939 28.9389 9.42762 28.1926C7.72137 27.4726 6.19137 26.4376 4.87512 25.1251C3.55887 23.8089 2.52762 22.2789 1.80762 20.5726C1.06137 18.8064 0.682617 16.9314 0.682617 15.0001C0.682617 13.0689 1.06137 11.1939 1.80762 9.42762C2.52762 7.72137 3.55887 6.19137 4.87512 4.87512C6.19137 3.55887 7.72137 2.52762 9.42762 1.80762C11.1939 1.06137 13.0689 0.682617 15.0001 0.682617C16.9314 0.682617 18.8064 1.06137 20.5726 1.80762C22.2789 2.52762 23.8089 3.55887 25.1251 4.87512C26.4414 6.19137 27.4726 7.72137 28.1926 9.42762C28.9389 11.1939 29.3176 13.0689 29.3176 15.0001C29.3176 16.9314 28.9389 18.8064 28.1926 20.5726C27.4726 22.2789 26.4376 23.8089 25.1251 25.1251C23.8126 26.4414 22.2789 27.4726 20.5726 28.1926C18.8064 28.9389 16.9314 29.3176 15.0001 29.3176ZM15.0001 3.06762C11.8126 3.06762 8.81637 4.30887 6.56262 6.56262C4.30887 8.81637 3.06762 11.8126 3.06762 15.0001C3.06762 18.1876 4.30887 21.1839 6.56262 23.4376C8.81637 25.6914 11.8126 26.9326 15.0001 26.9326C18.1876 26.9326 21.1839 25.6914 23.4376 23.4376C25.6914 21.1839 26.9326 18.1876 26.9326 15.0001C26.9326 11.8126 25.6914 8.81637 23.4376 6.56262C21.1839 4.30887 18.1876 3.06762 15.0001 3.06762Z" fill="white"/>
                        <path d="M11.194 28.6351L10.459 26.3626C13.4927 25.3801 15.9677 23.2763 17.419 20.4338C18.8702 17.5913 19.129 14.3588 18.1502 11.3213C17.5727 9.53258 16.5602 7.88258 15.2327 6.55133C13.9015 5.22008 12.2515 4.21133 10.4627 3.63383L11.1977 1.36133C13.3465 2.05508 15.3265 3.26633 16.9202 4.86383C18.514 6.46133 19.729 8.44133 20.4227 10.5863C21.019 12.4276 21.2365 14.3288 21.0677 16.2413C20.9065 18.0863 20.3965 19.8638 19.549 21.5213C18.7015 23.1788 17.5615 24.6338 16.159 25.8451C14.704 27.1013 13.0315 28.0426 11.194 28.6351Z" fill="white"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_350_2578">
                            <rect width="30" height="30" fill="#ffffff"/>
                        </clipPath>
                    </defs>
                </svg>,
                action: changeTheme
            },
            {
                text: "settings_language",
                link: "",
                svgIcon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 16H31M1 16C1 24.2827 7.7173 31 16 31M1 16C1 7.7173 7.7173 1 16 1M31 16C31 24.2827 24.2827 31 16 31M31 16C31 7.7173 24.2827 1 16 1M16 31C3.92405 17.8017 10.9705 5.50211 16 1M16 31C28.076 17.8017 21.0295 5.50211 16 1" stroke="white" stroke-width="2.4" stroke-linejoin="bevel"/>
                </svg>,                
                action: toggleLanguage
            }
        ];
        let block: any[] = [];
        list.forEach(element => {
            let icon;
            if(element.icon) icon = <img alt='icon' src={element.icon}/>;
            let svgIcon;
            if(element.svgIcon) svgIcon = element.svgIcon;
            if(element.action){
                block.push(<a key={element.text} onClick={element.action}><span>{inLoc[element.text]}</span>{icon}{svgIcon}</a>)
            }
            else if(element.link){
                block.push(<a key={element.text} onClick={() => {if(element.targer === "__blank") setSettingOpenStatus(false)}} href={element.link} target={element.target}><span>{inLoc[element.text]}</span>{icon}{svgIcon}</a>)
            }
        });
        return <div className="headerModal"><div id="modalSettings" onAnimationEnd={settingsAnimationEnd} className={!settingOpenStatus ? "closing" : ""}>{block}</div></div>
    };

    const cyrillicToLatinReplacement = (string:string) => {
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
        setTwitchReq(false)
        if (data.length === 4) showGameInfo();
    };

    const checkIsRoomExists = async (rc:string) => {
        socket.emit("isRoomDef", rc);
        return new Promise((resolve) => {
            socket.on("isRoomDef", (isDef) => {
                resolve(isDef);
            })
        })
    }

    const showGameInfo = async () => {
        const result:any = await checkIsRoomExists(code);
        if (code.length !== 4) return
        setRuMr(Math.random());
        if(result.res === "EXISTS"){
            setTwitchReq(result.twitch)
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
        if(isTwitch) return;

        const txt = event.target.value;
        if(txt.length < 13){
            setName(txt);
            memSet("name", txt);
        }
    };

    const forgetCurrentRoom = () => {
        setRcValue(""); setJoinButtonctive(0); setJoinButtonStatus(0); localStorage.removeItem("code")
    }

    const tryConnect = (event:any) => {
        event.preventDefault();
        if (rcValue.length !== 4 || !ConnectionResolve || roomStatusDisplay === "notFound") return;
        setUnresolved(false)
        const isAudienceJoin = event.nativeEvent.submitter.name === "Audience"

        if(isAudienceJoin){
            socket.emit('clientLogin', {name: nameValue, code: rcValue, audienceForce: true});
        }
        else{
            const hash:string = mem('hash') || "";
            const memCode:string = mem('code') || "";
            if(hash && memCode === rcValue){
                socket.emit('clientRelogin', {name: nameValue, code: rcValue, hash: hash});
            }
            else{
                socket.emit('clientLogin', {name: nameValue, code: rcValue, token: isTwitch ? mem("TwitchToken") : null});
            }
            socket.on('errorJoin', (data) => {
                setUnresolved(true);
                socket.off('errorJoin');
                if(data === "ROOM_NOT_FOUND") forgetCurrentRoom();
            })
        }

        socket.on('youJoined', (data) => {
            setUnresolved(true)
            pub_name = data.name;
            isAudience = data.isAudience;
            memSet('code', rcValue);
            memSet('hash', data.hash);
        })
    }

    const checkRoomOnReconnect = async () => {
        const codeBlack = rcValue
        if(!codeBlack && codeBlack !== ""){
            return;
        }
        setJoinButtonStatus(0);
        const result:any = await checkIsRoomExists(codeBlack);
        if(result.res === "EXISTS"){
            setRcValue(codeBlack);
            setJoinButtonctive(1);
            setJoinButtonStatus(1);
        }
        else{
            localStorage.removeItem("hash")
            localStorage.removeItem("code")
            setRcValue("")
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
                    <input className={classNames(isTwitch ? "TwitchLocked" : null)} type="text" autoCapitalize='off' autoComplete='off' autoCorrect='off' onInput={onNameInput} value={nameValue} placeholder={inLoc.nickname} maxLength={12}/>
                    <input type="text" autoCapitalize='on' autoComplete='off' autoCorrect='off' name='c' id='c' value={rcValue} onInput={codeOnInput} className="roomcode" placeholder={inLoc.roomcode} maxLength={4}/>
                    <div className='JoinButtons'>
                        <input type='Submit' className={classNames("JoinButton", joinButtonIsActive ? "activeButton" : null, twitchReq ? "TwitchReq" : null)} defaultValue={
                            inLoc[
                                ConnectionResolve ?
                                    joinButtonStatus === 0 ? "play" : "reconnect"
                                : "loading"
                            ]
                            }/>
                        {
                            twitchReq ? <button name='Audience' className='activeButton JoinButton AudienceButton'>{inLoc.joinAud}</button> : null
                        }
                    </div>
                </form>
                <div className="socials">
                    <a href="https://discord.gg/Z4FARpFWDX/" target='__blank'>{inLoc.socials.ds}</a>·
                    <a href="https://puskanyaww.itch.io/" target='__blank'>Itch.io</a>·
                    <a href="https://puskanyaww.com/" target='__blank'>puskanyaww</a>
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
                            <img alt='"Sadman"' src={sadman}/>
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
                                <img alt='Main site' src={defNew01} />
                            </a>
                            </SwiperSlide>
                            {
                                curLoc === "ru" ? <SwiperSlide>
                                <a className='newsPost'  href="/outside#gameCollection">
                                    <h1>{inLoc.defaultPost01}</h1>
                                    <img alt='Main site : 2improvise' src={imp2} />
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

            <h2 className='version'>v{packageJSON.version}</h2>
        </div>
    );
}

export { mem, pub_name, isAudience }