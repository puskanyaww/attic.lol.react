import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    gap: 7px;
    flex-direction: column;
    margin-top: 7px;
    text-align: left;
    *{
        min-height: 50px;
        border-radius: 10px;
        padding: 10px 20px;
        font-size: clamp(.7rem, 5vw, 1rem);
        box-sizing: border-box;
        font-family: TildaSans;
        letter-spacing: -0.5px;
    }
`

export const EntererInput = styled.input`
    background-color: transparent;
    border: 3px var(--main) solid;
    font-family: TildaSans;
    font-weight: 700;
    color: var(--main);
    background-color: var(--form-bg);
    &[data-twitch="true"]{
        border-color: #6034b2;
        pointer-events: none;
        user-select: none;
    }
`

export const EntererButton = styled.button`
    cursor: pointer;
    text-align: left;
    background-color: var(--main);
    color: var(--sbg);
    font-weight: 500;
    border: none;
    &:disabled{
        opacity: .4;
    }
`

export const TermsLabel = styled.span`
    text-align: center;
    font-weight: 200;
    min-height: 10px;
    padding: 5px;
    a{
        padding: 0;
        text-decoration: underline;
        cursor: pointer;
    }
`