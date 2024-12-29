import React, { useEffect,useState } from 'react'
import AdminDashboard from '../../components/AdminDashboard';
import { Link, useLocation } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';
import GovernmentLogo from '../../assets/Govt.png';
import {IoIosNotificationsOutline} from "react-icons/io"
import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";
import { MdCurrencyExchange } from "react-icons/md";
import Pagination from '../../components/Pagination';
import { connect } from 'react-redux';
import { getRequests } from '../../redux/Actions/BudgetActions';
import RequestList from '../../components/RequestList';


const Requests = (props) => {
    const [userData,setUserData]=useState([]);
    const location=useLocation();
    const [section,setSection]=useState("All");
    const [currentPage,setCurrentPage]=useState(0);
    const [loading,setLoading]=useState(false)
    const handlePagination = (pageNumber) => {
        setCurrentPage (pageNumber);
    };

    const allRequests=props?.data?.allRequest;

    useEffect(() => {
        if (userData.length > 0 && userData?.getProfile?.position?.toLowerCase() !== 'budget officer') {
          handleLogout()
          navigate("/signin")
        }
      }, [userData])

  return (
    <AdminDashboard setLoading={setLoading} setUserData={setUserData}>
        <div className='py-4 font-bold text-text_primary w-full overflow-x-hidden'>
            <p>Budget Requests</p>
        </div>
        <RequestList userData={userData}/>

    </AdminDashboard>
  )
}

const mapState=(data)=>({data:data})

export default connect(mapState,{getRequests}) (Requests)