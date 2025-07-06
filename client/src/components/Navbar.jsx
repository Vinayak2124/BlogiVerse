import React from 'react'
import { ArrowRight } from 'lucide-react';

import { useAppContext } from '../context/AppContext';
 


const Navbar = () => {

  const { navigate, token } = useAppContext();
    return (
      <div className=' shadow-lg'>
      <div className='flex justify-between items-center py-3 mx-8 sm:mx-20 xl:mx-32'>
          
          <div className='flex justify-center items-center gap-2'>
              <img src="/blog_logo.png" alt="logo" className='w-10 sm:w-15' /> 
              <h2 onClick={()=>navigate('/')} className='text-3xl font-semibold cursor-pointer text-primary'>BlogiVerse</h2>
          </div>
          
          <button onClick={() => navigate('/admin')} className='text-white bg-primary hover:bg-blue-800 hover:text-gray-800 hover:scale-95 rounded-3xl px-5 py-3 cursor-pointer flex justify-center items-center gap-2 transition-colors duration-300 ease-in-out hover:border '>
            
            {token ? ('Dashboard') : ('Login ')}  
            <ArrowRight size={24} />
             </button>
            </div>
            </div>
  )
}

export default Navbar