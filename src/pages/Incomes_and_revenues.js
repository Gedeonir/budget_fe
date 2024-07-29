import React, { useState } from 'react'
import Layout from '../components/Layout'

const Incomes_and_revenues = () => {
    const [userData,setUserData]=useState([]);
console.log("userData");
    return (
        <Layout setUserData={setUserData}>

        </Layout>
    )
}

export default Incomes_and_revenues