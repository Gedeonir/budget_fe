import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';
import { RiFilter3Line } from "react-icons/ri";
import { connect } from 'react-redux';
import { viewCategories } from '../redux/Actions/BudgetActions';
import Pagination  from './Pagination';
import Loading from './Loading';
import Error from './Error';
import NoDataFound from './NoDataFound';
import { pagination } from '../utils/paginationHandler';
import AddExpenseOrIncomeCategory from './AddExpenseOrIncomeCategory';


const CategoriesModal = (props) => {
    const [searchCategories, setSearchCategories] = useState("");
    const location=useLocation();
    const navigate=useNavigate();
    const [currentPage,setCurrentPage]=useState(0)
    
      const handlePagination = (pageNumber) => {
        setCurrentPage (pageNumber);
      };

    const categories = props?.data?.categories;
    const myFilteredCategories = () => {
        return categories?.resp?.data?.filter((item) => item?.category?.toLowerCase().includes(searchCategories.toLowerCase())
            && item?.institution?.institutionName?.toLowerCase().includes(props?.userData?.getProfile?.institution?.institutionName?.toLowerCase())
        )
    }
    

    useEffect(() => {
        props.viewCategories();
    }, [categories.success,props?.data?.addCategory.success]);

    return (
        <div className={`relative w-full bg-primary2 rounded-lg shadow-lg px-4 py-4 ${location.hash.includes("add-category") && "min-h-96"}`}>
            <div className='lg:flex items-center justify-between mb-2'>
                <div className='lg:flex items-center justify-start gap-4 lg:w-3/5 w-full'>
                    <div className='relative lg:w-3/5 w-full  lg:mb-0 mb-4'>
                        <input value={searchCategories} onChange={(e) => setSearchCategories(e.target.value)} type='search' placeholder='Search request' className='py-1 px-2 border-2 outline-none border-primary w-full rounded-lg placeholder:text-text_primary placeholder:text-opacity-50' />
                        {!searchCategories && <IoSearchOutline size={20} className='cursor-pointer font-normal text-text_primary hover:text-list_hover delay-100 duration-500 absolute right-4 top-2' />}
                    </div>
                    <div className='text-primary rounded-lg lg:mb-0 mb-4 '>
                        <button className='text-sm bg-secondary rounded-lg w-full px-4 py-2 cursor-pointer' onClick={() => { navigate('#add-category') }}>Add category</button>
                    </div>
                </div>

                <div className='lg:w-1/5 w-full relative group flex lg:justify-end justify-between gap-4 rounded-lg text-text_primary text-center cursor-pointer hover:text-list_hover duration-200 delay-100'>
                    <label className='text-xs'>All categories</label>
                    <p><RiFilter3Line size={20} /></p>
                    <div className='bg-primary2 shadow-lg absolute top-5 w-full right-0 hidden group-hover:block py-2'>
                        <ul className='list-none text-text_primary -ml-6 text-xs'>
                            <li className='p-2 hover:text-list_hover duration-500 delay-100 cursor-pointer bg-primary'>All categories</li>
                            <li className='p-2 hover:text-list_hover duration-500 delay-100 cursor-pointer'>Income</li>
                            <li className='p-2 hover:text-list_hover duration-500 delay-100 cursor-pointer'>Expenses</li>
                        </ul>
                    </div>

                </div>
            </div>


            <table border={10} cellSpacing={0} cellPadding={10} className='my-4 lg:text-sm text-xs w-full py-4 text-text_primary text-left px-2 lg:px-4 '>
                <thead className='bg-primary font-bold'>
                    <tr>
                        <th>Category name</th>
                        <th>Category type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories?.loading ? (
                        <tr>
                            <td colSpan={5} className='text-center'><Loading /></td>
                        </tr>
                    ) : (
                        categories?.success ? (
                            myFilteredCategories()?.length <= 0 ? (
                                <tr>
                                    <td colSpan={5} className='text-center'><NoDataFound /></td>
                                </tr>
                            ) : (
                                pagination(myFilteredCategories, 10)?.length > 0 && pagination(myFilteredCategories, 10)[currentPage]?.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className=''>{item.category}</td>
                                            <td><span className={`p-1 ${item.type.toLowerCase() == 'expense' ? 'text-red border-red' : ' border-success text-success'} rounded-lg`}>{item.type}</span></td>
                                        </tr>
                                    )
                                })
                            )

                        ) : (
                            <tr>
                                <td colSpan={5} className='text-center'><Error code={categories?.error?.code} message={categories?.error?.message} /></td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>

            <Pagination
                length={myFilteredCategories()?.length}
                postsperpage={10}
                handlepagination={handlePagination}
                currentpage={currentPage}
            />

            {location.hash.includes("add-category") && <AddExpenseOrIncomeCategory userData={props?.userData} institution={props.userData?.getProfile?.institution} />}
        </div>
    )
}

const mapState = (data) => ({
    data: data
})

export default connect(mapState,{viewCategories})(CategoriesModal)