import React, { useEffect,useState } from 'react'
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getRequest } from '../../redux/Actions/BudgetActions';
import Layout from '../../components/Layout';

const ViewRequest = (props) => {
    const params=useParams();

    const Request=props?.data?.oneRequest;

    useEffect(()=>{
        props.getRequest(params.id);
    },[])
    const [userData,setUserData]=useState([]);

    

  return (
    <Layout setUserData={setUserData}>
        <div className='text-text_primary w-full'>
            <h1 className='font-bold py-4 mb-2'>Welcome to Request</h1>
        </div>

        <section className='grid grid-cols-5 gap-2 w-full'>

            <div className='col-span-4 w-full gap-2 bg-primary2 shadow-lg rounded-lg lg:px-8 px-2 py-2 max-h-screen h-full'>

            </div>

        </section>
            
    </Layout>

  )
}

const mapState=(data)=>({data:data})

export default connect(mapState,{getRequest}) (ViewRequest)