import styled from "styled-components";
// import img1 from "../../data/cinema.jpg"
import img2 from "../../data/moviesBackground.webp"

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
    justify-content: center;
    align-items: center;
    height: 85vh;
    background-color: ${props=>props.color? props.color : "none"};
`

export const SectionMovies = styled.div`
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    max-width: 100vw;
    background-image: url(${props=>props.backgroundImage});
    margin: 10px;
`

export const Display = styled.div`
    height: 400px;
    width: 700px;
    background-color: blue;
`

export const FooterMainPage = styled.div`
    height: 15vh;
    background-color: rgb(70, 69, 69);
`