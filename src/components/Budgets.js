import React from 'react'
import { getMyBudgets } from '../redux/Actions/BudgetActions'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Pagination from './Pagination'
import Loading from './Loading'
import NoDataFound from './NoDataFound'
import { MdCurrencyExchange, MdDomainAdd } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { pagination } from '../utils/paginationHandler'
import Error from './Error'
import GovernmentLogo from '../assets/Govt.png';
import { AiFillDelete } from 'react-icons/ai'

const Budgets = (props) => {
    const [currentPage, setCurrentPage] = useState(0);
    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        props.getMyBudgets()
    }, [])

    const myBudgetData = props?.data?.budgets;

    const [searchWord, setSearchWord] = useState("");

    const filteredBudget = () => {
        return myBudgetData?.resp?.data?.filter((item) => item.fyi.toLowerCase().includes(searchWord.toLowerCase())
            && item?.institution?.institutionName?.toLowerCase().includes(props?.userData?.getProfile?.institution?.institutionName?.toLowerCase())
        );
    }
    const navigate=useNavigate();




    return (
        <div>
            {myBudgetData?.loading ? (
                <Loading />
            )
                :
                (myBudgetData?.success ? (
                    <>
                        <div className='relative w-full gap-2 bg-primary2 shadow-lg rounded-lg lg:px-2 px-2 py-4 max-h-screen h-full'>

                            <div className='lg:flex justify-between mb-2 items-center '>
                                <div className='relative lg:w-3/5 w-full'>
                                    <input type='search' placeholder='Search' className='py-1 px-2 border-2 outline-none border-primary w-full rounded-lg placeholder:text-text_primary placeholder:text-opacity-50' onChange={(e) => setSearchWord(e.target.value)} />
                                    {!searchWord && <IoSearchOutline size={20} className='cursor-pointer font-normal text-text_primary hover:text-list_hover delay-100 duration-500 absolute right-2 top-2' />}
                                </div>
                                <div className='text-sm text-text_primary w-full flex justify-end items-center gap-4'>
                                    <label>{filteredBudget()?.length} total budgets</label>
                                    <button type='submit' size='sm' className={`${location?.pathname?.includes("dashboard/manage") ? 'block' : 'hidden'} my-2 delay-100 duration-200 hover:bg-opacity-70 bg-secondary text-sm text-center text-primary font-bold p-2 w-1/4`}
                                        onClick={() => navigate(`/dashboard/plan-budget`)}
                                    >
                                        Plan new budget
                                    </button>
                                </div>
                            </div>
                            {filteredBudget()?.length <= 0 ? (
                                <NoDataFound />
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
                                                        {props?.userData?.getProfile?.position.toLowerCase() === "budget officer" && <th className='font-normal'></th>}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {pagination(filteredBudget, 10).length > 0 && pagination(filteredBudget, 10)[currentPage].map((item, index) => (

                                                        <tr key={index}>
                                                            <td><Link to={location.pathname.includes("dashboard") ? `/dashboard/all-budgets/${item._id}` : `/my-budgets/${item._id}`} className='text-secondary p-1'>FYI {item.fyi} Budget</Link></td>
                                                            <td className='flex w-full justify-start gap-2 cursor-pointer items-center'>
                                                                <div className='w-4 h-4 hidden lg:block'>
                                                                    <img src={GovernmentLogo} className='w-full h-full object-cover' />
                                                                </div>
                                                                <p className='p-1'>{item?.institution?.institutionName}</p>
                                                            </td>
                                                            <td>{item.amount} $</td>
                                                            <td>{new Date(item.createdAt).toLocaleDateString()} at {new Date(item.createdAt).toLocaleTimeString()}</td>
                                                            <td>
                                                                <div className={`${item.status.toLowerCase() === "approved" ? "text-success" : item.status.toLowerCase() === "rejected" ? "text-red" : item.status.toLowerCase() === "under review" ? "text-[#FBA801]" : "text-text_primary"} opacity-50} font-bold px-1 text-xs py-1 rounded-lg mx-auto`}>
                                                                    <label className={``}>
                                                                        {item.status}
                                                                    </label>
                                                                </div>

                                                            </td>
                                                            {props?.userData?.getProfile?.position.toLowerCase() === "budget officer" &&
                                                                <td className='flex justify-start gap-3'>
                                                                    <div className='group relative'>
                                                                        <AiFillDelete size={15} className='cursor-pointer  duration-300 delay-200' />
                                                                        <label className='absolute -top-6 -right-2 text-xs text-primary rounded-lg p-1 bg-text_primary hidden group-hover:block'>Remove</label>
                                                                    </div>
                                                                    <div className='group relative text-sm'>
                                                                        <MdCurrencyExchange size={15} className='cursor-pointer  duration-300 delay-200' />
                                                                        <label className='absolute -top-6 -right-2 text-xs text-primary rounded-lg p-1 bg-text_primary hidden group-hover:block'>Modify</label>
                                                                    </div>
                                                                </td>
                                                            }

                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        <Pagination
                                            length={myBudgetData?.resp?.data?.length}
                                            postsperpage={10}
                                            handlepagination={handlePagination}
                                            currentpage={currentPage}
                                        />
                                    </>
                                )}
                        </div>
                    </>
                )
                    :
                    (
                        <Error code={myBudgetData?.error?.code} message={myBudgetData?.error?.message} />
                    )
                )}
        </div>
    )
}

const mapState = (data) => ({
    data: data
})

export default connect(mapState, {
    getMyBudgets
})(Budgets)
