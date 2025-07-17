import { useEffect, useState } from "react";
import { EntererForm } from "./components/form/index";
import EntererHeader from "./components/header";
import { EntererNews } from "./components/news";
import { EntererWrapper } from "./components/page/styled";
import { EntererRecaps } from "./components/recaps";
import EntererSocials from "./components/socials";
import EntererNotFound from "./components/notFound";
import { useSearchParams } from "react-router-dom";
import packageJSON from '../../../package.json'
import { twitch } from "../../utils/twitch";
import { mem } from "../../utils/mem";

export default function Enterer(){
    const [notFound, setFoundStatus] = useState<boolean>();
    const [twitchLogined, setTwitch] = useState<boolean>(mem.twitch_token !== null);
    let [searchParams] = useSearchParams();

    useEffect(() => {
        if(searchParams.has("code") && searchParams.has("scope")){
            const c = searchParams.get("code");
            c && twitch.setLogin(c, setTwitch);
            const l = window.location.protocol + "//" + window.location.host;
            window.history.replaceState({path: l}, "", l);
        }
    }, []);

    return <EntererWrapper>
        <EntererHeader/>
        <EntererForm notFoundCallout={setFoundStatus} r={searchParams.get("r")} isTwitchLogined={twitchLogined}/>
        <EntererSocials/>
        { notFound && <EntererNotFound/> }
        <EntererNews/>
        <EntererRecaps/>
        <h1 className="version">dev-raw-v{packageJSON.version}</h1>
    </EntererWrapper>
}