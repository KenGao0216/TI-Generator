import React, { useContext } from 'react'
import {motion} from "motion/react"
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {

  const {user, setShowLogin} = useContext(AppContext)
  const navigate = useNavigate()

  const onClickHandler = ()=>{
      if(user){
          navigate('/result')
      }
      else{
        setShowLogin(true)
      }
  }

  return (
    <motion.div className = 'flex flex-col justify-center items-center text-center my-20'
    initial ={{opacity:0.2, y:100}}
    transition = {{duration: 1}}
    whileInView = {{opacity:1, y:0}}
    viewport = {{once:true}}
    >
    <motion.div className = 'text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-netural-500'
     initial ={{opacity:0, y:-20}}
     animate = {{opacity:1, y:0}}
     transition = {{delay: 0.2, duration: 0.8}}
     viewport = {{once:true}}
     >
        <p> TI Generator </p>
    </motion.div>
    <h1 className = 'text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center'> Turn text to image!</h1>
    <p className = 'text-center max-w-xl mx-auto mt-5'> Show your imagination with AI with just a click of a button! </p>

    <button onClick = {onClickHandler} className = 'sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex item-center gap-2 rounded-full'> Generate Images </button>
    </motion.div>
  )
}

export default Header
