import {createContext, useEffect, useState} from "react"
import { toast } from "react-toastify";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const AppContext = createContext()

const AppContextProvider = (props)=> {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false)
    const [token, setToken] = useState(localStorage.getItem('token'))

    const [coin, setCoin] = useState(false)


    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const navigate = useNavigate()

    const loadCoinsData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/user/coins', {headers: {token}})
            if(data.success){
                setCoin(data.coins)
                setUser(data.user)
                
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    
    const generateImage = async (prompt) => {
        try {
            const {data} = await axios.post(backendUrl + '/api/image/generate-image', {prompt}, {headers: {token}})
            if(data.success){
                loadCoinsData()
                return data.resultImage
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            loadCoinsData()
            if(data.coinBalance === 0){
                navigate('/buy')
            }
        }
    }

    const logout = ()=> {
        localStorage.removeItem('token')
        setToken('')
        setUser(null)
    }

    useEffect(()=> {
        if(token){
            loadCoinsData()
        }
    }, [token])

    const value = {
        user, setUser, showLogin, setShowLogin, backendUrl, token, setToken, coin, setCoin, loadCoinsData, logout, generateImage
    }
        return (
            <AppContext.Provider value = {value}> 
            {props.children}
            </AppContext.Provider>
        )
}

export default AppContextProvider