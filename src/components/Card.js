import React,{useState} from 'react'
import GovernmentLogo from '../assets/Govt.png';
import { AiFillDelete } from "react-icons/ai";
import { TbEditCircle } from "react-icons/tb";



const Card = ({img,name,email,id,deleteHandler,editHandler,inst,pos}) => {
 
    return (
        <div className='mb-2 cursor-pointer relative shadow-lg drop-shadow w-full h-56 shadow-text_primary rounded-lg group' style={{backgroundImage:`url(${img?img:GovernmentLogo})`,backgroundSize:"cover", backgroundPosition:"center"}}>
            <div className='px-2 py-4 flex flex-wrap items-end h-full w-full bg-gradient-to-t from-list_hover via-transparent to-transparent rounded-lg'>
                <div className='w-full'>
                    <label className='font-bold text-sm text-primary2'>{name}</label>
                    <p className='text-xs  text-secondary mb-2'>{email}</p>
                    {inst && <p className='text-xs  text-[#FBA801] '><span className='font-bold'>{pos}</span>-{inst}</p>}
                </div>
            </div>

            <div className='absolute top-0 right-0 z-10 w-2/5 hidden items-center justify-end group-hover:flex duration-200 delay-100'>
                <div className='px-2 py-2 w-8 rounded-l-lg bg-primary text-text_primary'>
                    <TbEditCircle size={15} className='mb-2 hover:text-list_hover duration-200 delay-100' onClick={()=>editHandler(id)}/>
                    <AiFillDelete size={15} className='hover:text-list_hover duration-200 delay-100' onClick={()=>deleteHandler(id)}/>
                </div>
            </div>
        </div>         
  )
}

export default Card