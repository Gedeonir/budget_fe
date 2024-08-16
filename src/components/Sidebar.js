import React from 'react'
import { RiLogoutCircleLine } from "react-icons/ri";
import { PiCopyrightThin } from "react-icons/pi";
import { AiOutlinePullRequest } from "react-icons/ai";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { TbProgressDown } from "react-icons/tb";
import { TbReportAnalytics } from "react-icons/tb";
import { IoAnalytics } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";
import GovernmentLogo from '../assets/Govt.png';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

const sideBarMenu1=[
    {
        "menuItem":"Dashboard",
        "menuIcon":<GoHome size={20}/>,
        "menuLeadTo":"/dashboard"
    },
    {
        "menuItem":"Budget Requests",
        "menuIcon":<AiOutlinePullRequest size={20}/>,
        "menuLeadTo":"/dashboard/requests/"
    },
    {
        "menuItem":"Incomes/Revenues",
        "menuIcon":<AiOutlineFundProjectionScreen size={20}/>,
        "menuLeadTo":"/dashboard/incomes"
    },
    {
        "menuItem":"Expenses",
        "menuIcon":<TbProgressDown size={20}/>,
        "menuLeadTo":"/dashboard/expenses"
    },
    {
        "menuItem":"Reports",
        "menuIcon":<TbReportAnalytics  size={20}/>,
        "menuLeadTo":"/dashboard/reports"
    },
    {
        "menuItem":"Forecast & Analysis",
        "menuIcon":<IoAnalytics  size={20}/>,
        "menuLeadTo":"/dashboard/forecast-and-analysis"
    },
    {
        "menuItem":"Gov't institutions",
        "menuIcon":<HiOutlineBuildingOffice2  size={20}/>        ,
        "menuLeadTo":"/dashboard/government-institutions"
    }

]

const sideBarMenu2=[
    {
        "menuItem":"Settings",
        "menuIcon":<IoSettingsOutline size={20}/>,
        "menuLeadTo":"/dashboard/settings"
    },
    {
        "menuItem":"Help & Support",
        "menuIcon":<IoIosHelpCircleOutline size={20}/>,
        "menuLeadTo":"/dashboard/help_and_support"
    }
]


const Sidebar = (props) => {
    console.log("from sidebar showMenu",props.showMenu);
    
  return (
    <aside className={`py-4 lg:block ${props.showMenu?"absolute top-0 block z-40 bg-primary":"hidden"} min-h-screen max-h-screen group lg:w-1/5 w-3/5 shadow-lg drop-shadow-sm`}>
        <div className="flex items-center w-full justify-start px-6">
            <div className='w-12'>
                <img src={GovernmentLogo} className='w-full h-full object-cover'/>
            </div>
            <label className='mx-2 text-text_primary uppercase font-extrabold'>Minecofin</label>
        </div>
        <ul className='my-4 w-full list-none items-start border-b pb-2 border-text_primary border-opacity-40'>
            {sideBarMenu1.map((item,index)=>(
                <li key={index} className={`w-full py-1 my-2 px-2 rounded-l-full ${location.pathname===`${item.menuLeadTo}`?'bg-primary text-secondary':'text-text_primary'} flex justify-start hover:text-secondary duration-200 delay-100`}>
                    {item.menuIcon}
                    <Link to={item.menuLeadTo} className='py-0.5 mx-2 text-sm'>{item.menuItem}</Link>
                </li>  
            ))}               
        </ul>

        <ul className='my-4 w-full list-none items-start border-text_primary border-opacity-40'>
            {sideBarMenu2.map((item,index)=>(
                <li key={index} className={`w-full py-1 my-2 px-2 rounded-l-full text-text_primary ${location.pathname===`${item.menuLeadTo}` && 'bg-primary'} flex justify-start hover:text-secondary duration-200 delay-100`}>
                    {item.menuIcon}
                    <Link to={item.menuLeadTo} className='py-0.5 mx-2 text-sm'>{item.menuItem}</Link>
                </li>  
            ))}    

                <li className={`w-full cursor-pointer py-1 my-2 px-2 rounded-l-full text-red flex justify-start hover:opacity-70 duration-200 delay-100`}>
                    <RiLogoutCircleLine size={20}/>
                    <p className='py-0.5 mx-2 text-sm'>Logout</p>
                </li>           
        </ul>

        <div className='px-6 w-full text-xs text-text_primary absolute bottom-0'>
            <p className='flex gap-1 justify-start text-center font-light'><PiCopyrightThin size={20}/> <span>All Rigths Reserverd</span></p>
        </div>

    </aside>
  )
}

export default Sidebar