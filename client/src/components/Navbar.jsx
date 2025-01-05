import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {assets} from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
    
  const {user, setShowLogin, logout, coin} = useContext(AppContext)
  
  const navigate = useNavigate()

  return (
    <div className = 'flex items-center justify-between py-4'>
      {
      user ? 
      <div className='flex items-center justify-end gap-2 sm:gap-5 w-full'>
        <button onClick = {()=> navigate('/buy')} className = 'bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700'>
          <p>Coins: {coin}</p>
        </button>
        <p>{user.name}</p>
        <div className = 'relative group'>
         <img src = {assets.profile_icon} className = 'w-10 drop-shadow' alt =""/> 
          <div className = 'absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
            <ul className = 'list-none m-0 p-2 bg-white rounded-md border text-sm'>
              <li onClick = {logout} className='py-1 px-2 cursor-pointer pr-10'> Logout</li>
            </ul>
            </div>
        </div>
      </div>
      :
      <div className = 'flex items-center justify-end gap-2 sm:gap-5 w-full'>
      <p onClick={()=> navigate('/buy')} className = 'cursor-pointer'> Coins</p>
      <button onClick = {()=>setShowLogin(true)} className = 'bg-zinc-800 text-white px-7 py-2 sm:px-7 text-sm rounded-full'> Log in</button>
      </div>
}
    </div>
  )
}

export default Navbar
