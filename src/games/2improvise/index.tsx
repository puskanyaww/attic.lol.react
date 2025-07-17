import { ReactNode, useEffect, useState } from "react"
import { States } from "../../utils/interfaces";
import Wait from "./components/wait";
import Lobby from "./components/lobby";
import { ws } from "../../utils/web";
import { ImrpovisePage, Nickname } from "./styled";
import Tutorial from "./components/tutorial";
import ReadyState from "./components/ready";
import Voting from "./components/voting";
import Rating from "./components/rating";

export default function Improvise(){
    const [state, setState] = useState<ReactNode>(<Wait/>);

    useEffect(() => {
        ws.socket.on("task", (data) => {
            const states:States = {
                wait: <Wait {...data.title}/>,
                lobby: <Lobby {...data.title}/>,
                skipTutorial: <Tutorial/>,
                ruaready: <ReadyState/>,
                titlevoting: <Voting {...data.title}/>,
                voting: <Rating/>
            };
            setState(states[data.taskName]);
        });
    }, []);

    return <ImrpovisePage>
            {state}
            <Nickname>{ws.nickname}</Nickname>
    </ImrpovisePage>
}