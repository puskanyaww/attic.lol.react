import styled from "styled-components";

export const ImproviseDarkButton = styled.button`
    width: 100%;
    background-color: #000;
    color: #fff;
    font-size: clamp(.8rem, 5vw, 1.3rem);
    border-radius: 5px;
    border: none;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
    margin-top: 7px;

    &:hover{
        opacity: .9;
        outline: 3px #fff solid;
    }

    &:active{
        opacity: 1;
        background-color: #fff;
        color: #000;
    }
`