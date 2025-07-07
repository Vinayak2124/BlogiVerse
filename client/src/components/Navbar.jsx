import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';


const Navbar = () => {
  const { navigate, token } = useAppContext();

  return (
    <div className="h-[55px] shadow-lg bg-white">
      <div className="flex justify-between items-center py-2 px-4 sm:px-8 md:px-20 xl:px-32">
        
        {/* Logo + Title */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <img src="/blog_logo.png" alt="logo" className="w-7 sm:w-9 md:w-10" />
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-primary">BlogiVerse</h2>
        </div>

        {/* Login / Dashboard */}
        <button
          onClick={() => navigate('/admin')}
          className="text-xs sm:text-sm md:text-base text-white bg-primary hover:bg-blue-800 hover:text-gray-200 hover:scale-95 rounded-3xl px-3 py-2 flex items-center gap-2 transition duration-300"
        >
          {token ? 'Dashboard' : 'Login'}
       
        </button>
      </div>
    </div>
  );
};

export default Navbar;
