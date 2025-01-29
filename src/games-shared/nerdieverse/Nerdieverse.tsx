import './Main.scoped.css';
import './fonts.scoped.css';
import { pub_name, isAudience, mem } from '../../ui-components/Enterer/Enterer.tsx';
import { useEffect, useState } from 'react';
import React from 'react';
import { socket } from '../../index.tsx';

import en from './nerdieverse.png'
import { locale } from '../../utils/locale.ts';
const logos = {
    en: en
}

function req(todo, data){
    try{
        console.log(todo, data)
        socket.emit('do', {do:todo, param:data});
    } catch(error){
        console.log(error)
    };
}

function Logo(): JSX.Element{
    return <img src={en} alt="Logo" className='Logo'/>
}

function Waiting(){
    return <></>
}

function Lobby({isVip, character}){
    const [avatar, changeAvatar] = useState(0)

    const newAvatar = () => {
        req("changeAvatar", null)
        changeAvatar(Math.random())
    }

    return <div className="Lobby MainWrapper">
        <Logo/>
        <div className="characterSelect" onClick={() => newAvatar()}>
            <p>Click on your character to change avatar!</p>
            <div className="Avatar">
                {character}{avatar}
            </div>
        </div>
        {
            isVip ? <button>start</button> : null
        }
    </div>
}

export default function Nerdieverse(){
    const [jsx, setJsx] = useState<JSX.Element>(<Waiting/>);
    socket.on("task", (data) => {
        console.log(data)
        if (!data) return
        const gameData = {
            lobby: <Lobby isVip={data.title?.isVip || false} character={data.title?.character}/>
        }
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


    return <div className="Nerdieverse">
        {jsx}
        <p className='name'>{pub_name}</p>
    </div>
}