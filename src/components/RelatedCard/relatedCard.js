import { useNavigate } from "react-router-dom"
import { RelatedCardContainer } from "./relatedCardStyle"


export const RelatedCard = (props)=>{
    const nav = useNavigate()

return (
    <RelatedCardContainer>
        <p>{props.title}</p>
    </RelatedCardContainer>
)
}