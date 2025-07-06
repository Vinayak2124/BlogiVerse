import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets,  } from '../assets/QuickBlog-Assets/assets'
import Navbar from '../components/Navbar'
import Moment from 'moment'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'


const Blog = () => {
  const { id } = useParams()
  const {axios} = useAppContext()
  const [data, setData] = useState(null)
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const[content,setContent]= useState('')

  const fetchComments = async () => {
    try {
      const { data } = await axios.post('/api/blog/comments', { blogId: id })
      if (data.success) {
        setComments(data.comments);
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`)
      data.success ? setData(data.blog) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
  }
  }
  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/blog/add-comment', { blog: id, name, content })
      if (data.success) {
        toast.success(data.message)
        setName('')
        setContent('')
        fetchComments()
      } else {
        toast.error(data.message)
      }
     } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    fetchBlogData();
    fetchComments();
},[])
  return data ? (
    <div >
      <Navbar/>
      <div className=' text-center mt-20 text-shadow-gray-600'>
        <p className='text-primary/50 py-4 font-medium'>Published on {Moment(data.createdAt).format('MMMM Do YYYY')}</p>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>{data.title}</h1>
        <h2 className='mt-5 mx-auto max-w-lg truncate'>{data.subTitle}</h2>
        <p className='inline-block py-1 px-4 rounded-full text-primary border mb-6 text-sm border-primary/35 self-end mt-4 bg-primary/10 font-medium '>- John Doe</p>
        </div>
       
        <div className='relative mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
          <img src={data.image} alt="image" width={1000} className='rounded-4xl mb-5' />
          
        <div dangerouslySetInnerHTML={{ __html: data.description }} className='rich-text max-w-3xl mx-auto flex flex-start flex-col'></div>

        <div className='mx-auto max-w-3xl mt-12 mb-10'  >
          <p className='font-semibold mb-4'>Comments ({comments.length})</p>
          <div className='flex flex-col gap-4'>
            {comments.map((item, index) => (
              <div key={index} className='relative bg-primary/10 border border-primary/5 max-w-xl p-4 rounded-lg gap-2 mb-2'>
                <div className='flex  items-center gap-2'>
                  <img src={assets.user_icon} width={17} alt="user_icon"  />
                  <p className=' font-semibold'>{item.name}</p>
                  </div>
                  <p className='font-medium text-sm max-w-md ml-8 mt-2'>{ item.content}</p>
                <div className='absolute text-xs right-4 bottom-3 flex items-center gap-2 mt-2'>{Moment( item.createdAt ).fromNow()}</div>
            </div>
          ))}
          </div>
        </div>

        <div className='max-w-3xl mx-auto'>
          <p className='font-semibold mb-4'>Add your comment</p>
          <form onSubmit={addComment} className='flex flex-col items-start gap-4 max-w-lg'>
            <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Name' required className='w-full p-2 border border-gray-300 rounded-lg outline-none' />
            <textarea onChange={(e)=>setContent(e.target.value)} value={content} placeholder='Comment' required className='w-full p-2 border border-gray-300 rounded-lg outline-none h-40'></textarea>
            <button type='submit' className='bg-primary hover:scale-3d text-white rounded-2xl p-2 px-8 transition-all cursor-pointer'>Submit</button>
          </form>
        </div>

      </div>
      
      <div className='my-24 max-w-3xl mx-auto'>
        <p className='my-4 font-semibold'>Share this article on the Social Media.</p>
        <div className='flex gap-3'>
          <img src={assets.facebook_icon} width={50} />
          <img src={assets.twitter_icon} width={50} />
          <img src={assets.googleplus_icon} width={50} />

        </div>
      </div>
          <Footer/>
    
    </div>
  ): <div><Loader/></div>
}

export default Blog