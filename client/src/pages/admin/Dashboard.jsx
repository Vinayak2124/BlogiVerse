import React, { useEffect, useState } from 'react'
import { assets,  } from '../../assets/QuickBlog-Assets/assets'
import BlogTableItem from '../../components/admin/BlogTableItem'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState({ blogs: 0, comments: 0, drafts: 0, recentBlog: [] })
    
    const { axios } = useAppContext()
    
    const fetchDashboard = async () => {
        try {
            const { data } = await axios.get('/api/admin/dashboard')
            data.success ? setDashboardData(data.dashboardData) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(() => {
        fetchDashboard()
    },[])
  return (
      <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>
          
          <div className='flex flex-wrap gap-7'>
              <div className='flex items-center gap-4 bg-whte p-4 min-w-58 rounded-lg shadow cursor-pointer hover:scale-105 transition-all'>
                  <img src={assets.dashboard_icon_1} alt="" />
                  <div>
                      <p className='text-xl font-semibold text-gray-700'>{dashboardData.blogs}</p>
                      <p className='text-gray-400 font-light'>Blogs</p>
                  </div>
              </div>
              <div className='flex items-center gap-4 bg-whte p-4 min-w-58 rounded-lg shadow cursor-pointer hover:scale-105 transition-all'>
                  <img src={assets.dashboard_icon_2} alt="" />
                  <div>
                      <p className='text-xl font-semibold text-gray-700'>{dashboardData.comments}</p>
                      <p className='text-gray-400 font-light'>Comments</p>
                  </div>
              </div>

              <div className='flex items-center gap-4 bg-whte p-4 min-w-58 rounded-lg shadow cursor-pointer hover:scale-105 transition-all'>
                  <img src={assets.dashboard_icon_3} alt="" />
                  <div>
                      <p className='text-xl font-semibold text-gray-700'>{dashboardData.drafts}</p>
                      <p className='text-gray-400 font-light'>Drafts</p>
                  </div>
             </div>
          </div>
          <div>
              <div className='flex item-centers gap-3 m-4 mt-6 text-gray-600'>
                  <img src={assets.dashboard_icon_4} alt="" />
                  <p>Latest Blogs</p>
              </div>

              <div className='relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
                  <table className='w-full text-sm text-gray-500'>
                      <thead className='text-xs text-gray-600 text-left uppercase font-semibold'>
                          <tr>
                              <th scope='col' className='px-2 py-4 xl:px-6'>#</th>
                              <th scope='col' className='px-2 py-4 xl:px-6'>Blog Title</th>
                              <th scope='col' className='px-2 py-4 xl:px-6 max-sm:hidden'>Date</th>
                              <th scope='col' className='px-2 py-4 xl:px-6 max-sm:hidden'>Status</th>
                              <th scope='col' className='px-2 py-4 xl:px-6'>Action</th>
                      </tr>
                      </thead>
                      <tbody>
                          {dashboardData.recentBlog.map((blog,index) => (
                             <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDashboard} index={index+1} /> 
                          ))}
                          
                  </tbody>
                  </table> 
              </div>
          </div>
    </div>
  )
}

export default Dashboard