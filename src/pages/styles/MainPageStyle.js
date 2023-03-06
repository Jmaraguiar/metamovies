import styled from "styled-components";
import img2 from "../../data/img/moviesBackground.webp"

export const Container = styled.div`

`

export const BlackFog = styled.div`
    display: flex;
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.7);
    max-width: 100vw;
    height: 100vh;
    color: white;

    h1{
        max-width: 100vw;
    }
`
export const BackgroundMainPage = styled.div`
    background: url(${img2});
    max-width: 100vw;
    height: 100vh;
`

export const HeaderMainPage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    color: white;
    height: 100vh;
    max-width: 100vw;
`

export const HeaderTop = styled.div`
    margin: 0;
    position: relative;
    top: -60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    display: flex;
    align-items: center;
    height: 80px;
    width: 100%;
`

export const HeaderBottom = styled.div`
    margin: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    display: flex;
    align-items: center;
    height: 80px;
    width: 100%;

    div{
        display: flex;
        flex-direction: column;
        align-items: center;

        a{
            margin-top: 10px;
        }
    }

    img{
        height: 100px;
    }
`

export const Logo = styled.h1`
    margin: 0px;
    margin-left: 20px;
`

export const Menu = styled.ol`
    list-style: none;
    display: flex;
    gap: 10px;
    margin-right: 50px;
`

export const MainTitle = styled.div`
    
`

export const SectionTopTen = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 85vh;
    background-color: ${props=>props.color? props.color : "none"};
`

export const SectionMovies = styled.div`
    display: grid;
    gap: 15px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    max-width: 100vw;
    background-color: black;
    padding: 30px;
`

export const Display = styled.div`
    height: 400px;
    width: 700px;
    background-color: transparent;
    border-radius: 10px;

    iframe{
        border: none;
        border-radius: 10px;
    }
`

export const NavLeft = styled.div`
    height: 360px;
    width: 200px;
    margin-left: 10px;
    border-radius: 5px;
    background: url(${props=>props.img});
    background-size: cover;
    background-position: center;
    transition: all ease-in-out 0.15s;

    :hover{
        cursor: pointer;
        transform: scale(105%,105%)  translateX(5px);
    }
`

export const NavRight = styled.button`
    height: 360px;
    width: 200px;
    margin-right: 10px;
    border-radius: 5px;
    background: url(${props=>props.img});
    background-size: cover;
    background-position: center;
    transition: all ease-in-out 0.15s;

    :hover{
        cursor: pointer;
        transform: scale(105%,105%)  translateX(-5px);
    }
`

export const NoVideo = styled.div`
    display: flex;
    color: white;
    border-radius: 10px;
    border: solid white 1px;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`

export const Pag = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: black;
   height: 40px;
   width: 100%;
   padding-bottom: 30px;
`

export const Index = styled.div`
    color: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100px;

    .arrow{
        cursor: pointer;
        transition: all ease-in-out 0.15s;

        :hover{
            transform: scale(115%,115%);
        }
    }

    h3{
        margin-left: 70px;
        margin-right: 70px;
    }
    
`

export const FooterMainPage = styled.div`
    height: 17vh;
    background-color: rgb(70, 69, 69);
    color: white;

    p{
        display: flex;
        gap: 5px;
        align-items: center;
        margin: 0px;
        margin-bottom: 15px;
        margin-left: 20px;

        :hover{
            cursor: pointer;
        }

        img{
            height: 20px;
        }
    }

    h4{
        margin: 0px;
        margin-left: 10px;
        margin-bottom: 15px;
    }
`