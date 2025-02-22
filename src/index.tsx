import './index.css';
import React, { JSX, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import io from 'socket.io-client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Recaps, { RecapInfoView } from './ui-components/Recaps/Recaps.tsx';
import ModalWindow from './ui-components/ModalNotifs/ModalNotifs.tsx';
import { locale } from './utils/locale.ts';

//GAME IMPORTS!!! GAME ONLY
import Improvise2 from './games-shared/2improvise/2improvise.tsx';
import TestGame from './games-shared/testGame/testGame.jsx';
import EntererLoader from './ui-components/Enterer/Enterer.tsx';
import Nerdieverse from './games-shared/nerdieverse/Nerdieverse.tsx';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
if(!localStorage.getItem("locale")) localStorage.setItem("locale", await locale.getLocaleByIp());

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export const isLocalTesting = false
const serverUrl = isLocalTesting ? "http://localhost:4020" : "wss://trgu.ru"
export const socket = io(serverUrl, { transports: ['websocket', 'polling', 'flashsocket'] });

const AppManifest = {
  rc: <EntererLoader />,
  "2improvise": <Improvise2 />,
  testGame: <TestGame/>,
  nerdieverse: <Nerdieverse/>
};

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
    console.log("disconnected");
    localStorage.removeItem("code"); localStorage.removeItem("hash");
    openModal('oops', 'roomDestroyed', true)
  })

  socket.on("errorJoin", (data) => {
    openModal("ERROR_JOIN", data, false)
  })

  const init = () => {
    if(localStorage.getItem("ua_notif") === "0"){
      openModal('ua_server_trouble', 'ua_st_desc', false)
      localStorage.setItem("ua_notif", "1")
    }
  }

  useEffect(() => {
    return () => init()
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={black}/>
        <Route path='/recaps/*' element={<RecapInfoView/>}/>
        <Route path='/recaps' element={<Recaps/>}/>
        <Route path='/*' element={black}/>

        {
        Object.keys(AppManifest).map(
          App => <Route
            key={App}
            path={'/test/' + App}
            element={AppManifest[App]}
          />
        )
        }
      </Routes>
      {
        modalUtil[0] ? <ModalWindow key={modalUtil[3]} textBig={modalUtil[1]} textLittle={modalUtil[2]} OnClose={closeModal}/> : null
      }
    </BrowserRouter>
  );
}

let name:String = "Attician1";
let code:String;
function isValidJSON(test){
  try {
      JSON.parse(test);
      return true;
  } catch (error) {
      return false;
  }
}

export { name, code};
export { isValidJSON };