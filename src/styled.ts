import { createGlobalStyle } from "styled-components";
import black from "./shared-assets/fonts/TildaSans-Black.woff";
import light from "./shared-assets/fonts/TildaSans-Light.woff";
import regular from "./shared-assets/fonts/TildaSans-Regular.woff";
import medium from "./shared-assets/fonts/TildaSans-Medium.woff";

export const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: TildaSans;
        src: url(${light});
        font-weight: 100;
    }

    @font-face {
        font-family: TildaSans;
        src: url(${regular});
        font-weight: 300;
    }
    
    @font-face {
        font-family: TildaSans;
        src: url(${black});
        font-weight: 700;
    }
    
    @font-face {
        font-family: TildaSans;
        src: url(${medium});
        font-weight: 500;
    }

    :root{
        --main: #e3dfd7;
        --dark: #d5d2cc;
        --darker: #787673;
        --bg: #111;
        --sbg: #181818;
        --form-bg: #131313;
    }

    body{
        display: block;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        background-color: var(--bg);
    }

    #root{
        display: block;
        box-sizing: border-box;
        background-color: var(--bg);
        min-width: 100%;
        min-height: 100vh;
        font-family: TildaSans;
    }

    *:focus{
        outline: none;
    }

    .version{
        position: fixed;
        opacity: .3;
        bottom: 0;
        text-align: center;
        width: 100%;
        left: 0;
        font-size: 20px;
        user-select: none;
    }
`