import { ReactNode, useEffect, useState } from "react";
import { ws } from "../../utils/web";
import { States } from "../../utils/interfaces";
import { ImrpovisePage, Nickname } from "../2improvise/styled";

export default function Nerd(){
    const [state, setState] = useState<ReactNode>(<div></div>);

    useEffect(() => {
        ws.socket.on("task", (data) => {
            const states:States = {
            };
            setState(states[data.taskName]);
        });
    }, []);

    return <ImrpovisePage>
            {state ?? "goo"}
            <Nickname>{ws.nickname}</Nickname>
    </ImrpovisePage>
}