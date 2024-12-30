import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5';
import { RiFilter3Line } from 'react-icons/ri';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { allTransactions } from '../redux/Actions/BudgetActions';
import AddTransaction from './AddTransaction';
import Pagination from './Pagination';
import Loading from './Loading';
import NoDataFound from './NoDataFound';
import Error from './Error';
import { pagination } from '../utils/paginationHandler';
import { handleDownload } from '../pages/Admin/Reports';
const Transactions = (props) => {
    const [searchWord, setSearchWord] = useState("");
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(0)

    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const transactions = props.data.allTransactions;
    useEffect(() => {
        props.allTransactions()
    }, [])

    const filteredTransactionsBo = () => {
        return transactions?.resp?.data?.filter((item) => {
            const itemDate = new Date(item.createdAt)

            return item.transactionDescription.toLowerCase().includes(searchWord.toLowerCase())
                && item?.institution?.institutionName?.toLowerCase().includes(props.userData?.getProfile?.institution?.institutionName?.toLowerCase())
                && ((dateData.endDate !== "" && dateData.startDate !== "") ? itemDate >= new Date(dateData.startDate) && itemDate <= new Date(dateData.endDate) : true)
        });
    }

    const [dateData, setDateData] = useState({
        startDate: "",
        endDate: ""
    })

    const handleDatesChange = (e) => {
        setDateData({ ...dateData, [e.target.name]: e.target.value })
    }

    const [docType, setDocType] = useState('pdf')


    return (
        <section className='w-full'>
            <div className='py-4 font-bold text-text_primary w-full overflow-x-hidden text-sm'>
                <p>Transaction History</p>
            </div>

            <div className={`w-full bg-primary2 rounded-lg shadow-lg px-4 py-4 relative ${location.hash.includes("add-transaction") && "min-h-screen"}`}>
                <div className='lg:flex justify-between items-center'>
                    <div className='lg:flex justify-start gap-2 lg:w-3/5 w-full'>
                        <div className='relative lg:w-3/5 w-full  lg:mb-0 mb-4'>
                            <input value={searchWord} onChange={(e) => setSearchWord(e.target.value)} type='search' placeholder='Search request' className='py-1 px-2 border-2 outline-none border-primary w-full rounded-lg placeholder:text-text_primary placeholder:text-opacity-50' />
                            {!searchWord && <IoSearchOutline size={20} className='cursor-pointer font-normal text-text_primary hover:text-list_hover delay-100 duration-500 absolute right-4 top-2' />}
                        </div>
                        {props?.userData?.getProfile?.position?.toLowerCase() === "budget officer" &&
                            <div className='text-primary rounded-lg lg:mb-0 mb-4 '>
                                <button className='text-sm bg-secondary rounded-lg w-full px-4 py-2 cursor-pointer' onClick={() => { navigate('/#add-transaction') }}>Add transaction</button>
                            </div>
                        }
                    </div>



                    <div className='lg:w-28 w-full relative group flex lg:justify-end justify-between gap-4 rounded-lg text-text_primary text-center cursor-pointer hover:text-list_hover duration-200 delay-100'>
                        <label className='text-xs'>Latest</label>
                        <p><RiFilter3Line size={20} /></p>
                        <div className='bg-primary2 shadow-lg absolute top-5 w-full right-0 hidden group-hover:block py-2'>
                            <ul className='list-none text-text_primary -ml-6 text-xs'>
                                <li className='p-2 hover:text-list_hover duration-500 delay-100 cursor-pointer bg-primary'>Latest</li>
                                <li className='p-2 hover:text-list_hover duration-500 delay-100 cursor-pointer'>Alphabet(A-Z)</li>
                                <li className='p-2 hover:text-list_hover duration-500 delay-100 cursor-pointer'>Oldest</li>
                            </ul>
                        </div>

                    </div>
                </div>

                <div className='w-full my-4 lg:flex justify-between py-2'>
                    <div className='lg:w-1/4 w-full flex justify-start gap-2 items-center'>
                        <div className='text-xs text-text_primary w-full'>
                            <label>From</label>
                            <input type='date' onChange={handleDatesChange} name='startDate' className='py-2 px-2 border-2 outline-none border-primary w-full rounded-lg placeholder:text-text_primary placeholder:text-opacity-50' />
                        </div>

                        <div className='text-xs text-text_primary w-full'>
                            <label>To</label>
                            <input type='date' min={dateData.startDate} onChange={handleDatesChange} name='endDate' className='py-2 px-2 border-2 outline-none border-primary w-full rounded-lg placeholder:text-text_primary placeholder:text-opacity-50' />
                        </div>


                    </div>

                    <div className='text-primary rounded-lg flex justify-end gap-2 lg:w-1/4 w-full'>
                        <select size={'sm'} name='title' value={docType} className='border w-full h-8 px-2 text-text_primary rounded-lg border-text_primary border-opacity-40' onChange={(e) => { setDocType(e.target.value) }} required>
                            <option value={"pdf"}>PDF</option>
                            <option value={"excel"}>Excel</option>

                        </select>
                        <button className='text-sm bg-secondary rounded-lg w-full px-2 py-1 h-8' onClick={() => { handleDownload(dateData.startDate, dateData.endDate, props?.userData, docType) }}>Export</button>
                    </div>
                </div>
                <table border={10} cellSpacing={0} cellPadding={10} className='my-4 lg:text-sm text-xs w-full py-4 text-text_primary text-left px-2 lg:px-4'>
                    <thead className='bg-primary font-bold'>
                        <tr>
                            <th>Transaction name</th>
                            <th>Budget</th>
                            <th>Date</th>
                            <th>Transaction Type</th>
                            <th>Amount Paid</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions?.loading ? (
                            <tr>
                                <td colSpan={5} className='text-center'><Loading /></td>
                            </tr>
                        ) : (
                            transactions?.success ? (
                                filteredTransactionsBo()?.length <= 0 ? (
                                    <tr>
                                        <td colSpan={5} className='text-center'><NoDataFound /></td>
                                    </tr>
                                ) : (
                                    pagination(filteredTransactionsBo, 10)?.length > 0 && pagination(filteredTransactionsBo, 10)[currentPage]?.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className=''>{item.category}</td>
                                                <td>FYI {item.budget.fyi}</td>
                                                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                                <td><span className={`p-1 ${item.type.toLowerCase() == 'expense' ? 'text-red border-red' : ' border-success text-success'} rounded-lg`}>{item.type}</span></td>
                                                <td className={`${item.type.toLowerCase() == 'expense' ? 'text-red' : 'text-success'}`}>{item.type.toLowerCase() == 'expense' ? "-" : "+"}{item.amount} $</td>
                                            </tr>
                                        )
                                    })


                                )

                            ) : (
                                <tr>
                                    <td colSpan={5} className='text-center'><Error code={transactions?.error?.code} message={transactions?.error?.message} /></td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>

                <Pagination
                    length={filteredTransactionsBo()?.length}
                    postsperpage={20}
                    handlepagination={handlePagination}
                    currentpage={currentPage}
                />

                {location.hash.includes("add-transaction") && <AddTransaction userData={props.userData} />}
            </div>


        </section>
    )
}

const mapState = (data) => ({
    data: data
})

export default connect(mapState, { allTransactions })(Transactions)