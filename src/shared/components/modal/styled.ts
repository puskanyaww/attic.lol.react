import styled from "styled-components";

export const ModalWrapper = styled.div`
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #00000090;
    align-items: center;
    justify-content: center;
    z-index: 99;
`

export const ModalWindow = styled.div`
    box-sizing: border-box;
    padding: 20px;
    border: 2px var(--main) solid;
    border-radius: 15px;
    color: var(--main);
    background-color: var(--bg);
    min-width: 500px;
    h1, p{
        margin: 0;
    }
`

export const ModalButton = styled.button`
    margin-top: 15px;
    width: 100%;
    border-radius: 10px;
    background-color: var(--main);
    border: none;
    color: var(--bg);
    text-align: left;
    height: 35px;
    cursor: pointer;
    font-size: clamp(.7rem, 5vw, 1rem);
    font-family: TildaSans;
    &:hover{
        opacity: .8
    }
`