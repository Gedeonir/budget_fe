import React from 'react'

const Error = ({code,message}) => {
  return (
    <div className='text-red text-sm'>
        <p >{message}</p>
    </div>
)
}

export default Error