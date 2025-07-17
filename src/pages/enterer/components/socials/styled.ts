import styled from "styled-components";

export const EntererSocialsWrapper = styled.div`
    display: flex;
    gap: 5px;
    margin-top: 7px;
    justify-content: center;
    width: 100%;
    user-select: none;
`

export const EntererSocial = styled.a`
    cursor: pointer;
    font-weight: 100;
    font-size: clamp(.4rem, 5vw, .9rem);
    text-decoration: none;
    color: var(--main);
    &:hover{
        text-decoration: underline;
        text-underline-offset: 2px;
    }
`