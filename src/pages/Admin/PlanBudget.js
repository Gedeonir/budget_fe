import React, { useState } from 'react'
import Banner from '../../components/Banner'
import BudgetPlanningForm from '../../components/BudgetPlanningForm'
import AdminDashboard from '../../components/AdminDashboard'

const PlanBudget = () => {
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(false)

  return (
    <AdminDashboard setLoading={setLoading} setUserData={setUserData}>
      <BudgetPlanningForm userData={userData} />
    </AdminDashboard>
  )
}

export default PlanBudget