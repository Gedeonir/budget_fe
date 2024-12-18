import React, { useState } from 'react'
import Banner from '../../components/Banner'
import ViewBudget from '../../components/ViewBudget'
import AdminDashboard from '../../components/AdminDashboard'
ViewBudget
const ViewBudgetDetails = () => {
    const [userData,setUserData]=useState([])
    const [loading,setLoading]=useState(false)
  return (
    <AdminDashboard setLoading={setLoading} setUserData={setUserData}>
        <ViewBudget/>
    </AdminDashboard>
  )
}

export default ViewBudgetDetails