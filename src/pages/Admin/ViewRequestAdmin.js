import React, { useState } from 'react'
import AdminDashboard from '../../components/AdminDashboard'
import Request from '../../components/Request'

const ViewRequestAdmin = () => {
    const [userData,setUserData]=useState([]);
    return (
    <AdminDashboard setUserData={setUserData}>
        <Request userData={userData}/>
    </AdminDashboard>
  )
}

export default ViewRequestAdmin