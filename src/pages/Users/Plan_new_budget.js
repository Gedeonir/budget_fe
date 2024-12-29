import React, { useState,useEffect } from 'react'
import Layout from '../../components/Layout'
import BudgetPlanningForm from '../../components/BudgetPlanningForm';
import Banner from '../../components/Banner';

const Plan_new_budget = () => {
    const [userData,setUserData]=useState([]);

 
    useEffect(() => {
        if (userData.length > 0 && userData?.getProfile?.position?.toLowerCase() !== 'budget officer') {
          handleLogout()
          navigate("/signin")
        }
      }, [userData])
    return (
        <Layout setUserData={setUserData}>
            <Banner institution={userData}/>

            <BudgetPlanningForm userData={userData}/>
        </Layout>
    )
}

export default Plan_new_budget