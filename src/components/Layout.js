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
        if(data.getProfile?.role ==="admin"){
          navigate("/signin");
        }
      }catch(error){
        if (error.response.data.message ==="Not Authorized or token expired, Please Login again") {
          navigate("/signin",{state:{data:error.response.data}});
          sessionStorage.removeItem('userToken'); 
        }
      }
    }
    useEffect(() => {
      verifyUser();
    },[])
    return (
        <div className='min-h-screen max-h-screen overflow-x-hidden bg-primary'>
          <Navbar profile={userData?.getProfile}/>
          <div className='pb-4 px-8 '>{props.children}</div>
          <Footer/>
        </div>
    )
}

export default Layout