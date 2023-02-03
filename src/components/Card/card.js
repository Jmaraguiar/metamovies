import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { CardContainer, Score } from "./cardStyles"


export const Card = (props)=>{
    const [config, setConfig] = useState()
    const nav = useNavigate()

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

    useEffect(() => {
        getConfig()
    }, [])

    

return (
    <CardContainer imgUrl = {`${config && config.base_url}w500${props.imgPath}`}>
        <h3>{props.title}</h3>
        <Score>

        </Score>
    </CardContainer>
)
}