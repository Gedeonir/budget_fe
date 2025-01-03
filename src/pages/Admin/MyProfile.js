import React, { useState } from 'react'
import Profile from '../../components/Profile';
import AdminDashboard from '../../components/AdminDashboard';

const MyProfileAdmin = () => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);

    return (
        <AdminDashboard setUserData={setUserData} setLoading={setLoading}>
            <Profile data={userData} />
        </AdminDashboard>
    )
}


export default MyProfileAdmin