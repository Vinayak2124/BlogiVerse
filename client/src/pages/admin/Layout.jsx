import React from 'react'
import { ArrowRight } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import { useAppContext } from '../../context/AppContext';


const Layout = () => {
    const {axios,setToken, navigate} = useAppContext()

    const logout = async () => {
        localStorage.removeItem('token')
        axios.defaults.headers.common['Authorization']  = null;
        setToken(null)
        navigate('/');
    }
  return (
      <>
          <div className=' shadow-lg h-[55px] sticky top-0 z-50'>
      <div className='flex justify-between items-center py-2 h-full px-3 sm:px-6 md:px-10 xl:px-32'>
          
          <div className='flex justify-center items-center gap-2'>
              <img src="/blog_logo.png" alt="logo" className='w-8 sm:w-8 md:w-10' /> 
              <h2 onClick={()=>navigate('/')} className='text-2xl font-semibold cursor-pointer text-primary'>BlogiVerse</h2>
          </div>
          
          <button onClick={logout} className='flex items-center gap-2 text-xs sm:text-sm md:text-base text-white bg-primary hover:bg-blue-800 hover:text-gray-400 hover:scale-95 rounded-3xl px-2 sm:px-3 py-1.5 transition duration-300'

>Logout  <ArrowRight size={15} /> </button>
            </div>
      </div>
          

          <div className='flex h-[calc(100vh-55px)] '>
              <Sidebar/>
              <Outlet/>
          </div>
      </>
  )
}

export default Layout