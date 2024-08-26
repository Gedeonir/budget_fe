import React,{useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../assets/Logo.PNG"
import {IoIosNotificationsOutline} from "react-icons/io"
import { IoSearchOutline } from "react-icons/io5";
import AccountsModal from './AccountsModal'
import axios from 'axios';
import Sidebar from './Sidebar';
import { CiMenuFries } from "react-icons/ci";
import { AiOutlineMenuFold } from "react-icons/ai";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import getAcademicYears from '../utils/AcademicYears';



const AdminDashboard = (props) => {
    const [openAccountModal,setOpenAccountModal]=useState(false);
    const [academicYear,setAcademiYears]=useState(getAcademicYears());
    const [showMenu,setShowMenu]=useState(false);

    const navigate=useNavigate();
    const [userData,setUserData]=useState([]);
  

    const verifyUser=async()=>{
        try{
          const getProfile=await axios.get(`${process.env.BACKEND_URL}/users/one/about`,
          {
              headers:{
              "Content-Type":"application/json",
              "Authorization":`Bearer ${sessionStorage.getItem('userToken')}`
              }
          });
          const {data}=getProfile;
          props?.setUserData(data); //passing data to Homepage
          setUserData(data);
          if(data?.getProfile?.role !=="admin"){
            navigate("/signin");
          }
        }catch(error){
            navigate("/signin",{state:{data:"Not Authorized or token expired, Please Login again"}});
            sessionStorage.removeItem('userToken'); 
        }
    }


    useEffect(()=>{
        verifyUser();
    },[])




  return (
    <div className='min-h-screen max-h-screen flex justify-start w-full overflow-hidden'>
        <Sidebar showMenu={showMenu}/>

        <div className={`relative w-full min-h-screen max-h-screen bg-primary ${props.openModal?'overflow-y-hidden':'overflow-y-auto'}`}>
            <header className='drop-shadow-sm bg-primary w-full py-2 lg:px-2 px-2 flex justify-between items-center sticky z-20 top-0'>
                <div className="flex items-center lg:w-40 w-24">
                    <img src={Logo} className='w-full h-full object-cover'/>
                </div>
                <div className='flex relative items-center justify-center gap-2 py-2 px-2 rounded-lg'>
                    <form className='justify-start gap-1 hidden lg:flex'>
                        <label className='text-text_primary text-sm'>FYI</label>
                        <select className='border w-24 text-text_primary rounded-lg border-text_primary border-opacity-40'>
                            {academicYear.map((item)=>{
                                return(
                                    <option value={item} key={item}>{item}</option>
                                )
                            })}
                        </select>
                    </form>
                    <IoSearchOutline size={20} className='cursor-pointer text-text_primary hover:text-list_hover delay-100 duration-500'/>

                    <IoIosNotificationsOutline size={25} className='cursor-pointer text-text_primary hover:text-list_hover delay-100 duration-500'/>
                    
                    <div 
                    onClick={()=>setOpenAccountModal(!openAccountModal)}
                    className={`h-6 delay-100 duration-200 cursor-pointer px-2 rounded-full w-6 bg-[url(https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png)] bg-cover bg-center bg-no-repeat`}/>
                    {showMenu?
                    <AiOutlineMenuFold size={25} className='cursor-pointer text-text_primary hover:text-list_hover delay-100 duration-500 lg:hidden block' onClick={()=>setShowMenu(!showMenu)}/>
                    :
                    <AiOutlineMenuUnfold size={25} className='cursor-pointer text-text_primary hover:text-list_hover delay-100 duration-500 lg:hidden block' onClick={()=>setShowMenu(!showMenu)}/>
                    }
                    
                </div>
                {openAccountModal && <AccountsModal profile={userData?.getProfile}/>}

                    
            </header>
            <section className='py-2 lg:px-4 px-2 relative'>
                {props.children}
            </section>

            {showMenu && <Sidebar/>}
        </div>
    </div>
  )
}

export default AdminDashboard