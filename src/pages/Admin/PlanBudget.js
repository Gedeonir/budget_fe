import React from 'react'
import Banner from '../../components/Banner'
import BudgetPlanningForm from '../../components/BudgetPlanningForm'
import AdminDashboard from '../../components/AdminDashboard'

const PlanBudget = () => {
  return (
    <AdminDashboard setUserData={setUserData}>
        <Banner institution={userData?.getProfile?.institution?.institutionName}/>

        <BudgetPlanningForm userData={userData}/>
    </AdminDashboard>
  )
}

export default PlanBudget