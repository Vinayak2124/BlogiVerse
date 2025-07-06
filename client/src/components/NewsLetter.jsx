import React from 'react'

const NewsLetter = () => {
  return (
      <div className='flex flex-col items-center justify-center text-center space-y-2 my-32'>
          <h1 className='mf:text-4xl text-2xl font-semibold'>Stay updated with our latest posts.</h1>
          <p className='md:text-lg text-gray-600/60 pb-8'>Subscribe for new blog alerts, you will get notified about new posts.</p>
          <form className='flex item-center justify-between max-w-2xl w-full md:h-12 h-10'>
              <input placeholder='Enter your email id' className='border border-gray-300 rounded-2xl pl-2 h-full border-r-0 outline-none w-full text-gray-500' type="text"  required />
              <button type='submit' className='md:px-12 px-8 h-full text-white bg-primary/80 hover:bg-primary transition-all cursor-pointer rounded-2xl'>Subscribe</button>
          </form>
    </div>
  )
}

export default NewsLetter;