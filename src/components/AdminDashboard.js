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
import { connect } from 'react-redux';
import { getMyBudgets } from '../redux/Actions/BudgetActions';


const AdminDashboard = (props) => {
    const [openAccountModal,setOpenAccountModal]=useState(false);
    const [showMenu,setShowMenu]=useState(false);

    const navigate=useNavigate();
    const [userData,setUserData]=useState([]);
    
    const myBudgetData=props?.data?.budgets;
  

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
    const selectedYear=localStorage.getItem('financialYear');




  return (
    <div className='min-h-screen max-h-screen flex justify-start w-full overflow-hidden'>
        <Sidebar showMenu={showMenu}/>

        <div className={`relative w-full min-h-screen max-h-screen bg-primary ${props.openModal?'overflow-y-hidden':'overflow-y-auto'}`}>
            <header className='drop-shadow-sm bg-primary w-full py-2 px-4 flex justify-between items-center sticky z-20 top-0'>
                <div className="flex items-center lg:w-40 w-24">
                    <img src={Logo} className='w-full h-full object-cover'/>
                </div>
                <div className='flex relative items-center justify-center gap-2 py-2 px-2 rounded-lg'>
                    <form className='justify-start gap-1 flex'>
                        <select onChange={(e)=>props.setFinancialYear(e.target.value)} className='border w-24 text-text_primary rounded-lg border-text_primary border-opacity-40'>
                            {getAcademicYears(myBudgetData)?.map((item)=>{
                                return(
                                    <option key={item} className={`${item === selectedYear && 'bg-primary font-bold'}`}>{item}</option>
                                )
                            })}
                        </select>
                    </form>

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
            <section className='py-2 px-4  relative'>
                {props.children}
            </section>

            {showMenu && <Sidebar/>}
        </div>
    </div>
  )
}

const mapState=(data)=>({
    data:data
})

export default connect(mapState,{
    getMyBudgets
})(AdminDashboard)