import React, { useState } from 'react'
import Logo from "../assets/logo.png"
import { Link } from 'react-router-dom'
import {IoIosNotificationsOutline} from "react-icons/io"
import { IoSearchOutline } from "react-icons/io5";
import AccountsModal from './AccountsModal'

const Navbar = (props) => {
    const [openAccountModal,setOpenAccountModal]=useState(false)

    return (
        <div className='bg-primary drop-shadow-sm w-full py-4 px-8 flex justify-start items-center sticky z-20 top-0'>
            <div className="flex items-center w-32">
                <img src={Logo} className='w-full h-full object-cover'/>
            </div>

            <div className='flex items-center justify-between w-full'>
                <ul className="lg:flex justify-start w-full hidden p-0 list-none mx-4">
                    <li className={`${location.pathname==="/"?'text-list_hover border-list_hover border-b-2':'text-text_primary'} p-1 text-md font-extrabold hover:text-list_hover cursor-pointer mx-4 delay-100 duration-500`}>
                        <Link to="/">
                            Overview
                        </Link>
                    </li>

                    <li className={`${location.pathname==="/incomes"?'text-list_hover border-list_hover border-b-2':'text-text_primary'} p-1 text-md font-extrabold hover:text-list_hover cursor-pointer mx-4 delay-100 duration-500`}>
                        <Link to="/incomes-and-revenues">
                            Incomes
                        </Link>
                    </li>   

                    <li className={`${location.pathname==="/expenses"?'text-list_hover border-list_hover border-b-2':'text-text_primary'} p-1 text-md font-extrabold hover:text-list_hover cursor-pointer mx-4 delay-100 duration-500`}>
                        <Link to="/expennditures">
                            Expenses
                        </Link>
                    </li>   

                    <li className={`${location.pathname==="/incomes"?'text-list_hover border-list_hover border-b-2':'text-text_primary'} p-1 text-md font-extrabold hover:text-list_hover cursor-pointer mx-4 delay-100 duration-500`}>
                        <Link to="/report-and-analytics">
                            Report & Analytics
                        </Link>
                    </li>           
                    
                </ul>

                <div className='flex items-center justify-center gap-2'>
                    <IoSearchOutline size={20} className='cursor-pointer text-text_primary hover:text-list_hover delay-100 duration-500'/>

                    <IoIosNotificationsOutline size={25} className='cursor-pointer text-text_primary hover:text-list_hover delay-100 duration-500'/>
                    
                    <div 
                    onClick={()=>setOpenAccountModal(!openAccountModal)}
                    className={`h-6 delay-100 duration-200 cursor-pointer px-2 rounded-full w-6 bg-[url(https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png)] bg-cover bg-center bg-no-repeat`}/>
                    {openAccountModal && <AccountsModal profile={props?.profile}/>}                    
                </div>
            </div>
        </div>
    )
}

export default Navbar