import React from 'react'

const Footer = () => {
  return (
    <div className='flex justify-center items-center p-8 text-text_primary text-sm'>
        <p>
        Budget planning and execution project developed by Rugamba <span>{new Date().getFullYear()}</span>
        </p>
    </div>
  )
}

export default Footer