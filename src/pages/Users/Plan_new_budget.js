import React, { useState,useEffect } from 'react'
import Layout from '../../components/Layout'
import { AiFillDelete } from "react-icons/ai";
import { TbEditCircle } from "react-icons/tb";
import { MdDomainAdd } from "react-icons/md";
import {AiOutlineLoading3Quarters} from "react-icons/ai"
import { RiAddCircleFill } from "react-icons/ri";
import { IoWallet } from "react-icons/io5";
import { Link } from 'react-router-dom';
import AddExpenses from '../../components/AddExpenses';
import getAcademicYears from '../../utils/AcademicYears';
import BudgetPlanningForm from '../../components/BudgetPlanningForm';
import Banner from '../../components/Banner';

const Plan_new_budget = () => {
    const [userData,setUserData]=useState([]);
    const [loading,setLoading]=React.useState(false);
    const [academicYear,setAcademiYears]=useState(getAcademicYears());
    const [openModal,setOpenModal]=useState(false);

 

    return (
        <Layout setUserData={setUserData}>
            <Banner institution={userData}/>

            <BudgetPlanningForm userData={userData}/>
        </Layout>
    )
}

export default Plan_new_budget