import React, { ReactNode } from "react"
import Enterer from "../pages/enterer";
const Improvise = React.lazy(() => import("../games/2improvise"));
const Nerd = React.lazy(() => import("../games/nerdieverse"));
//Lazy loading is done for separate game files into multiple .js to improve loading.

interface Manifest{
    [key:string]: {
        root: ReactNode,
        text: string
    }
}

export const manifest:Manifest = {
    enterer: {
        root: <Enterer/>,
        text: "Main"
    },
    "2improvise": {
        root: <Improvise/>,
        text: "2Improvise"
    },
    nerdieverse: {
        root: <Nerd/>,
        text: "Nerdieverse"
    }
}

export function getSubApp(app:string){
    return manifest[app].root ?? <div>no such app</div>
}