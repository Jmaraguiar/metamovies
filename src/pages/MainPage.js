import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { BackgroundMainPage, BlackFog, Container, Display, FooterMainPage, HeaderBottom, HeaderMainPage, HeaderTop, Logo, MainTitle, Menu, NavLeft, NavRight, NoVideo, SectionMainPage, SectionMovies, SectionTopTen } from "./styles/MainPageStyle"
import { Card } from "../components/Card/card"

export const MainPage = (props)=>{
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2YxZjk1MTdhM2I3YmVmNjNlYjE1YWYxMjIyYzQ2ZCIsInN1YiI6IjYyZDcwN2IwY2FhNTA4MDA0YzQ3YTM1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yuLQlgWELJrenepPsUp46EbeCEybz2QpMtqlFSGRLN4"
    const [movies,setMovies] = useState()
    const [banner,setBanner] = useState(0)
    const [bannerLeft,setBannerLeft] = useState(9)
    const [bannerRight,setBannerRight] = useState(1)
    const [videoBanner,setVideoBanner] = useState()
    const [config, setConfig] = useState()
    const nav = useNavigate()

    const ChangeBanner = (direction)=> {
        let num = banner
        let numLeft = bannerLeft
        let numRight = bannerRight

        if (direction == true) {
            num++
            numLeft++
            numRight++
        }
        else {
            num--
            numLeft--
            numRight--
        }

        if (num >= 10){
            num = 0
        }else if (num <= -1){
            num = 9
        }

        if (numLeft >= 10){
            numLeft = 0
        }else if (numLeft <= -1){
            numLeft = 9
        }

        if (numRight >= 10){
            numRight = 0
        }else if (numRight <= -1){
            numRight = 9
        }

        setBanner(num)
        setBannerLeft(numLeft)
        setBannerRight(numRight)

    }

    const getConfig = async () => {

        const Headers = {
            headers: {
                "Authorization": `Bearer ${props.token}`
            }
        }

        await axios.get(`https://api.themoviedb.org/3/configuration`, Headers)
            .then(res => {
                setConfig(res.data.images)
            }).catch(error => {
                console.log(error)
            })
    }

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

    const getVideoBanner = async ()=>{
        const Headers = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        
        if(movies){
            await axios.get(`https://api.themoviedb.org/3/movie/${movies[banner].id}/videos`, Headers)
            .then(res => {
                const video = res.data.results.filter((video)=>{
                    return video.type == "Trailer"
                })
                setVideoBanner(video)
            }).catch(error => {
                console.log(error)
            })
        }
    }

    useEffect(() => {
        getMovies()
        getConfig()
    }, [])

    useEffect(() => {
        if(movies){
            getVideoBanner()
        }
    }, [movies])


    useEffect(() => {
        getVideoBanner()
    }, [banner])

    const moviesList = movies && movies.map((movie)=>{
        return(
            <Card
            config = {config}
            score = {movie.vote_average}
            imgPath = {movie.backdrop_path}
            token = {token}
            vote = {movie.vote_average}
            id = {movie.id}
            title = {movie.title}
            key = {movie.id}
            />
        )
    })

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
                <NavLeft
                img = {`${config && config.base_url}w500${movies && movies[bannerLeft].poster_path}`}
                onClick={()=> ChangeBanner(false)}
                 >
                    
                </NavLeft>       
                <Display>

                    {videoBanner && videoBanner[0] === undefined? 
                    <NoVideo>
                        <h1>Sem Trailer</h1>
                    </NoVideo>
                    :
                    <iframe 
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoBanner && videoBanner[0].key}`}
                    frameBorder='0'
                    allowfullscreen
                    />
                    }

                </Display>
                <NavRight
                img = {`${config && config.base_url}w500${movies && movies[bannerRight].poster_path}`}
                onClick={()=> ChangeBanner(true)}
                >
                    
                </NavRight>
        </SectionTopTen>

        <SectionMovies>       
                {moviesList}
        </SectionMovies>

        <FooterMainPage>

        </FooterMainPage>
    </Container>
    
    
    

)
}
