import { useState } from "react";
import { EntererHeaderWrapper, EntererLogo, EntererSettings } from "./styled";
import logo from "../../../../shared-assets/logo.svg";
import EntererSettingsMenu from "../settingsMenu";

export default function EntererHeader(){
    const [settingsMenu, setSettingsMenu] = useState<boolean>(false);
    return <>
        <EntererHeaderWrapper>
            <EntererLogo src={logo}/>
            <EntererSettings data-active={!settingsMenu} onClick={() => setSettingsMenu((a:boolean) => !a)}/>
        {settingsMenu && <EntererSettingsMenu/>}
        </EntererHeaderWrapper>
    </>
}