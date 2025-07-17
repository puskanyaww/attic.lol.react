import styled from "styled-components";
import main from "../../assets/scenes/main.jpg";
import elevator from "../../assets/scenes/elevator.jpg";
import gravy from "../../assets/scenes/gravy.jpg";
import rap from "../../assets/scenes/rap.jpg";
import soulsFate from "../../assets/scenes/soulsFate.jpg";

export const GroupGrid = styled.div`
    display: grid;
    width: 100%;
    aspect-ratio: 9/5;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
    grid-gap: 10px;
    margin: 10px 0;

    .elevator{
        background-image: url(${elevator});
    }
    .gravy{
        background-image: url(${gravy});
    }
    .rap{
        background-image: url(${rap});
    }
    .soulsFate{
        background-image: url(${soulsFate});
    }
`

export const GroupEl = styled.button`
    background-size: cover;
    border-radius: 10px;
    background-image: url(${main});
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    &[data-chosen="true"]{
        outline: 2px #fff solid;
        outline-offset: 4px;
    }

    &:hover{
        filter: brightness(0.8);
    }
`