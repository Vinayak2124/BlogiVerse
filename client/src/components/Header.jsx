import React from 'react'
import {Star,Bolt,Zap} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useRef } from 'react';

export const Header = () => {
  const { input, setInput } = useAppContext();
  const InputRef = useRef()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setInput(InputRef.current.value)
  }
  const onClear = async () => {
    setInput('')
    InputRef.current.value = ''
    
}
  return (
      <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
          <div className='text-center mt-20 mb-8'>
              <div className='inline-flex justify-center items-center bg-primary/10 border-primary/40 gap-2 px-6 py-2 rounded-full text-sm '>
                  <p className='font-semibold'>AI featured blog</p>
                    <Zap size={20} color='blue' />
              </div>
              <h1 className='text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700 mt-8'>Your personal <span className='text-primary'>blogging</span>  <br />  space</h1>
              <p className='my-6 sm:my-8 max-w-3xl m-auto max-sm:text-xs text-gray-500'>Where ideas take flight. Our innovative blog platform provides the perfect launchpad for your stories, insights, and passions to soar and inspire others.</p>

              <form onSubmit={onSubmitHandler} className='flex justify-between max-w-lg max-sm:scale-75 mx-auto items-center  border border-gray-200 overflow-hidden rounded-lg'>
                  <input ref={InputRef} type="text" placeholder='Search blogs' required className='rounded-xl px-3 py-1 w-full pl-4 outline-none ' />
                  <button type='submit' className='bg-primary px-4 py-2 rounded-lg cursor-pointer hover:scale-105  transition-all text-white'>Search</button>
        </form>
        <div className='text-center mt-2'>
          {input && <button onClick={onClear} className='border font-light text-xs py-1 px-3 rounded-xl shadow-custom-sm cursor-pointer bg-gray-200'> X Clear Search</button>}
        </div>
          </div>
    </div>
  )
}
