import React, { useState } from 'react'
import BlogCard from './BlogCard';
// import { blog_data } from '../assets/QuickBlog-Assets/assets';
import { useAppContext } from '../context/AppContext';
// import { motion } from "motion/react"
const BlogList = () => {
    const [menu, setMenu]= useState("All")
    const { blogs, input } = useAppContext()
    const filterBlogs = () => {
        if (input == '') {
            return blogs;
        }
        return blogs.filter((blog) => blog.title.toLowerCase().includes(input.toLowerCase()) || blog.category.toLowerCase().includes(input.toLowerCase())
       || blog.category.toLowerCase().includes(menu.toLowerCase()))
    }

    
    const Categories = [
        'All',
  'Technology',
  'Data Science',
  'Artificial Intelligence',
  'Startups',
  'Web Development',
  'Web3',
  'Gaming',
  'Politics',
  'Entertainment',
  'Culture',
  'Business',
  'Lifestyle',
  'Travel',
  'Food',
  'Education',
  'Health'
      ];
  return (
      <div>
          <div className='flex items-center justify-center gap-4 sm:gap-8 my-10 mx-auto relative md:max-w-6xl sm:max-w-xl flex-wrap'>
              {Categories.map((item) => (
                  <div key={item} className='relative '>
                      <button onClick={()=>setMenu(item)}
                          className={`cursor-pointer text-gray-400 ${menu=== item && 'text-white px-4 py-1 bg-primary rounded-full '}`}>{item}
                          {/* <div className='absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full px-3 py-1'></div> */}
                      </button>
                  </div>
              ))}
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>
              {filterBlogs().filter((blog) => menu === 'All' ? true : blog.category === menu).map((blog) => <BlogCard key={ blog._id} blog={blog} />)}
          </div>
    </div>
  )
}

export default BlogList