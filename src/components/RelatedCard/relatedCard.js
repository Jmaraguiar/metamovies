import { CircularProgress } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { RelatedCardContainer, Score } from "./relatedCardStyle"


export const RelatedCard = (props)=>{
    const nav = useNavigate()

return (
    <RelatedCardContainer 
    img={`${props.config && props.config.base_url}w500${props.imgPath && props.imgPath}`}
    >
        <Score>
            <CircularProgress size="50px" color="success" variant="determinate" value={props.score * 10}/>
            <h3>{props.score}</h3>  
        </Score>
    </RelatedCardContainer>
)
}