import React, { useEffect,useState } from 'react'
import Layout from '../../components/Layout'
import GovernmentLogo from '../../assets/Govt.png';
import Pagination from '../../components/Pagination';
import { AiFillDelete } from "react-icons/ai";
import { TbEditCircle } from "react-icons/tb";
import { IoSearchOutline } from 'react-icons/io5';
import { MdDomainAdd } from "react-icons/md";
import { connect } from 'react-redux';
import { getMyBudgets } from '../../redux/Actions/BudgetActions';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import NoDataFound from '../../components/NoDataFound';
import { pagination } from '../../utils/paginationHandler';
import { Link, useLocation } from 'react-router-dom';
import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";
import { MdCurrencyExchange } from "react-icons/md";

const MyBudgets = (props) => {
    const [userData,setUserData]=useState([]);
    const [currentPage,setCurrentPage]=useState(0);
    const handlePagination = (pageNumber) => {
        setCurrentPage (pageNumber);
    };

    useEffect(()=>{
        props.getMyBudgets()
    },[])

    const myBudgetData=props?.data?.budgets;

    const [searchWord,setSearchWord]=useState("");

    const filteredBudget=()=>{
        return myBudgetData?.resp?.data?.filter((item)=>item.fyi.toLowerCase().includes(searchWord.toLowerCase()) && item.institution.institutionName.toLowerCase().includes(userData?.getProfile?.institution?.institutionName.toLowerCase()));
    }

    const location=useLocation();
    
    

   
    

    return (
        <Layout setUserData={setUserData}>
            <div className='py-4 font-bold text-text_primary text-sm flex justify-start gap-4'>
                <Link to={"/my-budgets"} className={`${location.pathname.includes("my-budgets") && 'text-secondary border-b-2 pb-2'}`}>My budgets</Link>
                <Link to={"/budget/requests"}>Requests</Link>
            </div>
            {myBudgetData?.loading?(
                <Loading/>
            )
            :
            (myBudgetData?.success?(
                <div className='relative w-full gap-2 bg-primary2 shadow-lg rounded-lg lg:px-8 px-2 py-4 max-h-screen h-full'>

                    <div className='lg:flex justify-between mb-2 items-center '>
                        <div className='text-sm text-text_primary w-full flex justify-between'>
                            <label>{filteredBudget().length} total budgets</label>

                            <div className='flex items-center justify-end mx-4'>
                                <div className='p-2 bg-secondary rounded-lg text-primary2 text-center cursor-pointer hover:opacity-50 duration-200 delay-100'>
                                    <p><MdDomainAdd size={20}/></p>
                                </div>

                                
                            </div>  
                        </div>

                        <div className='relative lg:w-2/5 w-full'>
                            <input type='search' placeholder='Search' className='py-1 px-2 border-2 outline-none border-primary w-full rounded-lg placeholder:text-text_primary placeholder:text-opacity-50' onChange={(e)=>setSearchWord(e.target.value)}/>
                            {!searchWord && <IoSearchOutline size={20} className='cursor-pointer font-normal text-text_primary hover:text-list_hover delay-100 duration-500 absolute right-2 top-2'/>}
                        </div>
                        
                        
                    </div>
                    {filteredBudget().length <=0?(
                        <NoDataFound/>
                    )
                    :
                    (
                    <>
                        <div className='gap-4 w-full overflow-x-auto'>
                            <table border={10} cellSpacing={0} cellPadding={10} className='my-4 lg:text-sm text-xs w-full py-4 text-text_primary text-left px-2 lg:px-4'>
                                <thead className='bg-primary'>
                                    <tr>
                                        <th className='font-normal'>Name</th>
                                        <th className='font-normal'>Budget Owner</th>
                                        <th className='font-normal'>Budget proposed</th>
                                        <th className='font-normal'>Time sent</th>
                                        <th className='font-normal'>Status</th>
                                        <th className='font-normal'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {pagination(filteredBudget,10).length>0 && pagination(filteredBudget,10)[currentPage].map((item,index)=>(

                                    <tr key={index}>
                                        <td>FYI {item.fyi} Budget</td>
                                        <td className='flex w-full justify-start gap-2 cursor-pointer items-center'>
                                            <div className='w-4 h-4 hidden lg:block'>
                                                <img src={GovernmentLogo} className='w-full h-full object-cover'/>
                                            </div>
                                            <Link className='text-secondary p-1'>{item.institution.institutionName}</Link>
                                        </td>
                                        <td>{item.amount} $</td>
                                        <td>{new Date(item.createdAt).toLocaleDateString()} at {new Date(item.createdAt).toLocaleTimeString()}</td>
                                        <td>
                                            <div className={`${item.status ==='approved'?'text-success':item.status === 'rejected'?'text-red':item.status === 'pending'?'text-[#FBA801]':'text-text_primary'} font-bold px-1 text-xs py-1 rounded-lg mx-auto`}>
                                                <label className={``}>
                                                    {item.status}
                                                </label> 
                                            </div>
                                            
                                        </td>
                                        <td className='flex justify-start gap-3'>
                                            <div className='group relative'>
                                                <AiFillDelete size={15} className='text-red cursor-pointer  duration-300 delay-200'/>
                                                <label className='absolute -top-6 -right-2 text-xs text-primary rounded-lg p-1 bg-red hidden group-hover:block'>Remove</label>
                                            </div>
                                            <div className='group relative text-sm'>
                                                <MdCurrencyExchange size={15} className='text-secondary cursor-pointer  duration-300 delay-200'/>
                                                <label className='absolute -top-6 -right-2 text-xs text-primary rounded-lg p-1 bg-secondary hidden group-hover:block'>Modify</label>
                                            </div>
                                        </td>
                                        
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                        <Pagination
                            length={myBudgetData?.resp?.data?.length}
                            postsPerPage={10}
                            handlePagination={handlePagination}
                            currentPage={currentPage}
                        />
                    </>
                    )}
                </div>
            )
            :
            (
                <Error code={myBudgetData?.error?.code} message={myBudgetData?.error?.message}/>
            )
            )}
        </Layout>
    )
}

const mapState=(data)=>({
    data:data
})

export default connect(mapState,{
    getMyBudgets
})(MyBudgets)