import React, { useState } from 'react'
import Layout from '../../components/Layout'
import Profile from '../../components/Profile';

const MyProfile = () => {
    const [userData, setUserData] = useState([]);

    return (
        <Layout setUserData={setUserData}>
            <Profile data={userData} />
        </Layout>
    )
}


export default MyProfile