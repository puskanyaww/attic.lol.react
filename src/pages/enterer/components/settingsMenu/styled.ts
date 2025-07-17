import styled from "styled-components";

export const SettingsMenuWrapper = styled.div`
    position: absolute;
    align-items: center;
    box-sizing: border-box;
    background-color: var(--sbg);
    width: 100%;
    border-radius: 0 0 10px 10px;
    padding-top: 26px;
    margin-top: 41px;
    display: flex;
    justify-content: space-between;
    left: 0;
    z-index: -1;
    flex-direction: column;
    top: 0;
    overflow: hidden;
    *{
        text-decoration: none;
        color: var(--main);
        width: 100%;
        box-sizing: border-box;
        padding: 5px 22px;
        height: 55px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: clamp(.7rem, 5vw, 1rem);
        font-family: TildaSans;
        cursor: pointer;
        &:hover{
            background-color: #ffffff10;
        }
    }
`

export const SettingsLink = styled.a`

`

export const SettingsCallable = styled.button`
    background-color: transparent;
    border: none;
`