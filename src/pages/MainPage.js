import { useEffect, useState } from "react"
import axios from 'axios'
import { BackgroundMainPage, BlackFog, Container, Display, FooterMainPage, HeaderBottom, HeaderMainPage, HeaderTop, Index, Logo, MainTitle, Menu, NavLeft, NavRight, NoVideo, Pag, SectionMainPage, SectionMovies, SectionTopTen } from "./styles/MainPageStyle"
import { Card } from "../components/Card/card"
import { Button } from "@mui/material"
import { useChangeBanner } from "../Functions/changeBanner"
import { useChangeIndex } from "../Functions/changeIndex"
import { BASE_TOKEN } from "../constants/baseToken"
import { BASE_URL } from "../constants/baseURL"
import { goToNavigate } from "../router/cordinator"
import { useNavigate } from "react-router-dom"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FaceIcon from "../data/icons/facebook.png"
import YouTubeIcon from "../data/icons/youtube.png"
import InstaIcon from "../data/icons/instagram.png"
import GitIcon from "../data/icons/github.png"
import LinkedInIcon from "../data/icons/linkedin.png"


export const MainPage = (props) => {
    const [movies, setMovies] = useState()
    const [banner, setBanner] = useState(0)
    const [topTen, setTopTen] = useState()
    const [bannerLeft, setBannerLeft] = useState()
    const [bannerRight, setBannerRight] = useState(1)
    const [index, setIndex] = useState(1)
    const [videoBanner, setVideoBanner] = useState()
    const [config, setConfig] = useState()
    const nav = useNavigate()

    const ChangeIndex = (direction) => {
        const result = useChangeIndex(direction, index)
        setIndex(result)
    }

    const ChangeBanner = (direction) => {
        const result = useChangeBanner(direction, banner, bannerLeft,bannerRight,topTen)

        setBanner(result.banner)
        setBannerLeft(result.left)
        setBannerRight(result.right)
    }

    const getConfig = async () => {

        const Headers = {
            headers: {
                "Authorization": `Bearer ${BASE_TOKEN}`
            }
        }

        await axios.get(`${BASE_URL}/configuration`, Headers)
            .then(res => {
                setConfig(res.data.images)
            }).catch(error => {
                console.log(error)
            })
    }



    const getMovies = async () => {
        const Headers = {
            headers: {
                "Authorization": `Bearer ${BASE_TOKEN}`
            }
        }
        await axios.get(`${BASE_URL}/movie/popular?language=pt-BR&page=${index}`, Headers)
            .then(res => {
                setMovies(res.data.results)
            }).catch(error => {
                console.log(error)
            })
    }

    const getTopTen = async () => {
        const Headers = {
            headers: {
                "Authorization": `Bearer ${BASE_TOKEN}`
            }
        }
        await axios.get(`${BASE_URL}/movie/now_playing?language=pt-BR&page=${1}`, Headers)
            .then(res => {
                setTopTen(res.data.results.slice(0, 10))
                setBannerLeft(res.data.results.slice(0, 10).length -1)
            }).catch(error => {
                console.log(error)
            })
    }

    const getVideoBanner = async () => {
        const Headers = {
            headers: {
                "Authorization": `Bearer ${BASE_TOKEN}`
            }
        }

        if (movies) {
            await axios.get(`${BASE_URL}/movie/${topTen[banner].id}/videos`, Headers)
                .then(res => {
                    const video = res.data.results.filter((video) => {
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
        getTopTen()
    }, [])

    useEffect(() => {
        getMovies()
    }, [index])

    useEffect(() => {
        if (movies) {
            getVideoBanner()
        }
    }, [movies])


    useEffect(() => {
        getVideoBanner()
    }, [banner])

    const moviesList = movies && movies.map((movie) => {
        return (
            <Card
                config={config}
                score={movie.vote_average}
                imgPath={movie.backdrop_path}
                vote={movie.vote_average}
                id={movie.id}
                title={movie.title}
                key={movie.id}
            />
        )
    })

    return (
        <Container>
            <BackgroundMainPage>
                <BlackFog>
                    <HeaderMainPage>
                        <HeaderTop>
                            <Logo>METAMOVIES</Logo>
                        </HeaderTop>
                        <MainTitle>
                            <h1> OS MELHORES FILMES DA ATUALIDADE </h1>
                        </MainTitle>
                        <HeaderBottom>
                            <div>
                                <img src={FaceIcon}/>
                                <a>@MetamoviesOFC</a>
                            </div>
                            <div>
                                <img src={YouTubeIcon}/>
                                <a>@Metamoovies</a>
                            </div>
                            <div>
                                <img src={InstaIcon}/>
                                <a>@Meta_movies</a>
                            </div>
                        </HeaderBottom>
                    </HeaderMainPage>
                </BlackFog>
            </BackgroundMainPage>
            <SectionTopTen color="black">
                <NavLeft
                    img={`${config && config.base_url}w500${topTen && topTen[bannerLeft].poster_path}`}
                    onClick={() => ChangeBanner(false)}
                >

                </NavLeft>
                <Display>

                    {videoBanner && videoBanner[0] === undefined ?
                        <NoVideo>
                            <h1>Sem Trailer</h1>
                        </NoVideo>
                        :
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${videoBanner && videoBanner[0].key}`}
                        />
                    }

                </Display>
                <NavRight
                    img={`${config && config.base_url}w500${topTen && topTen[bannerRight].poster_path}`}
                    onClick={() => ChangeBanner(true)}
                >

                </NavRight>
            </SectionTopTen>

            <SectionMovies>
                {moviesList}
            </SectionMovies>
            <Pag>
                <Index>
                    <ArrowBackIosIcon className="arrow" onClick={() => ChangeIndex(false)}/>
                    <h3>{index}</h3>
                    <ArrowForwardIosIcon className="arrow" onClick={() => ChangeIndex(true)}/>
                </Index>
            </Pag>

            <FooterMainPage>
                <h4>© 2023 João Marcos Alves de Aguiar</h4>
                <p><img src={LinkedInIcon}/>Linkedin</p>
                <p><img src={GitIcon}/>GitHub</p>
            </FooterMainPage>
        </Container>

    )
}
