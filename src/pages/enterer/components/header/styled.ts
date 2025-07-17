import styled from "styled-components";

export const EntererHeaderWrapper = styled.header`
    align-items: center;
    background-color: var(--sbg);
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    padding: 5px 20px;
    position: relative;
    z-index: 99;
    height: 50px;
`

export const EntererSettings = styled.button`
    background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI4LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9ItCh0LvQvtC5XzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAyNTYgMjU2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNTYgMjU2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0ZGRkJGNDt9Cjwvc3R5bGU+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yMTIuMiwxMDMuNWwtOC41LTYuOWMtNC42LTMuNy03LjUtOS4xLTguMS0xNC45bC0xLjEtMTAuOGMtMS4zLTEyLjEtMTIuMi0yMS0yNC4zLTE5LjdsLTEwLjgsMS4xCgljLTUuOCwwLjYtMTEuNi0xLjEtMTYuMi00LjhsLTguNS02LjljLTkuNS03LjctMjMuNC02LjMtMzEuMSwzLjJsLTYuOSw4LjVjLTMuNyw0LjYtOS4xLDcuNS0xNC45LDguMWwtMTAuOCwxLjEKCWMtMTIuMSwxLjMtMjEsMTIuMi0xOS43LDI0LjNsMS4xLDEwLjhjMC42LDUuOC0xLjEsMTEuNi00LjgsMTYuMmwtNi45LDguNWMtNy43LDkuNS02LjMsMjMuNCwzLjIsMzEuMWw4LjUsNi45CgljNC42LDMuNyw3LjUsOS4xLDguMSwxNC45bDEuMSwxMC44YzEuMywxMi4xLDEyLjIsMjEsMjQuMywxOS43bDEwLjgtMS4xYzUuOC0wLjYsMTEuNiwxLjEsMTYuMiw0LjhsOC41LDYuOQoJYzkuNSw3LjcsMjMuNCw2LjMsMzEuMS0zLjJsNi45LTguNWMzLjctNC42LDkuMS03LjUsMTQuOS04LjFsMTAuOC0xLjFjMTIuMS0xLjIsMjEtMTIuMSwxOS43LTI0LjNsLTEuMS0xMC44CgljLTAuNi01LjgsMS4xLTExLjYsNC44LTE2LjJsNi45LTguNUMyMjMuMSwxMjUuMSwyMjEuNywxMTEuMiwyMTIuMiwxMDMuNXogTTE2Mi43LDE2Mi43Yy0xOC45LDE4LjktNDkuNiwxOC45LTY4LjYsMAoJcy0xOC45LTQ5LjYsMC02OC42czQ5LjYtMTguOSw2OC42LDBTMTgxLjcsMTQzLjgsMTYyLjcsMTYyLjd6Ii8+Cjwvc3ZnPgo=");
    aspect-ratio: 1/1;
    height: 100%;
    cursor: pointer;
    background-color: transparent;
    border-radius: 50%;
    border: none;
    rotate: 180deg;
    transition: rotate .5s ease;
    -webkit-user-drag: none;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    -webkit-tap-highlight-color: transparent;
    &[data-active="true"]{
        rotate: 0deg;
    }
`

export const EntererLogo = styled.img`
    max-height: 45px;
`