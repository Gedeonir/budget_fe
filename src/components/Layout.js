import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { connect } from 'react-redux';
import { changePassword } from '../redux/Actions/usersAction';
import PasswordChangeOnFirstLoginModal from './PasswordChangeOnFirstLoginModal';

const Layout = (props) => {
  const navigate=useNavigate();
  const [userData,setUserData]=useState([]);
  const [loading,setLoading]=useState(false);
  const [succes,setSuccess]=useState(false)
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
      setSuccess(true)

      if(data?.getProfile?.role !=="user"){
        navigate("/signin");
      }
    }catch(error){
      navigate("/signin",{state:{data:"Not Authorized or token expired, Please Login again"}});
      sessionStorage.removeItem('userToken'); 
    }
  }

  useEffect(() => {
    verifyUser();
  },[props?.data?.changePassword])
  

    return (
        <div className='min-h-screen max-h-screen overflow-x-hidden bg-primary'>
          <Navbar profile={userData?.getProfile} setFinancialYear={props.setFinancialYear}/>
          {succes && !userData?.getProfile?.passwordChanged?(
            <PasswordChangeOnFirstLoginModal />
          ):(
            <div className='pb-4 px-4 '>{props.children}</div>
          )}
          <Footer/>
        </div>
    )
}

const mapState=(data)=>({
  data:data
})
export default connect(mapState,{changePassword})(Layout)