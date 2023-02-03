import styled from "styled-components";

export const CardContainer = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        justify-self: center;
        align-self: center;
        color: black;
        background-image: url(${props=>props.imgUrl});
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        border-radius: 5px;
        width: 100%;
        min-height: 200px;
        transition: all ease-in-out 0.15s;

        h3{
            color: white;
        }

        :hover{
            transform: scale(106%,106%);
            cursor: pointer;
        }
    `

export const Score = styled.div`
    display: flex;
    align-self: end;
    flex-direction: column;
    background-color: white;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    box-shadow: black 1px 5px 10px;
`