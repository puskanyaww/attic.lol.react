import './Main.scoped.css';
import React from 'react';
import logo from './logo.svg'
import attic from '../../logo.svg'
import localization from './localization.json'
import { useState } from 'react';
import { Localization, mem, memSet } from '../Enterer/Enterer.tsx';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import puskanyaww from './puskanyaww.svg'
import blat from './blat.png'
import socials from './socials.png'
import imp2bg from './imp2bg.jpg'
import Tilt from 'react-parallax-tilt'
import IMP2 from './IMP2.png'

const locales: string[] = Object.keys(localization);

function AtticOutside(){
    const [curLoc, setCurLoc] = useState<string>(mem("locale") || "")
    const [inLoc, setInLoc] = useState<Localization>(localization[curLoc]);
    const [languages, setLanguages] = useState<JSX.Element | null>()

    document.title = "Game Collection From Your Grandad's Attic"

    const toggleLanguages = () => {
        if(languages === null){
            const localeBlocks = locales.map((locale) => <button key={locale} onClick={() => {setCurLoc(locale); memSet("locale", locale); setInLoc(localization[locale]); setLanguages(null);}}>{locale.toLocaleUpperCase()}</button>);
            setLanguages(<div className="languages">{localeBlocks}</div>)
        }
    }

    const paginationDot = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '"></span>';
        },
    };

    
    return <div className="AtticOutside">
        <header>
            <img src={attic} alt="Attic" className='attic' />
            <div className="nav">
                <a href='#about'>{inLoc.about}</a>
                <a href='#gameCollection'>{inLoc.gameCollection}</a>
                {curLoc === "ru" ? <a>Boosty</a> : null}
                <a href='https://puskanyaww.itch.io/' target='__blank'>Itch.io</a>
                <a>Discord</a>
                <div className='language' onClick={() => toggleLanguages()} onMouseLeave={() => setLanguages(null)}>
                    <svg version="1.1" x="0px" y="0px"
                    viewBox="0 0 800 800"><path className="globe" d="M44.5,395.5h711 M44.5,395.5C44.5,591.8,203.7,751,400,751 M44.5,395.5C44.5,199.2,203.7,40,400,40
                    M755.5,395.5C755.5,591.8,596.3,751,400,751 M755.5,395.5C755.5,199.2,596.3,40,400,40 M400,751c-286.2-312.8-119.2-604.3,0-711
                    M400,751c286.2-312.8,119.2-604.3,0-711"/></svg>
                    {languages}
                </div>
            </div>
        </header>
        <div className="mainInfo">
            <img src={logo} alt="Game Collection From Your Grandad's Attic" className='logo' />
        </div>
        <Swiper
        pagination={paginationDot}
        spaceBetween={15}
        grabCursor={true}
        navigation={true} 
        slidesPerView={"auto"}
        initialSlide={0}
        centeredSlides={true}
        modules={[Navigation, Autoplay, Pagination]}
        className="newsGallery">
            <SwiperSlide>
                <div className='new-s' style={{backgroundImage: `url(${socials})`}}>
                    <h1>{inLoc.news_Socials}</h1>
                    <p>{inLoc.news_SocialsDesc}</p>
                    
                </div>
            </SwiperSlide>
            
            <SwiperSlide>
                <div className='new-s centered' style={{backgroundImage: `url(${imp2bg})`}}>
                    <h1>{inLoc.news_FirstGame}</h1>
                    <p>{inLoc.news_FirstGameDesc}</p>
                </div>
            </SwiperSlide>
        </Swiper>
        <div className="about" id='about'>
            <h1>{inLoc.about}:</h1>
            <p>{inLoc.aboutInfo} <a href='https://jackboxgames.com' target='__blank'>Jackbox</a>{inLoc.aboutInfo2}</p>
        </div>

        <div className="gameCollection">
            <h1 id='gameCollection'>{inLoc.gameCollection}:</h1>
            <h2 className='gameName'>{inLoc.games_imp2}</h2>
            <Swiper
        pagination={paginationDot}
        spaceBetween={15}
        grabCursor={true}
        navigation={true} 
        slidesPerView={"auto"}
        initialSlide={0}
        centeredSlides={true}
        modules={[Navigation, Autoplay, Pagination]}
        className="gamesGallery">
            <SwiperSlide>
                <div className="discInfo">
                    <div className='disc'>
                        <Tilt glareEnable={true} glareColor={"#000000"} glareMaxOpacity={0.9} glarePosition={"all"}>
                            <img src={IMP2} />
                        </Tilt>
                    </div>
                    <iframe src="https://www.youtube.com/embed/RndK9KUQB3E?si=5Pkr4kgDVqGOPgbK" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin"></iframe>
                </div>
            </SwiperSlide>
        </Swiper>
        <p>Description</p>
        </div>
        

        <div className="beta">
            <h1>{inLoc.betaTesting}</h1>
            <p>{inLoc.betaTestingSub}</p>
            <button className='button'>{inLoc.createTicketTesting}</button> <button className='button'>{inLoc.createTicketHelp}</button>
        </div>
        <footer>
            <a href="https://puskanyaww.com" target='__blank'>
                <img className='puskanyaww' src={puskanyaww} alt="puskanyaww's logo" />
            </a>
            <a href="https://x.com/mewhenlasagna" target='__blank'>
                <img src={blat} alt="mewhenlasagna's (blat's) logo. he did that beautiful 3D model" />
            </a>
            {curLoc === "ru" ? <a>Boosty</a> : null}
            <a href='https://puskanyaww.itch.io/' target='__blank'>Itch.io</a>
            <a>Discord</a> ·
            <p>Party Attic</p>
        </footer>
    </div>
}

export default AtticOutside