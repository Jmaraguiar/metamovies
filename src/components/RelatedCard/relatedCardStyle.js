import styled from "styled-components"


export const RelatedCardContainer = styled.div`
height: 170px;
width: 300px;
background-image: url(${props=>props.img});
background-repeat: no-repeat;
background-size: contain;
border-radius: 5px;
transition: all ease-in-out 0.15s;

h2{
    color: white;
}

:hover{
    cursor: pointer;
    transform: scale(105%,105%);
}
`

export const Score = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: end;
    flex-direction: column;
    background-color: white;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    margin-right: 5px ;
    margin-bottom:5px;
    box-shadow: black 1px 5px 10px;

    h3{
        background-color: transparent;
        color: black;
        position: absolute;
    }


    
`