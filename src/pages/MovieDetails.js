import { Button, CircularProgress } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { RelatedCard } from "../components/RelatedCard/relatedCard"
import { goToMainPage } from "../router/cordinator"
import { Banner, Classificatios, Description, DetailsContainer, FogDisplay, FooterDetails, Genres, HeaderDetails, Info, ScoreDetails, SectionDetails, Trailer } from "./styles/DetailsStyle"
import { BASE_TOKEN } from "../constants/baseToken"
import { BASE_URL } from "../constants/baseURL"
import { useChangeBanner } from "../Functions/changeBanner"

export const Details = (props)=>{
    const [movie,setMovie] = useState()
    const [config, setConfig] = useState()
    const [video,setVideo] = useState()
    const [related,setRelated] = useState()
    const [banner,setBanner] = useState(0)
    const [bannerLeft,setBannerLeft] = useState()
    const [bannerRight,setBannerRight] = useState(1)
    const nav = useNavigate()
    const params = useParams()

    const ChangeBanner = (direction) => {
        const result = useChangeBanner(direction, banner, bannerLeft,bannerRight,related)

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

    const getMovie = async ()=>{
        const Headers = {
            headers: {
                "Authorization": `Bearer ${BASE_TOKEN}`
            }
        }
        await axios.get(`${BASE_URL}/movie/${params.id}?language=pt-BR`, Headers)
            .then(res => {
                setMovie(res.data)
            }).catch(error => {
                console.log(error)
            })
    }

    const getRelated = async ()=>{
        const Headers = {
            headers: {
                "Authorization": `Bearer ${BASE_TOKEN}`
            }
        }
        await axios.get(`${BASE_URL}/movie/${params.id}/recommendations?language=pt-BR`, Headers)
            .then(res => {

                setRelated(res.data.results
                            .filter((movie)=>{
                            return movie.backdrop_path != null})
                            .slice(0,10)
                          )

                setBannerLeft(res.data.results
                    .filter((movie)=>{
                    return movie.backdrop_path != null})
                    .slice(0,10).length -1
                  )
            }).catch(error => {
                console.log(error)
            })
    }

    const getVideo = async ()=>{
        const Headers = {
            headers: {
                "Authorization": `Bearer ${BASE_TOKEN}`
            }
        }
        
        if(movie){
            await axios.get(`${BASE_URL}/movie/${movie.id}/videos`, Headers)
            .then(res => {
                const video = res.data.results.filter((video)=>{
                    return video.type == "Trailer"
                })
                setVideo(video)
            }).catch(error => {
                console.log(error)
            })
        }
    }

    const relatedList = related && related.map((movie)=>{
        
        return(
            <RelatedCard
            key={movie.id}
            title={movie.title}
            config={config}
            imgPath={movie.backdrop_path}
            score={movie.vote_average}
            name={movie.title}
            />
        )
    })

    const genreList = movie && movie.genres.slice(0,3).map((genre,index)=>{
        return(
            <div
            key={genre.id}
            >
                {movie && movie.genres[index].name}
            </div>
        )
    })

    useEffect(()=>{
        getMovie()
        getConfig()
    },[])

    useEffect(()=>{
        getVideo()
        getRelated()
    },[movie])
    
return (
    <DetailsContainer img={`${config && config.base_url}original${movie && movie.backdrop_path}`}>
        <FogDisplay>
            <HeaderDetails>
                    <h1>METAMOVIES</h1>
                    <div>
                        <Button variant="contained" onClick={()=>goToMainPage(nav)}>Voltar</Button>
                    </div>
            </HeaderDetails>
            <SectionDetails>
                <Banner>
                    <img src={`${config && config.base_url}w500${movie && movie.poster_path}`}/>
                    <Description>
                        {movie && movie.overview != ""?

                        <p>{movie && movie.overview}</p>
                        :
                        <p>A descrição do filme não foi encontrada</p>
                        }
                        <Classificatios>
                            <h4>Gêneros</h4>
                            <hr/>
                            <Genres>
                                {genreList}
                            </Genres>
                        </Classificatios>
                    </Description>
                </Banner>
                <Trailer>
                {video && video[0] != undefined?
                    <iframe 
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video && video[0].key}`}
                    /> 
                :
                    <CircularProgress />
                }

                </Trailer>
                <Info>
                    <div>
                        <p>Produzida por: {movie && movie.production_companies[0].name}</p>
                        <p>País: {movie && movie.production_countries[0].name}</p>
                    </div>
                    <ScoreDetails>
                        <CircularProgress size="10vw" color="success" variant="determinate" value={movie && movie.vote_average * 10}/>
                        <h3>{movie && movie.vote_average}</h3>
                    </ScoreDetails>
                    <div>
                        <p>Data de lançamento:  {movie && movie.release_date}</p>
                    </div>
                </Info>
            </SectionDetails>
            <h2 style={{color: "white"}}>Filmes Relacionados</h2>
            <FooterDetails>
                <button onClick={()=>ChangeBanner(false)}>{"<"}</button>
                {relatedList && relatedList[bannerLeft]}
                {relatedList && relatedList[banner]}
                {relatedList && relatedList[bannerRight]}
                <button onClick={()=>ChangeBanner(true)}>{">"}</button>
            </FooterDetails>
        </FogDisplay>
        <button onClick={()=>console.log(movie)}>test</button>
    </DetailsContainer>
)
}