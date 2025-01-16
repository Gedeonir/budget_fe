import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaArrowTrendDown } from "react-icons/fa6";
import Layout from '../../components/Layout';
import { IoWallet } from "react-icons/io5";
import BarCharts from '../../components/BarCharts';
import { IoCashSharp } from "react-icons/io5";
import LineChart from '../../components/LineChart';
import { FaArrowDownLong } from "react-icons/fa6";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import Pagination from '../../components/Pagination';
import { IoSearchOutline } from "react-icons/io5";
import { RiFilter3Line } from "react-icons/ri";
import { connect } from 'react-redux';
import { allTransactions, getMyBudgets, viewCategories } from '../../redux/Actions/BudgetActions';
import AddTransaction from '../../components/AddTransaction';
import Loading from '../../components/Loading';
import NoDataFound from '../../components/NoDataFound';
import Error from '../../components/Error';
import { pagination } from '../../utils/paginationHandler';
import { calculateTotalsByCategory } from '../../utils/generatePieData';
import { FaArrowUpLong } from "react-icons/fa6";
import getAcademicYears from '../../utils/AcademicYears';
import { GoBlocked } from "react-icons/go";
import Banner from '../../components/Banner';
import { MdBlock, MdOutlineCallReceived } from 'react-icons/md';
import { TiTick } from 'react-icons/ti';
import CategoriesModal from '../../components/CategoriesModal';
import Transactions from '../../components/Transactions';
import { handleDownload } from '../Admin/Reports';
import { platforms } from './webUsageStats';

export const calculateFYIPercentageChange = (transactions, currentFYI, type) => {
  // Parse the current fiscal year (e.g., "2024-25")
  const [currentStartYear, currentEndYear] = currentFYI.split('-').map(Number);

  // Calculate the previous fiscal year (e.g., "2023-24")
  const previousFYI = `${currentStartYear - 1}-${currentEndYear - 1}`;

  // Filter transactions for the current and previous fiscal years
  const currentFYITransactions = transactions?.resp?.data?.filter((transaction) =>
    transaction.budget.fyi === currentFYI && transaction.type.toLowerCase() === type
  );

  const previousFYITransactions = transactions?.resp?.data?.filter((transaction) =>
    transaction.budget.fyi === previousFYI && transaction.type.toLowerCase() === type
  );

  // Sum the amounts for the current and previous fiscal years
  const currentTotal = currentFYITransactions?.reduce(
    (sum, transaction) => sum + parseFloat(transaction.amount),
    0
  );

  const previousTotal = previousFYITransactions?.reduce(
    (sum, transaction) => sum + parseFloat(transaction.amount),
    0
  );

  // Calculate the percentage change
  let percentageChange = 0;
  if (previousTotal > 0) {
    percentageChange = ((currentTotal - previousTotal) / previousTotal) * 100;
  } else if (currentTotal > 0) {
    percentageChange = 100; // No previous data, consider it a 100% increase
  }

  return {
    currentFYI,
    previousFYI,
    currentTotal: currentTotal?.toFixed(2),
    previousTotal: previousTotal?.toFixed(2),
    percentageChange: percentageChange?.toFixed(2),
  };
};

function Homepage(props) {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  const myBudgetData = props?.data?.budgets;
  const transactions = props?.data?.allTransactions;

  const [currentPage, setCurrentPage] = useState(0);



  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };



  const options = {
    plugins: {
      legend: {
        display: false, // Disable the top labels
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount',
        },
      },
    },
  };




  const [cards, setCards] = useState([])



  const [financialYear, setFinancialYear] = useState(() => {
    const year = localStorage?.getItem('financialYear');
    return year ? year : " ";
  })


  const filterBudget = () => {
    return myBudgetData?.resp?.data?.filter((item) => item?.institution?.institutionName?.toLowerCase().includes(userData?.getProfile?.institution?.institutionName?.toLowerCase()));
  }

  const approvedBudget = (status) => {
    return myBudgetData?.resp?.data?.filter((item) => item?.institution?.institutionName?.toLowerCase().includes(userData?.getProfile?.institution?.institutionName?.toLowerCase()
      && item?.status?.toLowerCase() === status));
  }


  useEffect(() => {
    props.getMyBudgets()
    localStorage.setItem('financialYear', financialYear);
    props.viewCategories()

    if (myBudgetData.success) {
      setCards([]);

      const data = [
        {
          "label": "Budgets",
          "amount": 3000,
          "icon": <IoCashSharp size={30} />,
        },
        {
          "label": "Request sent",
          "amount": 300000,
          "icon": <MdOutlineCallReceived size={20} />,
        },
        {
          "label": "Budget Approved",
          "amount": 300000,
          "icon": <TiTick size={20} />,
        },
        {
          "label": "Budget Declined",
          "amount": 300000,
          "icon": <MdBlock size={20} />,
        }

      ]

      data?.map((item, index) => {
        const card = {
          "label": item.label,
          "amount": item.label === 'Budgets' ? (filterBudget()?.length) : (
            item.label === 'Request sent' ? "0" :
              item.label === 'Budget Approved' ? approvedBudget('approved')?.length :
                item.label === 'Budget Declined' && approvedBudget('rejected')?.length
          ),
          "icon": item.icon
        }

        setCards((prev) => [...prev, card]);
      })


      props?.allTransactions();
    }
  }, [financialYear, myBudgetData.success, transactions.success, props?.data?.addTransaction?.success])

  const [addTransaction, setAddTransaction] = useState(false);


  const [searchWord, setSearchWord] = useState("");

  const filteredTransactions = () => {
    return transactions?.resp?.data?.filter((item) => {
      return item.transactionDescription.toLowerCase().includes(searchWord.toLowerCase())
        && item?.institution?.institutionName?.toLowerCase().includes(userData?.getProfile?.institution?.institutionName?.toLowerCase())
        && item?.budget?.fyi?.toLowerCase().includes(financialYear.toLowerCase())
    });
  }

  const calculateTotalSpendin = (spending) => {
    let total = 0;

    spending?.map((item) => {
      total += item?.value
    })

    return total.toFixed(2);
  }


  function generateChartDataByMonth(transactions, financialYear) {
    // Parse the financial year
    const [startYear, endYear] = financialYear.split('-').map(Number);

    const startDate = new Date(startYear, 8,1); // September of the start year
    const end = parseInt("20" + endYear); // Correct the end year to the next century if needed
  
    // In case the endYear is in the 00s (like '99' becomes '1999' and '00' becomes '2000')
    const correctedEndYear = endYear === "00" ? startYear + 1 : end;
    const endDate = new Date(correctedEndYear, 7,31); // August of the end year
    
 
  
    // Initialize the result object
    const data = {
      labels: [], // Month labels (e.g., "Jan 2025", "Feb 2025")
      datasets: [
        {
          label: 'Income',
          data: [], // Will accumulate monthly income
          borderColor: '#26B2AB',
          backgroundColor: '#26B2AB',
          fill: false,
          tension: 0.1,
          pointStyle: 'circle',
          pointRadius: 5,
          pointBackgroundColor: '#26B2AB',
          pointBorderColor: '#26B2AB',
        },
        {
          label: 'Expenses',
          data: [], // Will accumulate monthly expenses
          borderColor: '#65758B',
          backgroundColor: '#65758B',
          fill: false,
          tension: 0.1,
          pointStyle: 'circle',
          pointRadius: 5,
          pointBackgroundColor: '#65758B',
          pointBorderColor: '#65758B',
        },
      ],
    };
  
    // Generate month labels for the financial year
    const monthsInFYI = [];
    for (let i = 0; i < 12; i++) {
      const currentDate = new Date(startDate);
      currentDate.setMonth(startDate.getMonth() + i);
      const label = `${currentDate.toLocaleString('default', { month: 'short' })} ${currentDate.getFullYear()}`;
      monthsInFYI.push(label);
    }
    data.labels = monthsInFYI;
  
    // Initialize monthly data for the financial year
    const monthlyData = monthsInFYI.map(() => ({
      income: 0,
      expenses: 0,
    }));
  
    // Filter transactions within the financial year range
    const filteredTransactions = transactions?.filter(transaction => {
      const transactionDate = new Date(transaction.dateTransactionsTookPlace);
      return transactionDate >= startDate && transactionDate <= endDate;
    });

  
    // Process transactions to populate monthly data
    filteredTransactions?.forEach(transaction => {
      const transactionDate = new Date(transaction?.dateTransactionsTookPlace);
      
      const monthIndex = (transactionDate.getFullYear() - startYear) * 12 + transactionDate.getMonth() - 8; // Offset by start month
      if (monthIndex >= 0 && monthIndex < 12) {
        const amount = parseFloat(transaction.amount); // Ensure amount is a number
        if (transaction.type.toLowerCase() === 'income') {
          monthlyData[monthIndex].income += amount;
        } else if (transaction.type.toLowerCase() === 'expense') {
          monthlyData[monthIndex].expenses += amount;
        }
      }
    });
  
    // Populate dataset values
    monthlyData.forEach(month => {
      data.datasets[0].data.push(month.income.toFixed(2));
      data.datasets[1].data.push(month.expenses.toFixed(2));
    });
  
    return data;
  }
  


  const data = generateChartDataByMonth(filteredTransactions(), financialYear);

  const calculateExpense = () => {
    let totalExpense = 0;

    filteredTransactions()?.forEach((item) => {
      if (item?.type?.toLowerCase() == 'expense') {
        totalExpense += parseInt(item.amount);
      }
    });

    return totalExpense;
  }

  const calculateTotalAmount = () => {
    let total = 0;
    filterBudget()[0]?.expenditures?.forEach((item) => {
      total += parseInt(item.amountToSpent)
    })

    return total
  }


  const per = calculateFYIPercentageChange(transactions, financialYear, 'expense')


  const location = useLocation();









  return (
    <Layout setUserData={setUserData} setFinancialYear={setFinancialYear}>
      <Banner institution={userData} />

      {userData?.getProfile?.position?.toLowerCase() === "budget monitoring officer" ? (

        <div className='relative min-h-screen'>
          {myBudgetData.loading ?
            <Loading />
            :
            myBudgetData.success ? (
              <>
                {/* {
                  filterBudget()[0]?.status.toLowerCase() !== 'approved' && (
                    <div className='flex flex-col text-text_primary justify-center items-center absolute h-full left-0 right-0 top-0 z-10 bg-primary bg-opacity-90'>
                      <GoBlocked size={200} className='mb-2' />
                      {
                        filterBudget()[0]?.status?.toLowerCase() === 'pending' ?
                          <label>This budget needs to be approved before it is put into action</label>
                          : (
                            filterBudget()[0]?.status?.toLowerCase() === 'rejected' ? (
                              <label>This budget has been rejected</label>
                            ) :
                              <label>This budget has been closed</label>
                          )

                      }
                      <Link to={`/my-budgets/${filterBudget()[0]?._id}`} className=' text-xs text-text_primary text-center border-2 border-text_primary border-opacity-40 p-2 lg:w-1/5 w-full mb-4'>View Budget</Link>

                      <Link to={"/budget/requests"} className='delay-100 duration-200 hover:bg-opacity-70 bg-secondary text-xs text-center text-primary p-2 lg:w-1/5 w-full'>
                        {filterBudget()[0]?.status.toLowerCase() === 'pending' ? "Send" : "Resend"} budget request
                      </Link>
                    </div>
                  )
                } */}
                <div className='grid lg:grid-cols-4 gap-4 mb-4'>
                  {cards.map((item, index) => {
                    return (
                      <div key={index} className='flex justify-between items-center bg-primary2 px-4 py-2 rounded-lg shadow-lg text-text_primary'>
                        <div>
                          <h1 className='font-bold text-sm'>{item.label}</h1>
                          <p className='lg:text-lg text-sm'>{item.amount}</p>
                        </div>
                        <div className='p-2 lg:w-24 lg:h-24 w-12 h-12 rounded-full flex items-center justify-center text-text_primary bg-primary  duration-200 delay-100 cursor-pointer'>
                          {item.icon}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <section className='w-full grid grid-cols-1 lg:grid-cols-4 gap-4 relative'>

                  <div className='lg:col-span-3'>
                    <div >
                      <div className='py-4 font-bold text-text_primary w-full overflow-x-hidden'>
                        <p>Spending Analysis</p>
                      </div>
                      <div className='w-full bg-primary2 rounded-lg shadow-lg px-4 py-2'>
                        <div className='py-2 text-text_primary'>
                          <h2 className='font-bold lg:text-xl text-md'>{transactions?.success ? calculateTotalSpendin(calculateTotalsByCategory(filteredTransactions(), financialYear)) : 0} RF</h2>
                          <p className='flex gap-2 text-xs'>Your spending is <span className={`${per.percentageChange < 0 ? "text-success" : "text-red"} flex justify-start items-end`}>{per.percentageChange + "%"} {per.percentageChange < 0 ? <FaArrowDownLong size={10} /> : <FaArrowUpLong size={10} />}</span> compared to last year</p>
                        </div>
                        <LineChart data={data} options={options} />
                      </div>
                    </div>
                  </div>

                  <div className='col-span-1 flex flex-col'>
                    <div className='relative bg-primary2 rounded-lg shadow-lg py-3  px-4 lg:h-1/2 h-full overflow-hidden'>
                      <div className='font-bold text-text_primary w-full overflow-x-hidden text-sm'>
                        <p>Latest Transactions</p>
                      </div>
                      {transactions?.loading ? (
                        <Loading />
                      ) : (
                        transactions?.success ? (
                          filteredTransactions()?.length <= 0 ? (
                            <NoDataFound />
                          ) : (
                            filteredTransactions()?.slice(0, 5).map((item, index) => {
                              return (
                                <div key={index} className='w-full flex justify-between mt-4 gap-3'>
                                  <div className='flex justify-start gap-3 items-center w-3/5'>

                                    <div className='text-text_primary w-full'>
                                      <h2 className='text-xs font-medium  truncate'>{item.transactionDescription}</h2>
                                      <p className='text-xs'>{new Date(item.createdAt).toLocaleDateString()}</p>
                                    </div>
                                  </div>
                                  <div className={`${item.type.toLowerCase() == 'expense' ? 'text-red' : 'text-success'} text-xs`}>
                                    <label>
                                      {item.type.toLowerCase() == 'expense' ? "-" : "+"}{item.amount} RF
                                    </label>
                                  </div>

                                </div>
                              )
                            })
                          )

                        ) : (

                          <Error code={transactions?.error?.code} message={transactions?.error?.message} />

                        )
                      )}

                      <div className='lg:absolute bottom-0 left-0 w-full right-0 flex items-center justify-center py-4 px-4'>
                        <Link className='text-text_primary text-sm font-bold border-2 border-primary rounded-lg  w-full p-2 text-center pointer-cursor flex items-center justify-center'>View all</Link>
                      </div>

                    </div>

                    <div className='relative flex items-end lg:h-1/2 h-full pt-4'>
                      <div className='rounded-lg shadow-lg py-3  px-4 w-full bg-primary2 h-full'>
                        <div className='font-bold text-text_primary w-full'>
                          <p>Spending Category</p>
                        </div>

                        <div className='w-full'>
                          {transactions?.loading ? (
                            <Loading />
                          ) : (
                            transactions?.success ? (
                              filteredTransactions()?.length <= 0 ? (
                                <NoDataFound />
                              ) : (
                                <>
                                  <div className='py-2 text-text_primary flex justify-between items-center'>
                                    <div>
                                      <h2 className='font-bold lg:text-xl text-md'>{calculateTotalSpendin(calculateTotalsByCategory(filteredTransactions(), financialYear))} RF</h2>
                                      <p className='flex gap-2 text-xs'>Total spendings</p>
                                    </div>
                                    <p className='flex justify-between text-text_primary text-xs p-1'><span className={`${per.percentageChange < 0 ? "text-success" : "text-red"} flex justify-start gap-2 text-sm}`}>{per.percentageChange < 0 ? <FaArrowDownLong size={10} /> : <FaArrowUpLong size={10} />} {per.percentageChange + "%"}</span></p>
                                  </div>

                                  <div className='flex justify-center items-center'>
                                    <PieChart
                                      series={[
                                        {
                                          data: calculateTotalsByCategory(filteredTransactions(), financialYear),
                                          arcLabelMinAngle: 45,
                                          innerRadius: 20,
                                          outerRadius: 80,
                                          paddingAngle: 5,
                                          cornerRadius: 5,
                                          startAngle: -90,
                                          endAngle: 180,
                                          cx: 100,
                                          cy: 80,
                                          highlightScope: { faded: 'global', highlighted: 'item' },
                                          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                          arcLabel: null,

                                        }
                                      ]}
                                      {...pieParams}
                                      width={200}
                                      height={200}

                                    />
                                  </div>


                                </>
                              )

                            ) : (

                              <Error code={transactions?.error?.code} message={transactions?.error?.message} />

                            )
                          )}


                        </div>
                      </div>

                    </div>
                  </div>

                </section>
                <Transactions userData={userData} financialYear={financialYear} all={true} />
              </>
            ) : (
              <Error code={myBudgetData?.error?.code} message={myBudgetData?.error?.message} />
            )}
        </div>
      )
        :
        (
          <>
            <section className='w-full mb-4 py-4'>
              <div className='py-4 font-bold text-text_primary w-full overflow-x-hidden text-sm'>
                <p>My expense categories</p>
              </div>
              <CategoriesModal userData={userData} />

            </section>


            <Transactions userData={userData}  all={true}/>
          </>
        )}

      {location.hash.includes("add-transaction") && <AddTransaction userData={userData} />}

    </Layout>
  )
}

const pieParams = {
  height: 200,
  margin: { right: 5 },
  slotProps: { legend: { hidden: true } },
};

const mapState = (data) => ({
  data: data
})

export default connect(mapState, { getMyBudgets, allTransactions, viewCategories })(Homepage)