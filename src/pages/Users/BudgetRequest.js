import React,{useEffect, useState} from 'react'
import Layout from '../../components/Layout'
import { Link, useLocation } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';
import { connect } from 'react-redux';
import { getRequests } from '../../redux/Actions/BudgetActions';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import { pagination } from '../../utils/paginationHandler';
import Pagination from '../../components/Pagination';
import NoDataFound from '../../components/NoDataFound';
import { FaRegMessage } from "react-icons/fa6";

const BudgetRequest = (props) => {
    const [userData,setUserData]=useState([]);
    const location=useLocation();
    const [searchWord,setSearchWord]=useState("");

    const [currentPage,setCurrentPage]=useState(0);
    const handlePagination = (pageNumber) => {
        setCurrentPage (pageNumber);
    };

    useEffect(()=>{
        props.getRequests();
    },[])

    const allRequests=props?.data?.allRequest;
    const [section,setSection]=useState("");

    const filteredRequests=()=>{
        return allRequests?.resp?.data?.filter((item)=>item.budget.fyi.toLowerCase().includes(searchWord.toLowerCase()) && item.budget.institution._id.toLowerCase().includes(userData?.getProfile?.institution?._id?.toLowerCase()) && item.status.toLowerCase().includes(section.toLowerCase()));
    }


  return (
    <Layout setUserData={setUserData}>
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

        <div className='relative w-full gap-2 bg-primary2 shadow-lg rounded-lg lg:px-8 px-2 py-2 max-h-screen h-full'>
            <div className='lg:flex justify-between mb-2 items-center gap-4'>
                <ul className='list-none flex justify-start gap-4 -mx-4 w-full font-semibold text-sm'>
                    <li onClick={()=>setSection("all")} className={`${section.toLowerCase()==""?'text-secondary':'text-text_primary'} cursor-pointer hover:text-secondary transition-all duration-300 delay-100`}>All</li>
                    <li onClick={()=>setSection("pending")} className={`${section.toLowerCase()=="pending"?'text-secondary':'text-text_primary'} cursor-pointer hover:text-secondary transition-all duration-300 delay-100`}>Pending</li>
                    <li onClick={()=>setSection("approved")} className={`${section.toLowerCase()=="approved"?'text-secondary':'text-text_primary'} cursor-pointer hover:text-secondary transition-all duration-300 delay-100`}>Approved</li>
                    <li onClick={()=>setSection("declined")} className={`${section.toLowerCase()=="declined"?'text-secondary':'text-text_primary'} cursor-pointer hover:text-secondary transition-all duration-300 delay-100`}>Declined</li>
                </ul>
                <div className='relative w-4/5 mb-4'>
                    <input type='search' placeholder='Search' className='py-1 px-2 border-2 outline-none border-primary w-full rounded-lg placeholder:text-text_primary placeholder:text-opacity-50' onChange={(e)=>setSearchWord(e.target.value)}/>
                    {!searchWord && <IoSearchOutline size={20} className='cursor-pointer font-normal text-text_primary hover:text-list_hover delay-100 duration-500 absolute right-2 top-2'/>}
                </div>

                <Link to={"new"} className={`mb-4 text-xs bg-secondary text-center text-primary font-bold p-2 w-1/5`}>
                    New request
                </Link>
            </div>
            {allRequests?.loading?(
                <Loading/>
            )
            :
            (allRequests?.success?(
                filteredRequests().length <=0?(
                   <NoDataFound/>                   
                )
                :
                (
                    <div className='w-full'>
                        {pagination(filteredRequests,10).length>0 && pagination(filteredRequests,10)[currentPage].map((item,index)=>(

                            <div key={index} className=' text-text_primary w-full flex justify-between items-center px-2 py-2'>
                                <div className='flex justify-start gap-4 items-start'>
                                    <input required type='checkbox' name='confirm' className="text-text_secondary rounded-lg outline-primary px-4 my-1 border border-text_primary border-opacity-40 placeholder-text_primary cursor-pointer"/>

                                    <div>
                                        <Link to={`/budget/requests/${item._id}`} className='font-bold text-secondary cursor-pointer'>FYI {item.budget.fyi} Budget</Link>
                                        <p className='font-light text-xs'>opened on {new Date(item.createdAt).toLocaleDateString()} at {new Date(item.createdAt).toLocaleTimeString()} by {item.budget.institution.institutionName} </p>
                                    </div>
                                </div>

                                <div className='flex justify-end items-center gap-2'>
                                    <FaRegMessage size={15} className='cursor-pointer hover:text-secondary delay-100 duration-300'/>
                                    <label className='text-sm'>{item.comment.length}</label>
                                </div>
                                
                            </div>
                        ))}
                            

                        <Pagination
                            length={allRequests?.resp?.data?.length}
                            postsPerPage={10}
                            handlePagination={handlePagination}
                            currentPage={currentPage}
                        />
                    </div>


                )
            )
            :
            (
                <Error code={allRequests?.error?.code} message={allRequests?.error?.message}/>
            )
            )}
        </div>


    </Layout>
  )
}

const mapState=(data)=>({
    data:data
})

export default connect(mapState,{getRequests}) (BudgetRequest)