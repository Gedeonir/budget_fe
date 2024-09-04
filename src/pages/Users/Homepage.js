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
import { getMyBudgets } from '../../redux/Actions/BudgetActions';

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


 

  const handlePagination = (pageNumber) => {
    setCurrentPage (pageNumber);
  };

  const data = {
    labels: [0,"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov"],
    datasets: [
      {
        label: 'Actual',
        data: [100000, 25000, 50000, 25000, 25000, 50000, 50000, 75000, 100000, 75000, 25000, 75000],
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

  const latest=[1,2,3,4,];

  const sampleData = [ 
    ['Books', 30], 
    ['Cars', 40], 
    ['Table', 30], 
  ]; 

  const pieData= [
    { id: 0, value: 10, color: "#f44336", label: "Food" },
    { id: 1, value: 15, color: "#2196f3", label: "Transport" },
    { id: 2, value: 20, color: "#ff9800", label: "Household" },
    { id: 3, value: 59, color: "#f44337", label: "Rent" },
    { id: 4, value: 70, color: "#2196f9", label: "Salaries" },
    { id: 5, value: 50, color: "#ff9806", label: "Medical" },
  ]

  
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
    }
  },[financialYear,myBudgetData.success])


  const filterBudget=()=>{
    return myBudgetData?.resp?.data?.filter((item)=>item.fyi.toLowerCase().includes(financialYear));
  }


  console.log(cards);
  

  

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
            <p className='text-lg font-normal text-wrap text-justify'>Budget planning and execution system is computerized system that helps government institutions to plan their budget and monitor the budget execution </p>
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
                <div key={index} className='flex justify-between items-center bg-primary2 p-4 rounded-lg shadow-lg text-text_primary'>
                  <div>
                    <h1 className='font-bold lg:text-xl text-md'>{item.label}</h1>
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
            <div className='w-full bg-primary2 rounded-lg shadow-lg px-4 '>
              <div className='lg:px-8 lg:py-8 py-4 text-text_primary'>
                <h2 className='font-bold lg:text-2xl text-lg'>6800$</h2>
                <p className='flex gap-2 text-sm'>Your spending is <span className='text-red flex justify-start items-end'>9%<FaArrowDownLong size={10}/></span> compared to last year</p>
              </div>
              <LineChart data={data} options={options}/>
            </div>
          </div>
        </div>
        
        <div className='col-span-1 flex flex-col'>
          <div className='relative bg-primary2 rounded-lg shadow-lg py-3  px-4 lg:h-1/2 h-full overflow-hidden'>
            <div className='font-bold text-text_primary w-full overflow-x-hidden'>
              <p>Latest Transactions</p>
            </div>
            {latest.map((item,index)=>{
              return(
                <div key={index} className='w-full flex justify-between mt-4'>
                  <div className='flex justify-start gap-3 items-center'>
                    <div className='w-8 h-8'>
                      <img src={GovernmentLogo} className='w-full h-full object-cover'/>
                    </div>

                    <div className='text-text_primary'>
                      <h2 className='font-semibold text-md'>Salaries</h2>
                      <p className='text-sm'>23 oct 2028</p>
                    </div>
                  </div>
                  <div className='text-xs text-red font-normal'>
                    <label>
                      -6800$
                    </label>
                  </div>

                </div> 
              )
            })}

            <div className='lg:absolute bottom-0 left-0 w-full right-0 flex items-center justify-center py-4 px-4'>
              <Link className='text-text_primary text-sm font-bold border-2 border-primary rounded-lg  w-full p-2 text-center pointer-cursor flex items-center justify-center'>View all</Link>
            </div>
            
          </div>

          <div className='relative flex items-end lg:h-1/2 h-full pt-8'>
            <div className='rounded-lg shadow-lg py-3  px-4 w-full bg-primary2 h-full'>
              <div className='font-bold text-text_primary w-full'>
                <p>Spending Category</p>
              </div>

              <div className='py-2 text-text_primary flex justify-between items-center'>
                <div>
                  <h2 className='font-bold lg:text-2xl text-lg'>6800.289$</h2>
                  <p className='flex gap-2 text-xs'>From 24 Oct to 24 Dec 2024</p>
                </div>
                <p className='flex justify-between text-text_primary text-xs p-1'><span className='text-red flex justify-start gap-2 text-sm'><FaArrowTrendDown size={20}/> 5%</span></p>
              </div>
              
              <div className='w-full'>
                <PieChart
                  series={[
                    {
                      data:pieData,
                      arcLabel: (item) => `${item.label}`,
                      arcLabelMinAngle: 45,
                      innerRadius: 20,
                      outerRadius: 100,
                      paddingAngle: 5,
                      cornerRadius: 5,
                      startAngle: -90,
                      endAngle: 180,
                      cx: 150,
                      cy: 100,
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
                  width={600}
                  height={200}
                  className='w-full'
                />
              </div>
            </div>
          
          </div>
        </div>

      </section>

      <section className='w-full'>
        <div className='py-4 font-bold text-text_primary w-full overflow-x-hidden'>
          <p>Transaction History</p>
        </div>
        
        <div className='w-full bg-primary2 rounded-lg shadow-lg px-4 py-4'>
          <div className='flex justify-between items-center'>
            <div className='relative lg:w-2/5 w-full'>
              <input type='search' placeholder='Search request' className='py-2 px-2 border-2 outline-none border-primary w-full rounded-lg placeholder:text-text_primary placeholder:text-opacity-50'/>
              <IoSearchOutline size={25} className='cursor-pointer font-normal text-text_primary hover:text-list_hover delay-100 duration-500 absolute right-4 top-2'/>
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
          <table border={10} cellSpacing={0} cellPadding={10} className='my-4 lg:text-lg text-xs w-full py-4 text-text_primary text-left px-2 lg:px-4'>
            <thead className='bg-primary'>
                <tr>
                    <th className='font-normal'>Transaction name</th>
                    <th className='font-normal'>Budget</th>
                    <th className='font-normal'>Date</th>
                    <th className='font-normal'>Payement Method</th>
                    <th className='font-normal'>Amount Paid</th>
                </tr>
            </thead>
            <tbody>
              <tr>
                <td className='font-bold'>Salaries</td>
                <td>FYI 2024-2025 Budget</td>
                <td>2024-01-05 12:00:51 PM</td>
                <td>Cash</td>
                <td className='text-red'>-7000 $</td>                
              </tr>
            </tbody>
          </table>

          <Pagination
            length={100}
            postsPerPage={20}
            handlePagination={handlePagination}
          />
        </div>

        
      </section>
      
    </Layout>
  )
}

const mapState=(data)=>({
  data:data
})

export default connect(mapState,{getMyBudgets}) (Homepage)