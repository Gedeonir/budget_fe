import { useState } from 'react'
import React from 'react'
import AdminDashboard from '../../components/AdminDashboard'
import BudgetPlanningForm from '../../components/BudgetPlanningForm';

const BudgetPlanning = () => {
    const [userData,setUserData]=useState([]);

  return (
    <AdminDashboard setUserData={setUserData}>
        <BudgetPlanningForm />
    </AdminDashboard>
  )
}

export default BudgetPlanning