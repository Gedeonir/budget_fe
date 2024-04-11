import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate=useNavigate();
    const [userData,setUserData]=useState([]);
  
    const verifyUser=async()=>{
      const getProfile=await axios.get(`${process.env.BACKEND_URL}/users/one/about`,
      {
          headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${sessionStorage.getItem('userToken')}`
          }
      });
      const {data}=getProfile;
      setUserData(data);
      if(data.getProfile?.role !=="admin"){
        navigate("/signin");
      }
    }
  
    console.log(userData);
    useEffect(() => {
        verifyUser();
    },[])
  return (
    <div>Home Admin</div>
  )
}

export default Home