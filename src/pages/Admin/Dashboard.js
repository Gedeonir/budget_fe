import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowTrendDown } from "react-icons/fa6";
import { MdEditNote } from "react-icons/md";
import BarCharts from '../../components/BarCharts';
import { IoCashSharp } from "react-icons/io5";
import AdminDashboard from '../../components/AdminDashboard';
import { connect } from 'react-redux';
import { allTransactions, getMyBudgets } from '../../redux/Actions/BudgetActions';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import NoDataFound from '../../components/NoDataFound';
import GovernmentLogo from '../../assets/Govt.png';
import { io } from "socket.io-client";


const socketUrl = process.env.BACKEND_URL

function Dashboard(props) {
  const [userData,setUserData]=useState([]);
  const hour=new Date().getHours()

  const salutation=()=>{
    let salutation;
    if (hour >= 5 && hour < 12) {
      salutation = 'Good morning';
    } else if (hour >= 12 && hour < 18) {
      salutation = 'Good afternoon';
    } else {
      salutation = 'Good evening';
    }

    return salutation
  }


  const token =localStorage.getItem("userToken");
  const newSocket = io(`${socketUrl}`,{
    auth: {
      token,
    },
  });

  console.log(newSocket.on("Started"));
  
  
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


  const transactions=props?.data?.allTransactions;
  const [financialYear,setFinancialYear]=useState(() => {
    const year = localStorage.getItem('financialYear');
    return year ? year : " ";
  })

  useEffect(()=>{
    localStorage.setItem('financialYear', financialYear);

    props?.allTransactions();
    props.getMyBudgets();
  },[financialYear])

  const filteredTransactions=()=>{
    return transactions?.resp?.data?.filter((item)=>item?.budget?.fyi?.toLowerCase().includes(financialYear.toLowerCase()));
  }
  
  
  const groupedTransactions = groupTransactionsByDate(filteredTransactions());

  const myBudgetData=props?.data?.budgets;
  const filterBudget=()=>{
    return myBudgetData?.resp?.data?.filter((item)=>item.fyi.toLowerCase().includes(financialYear));
  }

  const [total,setTotal]=useState(0)

  const calculateTotalAmount = () => {
    let totalAmount = 0;
  
    filterBudget()?.forEach((item) => {
      totalAmount += parseInt(item.amount);
    });
  
    return totalAmount;
  };

  const calculateIncome=()=>{
    let totalIncome=0;

    filteredTransactions()?.forEach((item) => {
      if (item?.type?.toLowerCase() =='income') {
        totalIncome += parseInt(item.amount);
      }
    });

    return totalIncome;
  }

  const calculateExpense=()=>{
    let totalExpense=0;

    filteredTransactions()?.forEach((item) => {
      if (item?.type?.toLowerCase() =='expense') {
        totalExpense += parseInt(item.amount);
      }
    });

    return totalExpense;
  }  


  return (
    <AdminDashboard setUserData={setUserData} setFinancialYear={setFinancialYear}>
      <div className='py-4 font-bold text-text_primary text-sm'>
        <p>{salutation()} <span className='text-secondary'>{userData?.getProfile?.fullNames}</span>. Welcome to <span className='text-secondary'>{userData?.getProfile?.institution?.institutionName} BPE</span>  Dashboard</p>
      </div>
      <div className="w-full lg:grid grid-cols-3 gap-4 h-full items-start lg:py-4 mb-8">
        <div className='col-span-2 w-full'>
          <div className='lg:flex justify-start gap-2 w-full mb-4 items-center'>
            <div className='py-2 px-4 my-2 w-full h-28 font-bold bg-secondary rounded-lg shadow-lg drop-shadow-lg'>
              <h1 className='text-xl text-primary2'>Total Budget</h1>

              <div className='flex relative justify-between lg:mt-8 mt-4 text-primary2'>
                <div className='text-xl'>{myBudgetData?.loading?<Loading/>:myBudgetData.success?calculateTotalAmount():0}</div>
                <label className='absolute left-0 -top-4'>RF</label>
              </div>

              <MdEditNote size={25} className='text-primary2 cursor-pointer hover:text-primary delay-100 duration-200 absolute top-2 right-2 z-10'/>

              <div className='absolute top-0 right-0 left-0 w-full h-28 bg-gradient-to-r from-secondary to-primary opacity-30 rounded-lg'/>
            </div>
            <div className='p-2 grid grid-cols-1 gap-2 w-full h-full lg:border-l border-text_primary border-opacity-10'>
              <div className='h-16 p-2 w-full rounded-lg  bg-primary2 shadow-lg drop-shadow-md'>
                <h1 className='text-xs text-secondary'>Income & Revenues</h1>
                <div className='flex justify-between text-text_primary'>
                  <p className='text-[10px]'>{calculateIncome()}</p>
                  <label className='text-[10px] p-1'>RF</label>
                </div>

                <hr  className='text-primary'/>
                <p className='flex justify-between text-text_primary text-[10px]'><span className='text-red flex justify-start gap-2 text-[10px]'><FaArrowTrendDown size={10}/> 5%</span>Last year: 500000</p>
              </div>

              <div className='h-16 p-2 w-full rounded-lg  bg-primary2 shadow-lg drop-shadow-md'>
                <h1 className='text-xs text-secondary'>Expenses</h1>
                <div className='flex justify-between text-text_primary'>
                  <p className='text-[10px]'>{calculateExpense()}</p>
                  <label className='text-[10px] p-1'>RF</label>
                </div>

                <hr  className='text-primary'/>
                <p className='flex justify-between text-text_primary  text-[10px]'><span className='text-success flex justify-start gap-2'><FaArrowTrendDown size={10}/> 5%</span>Last year: 300000</p>
              </div>
            </div>
          </div>
          <div className='w-full p-4 my-4 rounded-lg  bg-primary2 shadow-lg drop-shadow-lg min-h-80'>
            {transactions?.loading?(
                <Loading/>
              ):(
                transactions?.success?(
                  filteredTransactions()?.length<=0?(
                    <NoDataFound/>
                  ):(
                    <BarCharts transactions={transactions?.resp?.data} financialYear={financialYear}/>
                  )
                  
                ):(
                  <Error code={transactions?.error?.code} message={transactions?.error?.message}/>
                  
                )
              )}
          </div>

        </div>
        <div className='w-full overflow-hidden max-h-full min-h-full rounded-lg  bg-primary2 shadow-lg drop-shadow-md pb-4'>
          <div className='p-4 text-sm font-bold text-text_primary'>
            Recent transactions
          </div>
          <div className='h-full overflow-y-auto px-4 '>
            {transactions?.loading?(
              <Loading/>
            ):(
              transactions?.success?(
                filteredTransactions()?.length<=0?(
                  <NoDataFound/>
                ):(
                  filteredTransactions().slice(0,10).map((item,index)=>(
                    <div key={index} className='flex justify-between gap-2 text-text_primary p-1'>
                      <div className={`text-sm flex items-center justify-center delay-100 duration-200 cursor-pointer px-2 rounded-full w-4`}>
                        {index +1}
                      </div>
                      <div className='w-full text-sm flex items-start'>{item.category}</div>
                      <label className={`${item.type.toLowerCase()=='expense'?'text-red':'text-success'} text-[10px]`}>{item.type.toLowerCase()=='expense'?"-":"+"}{item.amount}RF</label>
                    </div>
                  ))
                )
                
              ):(
                
                <Error code={transactions?.error?.code} message={transactions?.error?.message}/>
                
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
            {myBudgetData.loading?(
              <tr>
                <td colSpan={5} className='text-center'><Loading/></td>
              </tr>
            ):(
              myBudgetData.success?(
                filterBudget().length <=0?(
                  <tr>
                    <td colSpan={5} className='text-center'><NoDataFound/></td>
                  </tr>
                ):(
                  filterBudget()?.map((item,index)=>(
                    <tr className="text-text_primary" key={index}>
                      <td className="lg:px-4 py-3 border " colSpan={2}>
                        <div className="lg:flex items-center text-sm">
                          <div className="relative w-4 h-4 mr-3 rounded-full hidden lg:block">
                            <img className="object-cover w-full h-full rounded-full" src={GovernmentLogo} alt="" loading="lazy" />
                            <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                          </div>
                          <div>
                            <p className="font-regular text-black text-xs lg:text-sm">{item.institution.institutionName}</p>
                            <p className="text-xs text-gray-600">{item.institution.acronym}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs lg:text-sm border">{item.amount} RF</td>
                      <td className="px-4 py-3 text-xs lg:text-sm border">
                        <span className="px-2 py-1 leading-tight text-green-700 bg-green-100 rounded-sm">{(item.amount/calculateTotalAmount())*100}%</span>
                      </td>
                    </tr>
                  ))
                  
                )
              ):(
                <tr>
                  <td colSpan={5} className='text-center'><Error code={myBudgetData?.error?.code} message={myBudgetData?.error?.message}/></td>
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
            {transactions?.loading?(
                  <Loading/>
                ):(
                  transactions?.success?(
                    groupedTransactions?.length<=0?(
                        <NoDataFound/>
                    ):(
                      groupedTransactions?.map((item,index)=>{
                        return(
                          <div key={index} className=''>
                            <label className='my-4 font-semibold px-4 text-sm'>{groupedTransactions[index]?.date}</label>
                            {groupedTransactions[index]?.transactions?.map((item,index)=>(
                              <div key={index} className={`flex items-center justify-start py-2 cursor-pointer hover:bg-primary bg-opacity-50 gap-2 border-l-2 px-4 ${item.type.toLowerCase() =='income'?'border-success':'border-red'} `}>
                                <div className='w-full text-sm'>
                                  <p>{item.category}</p>
                                </div>
                                <div className='flex w-full justify-start gap-2 cursor-pointer items-center'>
                                  <div className='w-4 h-4 hidden lg:block'>
                                      <img src={GovernmentLogo} className='w-full h-full object-cover'/>
                                  </div>
                                  <p className='p-1 text-sm'>{item?.institution?.institutionName}</p>
                                </div>
                                <div className={`bg-primary text-sm opacity-50 w-24 ${item.type.toLowerCase() =='income'?'text-success':'text-red'}  p-1 rounded-lg`}>
                                  <p>{item.type}</p>
                                </div>
                                <div className={`${item.type.toLowerCase()=='expense'?'text-red':'text-success'} w-full text-sm text-right`}>
                                  <p>{item.type.toLowerCase()=='expense'?"-":"+"}{item.amount} RF</p>
                                </div>
                              </div>
                            ))}
                            
                            
                          </div>
                        )
                      })
                    )
                    
                  ):(
                    
                    <Error code={transactions?.error?.code} message={transactions?.error?.message}/>
                    
                  )
                )}
          </div>
        </div>
      </div>
    </AdminDashboard>
  )
}

const mapState=(data)=>({
  data:data
})

export default connect(mapState,{allTransactions,getMyBudgets})(Dashboard)