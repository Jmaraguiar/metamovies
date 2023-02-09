import { CircularProgress } from "@mui/material"
import { CardContainer, Score } from "./cardStyles"
import image from '../../data/cinema.jpg'
import { goToDetailPage } from "../../router/cordinator"
import { useNavigate } from "react-router-dom"


export const Card = (props)=>{
    const nav = useNavigate()
return (
    <CardContainer
     onClick={()=>goToDetailPage(nav,props.id)}
     imgUrl = {`${props.config && props.config.base_url}w500${props.imgPath}`}
     >
        <h3>{props.title}</h3>
        <Score>
        <CircularProgress size="50px" color="success" variant="determinate" value={props.score * 10}/>
        <h3>{props.score}</h3>  
        </Score>
    </CardContainer>
)
}