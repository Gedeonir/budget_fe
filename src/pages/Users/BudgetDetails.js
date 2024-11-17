import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import BudgetPlanningForm from '../../components/BudgetPlanningForm';
import { connect } from 'react-redux';
import { getBudget } from '../../redux/Actions/BudgetActions';
import { useParams } from 'react-router-dom';
import ViewBudget from '../../components/ViewBudget';

const BudgetDetails = (props) => {
    const [userData,setUserData]=useState([]);
    

  return (
    <Layout setUserData={setUserData}>
        <ViewBudget/>

    </Layout>
  )
}

const mapState=(data)=>({
    data:data
})

export default connect(mapState,{getBudget})(BudgetDetails)