import styled from "styled-components";

export const ImproviseButton = styled.button`
    width: 100%;
    background-color: var(--gameMain);
    color: var(--gameAlt);
    font-size: clamp(.8rem, 5vw, 1.3rem);
    border-radius: 10px;
    border: none;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;

    &:hover{
        opacity: .9;
    }

    &:active{
        opacity: 1;
        background-color: var(--gameAlt);
        color: var(--gameMain);
    }
`