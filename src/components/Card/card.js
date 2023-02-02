import { useNavigate } from "react-router-dom"
import { CardContainer } from "./cardStyles"


export const Card = (props)=>{
    const nav = useNavigate()

return (
    <CardContainer>
        <p>{props.title}</p>
    </CardContainer>
)
}