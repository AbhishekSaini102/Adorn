/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import appwriteService from '../appwrite/config'
import {Link} from 'react-router-dom'


function PostCard({
      $id,
      title,
      featuredImage,
      slug,
    //   content,
    //   author,
    //   createdAt,
    //   updatedAt,
    //   category,
    //   tags,
    //   status,
    //   comments,
    //   likes,
    //   views,
    //   slug,
    //   ...props,
    }){
  return (
    <div>
    <Link to={`/post/${slug}/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4 '>
            <div className='w-full h-40 bg-gray-200 rounded-lg mb-4'>

                <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='w-full h-full object-cover rounded-lg' />
                
            </div>

            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
    </div>
  )
}

export default PostCard
