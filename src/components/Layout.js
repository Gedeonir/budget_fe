import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const Layout = (props) => {
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
    }catch(error){
      navigate("/signin",{state:{data:"Not Authorized or token expired, Please Login again"}});
      sessionStorage.removeItem('userToken'); 
    }
  }
  useEffect(() => {
    verifyUser();
  },[])

    return (
        <div className='min-h-screen max-h-screen overflow-x-hidden bg-primary'>
          <Navbar profile={userData?.getProfile} setFinancialYear={props.setFinancialYear}/>
          <div className='pb-4 px-4 '>{props.children}</div>
          <Footer/>
        </div>
    )
}

export default Layout