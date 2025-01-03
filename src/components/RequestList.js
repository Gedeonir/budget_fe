import React,{useEffect, useState} from 'react'
import { Link, useLocation } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';
import { connect } from 'react-redux';
import { getRequests } from '../redux/Actions/BudgetActions';
import Loading from './Loading';
import Error from './Error';
import { pagination } from '../utils/paginationHandler';
import Pagination from './Pagination';
import NoDataFound from './NoDataFound';
import { FaRegMessage } from "react-icons/fa6";

const RequestsList = (props) => {
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
        return allRequests?.resp?.data?.filter((item)=>
            item?.budget?.fyi?.toLowerCase().includes(searchWord.toLowerCase()) 
            && item?.budget?.institution?._id?.toLowerCase().includes(location.pathname.includes("dashboard")?"":props?.userData?.getProfile?.institution?._id?.toLowerCase()) 
            && item?.status?.toLowerCase().includes(section.toLowerCase()));
    }



  return (
    <div>
        <div className='relative w-full gap-2 bg-primary2 shadow-lg rounded-lg lg:px-8 px-2 py-2 max-h-screen h-full'>
            <div className='lg:flex justify-between mb-2 items-center gap-4'>
                <ul className='list-none flex justify-start gap-4 -mx-4 w-full font-semibold text-sm'>
                    <li onClick={()=>setSection("")} className={`${section.toLowerCase()==""?'text-secondary':'text-text_primary'} cursor-pointer hover:text-secondary transition-all duration-300 delay-100`}>
                        All 
                    </li>
                    <li onClick={()=>setSection("open")} className={`${section.toLowerCase()=="pending"?'text-secondary':'text-text_primary'} cursor-pointer hover:text-secondary transition-all duration-300 delay-100`}>Open</li>
                    <li onClick={()=>setSection("approved")} className={`${section.toLowerCase()=="approved"?'text-secondary':'text-text_primary'} cursor-pointer hover:text-secondary transition-all duration-300 delay-100`}>Approved</li>
                    <li onClick={()=>setSection("rejected")} className={`${section.toLowerCase()=="rejected"?'text-secondary':'text-text_primary'} cursor-pointer hover:text-secondary transition-all duration-300 delay-100`}>Declined</li>
                    <li onClick={()=>setSection("closed")} className={`${section.toLowerCase()=="closed"?'text-secondary':'text-text_primary'} cursor-pointer hover:text-secondary transition-all duration-300 delay-100`}>Closed</li>

                </ul>
                <div className='relative w-4/5 mb-4'>
                    <input type='search' placeholder='Search' className='py-1 px-2 border-2 outline-none border-primary w-full rounded-lg placeholder:text-text_primary placeholder:text-opacity-50' onChange={(e)=>setSearchWord(e.target.value)}/>
                    {!searchWord && <IoSearchOutline size={20} className='cursor-pointer font-normal text-text_primary hover:text-list_hover delay-100 duration-500 absolute right-2 top-2'/>}
                </div>

                {props?.userData?.getProfile?.position?.toLowerCase() === "budget officer" &&
                    <Link to={"new"} className={`mb-4 text-xs bg-secondary text-center text-primary font-bold p-2 w-1/5`}>
                        New request
                    </Link>
                }
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
                                <div className='flex justify-start gap-4 items-center'>
                                    <input required type='checkbox' name='confirm' className="text-text_secondary rounded-lg outline-primary px-4 my-1 border border-text_primary border-opacity-40 placeholder-text_primary cursor-pointer"/>

                                    <div>
                                        <Link to={`${location.pathname.includes("dashboard")?`/dashboard/budget/requests/${item._id}`:`/budget/requests/${item._id}`}`} className='font-bold text-secondary cursor-pointer'>FYI {item.budget.fyi} Budget</Link>
                                        <p className='font-light text-xs'>opened on {new Date(item.createdAt).toLocaleDateString()} at {new Date(item.createdAt).toLocaleTimeString()} by {item.budget.institution.institutionName} </p>
                                    </div>

                                    <label className={`${item.status ==='approved'?'border-success text-success':item.status === 'rejected'?'border-red text-red':item.status === 'open'?'border-secondary text-secondary':'border-text_primary text-text_primary'} border text-primary2 font-bold px-2 text-xs rounded-md`}>{item.status}</label>

                                </div>

                                <div className='flex justify-end items-center gap-2'>
                                    <FaRegMessage size={15} className='cursor-pointer hover:text-secondary delay-100 duration-300'/>
                                    <label className='text-sm'>{item.comment.length}</label>
                                </div>
                                
                            </div>
                        ))}
                            

                        <Pagination
                            length={allRequests?.resp?.data?.length}
                            postsperpage={10}
                            handlepagination={handlePagination}
                            currentpage={currentPage}
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
    </div>
  )
}

const mapState=(data)=>({
    data:data
})

export default connect(mapState,{getRequests}) (RequestsList)