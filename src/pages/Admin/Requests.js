import React, { useEffect,useState } from 'react'
import AdminDashboard from '../../components/AdminDashboard';
import { Link, useLocation } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';
import GovernmentLogo from '../../assets/Govt.jpeg';
import {IoIosNotificationsOutline} from "react-icons/io"
import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";
import { MdCurrencyExchange } from "react-icons/md";
import Pagination from '../../components/Pagination';


const Requests = () => {
    const [userData,setUserData]=useState([]);
    const location=useLocation();
    const [section,setSection]=useState("All");
    const [currentPage,setCurrentPage]=useState(1);
    const handlePagination = (pageNumber) => {
        setCurrentPage (pageNumber);
    };

    useEffect(()=>{

    },[])

  return (
    <AdminDashboard setUserData={setUserData}>
        <div className='py-4 font-extrabold text-text_primary w-full overflow-x-hidden'>
            <p>Budget Requests</p>
        </div>
        <div className='w-full bg-primary2 rounded-lg py-4 px-2'>
            <div className='lg:flex justify-between '>
                <ul className='list-none flex justify-start gap-4 -mx-4 w-full font-semibold text-md'>
                    <li onClick={()=>setSection("all")} className={`${section.toLowerCase()=="all"?'text-secondary':'text-text_primary'} cursor-pointer hover:text-secondary transition-all duration-300 delay-100`}>All</li>
                    <li onClick={()=>setSection("pending")} className={`${section.toLowerCase()=="pending"?'text-secondary':'text-text_primary'} cursor-pointer hover:text-secondary transition-all duration-300 delay-100`}>Pending</li>
                    <li onClick={()=>setSection("approved")} className={`${section.toLowerCase()=="approved"?'text-secondary':'text-text_primary'} cursor-pointer hover:text-secondary transition-all duration-300 delay-100`}>Approved</li>
                    <li onClick={()=>setSection("declined")} className={`${section.toLowerCase()=="declined"?'text-secondary':'text-text_primary'} cursor-pointer hover:text-secondary transition-all duration-300 delay-100`}>Declined</li>
                </ul>
                <div className='relative lg:w-2/5 w-full lg:px-2'>
                    <input type='search' placeholder='Search request' className='py-2 px-2 border-2 outline-none border-primary w-full rounded-lg placeholder:text-text_primary placeholder:text-opacity-50'/>
                    <IoSearchOutline size={25} className='cursor-pointer font-normal text-text_primary hover:text-list_hover delay-100 duration-500 absolute right-4 top-2'/>
                </div>
            </div>
            <div className='w-full overflow-x-auto'>
                <table border={10} cellSpacing={0} cellPadding={10} className='my-4 lg:text-lg text-xs w-full py-4 text-text_primary text-left px-2 lg:px-4'>
                    <thead className='bg-primary'>
                        <tr>
                            <th className='font-normal'>Name</th>
                            <th className='font-normal'>Budget Owner</th>
                            <th className='font-normal'>Budget proposed</th>
                            <th className='font-normal'>Time sent</th>
                            <th className='font-normal'>Status</th>
                            <th className='font-normal'></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>FYI 2024-2025 Budget</td>
                            <td className='flex w-full justify-start gap-2 cursor-pointer'>
                                <div className='w-8 h-8 hidden lg:block'>
                                    <img src={GovernmentLogo} className='w-full h-full object-cover'/>
                                </div>
                                <Link className='text-secondary p-1'>Ministry of Health</Link>
                            </td>
                            <td>7000 $</td>
                            <td>2024-01-05 12:00:51 PM</td>
                            <td>
                                <label className='bg-primary lg:px-4 px-2 text-xs py-2 rounded-lg text-success font-bold'>
                                    Approved
                                </label>
                            </td>
                            <td className='flex justify-start gap-3'>
                                <div className='group relative'>
                                    <SlLike size={25} className='text-success cursor-pointer  duration-300 delay-200'/>
                                    <label className='absolute -top-6 -right-2 text-xs text-primary rounded-lg p-1 bg-success hidden group-hover:block'>Approve</label>
                                </div>
                                <div className='group relative'>
                                    <SlDislike size={25} className='text-red cursor-pointer  duration-300 delay-200'/>
                                    <label className='absolute -top-6 -right-2 text-xs text-primary rounded-lg p-1 bg-red hidden group-hover:block'>Decline</label>
                                </div>
                                <div className='group relative'>
                                    <MdCurrencyExchange size={25} className='text-secondary cursor-pointer  duration-300 delay-200'/>
                                    <label className='absolute -top-6 -right-2 text-xs text-primary rounded-lg p-1 bg-secondary hidden group-hover:block'>Modify</label>
                                </div>
                            </td>
                            
                        </tr>
                    </tbody>
                </table>
            </div>

            <Pagination
                length={100}
                postsPerPage={20}
                handlePagination={handlePagination}
            />

            

        </div>

    </AdminDashboard>
  )
}

export default Requests