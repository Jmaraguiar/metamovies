import { CircularProgress } from "@mui/material"
import { width } from "@mui/system"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { CardContainer, Score } from "./cardStyles"


export const Card = (props)=>{
    const nav = useNavigate()

    
return (
    <CardContainer imgUrl = {`${props.config && props.config.base_url}w500${props.imgPath}`}>
        <h3>{props.title}</h3>
        <Score>
        <CircularProgress size="50px" color="success" variant="determinate" value={props.score * 10}/>
        <h3>{props.score}</h3>  
        </Score>
    </CardContainer>
)
}