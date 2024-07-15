import React,{useEffect, useState} from 'react'
import GovernmentLogo from '../assets/Govt.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import { RiHomeLine } from "react-icons/ri";
import { AiOutlinePullRequest } from "react-icons/ai";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { TbProgressDown } from "react-icons/tb";
import { TbReportAnalytics } from "react-icons/tb";
import { IoAnalytics } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { RiLogoutCircleLine } from "react-icons/ri";
import { PiCopyrightThin } from "react-icons/pi";
import Logo from "../assets/logo.png"
import {IoIosNotificationsOutline} from "react-icons/io"
import { IoSearchOutline } from "react-icons/io5";
import AccountsModal from './AccountsModal'
import axios from 'axios';

const sideBarMenu1=[
    {
        "menuItem":"Dashboard",
        "menuIcon":<GoHome size={25}/>,
        "menuLeadTo":"/dashboard"
    },
    {
        "menuItem":"Budget Requests",
        "menuIcon":<AiOutlinePullRequest size={25}/>,
        "menuLeadTo":"/dashboard/requests/#all"
    },
    {
        "menuItem":"Incomes/Revenues",
        "menuIcon":<AiOutlineFundProjectionScreen size={25}/>,
        "menuLeadTo":"/dashboard/incomes"
    },
    {
        "menuItem":"Expenses",
        "menuIcon":<TbProgressDown size={25}/>,
        "menuLeadTo":"/dashboard/expenses"
    },
    {
        "menuItem":"Reports",
        "menuIcon":<TbReportAnalytics  size={25}/>,
        "menuLeadTo":"/dashboard/reports"
    },
    {
        "menuItem":"Forecast & Analysis",
        "menuIcon":<IoAnalytics  size={25}/>,
        "menuLeadTo":"/dashboard/forecast-and-analysis"
    }
]

const sideBarMenu2=[
    {
        "menuItem":"Settings",
        "menuIcon":<IoSettingsOutline size={25}/>,
        "menuLeadTo":"/dashboard/settings"
    },
    {
        "menuItem":"Help & Support",
        "menuIcon":<IoIosHelpCircleOutline size={25}/>,
        "menuLeadTo":"/dashboard/help_and_support"
    }
]



const AdminDashboard = (props) => {
    const [openAccountModal,setOpenAccountModal]=useState(false);
    const [academicYear,setAcademiYears]=useState([]);

    const navigate=useNavigate();
    const [userData,setUserData]=useState([]);
  

    const getAcademicYears=()=>{
        let year = new Date().getFullYear();
        let lastyear = new Date().getFullYear()-1;
        let range = [];
        let lastrange = [];
        let academicYear=[];
        lastrange.push(lastyear);
        range.push(year);
        for (let i = 1; i < 100; i++) 
        {
            lastrange.push(lastyear + i);    
            range.push(year + i);
            academicYear.push(lastrange[i-1]+"-"+(lastrange[i]).toString().slice(-2));
            let fullyear = lastrange.concat(range);
        }
        setAcademiYears(academicYear);
    }

    useEffect(()=>{
        getAcademicYears();
    },[])




  return (
    <div className='min-h-screen max-h-screen flex justify-start w-full overflow-hidden'>
        <aside className='py-4 min-h-screen max-h-screen group w-1/5 shadow-lg drop-shadow-sm'>
            <div className="flex items-center w-full justify-start px-6">
                <div className='w-12'>
                    <img src={GovernmentLogo} className='w-full h-full object-cover'/>
                </div>
                <label className='mx-2 text-text_primary uppercase font-extrabold'>Minecofin</label>
            </div>
            <ul className='my-4 w-full list-none items-start border-b pb-2 border-primary'>
                {sideBarMenu1.map((item,index)=>(
                    <li key={index} className={`w-full py-1 my-2 px-4 rounded-l-full text-text_primary ${location.pathname===`${item.menuLeadTo}` && 'bg-primary'} flex justify-start hover:text-secondary duration-200 delay-100`}>
                        {item.menuIcon}
                        <Link to={item.menuLeadTo} className='py-0.5 mx-2 text-md'>{item.menuItem}</Link>
                    </li>  
                ))}               
            </ul>

            <ul className='my-4 w-full list-none items-start border-primary'>
                {sideBarMenu2.map((item,index)=>(
                    <li key={index} className={`w-full py-1 my-2 px-4 rounded-l-full text-text_primary ${location.pathname===`${item.menuLeadTo}` && 'bg-primary'} flex justify-start hover:text-secondary duration-200 delay-100`}>
                        {item.menuIcon}
                        <Link to={item.menuLeadTo} className='py-0.5 mx-2 text-md'>{item.menuItem}</Link>
                    </li>  
                ))}    

                    <li className={`w-full cursor-pointer py-1 my-2 px-4 rounded-l-full text-red flex justify-start hover:opacity-70 duration-200 delay-100`}>
                        <RiLogoutCircleLine size={25}/>
                        <p className='py-0.5 mx-2 text-md'>Logout</p>
                    </li>           
            </ul>

            <div className='px-6 w-full  text-text_primary absolute bottom-0'>
                <p className='flex gap-1 justify-start text-center font-light'><PiCopyrightThin size={20}/> <span>All Rigths Reserverd</span></p>
            </div>

        </aside>

        <div className='w-full min-h-screen max-h-screen bg-primary overflow-y-auto'>
            <header className='bg-primary w-full py-2 px-8 flex justify-between items-center sticky z-20 top-0'>
                <div className="flex items-center w-40">
                    <img src={Logo} className='w-full h-full object-cover'/>
                </div>
                <div className='flex relative items-center justify-center gap-2 py-2 px-2 drop-shadow-lg shadow-sm bg-primary2 rounded-lg'>
                    <form className='flex justify-start gap-1'>
                        <label className='text-text_primary text-sm'>FYI</label>
                        <select className='border w-24 text-text_primary rounded-lg border-primary'>
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
                    {openAccountModal && <AccountsModal profile={props?.profile}/>}                    
                </div>
            </header>
            <section className='py-2 px-8'>
                {props.children}
            </section>
        </div>
    </div>
  )
}

export default AdminDashboard