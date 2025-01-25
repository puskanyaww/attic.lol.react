import './Main.scoped.css';
import { useState, useEffect } from 'react';
import localization from './localization.json'
import { Localization, mem } from '../Enterer/Enterer.tsx';
import React from 'react';

function ModalWindow(props){
    const [curLoc, setCurLoc] = useState<string>(mem("locale") || "")
    const [inLoc, setInLoc] = useState<Localization>(localization[curLoc]);
    return (
        <div className="Modal" onClick={() => props.OnClose()}>
            <div className='Window' onClick={(event) => event.stopPropagation()}>
                <h1>{inLoc[props.textBig] || props.textBig}</h1>
                <p>{inLoc[props.textLittle] || props.textLittle}</p>
                <button onClick={props.OnClose}>{inLoc.KK}</button>
            </div>
        </div>
    )
}

export default ModalWindow