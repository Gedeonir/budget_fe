import React from 'react'

const Footer = () => {
  return (
    <div className='flex justify-center items-center p-8 text-text_primary text-sm'>
        <p>
        All Rigth Reserverd <span>{new Date().getFullYear()}</span>
        </p>
    </div>
  )
}

export default Footer