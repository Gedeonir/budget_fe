import React, { useState } from 'react'
import Budgets from '../../components/Budgets'
import AdminDashboard from '../../components/AdminDashboard'

const AdminBudgets = () => {
    const [userData, setUserData] = useState([])
    const [loading, setLoading] = useState(false)
    const [financialYear, setFinancialYear] = useState(() => {
        const year = localStorage.getItem('financialYear');
        return year ? year : " ";
      })
    

    return (
        <AdminDashboard setLoading={setLoading} setUserData={setUserData} setFinancialYear={setFinancialYear}>
            <Budgets userData={userData} />
        </AdminDashboard>
    )
}

export default AdminBudgets