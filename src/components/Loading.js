import React from 'react'
import {AiOutlineLoading3Quarters} from "react-icons/ai"

const Loading = () => {
  return (
    <div className='w-full flex justify-center items-center text-text_primary text-xs'>
        <AiOutlineLoading3Quarters size={20} className="animate-spin"/>
        <p className='ml-2'>Loading...</p>
    </div>
  )
}

export default Loading