import React,{useEffect, useState} from 'react'
import Layout from '../../components/Layout'
import { Link, useLocation } from 'react-router-dom';
import RequestsList from '../../components/RequestList';
import Banner from '../../components/Banner';


const BudgetRequest = (props) => {
    const [userData,setUserData]=useState([]);
    
  return (
    <Layout setUserData={setUserData}>
        <Banner institution={userData?.getProfile?.institution?.institutionName}/>

        <div className='py-4 font-bold text-text_primary text-sm flex justify-start gap-4'>
            <Link to={"/my-budgets"} className={`${location.pathname.includes("my-budgets") && 'text-secondary border-b-2 pb-2'}`}>My budgets</Link>
            <Link to={"/budget/requests"} className={`${location.pathname.includes("requests") && 'text-secondary border-b-2 pb-2'}`}>Requests</Link>
        </div>

        <div className='flex justify-start items-center py-2 text-text_primary'>
            <div className='text-center w-full'>
                <h1 className='font-bold py-4 mb-2'>Welcome to Request</h1>
                <p>
                    Budget request helps you to collaborate on budget with other people.
                    As budget requests are created, they’ll appear here in a searchable and filterable list.
                    To get started, you should create a request.
                </p>
            </div>
            
        </div>
        
        <RequestsList userData={userData}/>


    </Layout>
  )
}


export default BudgetRequest