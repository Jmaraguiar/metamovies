import { CircularProgress } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { RelatedCard } from "../components/RelatedCard/relatedCard"
import { goToMainPage } from "../router/cordinator"
import { Banner, Classificatios, Description, DetailsContainer, FogDisplay, FooterDetails, Genres, HeaderDetails, Info, SectionDetails, Trailer } from "./styles/DetailsStyle"


export const Details = (props)=>{
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2YxZjk1MTdhM2I3YmVmNjNlYjE1YWYxMjIyYzQ2ZCIsInN1YiI6IjYyZDcwN2IwY2FhNTA4MDA0YzQ3YTM1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yuLQlgWELJrenepPsUp46EbeCEybz2QpMtqlFSGRLN4"
    const [movie,setMovie] = useState()
    const [config, setConfig] = useState()
    const [video,setVideo] = useState()
    const [related,setRelated] = useState()
    const nav = useNavigate()
    const params = useParams()


    const getConfig = async () => {

        const Headers = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        await axios.get(`https://api.themoviedb.org/3/configuration`, Headers)
            .then(res => {
                setConfig(res.data.images)
            }).catch(error => {
                console.log(error)
            })
    }

    const getMovie = async ()=>{
        const Headers = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        await axios.get(`https://api.themoviedb.org/3/movie/${params.id}?language=pt-BR`, Headers)
            .then(res => {
                setMovie(res.data)
            }).catch(error => {
                console.log(error)
            })
    }

    const getRelated = async ()=>{
        const Headers = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        await axios.get(`https://api.themoviedb.org/3/movie/${params.id}/recommendations?language=pt-BR`, Headers)
            .then(res => {
                setRelated(res.data.results)
            }).catch(error => {
                console.log(error)
            })
    }

    const getVideo = async ()=>{
        const Headers = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        
        if(movie){
            await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos`, Headers)
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

    const relatedList = related && related.slice(0,10).map((movie)=>{
        return(
            <RelatedCard
            key={movie.id}
            title={movie.title}
            config={config}
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
                    <h1>LOGO</h1>
                    <div>
                        <button onClick={()=>goToMainPage(nav)}>back</button>
                        <button onClick={()=>console.log(movie)}>test</button>
                    </div>
            </HeaderDetails>
            <SectionDetails>
                <Banner>
                    <img src={`${config && config.base_url}w500${movie && movie.poster_path}`}/>
                    <Description>
                        <p>{movie && movie.overview}</p>
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
                    <h1>info</h1>
                </Info>
            </SectionDetails>
            <FooterDetails>
                {relatedList}
            </FooterDetails>
        </FogDisplay>
    </DetailsContainer>
)
}