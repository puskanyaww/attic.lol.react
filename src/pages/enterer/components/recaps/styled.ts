import styled from "styled-components";

export const EntererRecapsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: right;
    h1{
        font-size: clamp(0.7rem, 6.5vw, 2rem);
        margin: 0;
    }
`

export const RecapsContent = styled.div`
    aspect-ratio: 16 / 9;
    width: 100%;
    border-radius: 10px;
    background-color: #ffffff10;
`