import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getSubApp } from "./utils/manifest";
import { ReactNode, useEffect, useState } from "react";
import { ws } from "./utils/web";
import ModalNotification from "./shared/components/modal";
import i18n from "./utils/i18n";
import { useTranslation } from "react-i18next";

function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>}/>
            </Routes>
        </BrowserRouter>
    );
}

function Main(){
    const [app, setApp] = useState<ReactNode>(getSubApp("enterer"));
    const [modal, setModal] = useState<ReactNode | null>(null);
    const { t } = useTranslation();

    const callModal = (title:string, summary:string, buttonText:string, isReload:boolean = false) => {
        setModal(
            <ModalNotification
                title={title}
                summary={summary}
                buttonText={buttonText}
                closeFN={setModal}
                isReload={isReload}
            />
        );
    }

    useEffect(() => {
        ws.socket.on("youJoined", data => {
            setApp(getSubApp(data.gameName));
            i18n.changeLanguage(data.roomLocale);
        });

        ws.socket.on("disconnectRoom", () => callModal(t("disconnected"), t("room_destroyed"), t("ok_modal"), true));
        ws.socket.on("errorJoin", error => callModal(t("join_error"), t(error.toLowerCase()), t("ok_modal")));
    }, []);

    return <>
        {app}
        {modal}
    </>;
}

export default App
