import React, { useContext } from 'react'
import { plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const BuyCredit = () => {
  const { user, backendUrl, loadcoinsData, token, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const handleAddCoins = async (planId) => {
      try {
          if (!user) {
              setShowLogin(true);
              return;
          }

          const { data } = await axios.post(
              backendUrl + '/api/user/add-coins',
              { planId },
              { headers: { token } }
          );

          if (data.success) {
              loadcoinsData();
              navigate('/');
              toast.success('Coins added successfully');
          } else {
              toast.error(data.message);
          }
      } catch (error) {
          toast.error(error.message);
      }
  };

  return (
    <motion.div
      className='min-h-[80vh] text-center pt-14 mb-10'
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>Coins</button>
      <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>Get More</h1>

      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {plans.map((item, index) => (
          <div key={index} className='bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500'>
            <p className='mt-3 mb-1 font-semibold'>{item.id}</p>
            <p className='text-sm'>{item.desc}</p>
            <p className='mt-6'>
              <span className='text-3xl font-medium'>${item.price} </span>/ {item.credits} coins
            </p>
            <button onClick={() => handleAddCoins(item.id)} className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52'>
              {user ? 'Select' : 'Start Now'}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BuyCredit;
