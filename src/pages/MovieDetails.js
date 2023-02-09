import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { goToMainPage } from "../router/cordinator"
import { Banner, Description, DetailsContainer, FogDisplay, FooterDetails, HeaderDetails, Info, SectionDetails, Trailer } from "./styles/DetailsStyle"


export const Details = (props)=>{
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2YxZjk1MTdhM2I3YmVmNjNlYjE1YWYxMjIyYzQ2ZCIsInN1YiI6IjYyZDcwN2IwY2FhNTA4MDA0YzQ3YTM1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yuLQlgWELJrenepPsUp46EbeCEybz2QpMtqlFSGRLN4"
    const [movie,setMovie] = useState()
    const [config, setConfig] = useState()
    const [video,setVideo] = useState()
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
        await axios.get(`https://api.themoviedb.org/3/movie/${params.id}`, Headers)
            .then(res => {
                setMovie(res.data)
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

    useEffect(()=>{
        getMovie()
        getConfig()
    },[])

    useEffect(()=>{
        getVideo()
    },[movie])
    
return (
    <DetailsContainer img={`${config && config.base_url}original${movie && movie.backdrop_path}`}>
        <FogDisplay>
            <HeaderDetails>
                    <h1>LOGO</h1>
                    <div>
                        <button onClick={()=>goToMainPage(nav)}>back</button>
                        <button onClick={()=>console.log(movie,config)}>test</button>
                    </div>
            </HeaderDetails>
            <SectionDetails>
                <Banner>
                    <img src={`${config && config.base_url}w500${movie && movie.poster_path}`}/>
                    <Description>
                        <p>{movie && movie.overview}</p>
                    </Description>
                </Banner>
                <Trailer>
                <iframe 
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video && video[0].key}`}
                    />
                </Trailer>
                <Info>
                    <h1>info</h1>
                </Info>
            </SectionDetails>
            <FooterDetails>
            
            </FooterDetails>
        </FogDisplay>
    </DetailsContainer>
)
}