import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { BASE_TOKEN } from "../constants/baseToken"
import { BASE_URL } from "../constants/baseURL"
import { goToMainPage } from "../router/cordinator"



export const Navigate = ()=>{
const [ movies,setMovies ] = useState()
const nav = useNavigate()


const getAllMovies = async ()=> {

}

useEffect(()=>{
    getAllMovies()
},[])

    return (
        <div>
            <h1>Navegar</h1>
            <button onClick={console.log(movies)}>Voltar</button>
        </div>
    )
}