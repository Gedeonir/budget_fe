import React, { useState } from 'react'
import Layout from '../../components/Layout';
import Request from '../../components/Request';
import { Link,useLocation } from 'react-router-dom';
import Banner from '../../components/Banner';


const ViewRequest = (props) => {
    const [userData,setUserData]=useState([]);
    const location = useLocation();

  return (
    <Layout setUserData={setUserData}>
      <Banner institution={userData?.getProfile?.institution?.institutionName}/>

      <div className='py-4 font-bold text-text_primary text-sm flex justify-start gap-4'>
        <Link to={"/my-budgets"} className={`${location.pathname.includes("my-budgets") && 'text-secondary border-b-2 pb-2'}`}>My budgets</Link>
        <Link to={"/budget/requests"} className={`${location.pathname.includes("requests") && 'text-secondary border-b-2 pb-2'}`}>Requests</Link>
      </div>
      <Request userData={userData}/>
    </Layout>

  )
}

export default ViewRequest