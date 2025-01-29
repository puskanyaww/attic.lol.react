import { useState, useEffect } from 'react';
import localization from './localization.json'
import logo from '../../shared/logo.svg';
import './Main.scoped.css';
import classNames from 'classnames';
import { mem, memSet } from '../Enterer/Enterer.tsx';
import { socket } from '../../index.tsx';
import LoadingIcon from '../../shared/LoadingIcon/LoadingIcon.tsx';
import Placeholder from './Assets/Placeholder.png'
import InfiniteScroll from 'react-infinite-scroll-component';
import lolman from './Assets/lolman.svg'
import React from 'react';

const locales = Object.keys(localization);

function Recaps({isShowingRecap = false}){
    const [curLoc, setCurLoc] = useState(mem("locale") || "")
    const [inLoc, setInLoc] = useState(localization[curLoc]);
    const [languages, setLanguages] = useState<any>(null)
    document.title = inLoc.pageName

    const toggleLanguages = () => {
        if(languages === null){
            const localeBlocks = locales.map((locale) => <button onClick={() => {setCurLoc(locale); memSet("locale", locale); setInLoc(localization[locale]); setLanguages(null);}}>{locale.toLocaleUpperCase()}</button>);
            setLanguages(<div className="languages">{localeBlocks}</div>)
        }
    }

    return ( 
    <div className={classNames("Recaps", "theme-" + "black")}>
        <header>
            <img src={logo} alt="logo" />
            <input type="text" placeholder={inLoc.search} maxLength={30}/>
            <div className='language' onClick={() => toggleLanguages()} onMouseLeave={() => setLanguages(null)}>
                <svg version="1.1" x="0px" y="0px"
                viewBox="0 0 800 800"><path className="globe" d="M44.5,395.5h711 M44.5,395.5C44.5,591.8,203.7,751,400,751 M44.5,395.5C44.5,199.2,203.7,40,400,40
                M755.5,395.5C755.5,591.8,596.3,751,400,751 M755.5,395.5C755.5,199.2,596.3,40,400,40 M400,751c-286.2-312.8-119.2-604.3,0-711
                M400,751c286.2-312.8,119.2-604.3,0-711"/></svg>
                {languages}
            </div>
        </header>
        <RecapsContent key={curLoc} inLoc={inLoc} locale={curLoc}/>
    </div>
    )
}

interface Recap{
    hash: string;
    title: string;
    desc: string;
    timestamp: number;
    game: string;
}

function RecapsContent({inLoc, locale = "ru"}){
    const [chosenMode, setChosenMode] = useState(0);
    const [recaps, setRecaps] = useState<Recap[]>([]);
    const [pageCounter, setPageCounter] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const getRecaps = () => {
        socket.emit('getRecaps', {region: locale, page: pageCounter})
        socket.on('getRecaps', data => {
            if (data.length === 0 && pageCounter === 1){
                return
            }
            setRecaps((prev) => [...prev, ...data]);
            setHasMore(true)
            socket.off('getRecaps')
            if(data.length > 9){
                setPageCounter(pageCounter + 1)
            }
            else{
                setHasMore(false)
            }
        });
    }

    useEffect(() => {

    })

    return <div className="RecapsContent">
        <div className="modes">
            <button className={classNames(chosenMode === 0 ? "ChosenMode" : null)} onClick={() => setChosenMode(0)}>{inLoc.blocks_mode}</button>
            <button className={classNames(chosenMode === 1 ? "ChosenMode" : null)} onClick={() => setChosenMode(1)}>{inLoc.posts_mode}</button>
        </div>
        { recaps.length === 0 ? <h2>{inLoc.empty}</h2> : <InfiniteScroll
            dataLength={recaps.length}
            next={getRecaps}
            hasMore={hasMore}
            loader={<div className='LoadingRecaps'><LoadingIcon/></div>}
            endMessage={
                <div className='thePitMan'><img src={lolman}/></div>
            }
            >
            <div className={classNames("contents", chosenMode === 0 ? "BlockMode" : "ScrollMode")}>
                {recaps.map(recap => <BlockRecap key={recap.hash} locale={locale} Title={recap.title} Desc={recap.desc} timestamp={recap.timestamp} Game={recap.game} GameLocalized={inLoc["game_" + recap.game]} Url={recap.hash} mode={chosenMode}/>)}
            </div>
            </InfiniteScroll> }
    </div>
}

function BlockRecap({timestamp = 1734549159, Title = "Title", Desc = "Desc",  Game = "Game", GameLocalized = Game, Url = "{123usdujxzij982ur0fsdhb}", locale = "ru", mode}){
    const formattedDate = new Date(timestamp);
    return <a href={"/recaps/" + Url}  className={classNames('RecapElement', "BG" + Game)} key={Url}>
        <div className={'Info'}>
            <h1>{Title}</h1>
            {mode === 1 ? <>
                <h3>{Desc}</h3>
                <img src={Placeholder} alt="lol" />
            </>
            : null}

            <p><span>{GameLocalized}</span> <span>{formattedDate.toLocaleDateString(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', })}</span></p>
        </div>
    </a>
}

function RecapInfoView(){
    const [curLoc, setCurLoc] = useState(mem("locale") || "")
    const [inLoc, setInLoc] = useState(localization[curLoc]);
    const [recap, setRecap] = useState<Recap>()
    const hash = window.location.pathname.split("/")[2];

    const getRecap = () => {
        socket.emit('getRecap', {region: curLoc, hash: hash + ".json"})
        socket.on('getRecap', data => {
            setRecap(data)
            socket.off('getRecap')
        });
    }

    useEffect(() => {
        getRecap();
        return () => {
            socket.off('getRecap')
        }
    }, [])

    if(recap){
        document.title = inLoc.pageName + " – " + inLoc["game_" + recap.game]
    }
    else{
        document.title = inLoc.pageName
    }
    
    return (
    <div className={classNames("Recaps", "theme-" + "black", "InfoView")}>
        <header>
            <img src={logo} alt="logo" />
            <input type="text" placeholder={inLoc.search} maxLength={30}/>
        </header>
        {
        recap ? <div className="Recap">
            <h1>{recap.title}</h1>
            <p>{recap.desc}</p>
            <div className="Gallery">
                <img src={Placeholder} alt="lol" />
            </div>
            <p className='bottomInfo'><span>{inLoc["game_" + recap.game]}</span> <span>{inLoc.gameWent} {new Date(recap.timestamp).toLocaleDateString(curLoc, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: "numeric",
                minute: "numeric"
            })}</span></p>
        </div> :
        <div className='LoadingRecaps'>
            <LoadingIcon/>
        </div>
        }

    </div>
    )
}

export default Recaps
export {RecapInfoView}