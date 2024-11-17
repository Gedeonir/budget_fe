import React from 'react'

const Error = ({code,message}) => {
  return (
    <div className='text-red text-sm w-full p-8 text-center opacity-50'>
        <p >{message}</p>
    </div>
)
}

export default Error