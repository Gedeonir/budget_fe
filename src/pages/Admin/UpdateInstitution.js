import React,{useState} from 'react'
import AdminDashboard from '../../components/AdminDashboard';

const UpdateInstitution = () => {
    const [userData,setUserData]=useState([]);

  return (
    <AdminDashboard setUserData={userData}>

    </AdminDashboard>
  )
}

export default UpdateInstitution