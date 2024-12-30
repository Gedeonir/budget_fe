import React, { useEffect, useState } from 'react'
import AdminDashboard from '../../components/AdminDashboard'
import Request from '../../components/Request'
import { connect } from 'react-redux';
import { getRequest } from '../../redux/Actions/BudgetActions';


const ViewRequestAdmin = (props) => {
    const [userData,setUserData]=useState([]);
    const [loading,setLoading]=useState(false);
    const request=props?.data?.oneRequest;
    

    const filterReviewers=request?.resp?.data?.reviewers?.filter((reviewer)=>
      reviewer?.user?.role !=='admin'
      && reviewer?.reviewerStatus?.toLowerCase() ==="approved"
      && !request?.resp?.data?.reviewers?.some(item=> item.reviewerStatus.toLowerCase() ==='request for change' || item.reviewerStatus.toLowerCase() === 'rejected') 
    );

    
    
    return (
      <AdminDashboard setLoading={setLoading} setUserData={setUserData}>
        <Request userData={userData} filterReviewers={filterReviewers}/>
      </AdminDashboard>
    )
}

const mapState=(data)=>({
    data:data
})
export default connect(mapState,{getRequest})(ViewRequestAdmin)