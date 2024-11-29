import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import { FaArrowTrendDown } from "react-icons/fa6";
import Layout from '../../components/Layout';
import { IoWallet } from "react-icons/io5";
import BarCharts from '../../components/BarCharts';
import { IoCashSharp } from "react-icons/io5";
import GovernmentLogo from '../../assets/Govt.png';
import { RiAddCircleFill } from "react-icons/ri";
import { MdPrivacyTip } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import LineChart from '../../components/LineChart';
import { FaArrowDownLong } from "react-icons/fa6";
import { PieChart,pieArcLabelClasses } from '@mui/x-charts/PieChart';
import Pagination from '../../components/Pagination';
import { IoSearchOutline } from "react-icons/io5";
import { RiFilter3Line } from "react-icons/ri";
import { connect } from 'react-redux';
import { allTransactions, getMyBudgets } from '../../redux/Actions/BudgetActions';
import AddTransaction from '../../components/AddTransaction';
import Loading from '../../components/Loading';
import NoDataFound from '../../components/NoDataFound';
import Error from '../../components/Error';
import { pagination } from '../../utils/paginationHandler';
import { calculateTotalsByCategory } from '../../utils/generatePieData';

const QuickLinks=[
  {
    "Icon":<RiAddCircleFill size={20}/>,
    "label":"New budget",
    "to":"/plan-budget"
  },
  {
    "Icon":<MdPrivacyTip size={20}/>,
    "label":"Privacy & Policy",
  },
  {
    "Icon":<FaQuestionCircle size={20}/>,
    "label":"FAQ",
  },
  {
    "Icon":<IoIosPeople size={20}/>,
    "label":"HR team",
  },
  {
    "Icon":<IoWallet size={20}/>,
    "label":"My budgets",
    "to":"/my-budgets"
  },
]



function Homepage(props) {
  const [userData,setUserData]=useState([]);
  const navigate=useNavigate();

  const myBudgetData=props?.data?.budgets;

  const [currentPage,setCurrentPage]=useState(0);

 

  const handlePagination = (pageNumber) => {
    setCurrentPage (pageNumber);
  };

  const data = {
    labels: [0,"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov"],
    datasets: [
      {
        label: 'Actual',
        data: [0,100000, 25000, 50000, 25000, 25000, 50000, 50000, 75000, 100000, 75000, 25000, 75000],
        borderColor: '#26B2AB',
        backgroundColor: '#26B2AB',
        fill: false,
        tension: 0.1,
        pointStyle: 'circle',
        pointRadius: 5,
        pointBackgroundColor: '#26B2AB',
        pointBorderColor: '#26B2AB',
        borderSize: 0o1
      },
      {
        label: 'Last Year',
        data: [100000, 75000, 75000, 75000, 50000, 25000, 25000, 25000, 50000, 100000, 50000, 50000],
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

  const options = {
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

  
  const [cards,setCards]=useState([])



  const [financialYear,setFinancialYear]=useState(() => {
    const year = localStorage.getItem('financialYear');
    return year ? year : " ";
  })

  useEffect(()=>{
    props.getMyBudgets()
    localStorage.setItem('financialYear', financialYear);

    if (myBudgetData.success) {
      setCards([]);

      const data=[
        {
          "label":"Total Budget",
          "amount":3000,
          "icon":<IoCashSharp size={30}/>,
        },
        {
          "label":"Total Spent",
          "amount":300000,
          "icon":<FaArrowTrendDown size={30}/>,
        },
        {
          "label":"Total Left",
          "amount":300000,
          "icon":<IoWallet size={30}/>,
        }
      ]

      data?.map((item,index)=>{
        const card={
          "label":item.label,
          "amount":item.label ==="Total Budget"?filterBudget()?.length ===0?0:filterBudget()[0]?.amount:0,
          "icon":item.icon
        }

        setCards((prev)=>[...prev,card]);
      })

      props?.allTransactions();
    }
  },[financialYear,myBudgetData.success])


  const filterBudget=()=>{
    return myBudgetData?.resp?.data?.filter((item)=>item.fyi.toLowerCase().includes(financialYear));
  }

  const [addTransaction,setAddTransaction]=useState(false);

  const transactions=props?.data?.allTransactions;

  const [searchWord,setSearchWord]=useState("");

  const filteredTransactions=()=>{
      return transactions?.resp?.data?.filter((item)=>item.transactionDescription.toLowerCase().includes(searchWord.toLowerCase()) 
      && item?.institution?.institutionName?.toLowerCase().includes(userData?.getProfile?.institution?.institutionName?.toLowerCase())
      && item?.budget?.fyi?.toLowerCase().includes(financialYear.toLowerCase()));
  }

  const calculateTotalSpendin=(spending)=>{ 
    let total=0;    

    spending?.map((item)=>{
      total+=item?.value
    })

    return total.toFixed(5);
  }

  const yearlyTransactions = transactions?.resp?.data?.filter((transaction) => {
    const transactionYear = transaction?.budget?.fyi;     
    return transactionYear === financialYear
  });
  




  
  
  

  

  

  return (
    <Layout setUserData={setUserData} setFinancialYear={setFinancialYear}>
      <div className='py-4 font-bold text-text_primary flex justify-start items-center gap-4 mb-4'>
        <div className='w-40 hidden lg:block'>
          <img src={GovernmentLogo} className='w-full h-full object-cover'/>
        </div>
        <div className='w-full'>
          <div className='py-4 font-bold text-secondary w-full overflow-x-hidden'>
            <p>{userData?.getProfile?.institution?.institutionName}</p>
          </div>
          <div className='mb-3'>
            <p className='text-sm font-normal text-wrap text-justify'>Budget planning and execution system is computerized system that helps government institutions to plan their budget and monitor the budget execution </p>
          </div>
          <div className='lg:flex grid grid-cols-3 justify-start items-center lg:gap-4 flex-wrap'>
            {QuickLinks.map((item,index)=>{
              return(
                <div key={index} className='group flex justify-start items-center gap-2 text-sm' onClick={()=>navigate(item.to)}>
                  <div className='my-2 group-hover:bg-list_hover mb-2 lg:mx-auto p-2 w-8 h-8 rounded-full border flex items-center justify-center text-primary2 bg-secondary  duration-200 delay-100 cursor-pointer'>
                    {item.Icon}
                  </div>
                  <div className='text-xs group-hover:text-list_hover text-secondary '>{item.label}</div>  
                </div>
              )
            })}
          </div>
        </div>
      </div>
      
      <section className='w-full grid grid-cols-1 lg:grid-cols-4 gap-4'>
        <div className='lg:col-span-3'>
          <div className='grid lg:grid-cols-3 gap-8'>
            {cards.map((item,index)=>{
              return(
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

          <div >
            <div className='py-4 font-bold text-text_primary w-full overflow-x-hidden'>
              <p>Spending Analysis</p>
            </div>
            <div className='w-full bg-primary2 rounded-lg shadow-lg px-4 py-4 '>
              <div className='py-4 text-text_primary'>
                <h2 className='font-bold lg:text-2xl text-lg'>6800$</h2>
                <p className='flex gap-2 text-sm'>Your spending is <span className='text-red flex justify-start items-end'>9%<FaArrowDownLong size={10}/></span> compared to last year</p>
              </div>
              <LineChart data={data} options={options}/>
            </div>
          </div>
        </div>
        
        <div className='col-span-1 flex flex-col'>
          <div className='relative bg-primary2 rounded-lg shadow-lg py-3  px-4 lg:h-1/2 h-full overflow-hidden'>
            <div className='font-bold text-text_primary w-full overflow-x-hidden text-sm'>
              <p>Latest Transactions</p>
            </div>
            {transactions?.loading?(
                <Loading/>
              ):(
                transactions?.success?(
                  yearlyTransactions?.length<=0?(
                      <NoDataFound/>
                  ):(
                    yearlyTransactions?.slice(0, 5).map((item,index)=>{
                      return(
                        <div key={index} className='w-full flex justify-between mt-4 gap-3'>
                          <div className='flex justify-start gap-3 items-center w-3/5'>

                            <div className='text-text_primary w-full'>
                              <h2 className='text-xs font-medium  truncate'>{item.transactionDescription}</h2>
                              <p className='text-xs'>{new Date(item.createdAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className={`${item.type.toLowerCase()=='expense'?'text-red':'text-success'} text-xs`}>
                            <label>
                            {item.type.toLowerCase()=='expense'?"-":"+"}{item.amount} $
                            </label>
                          </div>

                        </div>
                      )
                    })
                  )
                  
                ):(
                  
                  <Error code={transactions?.error?.code} message={transactions?.error?.message}/>
                  
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
                {transactions?.loading?(
                  <Loading/>
                ):(
                  transactions?.success?(
                    transactions?.resp?.data?.length<=0?(
                        <NoDataFound/>
                    ):(
                      <>
                      <div className='py-2 text-text_primary flex justify-between items-center'>
                        <div>
                          <h2 className='font-bold lg:text-xl text-md'>{calculateTotalSpendin(calculateTotalsByCategory(transactions?.resp?.data,financialYear))}$</h2>
                          <p className='flex gap-2 text-xs'>Total spendings</p>
                        </div>
                        <p className='flex justify-between text-text_primary text-xs p-1'><span className='text-red flex justify-start gap-2 text-sm'><FaArrowTrendDown size={20}/> 5%</span></p>
                      </div>
                        <PieChart
                          series={[
                            {
                              data:calculateTotalsByCategory(transactions?.resp?.data,financialYear),
                              arcLabelMinAngle: 45,
                              innerRadius: 20,
                              outerRadius: 100,
                              paddingAngle: 5,
                              cornerRadius: 5,
                              startAngle: -90,
                              endAngle: 180,
                              cx: 100,
                              cy: 90,
                              highlightScope: { faded: 'global', highlighted: 'item' },
                              faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            }
                          ]}
                          sx={{
                            [`& .${pieArcLabelClasses.root}`]: {
                              fill: 'white',
                              fontWeight: 'regular',
                              fontSize: 8,
                            },
                          }}
                          width={800}
                          height={250}
                          className='w-full'
                        />
                        
                      </>
                    )
                    
                  ):(
                    
                    <Error code={transactions?.error?.code} message={transactions?.error?.message}/>
                    
                  )
                )}


              </div>
            </div>
          
          </div>
        </div>

      </section>

      <section className='w-full'>
        <div className='py-4 font-bold text-text_primary w-full overflow-x-hidden text-sm'>
          <p>Transaction History</p>
        </div>
        
        <div className='w-full bg-primary2 rounded-lg shadow-lg px-4 py-4'>
          <div className='flex justify-between items-center'>
            <div className='flex justify-start gap-2 lg:w-3/5 w-full'>
              <div className='relative lg:w-3/5 w-full'>
                <input value={searchWord} onChange={(e)=>setSearchWord(e.target.value)} type='search' placeholder='Search request' className='py-2 px-2 border-2 outline-none border-primary w-full rounded-lg placeholder:text-text_primary placeholder:text-opacity-50'/>
                {!searchWord && <IoSearchOutline size={25} className='cursor-pointer font-normal text-text_primary hover:text-list_hover delay-100 duration-500 absolute right-4 top-2'/>}
              </div>

              <div className='text-primary rounded-lg'>
                <button className='text-sm bg-secondary rounded-lg w-full px-4 py-3' onClick={()=>setAddTransaction(!addTransaction)}>Add transaction</button>
              </div>
            </div>
           

            <div className='w-28 relative group flex justify-end gap-4 rounded-lg text-text_primary text-center cursor-pointer hover:text-list_hover duration-200 delay-100'>
              <label>Latest</label>
              <p><RiFilter3Line size={25}/></p>
              <div className='bg-primary2 shadow-lg absolute top-7 w-full right-0 hidden group-hover:block py-2'>
                <ul className='list-none text-text_primary -ml-6 text-xs'>
                  <li className='p-2 hover:text-list_hover duration-500 delay-100 cursor-pointer bg-primary'>Latest</li>
                  <li className='p-2 hover:text-list_hover duration-500 delay-100 cursor-pointer'>Alphabet(A-Z)</li>
                  <li className='p-2 hover:text-list_hover duration-500 delay-100 cursor-pointer'>Oldest</li>
                </ul>  
              </div>
              
            </div>
          </div>
          <table border={10} cellSpacing={0} cellPadding={10} className='my-4 lg:text-sm text-xs w-full py-4 text-text_primary text-left px-2 lg:px-4 '>
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
              {transactions?.loading?(
                  <tr>
                    <td colSpan={5} className='text-center'><Loading/></td>
                  </tr>
              ):(
                transactions?.success?(
                  filteredTransactions()?.length<=0?(
                    <tr>
                      <td colSpan={5} className='text-center'><NoDataFound/></td>
                    </tr>
                  ):(
                    pagination(filteredTransactions,10).length>0 && pagination(filteredTransactions,10)[currentPage].map((item,index)=>{
                      return(
                        <tr key={index}>
                          <td className=''>{item.category}</td>
                          <td>FYI {item.budget.fyi}</td>
                          <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                          <td><span className={`p-1 ${item.type.toLowerCase()=='expense'?'text-red border-red':' border-success text-success'} rounded-lg`}>{item.type}</span></td>
                          <td className={`${item.type.toLowerCase()=='expense'?'text-red':'text-success'}`}>{item.type.toLowerCase()=='expense'?"-":"+"}{item.amount} $</td>                
                        </tr>
                      )
                    })
                  )
                  
                ):(
                  <tr>
                    <td colSpan={5} className='text-center'><Error code={transactions?.error?.code} message={transactions?.error?.message}/></td>
                  </tr>
                )
              )}
            </tbody> 
          </table>

          <Pagination
            length={filteredTransactions()?.length}
            postsPerPage={20}
            handlePagination={handlePagination}
            currentPage={currentPage}
          />
        </div>

        
      </section>

      {addTransaction && <AddTransaction/>}
      
    </Layout>
  )
}

const mapState=(data)=>({
  data:data
})

export default connect(mapState,{getMyBudgets,allTransactions}) (Homepage)