import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { connect } from 'react-redux';
import { getMyBudgets } from '../../redux/Actions/BudgetActions';
import { Link, useLocation } from 'react-router-dom';
import Banner from '../../components/Banner';
import Budgets from '../../components/Budgets';

const MyBudgets = (props) => {
    const [userData, setUserData] = useState([]);

    const location = useLocation();

    return (
        <Layout setUserData={setUserData}>
            <Banner institution={userData} />
            <div className='py-4 font-bold text-text_primary text-sm flex justify-start gap-4'>
                <Link to={"/my-budgets"} className={`${location.pathname.includes("my-budgets") && 'text-secondary border-b-2 pb-2'}`}>My budgets</Link>
                <Link to={"/budget/requests"}>Requests</Link>
            </div>

            <Budgets userData={userData} />
        </Layout>
    )
}

const mapState = (data) => ({
    data: data
})

export default connect(mapState, {
    getMyBudgets
})(MyBudgets)