import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowTrendDown } from "react-icons/fa6";
import { MdCurrencyExchange, MdDomainAdd, MdEditNote } from "react-icons/md";
import BarCharts from '../../components/BarCharts';
import { IoCashSharp, IoSearchOutline, IoWallet } from "react-icons/io5";
import AdminDashboard from '../../components/AdminDashboard';
import { connect } from 'react-redux';
import { allTransactions, getMyBudgets, getRequests, viewCategories } from '../../redux/Actions/BudgetActions';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import NoDataFound from '../../components/NoDataFound';
import GovernmentLogo from '../../assets/Govt.png';
import { io } from "socket.io-client";
import Banner from '../../components/Banner';
import Officials from './Officials';
import Institutions from './Institutions';
import { TiTick } from 'react-icons/ti';
import { MdOutlineCallReceived } from "react-icons/md";
import { MdBlock } from "react-icons/md";
import { AiFillDelete } from 'react-icons/ai';
import Pagination from '../../components/Pagination';
import { RiFilter3Line } from 'react-icons/ri';
import AddTransaction from '../../components/AddTransaction';
import { pagination } from '../../utils/paginationHandler';
import AddExpenseOrIncomeCategory from '../../components/AddExpenseOrIncomeCategory';
import CategoriesModal from '../../components/CategoriesModal';
import Transactions from '../../components/Transactions';



function Dashboard(props) {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [searchWord, setSearchWord] = useState("")
  const [searchBudget, setSearchBudget] = useState("")
  const [searchCategories, setSearchCategories] = useState("")
  const [currentPage, setCurrentPage] = useState(0)
  const hour = new Date().getHours()

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };



  function groupTransactionsByDate(transactions) {
    const grouped = {};

    function getMonthName(monthIndex) {
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      return monthNames[monthIndex];
    }

    transactions?.forEach(transaction => {
      // Extract and format the date
      const dateObj = new Date(transaction.createdAt);
      const formattedDate = `${getMonthName(dateObj.getMonth())} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;

      if (!grouped[formattedDate]) {
        grouped[formattedDate] = {
          date: formattedDate,
          transactions: []
        };
      }

      grouped[formattedDate].transactions.push(transaction);
    });

    // Convert the object to an array sorted by date
    const result = Object.values(grouped).sort((a, b) => new Date(a.date) - new Date(b.date));

    return result;
  }


  const transactions = props?.data?.allTransactions;
  const [financialYear, setFinancialYear] = useState(() => {
    const year = localStorage.getItem('financialYear');
    return year ? year : " ";
  })

  const [cards, setCards] = useState([])
  const myBudgetData = props?.data?.budgets;
  const allRequests = props?.data?.allRequest;
  const categories = props?.data?.categories;


  useEffect(() => {
    localStorage.setItem('financialYear', financialYear);

    props.allTransactions();
    props.getMyBudgets();
    props.getRequests();
    props.viewCategories();

    if (myBudgetData.success && allRequests.success) {
      setCards([]);

      const data = [
        {
          "label": "Budgets",
          "amount": 3000,
          "icon": <IoCashSharp size={30} />,
        },
        {
          "label": "Request Received",
          "amount": 300000,
          "icon": <MdOutlineCallReceived size={20} />,
        },
        {
          "label": "Request Approved",
          "amount": 300000,
          "icon": <TiTick size={20} />,
        },
        {
          "label": "Request Declined",
          "amount": 300000,
          "icon": <MdBlock size={20} />,
        }

      ]

      data?.map((item) => {
        const card = {
          "label": item.label,
          "amount": item.label === 'Budgets' ? myBudgetData?.resp?.data?.length : item.label === 'Request Received' ? allRequests?.resp?.data?.length : 0,
          "icon": item.icon
        }

        setCards((prev) => [...prev, card]);
      })
    }
  }, [financialYear, myBudgetData?.success, allRequests.success, categories?.success])


  const filteredTransactions = () => {
    return transactions?.resp?.data?.filter((item) => item?.budget?.fyi?.toLowerCase().includes(financialYear.toLowerCase()));
  }

  const filteredTransactionsBo = () => {
    return transactions?.resp?.data?.filter((item) => item.transactionDescription.toLowerCase().includes(searchWord.toLowerCase())
      && item?.institution?.institutionName?.toLowerCase().includes(userData?.getProfile?.institution?.institutionName?.toLowerCase()))
  }

  const handleSearchBudget = () => { return myBudgetData?.resp?.data?.filter((item) => item.fyi.toLowerCase().includes(searchBudget.toLowerCase()) || item.institution?.institutionName?.toLowerCase().includes(searchBudget.toLowerCase())) };


  const groupedTransactions = groupTransactionsByDate(filteredTransactions());

  const filterBudget = () => {
    return myBudgetData?.resp?.data?.filter((item) => item.fyi.toLowerCase().includes(financialYear));
  }

  const [total, setTotal] = useState(0)

  const calculateTotalAmount = () => {
    let totalAmount = 0;

    filterBudget()?.forEach((item) => {
      totalAmount += parseInt(item.amount);
    });

    return totalAmount;
  };

  const calculateIncome = () => {
    let totalIncome = 0;

    filteredTransactions()?.forEach((item) => {
      if (item?.type?.toLowerCase() == 'income') {
        totalIncome += parseInt(item.amount);
      }
    });

    return totalIncome;
  }

  const calculateExpense = () => {
    let totalExpense = 0;

    filteredTransactions()?.forEach((item) => {
      if (item?.type?.toLowerCase() == 'expense') {
        totalExpense += parseInt(item.amount);
      }
    });

    return totalExpense;
  }

  const navigate = useNavigate();




  return (
    <AdminDashboard setLoading={setLoading} setUserData={setUserData} setFinancialYear={setFinancialYear}>
      {/* <div className='py-4 font-bold text-text_primary text-sm'>
        <p>{salutation()} <span className='text-secondary'>{userData?.getProfile?.fullNames}</span>.</p>
      </div> */}
      <Banner institution={userData} />

      {loading ? <Loading /> :
        userData?.getProfile?.position?.toLowerCase() === 'administrator' ? (
          <>
            <Officials />
            <Institutions />
          </>
        )
          :
          (
            userData?.getProfile?.position?.toLowerCase() === 'budget monitoring officer' ? (
              <div>
                <div className="w-full lg:grid grid-cols-3 gap-4 h-full items-start lg:py-4 mb-8">
                  <div className='col-span-2 w-full'>
                    <div className='lg:flex justify-start gap-2 w-full mb-4 items-center'>
                      <div className='py-2 px-4 my-2 w-full h-28 font-bold bg-secondary rounded-lg shadow-lg drop-shadow-lg'>
                        <h1 className='text-xl text-primary2'>Total Budget</h1>

                        <div className='flex relative justify-between lg:mt-8 mt-4 text-primary2'>
                          <div className='text-xl'>{myBudgetData?.loading ? <Loading /> : myBudgetData.success ? calculateTotalAmount() : 0}</div>
                          <label className='absolute left-0 -top-4'>RF</label>
                        </div>

                        <MdEditNote size={25} className='text-primary2 cursor-pointer hover:text-primary delay-100 duration-200 absolute top-2 right-2 z-10' />

                        <div className='absolute top-0 right-0 left-0 w-full h-28 bg-gradient-to-r from-secondary to-primary opacity-30 rounded-lg' />
                      </div>
                      <div className='p-2 grid grid-cols-1 gap-2 w-full h-full lg:border-l border-text_primary border-opacity-10'>
                        <div className='h-16 p-2 w-full rounded-lg  bg-primary2 shadow-lg drop-shadow-md'>
                          <h1 className='text-xs text-secondary'>Income & Revenues</h1>
                          <div className='flex justify-between text-text_primary'>
                            <p className='text-[10px]'>{calculateIncome()}</p>
                            <label className='text-[10px] p-1'>RF</label>
                          </div>

                          <hr className='text-primary' />
                          <p className='flex justify-between text-text_primary text-[10px]'><span className='text-red flex justify-start gap-2 text-[10px]'><FaArrowTrendDown size={10} /> 5%</span>Last year: 500000</p>
                        </div>

                        <div className='h-16 p-2 w-full rounded-lg  bg-primary2 shadow-lg drop-shadow-md'>
                          <h1 className='text-xs text-secondary'>Expenses</h1>
                          <div className='flex justify-between text-text_primary'>
                            <p className='text-[10px]'>{calculateExpense()}</p>
                            <label className='text-[10px] p-1'>RF</label>
                          </div>

                          <hr className='text-primary' />
                          <p className='flex justify-between text-text_primary  text-[10px]'><span className='text-success flex justify-start gap-2'><FaArrowTrendDown size={10} /> 5%</span>Last year: 300000</p>
                        </div>
                      </div>
                    </div>
                    <div className='w-full p-4 my-4 rounded-lg  bg-primary2 shadow-lg drop-shadow-lg min-h-80'>
                      {transactions?.loading ? (
                        <Loading />
                      ) : (
                        transactions?.success ? (
                          filteredTransactions()?.length <= 0 ? (
                            <NoDataFound />
                          ) : (
                            <BarCharts transactions={transactions?.resp?.data} financialYear={financialYear} />
                          )

                        ) : (
                          <Error code={transactions?.error?.code} message={transactions?.error?.message} />

                        )
                      )}
                    </div>

                  </div>
                  <div className='w-full overflow-hidden max-h-full min-h-full rounded-lg  bg-primary2 shadow-lg drop-shadow-md pb-4'>
                    <div className='p-4 text-sm font-bold text-text_primary'>
                      Recent transactions
                    </div>
                    <div className='h-full overflow-y-auto px-4 '>
                      {transactions?.loading ? (
                        <Loading />
                      ) : (
                        transactions?.success ? (
                          filteredTransactions()?.length <= 0 ? (
                            <NoDataFound />
                          ) : (
                            filteredTransactions().slice(0, 10).map((item, index) => (
                              <div key={index} className='flex justify-between gap-2 text-text_primary p-1'>
                                <div className={`text-sm flex items-center justify-center delay-100 duration-200 cursor-pointer px-2 rounded-full w-4`}>
                                  {index + 1}
                                </div>
                                <div className='w-full text-sm flex items-start'>{item.category}</div>
                                <label className={`${item.type.toLowerCase() == 'expense' ? 'text-red' : 'text-success'} text-[10px]`}>{item.type.toLowerCase() == 'expense' ? "-" : "+"}{item.amount}RF</label>
                              </div>
                            ))
                          )

                        ) : (

                          <Error code={transactions?.error?.code} message={transactions?.error?.message} />

                        )
                      )}

                    </div>
                  </div>

                </div>
                <div className='w-full h-full overflow-x-auto text-text_primary bg-primary2 mb-8 p-4 rounded-lg shadow-lg drop-shadow-lg'>
                  <div className='text-sm font-bold text-text_primary mb-4'>
                    Budget allocated to various instutitions
                  </div>
                  <table className='w-full'>
                    <thead>
                      <tr className="lg:text-sm text-xs font-semibold tracking-wide text-left text-text_primary  capitalize">
                        <th className="lg:px-4 py-2 border w-2/5 " colSpan={2}>institution</th>
                        <th className="lg:px-4 py-2 border w-1/5">Budget amount allocated</th>
                        <th className="lg:px-4 py-2 border w-1/5">Budget percentage allocated</th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {myBudgetData.loading ? (
                        <tr>
                          <td colSpan={5} className='text-center'><Loading /></td>
                        </tr>
                      ) : (
                        myBudgetData.success ? (
                          filterBudget().length <= 0 ? (
                            <tr>
                              <td colSpan={5} className='text-center'><NoDataFound /></td>
                            </tr>
                          ) : (
                            filterBudget()?.map((item, index) => (
                              <tr className="text-text_primary" key={index}>
                                <td className="lg:px-4 py-3 border " colSpan={2}>
                                  <div className="lg:flex items-center text-sm">
                                    <div className="relative w-4 h-4 mr-3 rounded-full hidden lg:block">
                                      <img className="object-cover w-full h-full rounded-full" src={GovernmentLogo} alt="" loading="lazy" />
                                      <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                                    </div>
                                    <div>
                                      <p className="font-regular text-black text-xs lg:text-sm">{item?.institution?.institutionName}</p>
                                      <p className="text-xs text-gray-600">{item?.institution?.acronym}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-xs lg:text-sm border">{item.amount} RF</td>
                                <td className="px-4 py-3 text-xs lg:text-sm border">
                                  <span className="px-2 py-1 leading-tight text-green-700 bg-green-100 rounded-sm">{(item.amount / calculateTotalAmount()) * 100}%</span>
                                </td>
                              </tr>
                            ))

                          )
                        ) : (
                          <tr>
                            <td colSpan={5} className='text-center'><Error code={myBudgetData?.error?.code} message={myBudgetData?.error?.message} /></td>
                          </tr>
                        )
                      )}

                    </tbody>

                  </table>

                </div>

                <div className='h-92 w-full lg:grid grid-cols-3 gap-4'>
                  <div className='col-span-3 my-4 bg-primary2 text-text_primary py-4 rounded-lg shadow-lg drop-shadow-lg'>
                    <div className='text-lg px-4 font-bold  mb-4 sticky top-0 z-20'>
                      Recent transactions
                    </div>
                    <div className='max-h-96 overflow-y-auto'>
                      {transactions?.loading ? (
                        <Loading />
                      ) : (
                        transactions?.success ? (
                          groupedTransactions?.length <= 0 ? (
                            <NoDataFound />
                          ) : (
                            groupedTransactions?.map((item, index) => {
                              return (
                                <div key={index} className=''>
                                  <label className='my-4 font-semibold px-4 text-sm'>{groupedTransactions[index]?.date}</label>
                                  {groupedTransactions[index]?.transactions?.map((item, index) => (
                                    <div key={index} className={`flex items-center justify-start py-2 cursor-pointer hover:bg-primary bg-opacity-50 gap-2 border-l-2 px-4 ${item.type.toLowerCase() == 'income' ? 'border-success' : 'border-red'} `}>
                                      <div className='w-full text-sm'>
                                        <p>{item.category}</p>
                                      </div>
                                      <div className='flex w-full justify-start gap-2 cursor-pointer items-center'>
                                        <div className='w-4 h-4 hidden lg:block'>
                                          <img src={GovernmentLogo} className='w-full h-full object-cover' />
                                        </div>
                                        <p className='p-1 text-sm'>{item?.institution?.institutionName}</p>
                                      </div>
                                      <div className={`bg-primary text-sm opacity-50 w-24 ${item.type.toLowerCase() == 'income' ? 'text-success' : 'text-red'}  p-1 rounded-lg`}>
                                        <p>{item.type}</p>
                                      </div>
                                      <div className={`${item.type.toLowerCase() == 'expense' ? 'text-red' : 'text-success'} w-full text-sm text-right`}>
                                        <p>{item.type.toLowerCase() == 'expense' ? "-" : "+"}{item.amount} RF</p>
                                      </div>
                                    </div>
                                  ))}


                                </div>
                              )
                            })
                          )

                        ) : (

                          <Error code={transactions?.error?.code} message={transactions?.error?.message} />

                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
              :
              (
                <>
                  <div className='grid lg:grid-cols-4 gap-2 mb-4'>
                    {cards.map((item, index) => {
                      return (
                        <div key={index} className='flex justify-between items-center bg-primary2 px-4 py-2 rounded-lg shadow-lg text-text_primary'>
                          <div>
                            <h1 className='font-bold text-xs'>{item.label}</h1>
                            <p className='lg:text-lg text-sm'>{item.amount}</p>
                          </div>
                          <div className='p-px w-8 h-8 rounded-full flex items-center justify-center text-text_primary bg-primary  duration-200 delay-100 cursor-pointer'>
                            {item.icon}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <section className='w-full mb-4 py-4'>
                    <div className='py-4 font-bold text-text_primary w-full overflow-x-hidden text-sm'>
                      <p>My income/expense categories</p>
                    </div>
                    <CategoriesModal userData={userData} />

                  </section>

                  <div className='relative w-full gap-2 bg-primary2 shadow-lg rounded-lg lg:px-4 px-2 py-4 h-full'>
                    <div className='py-4 font-bold text-text_primary w-full overflow-x-hidden text-sm'>
                      <p>Budgets</p>
                    </div>
                    <div className='lg:flex justify-between mb-2 items-center '>
                      <div className='relative lg:w-2/5 w-full'>
                        <input type='search' placeholder='Search' className='py-1 px-2 border-2 outline-none border-primary w-full rounded-lg placeholder:text-text_primary placeholder:text-opacity-50' onChange={(e) => setSearchBudget(e.target.value)} />
                        {!searchBudget && <IoSearchOutline size={20} className='cursor-pointer font-normal text-text_primary hover:text-list_hover delay-100 duration-500 absolute right-2 top-2' />}
                      </div>

                      <div className='text-sm text-text_primary lg:w-1/5 w-full flex justify-end'>
                        <label>{myBudgetData?.resp?.data?.length} total budgets</label>

                        {/* <div className='flex items-center justify-end mx-4'>
                        <div className='p-2 bg-secondary rounded-lg text-primary2 text-center cursor-pointer hover:opacity-50 duration-200 delay-100'>
                        <p><MdDomainAdd size={20}/></p>
                        </div>

                        
                    </div>   */}
                      </div>




                    </div>


                    {myBudgetData?.loading ? (
                      <Loading />
                    )
                      :
                      (myBudgetData?.success ? (

                        handleSearchBudget()?.length <= 0 ? (
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
                                      <th className='font-normal'></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {pagination(handleSearchBudget, 10).length > 0 && pagination(handleSearchBudget, 10)[currentPage].map((item, index) => (

                                      <tr key={index}>
                                        <td className='text-xs'><Link to={`/dashboard/all-budgets/${item._id}`} className='text-secondary'>FYI {item.fyi} Budget</Link></td>
                                        <td className='flex w-full justify-start gap-2 cursor-pointer items-center text-xs'>
                                          <div className='w-4 h-4 hidden lg:block'>
                                            <img src={GovernmentLogo} className='w-full h-full object-cover' />
                                          </div>
                                          <p className='p-1'>{item?.institution?.institutionName}</p>
                                        </td>
                                        <td className='text-xs'>{item.amount} $</td>
                                        <td className='text-xs'>{new Date(item.createdAt).toLocaleDateString()} at {new Date(item.createdAt).toLocaleTimeString()}</td>
                                        <td className='text-xs'>
                                          <div className={`${item.status.toLowerCase() === "approved" ? "text-success" : item.status.toLowerCase() === "rejected" ? "text-red" : item.status.toLowerCase() === "under review" ? "text-[#FBA801]" : "text-text_primary"} opacity-50} font-bold px-1 text-px py-1 rounded-lg mx-auto`}>
                                            <label className={``}>
                                              {item.status}
                                            </label>
                                          </div>

                                        </td>
                                        {item?.institution?._id === userData?.getProfile?.institution?._id &&
                                          <td className='flex justify-start gap-3 text-xs'>
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
                                length={handleSearchBudget()?.length}
                                postsperpage={10}
                                handlepagination={handlePagination}
                                currentpage={currentPage}
                              />
                            </>
                          )
                      )
                        :
                        (
                          <Error code={myBudgetData?.error?.code} message={myBudgetData?.error?.message} />
                        )
                      )}
                  </div>

                  <Transactions userData={userData} />

                </>
              )
          )
      }
    </AdminDashboard>
  )
}

const mapState = (data) => ({
  data: data
})

export default connect(mapState, { allTransactions, getMyBudgets, getRequests, viewCategories })(Dashboard)
