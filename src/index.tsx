import './index.css';
import reportWebVitals from './reportWebVitals.js';
import React, { JSX, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import io from 'socket.io-client';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Enterer, { mem } from './components/Enterer/Enterer.tsx';
import Recaps, { RecapInfoView } from './components/Recaps/Recaps.tsx';
import ModalWindow from './components/ModalNotifs/ModalNotifs.tsx';
//games
import Improvise2 from './gameData/2improvise/2improvise.tsx';
// import AtticOutside from './components/Outside/Outside.tsx';
import { locale } from './utils/locale.ts';
import TestGame from './gameData/testGame/testGame.jsx';


const getLocaleByIp = async () => {
  try {
    const response = await axios.get('https://ipinfo.io/json?token=22e8f2beba59b3'); const {country} = response.data;
    const lc = {
      'US': 'en',
      'UK': 'en',
      'RU': 'ru',
      'UA': 'ru'
    };
    if(country ==="UA"){
      localStorage.setItem('uanotificated', "0")
    }
    const language = lc[country] || 'en';
    return language;
  } catch (error) {
    return 'en';
  }
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
export const socket = io(false ? "http://localhost:4020" : "wss://trgu.ru", {transports: ['websocket', 'polling', 'flashsocket']});

const AppManifest = {
  rc: <Enterer />,
  "2improvise": <Improvise2 />,
  testGame: <TestGame/>
};

function ServerUrlConnection(){
  const [status, setStatus] = useState<string | boolean>("pending");

  socket.on("connect", () => {
    setStatus(socket.connected ? "connected" : "failed")
    socket.off("connect")
  })

  return <div style={{backgroundColor: '#fff'}}>
    Connection status: {status}
  </div>
}

if(!localStorage.getItem("locale")){
  const locale = await getLocaleByIp();
  console.log(locale)
  localStorage.setItem("locale", locale)
}

function App(){
  const [black, setBlack] = useState<JSX.Element>(AppManifest.rc);
  const [modalUtil, setModalUtils] = useState<any>([false])

  const openModal = (param1:string, param2:string, isReload:boolean) => {
    setModalUtils([true, param1, param2, Math.random(), isReload])
  };

  const closeModal = () => {
    if(modalUtil[4]){
      window.location.reload();
      return
    }
    setModalUtils([false])
  }

  socket.on('youJoined', (data) => {
    locale.roomLocale = data.roomLocale;
    if(AppManifest[data.gameName]){
      return setBlack(AppManifest[data.gameName]);
    }
    openModal('wellwellwell', 'gameIsUnavalible', false)
  })

  socket.on('disconnectRoom', () => {
    console.log("disconnected")
    openModal('oops', 'roomDestroyed', true)
  })

  socket.on("errorJoin", (data) => {
    openModal("ERROR_JOIN", data, false)
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={black}/>
        <Route path='/recaps/*' element={<RecapInfoView/>}/>
        <Route path='/recaps' element={<Recaps/>}/>
        {/* <Route path='/outside' element={<AtticOutside/>}/> */}
        <Route path='/serverUrlConnection' element={<ServerUrlConnection/>}/>
        <Route path='/*' element={black}/>
        {Object.keys(AppManifest).map(App => <Route key={App} path={'/test/' + App} element={AppManifest[App]}/>)}
      </Routes>
      {
        modalUtil[0] ? <ModalWindow key={modalUtil[3]} textBig={modalUtil[1]} textLittle={modalUtil[2]} OnClose={closeModal}/> : null
      }
    </BrowserRouter>
  );
}

let name = "Attician1";
let code;
let pid;

function isValidJSON(test){
  try {
      JSON.parse(test);
      return true;
  } catch (error) {
      return false;
  }
}

export { name, code, pid};
export { isValidJSON };
reportWebVitals();