import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { goToSignUpPage } from "../router/cordinator"
import img1 from "../data/cinema.jpg"
import axios from 'axios'
import { BackgroundMainPage, BlackFog, Container, Display, FooterMainPage, HeaderBottom, HeaderMainPage, HeaderTop, Logo, MainTitle, Menu, SectionMainPage, SectionMovies, SectionTopTen } from "./styles/MainPageStyle"
import { Card } from "../components/Card/card"

export const MainPage = (props)=>{
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2YxZjk1MTdhM2I3YmVmNjNlYjE1YWYxMjIyYzQ2ZCIsInN1YiI6IjYyZDcwN2IwY2FhNTA4MDA0YzQ3YTM1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yuLQlgWELJrenepPsUp46EbeCEybz2QpMtqlFSGRLN4"
    const [movies,setMovies] = useState()
    const [videoTest,setVideoTest] = useState()
    const nav = useNavigate()

    const getMovies = async ()=>{
        const Headers = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        await axios.get(`https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=${1}`, Headers)
            .then(res => {
                setMovies(res.data.results)
            }).catch(error => {
                console.log(error)
            })
    }

    const getVideoTest = async ()=>{
        const Headers = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        await axios.get(`https://api.themoviedb.org/3/movie/315162/watch/providers`, Headers)
            .then(res => {
                setVideoTest(res.data.results)
            }).catch(error => {
                console.log(error)
            })
    }

    const moviesList = movies && movies.map((movie)=>{
        return(
            <Card
            imgPath = {movie.backdrop_path}
            token = {token}
            vote = {movie.vote_average}
            id = {movie.id}
            title = {movie.title}
            key = {movie.id}
            />
        )
    })

    useEffect(() => {
        getMovies()
    }, [])

    useEffect(() => {
        getVideoTest()
    }, [movies])

return (
    <Container>
        <BackgroundMainPage>
            <BlackFog>
                <HeaderMainPage>
                    <HeaderTop>
                        <Logo>LOGO</Logo>
                        <Menu>
                            <button onClick={()=>{console.log(movies)}}>Navegar</button>
                        </Menu>
                    </HeaderTop>
                    <MainTitle>
                        <h1> OS MELHORES FILMES DA ATUALIDADE </h1>
                    </MainTitle>
                    <HeaderBottom>
                            <h1>Item 1</h1>
                            <h1>Item 2</h1>
                            <h1>Item 3</h1>
                    </HeaderBottom>
                </HeaderMainPage>
            </BlackFog>
        </BackgroundMainPage>
        <SectionTopTen color="black">       
                <Display>
                    <h1>Top 10 filmes</h1>
                </Display>
        </SectionTopTen>

        <SectionMovies>       
                {moviesList}
        </SectionMovies>

        <FooterMainPage>

        </FooterMainPage>
    </Container>
    
    
    

)
}
