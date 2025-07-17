import styled from "styled-components";

export const RatingRange = styled.input`
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
    width: calc(100% - 60px);
    height: 40px;
    outline-offset: 2px;
    outline: 2px #fff solid;
    border-radius: 10px;
    background-color: #000000;
    &::-webkit-slider-thumb{
        appearance: none;
        height: 40px;
        width: 20px;
        border-radius: 10px;
        background-color: #fff;
        cursor: grab;
    }
`

export const RangeWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    color: #fff;
    gap: 10px;
    margin-bottom: 10px;

    div{
        width: 80px;
        display: flex;
        flex-direction: column;
    }

    div h1{
        font-size: clamp(1rem, 8vw, 4rem);
        margin: 0;
        line-height: clamp(1rem, 8vw, 2.5rem);
    }
`

export const SendButton = styled.button`
    width: 100%;
    background-color: #000;
    color: #fff;
    font-size: clamp(.8rem, 5vw, 1.3rem);
    border-radius: 10px;
    border: none;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
    margin-top: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    &:hover{
        opacity: .9;
        outline: 3px #fff solid;
    }

    &:active{
        opacity: 1;
        background-color: #fff;
        color: #000;
    }

    img{
        width: 25px;
    }
`

export const EmojiWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 10px;
    img{
        user-select: none;
        -webkit-user-drag: none;
        max-width: 75px;
        width: 15vw;
        cursor: pointer;
        &:hover{
            scale: 1.1;
        }
        &:active{
            scale: 1.05;
        }
        &[data-chosen="true"]{
            border-radius: 50%;
            outline: 5px red solid;
            outline-offset: 5px;
        }
    }
`