import React, { useState,useRef, useEffect } from 'react'
import { assets } from '../../assets/QuickBlog-Assets/assets'

import { Categories } from '../../assets/category';
import Quill from 'quill'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import {parse} from 'marked';

const AddBlog = () => {
    const { axios } = useAppContext()
    const [isAdding, setIsAdding] = useState(false)
    const [loading,setLoading]=useState(false)
    const [image, setImage] = useState(false)
    const [title, setTitle] = useState('')
    const [subTitle, setSubTitle] = useState('')
    const [category, setCategory] = useState('Technology')
    const [isPublished, setIsPublished] = useState(false)
    const editorRef = useRef(null)
    const quillRef= useRef(null)

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            setIsAdding(true)
            const blog = {
                title, subTitle, description: quillRef.current.root.innerHTML,
                category,isPublished
            }
            const formData = new FormData();
            formData.append('blog', JSON.stringify(blog))
            formData.append('image', image)
            
            const { data } = await axios.post('/api/blog/add', formData);
            if (data.success) {
                toast.success(data.message)
                setImage(false)
                setTitle('')
                setCategory('Technology')
                quillRef.current.root.innerHTML = '';
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsAdding(false)
        }
    }
    const generateContent = async () => {
        if (!title) return toast.error('please enter a title')
        
        try {
            setLoading(true)
            const { data } = await axios.post('/api/blog/generate', { prompt: title })
            if (data.success) {
                quillRef.current.root.innerHTML = parse(data.content)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (!quillRef.current && editorRef.current) {
         quillRef.current = new Quill(editorRef.current,{theme:'snow'})
     }   
    },[])
    
  return (
      <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>
          <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>
              <p className='font-semibold'>Upload thumbnail</p>
              <label htmlFor="image">
              <img src={!image ?  assets.upload_area : URL.createObjectURL(image)} alt="image" className='mt-2 h-16 rounded cursor-pointer' />      </label>
              <input onChange={(e)=> setImage(e.target.files[0])}  type="file" id="image" hidden required />
        
          
          <p className='mt-4'>Blog title</p>
          <input type="text" placeholder='Minimum 10 charcter required' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded ' onChange={(e)=> setTitle(e.target.value)} value={title}/>

          <p className='mt-4'>Sub title</p>
              <input type="text" placeholder='Enter the sub-title ' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded ' onChange={(e) => setSubTitle(e.target.value)} value={subTitle} />
             
              <p className='mt-4'>Blog Description</p>
              <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
                  <div ref={editorRef}></div>
                  {loading && (
                      <div className='absolute right-0 top-30 bottom-0 left-0 flex items- center justify-around'>
                          <div className='w-20 h-20 rounded-full border-2 border-t-white animate-spin'></div>
                      </div>
                  )}
                  <button disabled={loading} type='button' onClick={generateContent} className='absolute bottom-0 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded-xl hover:underline cursor-pointer'>Generate with AI</button>
              </div>

              <p className='mt-4'>Blog Category</p>
              <select onChange={(e)=> setCategory(e.target.value)} name='category' className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded-md'>
                  <option value="">Select category</option>
                  {Categories.map((item, index) => (
                       <option key={index} value={item}>{item }</option>
                  ))}
              </select>

              <div className='flex gap-3 mt-4'>
                  <p>Publish Now</p>
                  <input type="checkbox" checked={isPublished} className='scale-125 cursor-pointer' onChange={e=>setIsPublished(e.target.checked)}/>
              </div>

              <button
  disabled={isAdding}
  type="submit"
  className={`mt-8 w-40 h-10 text-white rounded-xl hover:scale-105 text-sm transition-all duration-200
    ${isAdding ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary cursor-pointer'}`}
>
  {isAdding ? 'Adding...' : 'Add Blog'}
</button>

</div>
   </form>
  )
}

export default AddBlog