import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const AccountsModal = (props) => {

    const navigate=useNavigate();
    
    const handleLogout=()=>{
        sessionStorage.removeItem('userToken');
        navigate("/signin");
    }

    const location=useLocation();

    const handleNavigate=()=>{
        if (location?.pathname?.includes("dashboard")) {
            console.log(location?.pathname?.includes("dashboard"));
        } else {
            navigate("/plan-budget")
        }
    }
    

    
    return (
        <div className='absolute top-12 right-4 bottom-0 lg:w-1/5 w-4/5 h-64 p-4 bg-primary2 rounded-lg drop-shadow-sm shadow-lg'>
            <div className='flex justify-start gap-2'>
                <div className={`h-16 delay-100 duration-200 cursor-pointer px-2 rounded-full w-16 bg-[url(https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png)] bg-cover bg-center bg-no-repeat`}/>
                <div className='py-2 text-text_primary'>
                    <h1 className='font-bold text-md'>{props?.profile?.fullNames}</h1>
                    <p className='text-sm'>{props?.profile?.email}</p>
                    <Link to={`/profile/${props?.profile?.fullNames}`} className="text-success text-xs">View profile</Link>

                </div>

            </div>
            <hr className='text-primary mt-2'/>
            <ul className="w-full p-0 list-none mt-2">
                <li className={`text-text_primary  text-xs font-bold hover:text-list_hover cursor-pointer delay-100 duration-500`}>
                    <Link to="#">
                        Privacy statement
                    </Link>
                </li>
                <li className={`text-text_primary  text-xs font-bold hover:text-list_hover cursor-pointer delay-100 duration-500`}>
                    <Link to="#">
                        Help & support
                    </Link>
                </li>

                <li className={`text-text_primary  text-xs font-bold hover:text-list_hover cursor-pointer delay-100 duration-500`}>
                    <div>
                        Dark mode
                    </div>
                </li>

                <li className={`text-red font-bold hover:text-list_hover cursor-pointer delay-100 duration-500`}>
                    <button className='border-none bg-transparent cursor-pointer font-bold hover:opacity-90 text-red text-xs' onClick={()=>handleLogout()}>Logout</button>
                </li>
            </ul>

            <button type='submit' size='sm' className={`my-4 delay-100 duration-200 hover:bg-opacity-70 bg-secondary text-sm text-center text-primary font-bold p-2 w-full`}
            onClick={()=>handleNavigate()}
            >
                Plan new budget
            </button>        
        </div>
    )
}

export default AccountsModal