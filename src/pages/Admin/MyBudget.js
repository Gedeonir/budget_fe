import React, { useState } from 'react'
import AdminDashboard from '../../components/AdminDashboard'
import Budgets from '../../components/Budgets'
import Banner from '../../components/Banner'

const MyBudget = () => {
    const [userData, setUserData] = useState([])
    const [loading, setLoading] = useState(false)
    return (
        <AdminDashboard setLoading={setLoading} setUserData={setUserData}>
            <Banner institution={userData} />
            <Budgets userData={userData} />
        </AdminDashboard>
    )
}

export default MyBudget