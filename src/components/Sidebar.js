import React from 'react'
import { RiLogoutCircleLine } from "react-icons/ri";
import { PiCopyrightThin } from "react-icons/pi";
import { AiOutlinePullRequest } from "react-icons/ai";
import { GoHome } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";
import GovernmentLogo from '../assets/Govt.png';
import { Link, useNavigate } from 'react-router-dom';
import { handleLogout } from '../utils/handleLogout';
import { IoWallet } from "react-icons/io5";


const boLinks=[
    {
        "menuItem":"Budget Requests",
        "menuIcon":<AiOutlinePullRequest size={20}/>,
        "menuLeadTo":"/dashboard/requests/"
    },
    // // {
    // //     "menuItem":"Incomes/Revenues",
    // //     "menuIcon":<AiOutlineFundProjectionScreen size={20}/>,
    // //     "menuLeadTo":"/dashboard/incomes"
    // // },
    // // {
    // //     "menuItem":"Expenses",
    // //     "menuIcon":<TbProgressDown size={20}/>,
    // //     "menuLeadTo":"/dashboard/expenses"
    // // },
    // {
    //     "menuItem":"Reports",
    //     "menuIcon":<TbReportAnalytics  size={20}/>,
    //     "menuLeadTo":"/dashboard/reports"
    // },
    // {
    //     "menuItem":"Forecast & Analysis",
    //     "menuIcon":<IoAnalytics  size={20}/>,
    //     "menuLeadTo":"/dashboard/forecast-and-analysis"
    // },

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
    const navigate=useNavigate()
    
  return (
    <aside className={`py-4 lg:block ${props.showMenu?"absolute top-0 block z-40 bg-primary":"hidden"} min-h-screen max-h-screen group lg:w-1/5 w-3/5 shadow-lg drop-shadow-sm`}>
        <div className="flex items-center w-full justify-start px-6">
            <div className='w-12'>
                <img src={GovernmentLogo} className='w-full h-full object-cover'/>
            </div>
            <label className='mx-2 text-text_primary uppercase font-bold'>Minecofin</label>
        </div>
        <ul className='my-4 w-full list-none items-start border-b pb-2 border-text_primary border-opacity-40'>
            <li className={`w-full py-1 my-2 px-2 rounded-l-full text-text_primary ${location.pathname===`/dashboard` && 'bg-primary'} flex justify-start hover:text-secondary duration-200 delay-100`}>
                <GoHome size={20}/>,
                <Link to={"/dashboard"} className='py-0.5 mx-2 text-sm'>Dashboard</Link>
            </li>
            
            {props?.userData?.getProfile?.position?.toLowerCase() ==='budget officer' &&
                boLinks.map((item,index)=>(
                    <li key={index} className={`w-full py-1 my-2 px-2 rounded-l-full text-text_primary ${location.pathname===`${item.menuLeadTo}` && 'bg-primary'} flex justify-start hover:text-secondary duration-200 delay-100`}>
                        {item.menuIcon}
                        <Link to={item.menuLeadTo} className='py-0.5 mx-2 text-sm'>{item.menuItem}</Link>
                    </li>  
                ))
            }
            {/* {sideBarMenu1.map((item,index)=>(
                <li key={index} className={` text-sm w-full py-1 my-2 px-2 rounded-l-full ${location.pathname===`${item.menuLeadTo}`?'bg-primary text-secondary':'text-text_primary'} flex justify-start hover:text-secondary duration-200 delay-100`}>
                    {item.menuIcon}
                    <Link to={item.menuLeadTo} className='py-0.5 mx-2 text-sm'>{item.menuItem}</Link>
                </li>  
            ))}                */}
        </ul>

        <ul className='my-4 w-full list-none items-start border-text_primary border-opacity-40'>
            {sideBarMenu2.map((item,index)=>(
                <li key={index} className={`w-full py-1 my-2 px-2 rounded-l-full text-text_primary ${location.pathname===`${item.menuLeadTo}` && 'bg-primary'} flex justify-start hover:text-secondary duration-200 delay-100`}>
                    {item.menuIcon}
                    <Link to={item.menuLeadTo} className='py-0.5 mx-2 text-sm'>{item.menuItem}</Link>
                </li>  
            ))}    

            <li className={`w-full cursor-pointer py-1 my-2 px-2 rounded-l-full text-red flex justify-start hover:opacity-70 duration-200 delay-100`} onClick={()=>{handleLogout(),navigate("/signin")}}>
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