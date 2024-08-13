import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowTrendDown } from "react-icons/fa6";
import { MdEditNote } from "react-icons/md";
import BarCharts from '../../components/BarCharts';
import { IoCashSharp } from "react-icons/io5";
import AdminDashboard from '../../components/AdminDashboard';


const incomes=[
  {
    incomeName:"Savings",
    percentage:"10%",
  },
  {
    incomeName:"Government Allowance",
    percentage:"10%",
  },
  {
    incomeName:"Penalty fees",
    percentage:"10%",
  },
  {
    incomeName:"External loans and aids",
    percentage:"10%",
  },
  {
    incomeName:"Social health insurance contributions",
    percentage:"10%",
  },
  {
    incomeName:"Social health insurance contributions",
    percentage:"10%",
  },
  {
    incomeName:"Social health insurance contributions",
    percentage:"10%",
  },
  {
    incomeName:"Social health insurance contributions",
    percentage:"10%",
  },
  {
    incomeName:"Social health insurance contributions",
    percentage:"10%",
  },
  {
    incomeName:"Social health insurance contributions",
    percentage:"10%",
  }
]

const expenses=[
  {
    "icon":"",
    "target":300000,
    "current":300500,
    "expenses":"Transport"
  },
  {
    "icon":"",
    "target":300000,
    "current":10000,
    "expenses":"Computer maintanence"
  },
  {
    "icon":"",
    "target":300000,
    "current":10000000,
    "expenses":"rent"
  }
]

function Dashboard() {
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

  return (
    <AdminDashboard setUserData={setUserData}>
      <div className='py-4 font-extrabold text-text_primary'>
        <p>{salutation()} <span className='text-secondary'>{userData?.getProfile?.fullNames}</span>. Welcome to <span className='text-secondary'>{userData?.getProfile?.institution?.institutionName} BPE</span>  Dashboard</p>
      </div>
      <div className="w-full lg:grid grid-cols-3 gap-4 h-full items-start lg:py-4 mb-8">
        <div className='col-span-2 w-full'>
          <div className='lg:flex justify-start gap-8 w-full mb-4'>
            <div className='lg:py-8 py-2 px-4 my-4 w-full h-28 lg:h-52 font-extrabold bg-secondary rounded-lg shadow-lg drop-shadow-lg'>
              <h1 className='lg:text-2xl text-2xl text-primary2'>Total Budget</h1>

              <div className='flex relative justify-between lg:mt-8 mt-4 text-primary2'>
                <p className='lg:text-5xl text-2xl'>5000000</p>
                <label className='absolute left-0 -top-4'>USD</label>
              </div>

              <MdEditNote size={25} className='text-primary2 cursor-pointer hover:text-primary delay-100 duration-200 absolute top-8 right-8 z-10'/>

              <div className='absolute top-0 right-0 left-0 w-full h-28 lg:h-52 bg-gradient-to-r from-secondary to-primary opacity-30 rounded-lg'/>
            </div>
            <div className='lg:pl-8 my-4 grid grid-cols-1 gap-2 w-full h-52 lg:border-l border-text_primary border-opacity-10'>
              <div className='h-24 p-4 w-full rounded-lg  bg-primary2 shadow-lg drop-shadow-md'>
                <h1 className='text-md font-extrabold text-secondary'>Income & Revenues</h1>
                <div className='flex justify-between font-extrabold text-text_primary'>
                  <p className='text-md'>3000000</p>
                  <label className='text-xs p-1'>USD</label>
                </div>

                <hr  className='text-primary'/>
                <p className='flex justify-between text-text_primary text-xs p-1'><span className='text-red flex justify-start gap-2 text-sm'><FaArrowTrendDown size={20}/> 5%</span>Last year: 500000</p>
              </div>

              <div className='h-24 p-4 w-full rounded-lg  bg-primary2 shadow-lg drop-shadow-md'>
                <h1 className='text-md font-extrabold text-secondary'>Expenses</h1>
                <div className='flex justify-between font-extrabold text-text_primary'>
                  <p className='text-md'>5000000</p>
                  <label className='text-xs p-1'>USD</label>
                </div>

                <hr  className='text-primary'/>
                <p className='flex justify-between text-text_primary text-xs p-1'><span className='text-success flex justify-start gap-2 text-sm'><FaArrowTrendDown size={20}/> 5%</span>Last year: 300000</p>
              </div>
            </div>
          </div>
          <div className='w-full p-4 my-4 rounded-lg  bg-primary2 shadow-lg drop-shadow-lg'>
            <BarCharts/>
          </div>

        </div>
        <div className='w-full overflow-hidden h-full rounded-lg  bg-primary2 shadow-lg drop-shadow-md'>
          <div className='p-4 text-lg font-extrabold text-text_primary mb-2'>
            Income & Revenues categories
          </div>
          <div className='h-full overflow-y-auto px-4 '>
            {incomes.map((value,index)=>(
              <div key={index} className='flex justify-between gap-2 text-text_primary mb-4'>
                <div className={`h-8 py-1 flex items center justify-center delay-100 duration-200 cursor-pointer px-2 rounded-lg w-12 border`}>
                  {index +1}
                </div>
                <div className='w-full'>{value.incomeName}</div>
                <label className='font-extrabold'>{value.percentage}</label>
              </div>
            ))}
          </div>
        </div>

      </div>
      <div className='w-full h-full overflow-x-auto text-text_primary bg-primary2 mb-8 p-4 rounded-lg shadow-lg drop-shadow-lg'>
        <div className='lg:text-lg text-sm font-extrabold text-text_primary mb-4'>
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
            <tr className="text-text_primary">
              <td className="lg:px-4 py-3 border " colSpan={2}>
                <div className="lg:flex items-center text-sm">
                  <div className="relative w-4 h-4 mr-3 rounded-full hidden lg:block">
                    <img className="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" loading="lazy" />
                    <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                  </div>
                  <div>
                    <p className="font-regular text-black text-xs lg:text-sm">RWANDA BIMEDICAL CENTER</p>
                    <p className="text-xs text-gray-600">RBC</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-xs lg:text-sm border">22000000000000</td>
              <td className="px-4 py-3 text-xs lg:text-sm border">
                <span className="px-2 py-1 leading-tight text-green-700 bg-green-100 rounded-sm"> 10%</span>
              </td>
            </tr>
            </tbody>

        </table>
        
      </div>

      <div className='h-92 w-full lg:grid grid-cols-3 gap-4'>
        <div className='col-span-2 h-92 my-4 bg-primary2 text-text_primary py-4 rounded-lg shadow-lg drop-shadow-lg'>
          <div className='text-lg px-4 font-extrabold  mb-4'>
            Recent transactions
          </div>
          <div className=''>
            <label className='my-4 font-semibold px-4'>March 01</label>
            <div className='flex items-center justify-start py-2 cursor-pointer hover:bg-primary bg-opacity-50 gap-2 border-l-2 px-4 border-success'>
            <div className='w-4'>
              <IoCashSharp size={15} className='cursor-pointer text-success hover:text-list_hover delay-100 duration-500'/>
            </div>
            <div className='w-full text-sm'>
              <p>Social health insurance contributions</p>
            </div>
            <div className='bg-primary text-sm opacity-50 w-24 text-success p-1 rounded-lg font-extrabold'>
              <p>Income</p>
            </div>
            <div className='w-full text-sm'>
              <p>100000</p>
            </div>
            <div className='w-40 text-sm text-center'>
              <p>8:00 PM</p>
            </div>


            </div>
            <div className='flex items-center py-2 cursor-pointer hover:bg-primary bg-opacity-50 justify-start gap-2 border-l-2 px-4 border-red'>
              <div className='w-4'>
                <IoCashSharp size={15} className='text-red  delay-100 duration-500'/>
              </div>
              <div className='w-full text-sm'>
                <p>Computer maintenance</p>
              </div>
              <div className='bg-primary text-sm opacity-50 w-24 text-red p-1 rounded-lg font-extrabold'>
                <p>Expense</p>
              </div>
              <div className='w-full text-sm'>
                <p>100000</p>
              </div>
              <div className='w-40 text-sm text-center'>
                <p>8:00 PM</p>
              </div>


            </div>
          </div>
          <div className=''>
            <label className='my-4 font-semibold px-4'>Yesterday</label>
            
          </div>
        </div>
        <div className='h-92 bg-primary2 text-text_primary  py-4 rounded-lg shadow-lg drop-shadow-lg'>
          <div className='text-lg font-extrabold px-4  mb-4'>
            Expenses overview
          </div>
          {expenses.map((item,index)=>{
            let percentage=item.current * 100 /item.target;
          return (
            <div key={index} className={`hover:bg-primary bg-opacity-50 rounded-sm px-4 cursor-pointer`}>
              <div className='flex justify-between flex-shrink'>
                <label className='mb-2 font-medium truncate capitalize'>{item.expenses}</label>
                <label><span className='font-bold'>{item.current}</span> / {item.target}</label>
              </div>

              <div className='h-2 w-full  bg-text_primary bg-opacity-30 rounded-full'>
                  <div className={`h-full ${percentage > 100?percentage > 110?'bg-red':'bg-[#FBA801]':'bg-success'} rounded-full`} style={{ width:percentage > 100?'100%':`${percentage}%`}}>
                  </div>
              </div>

              <label className='mb-2 font-medium truncate capitalize'>
              {
                percentage < 100?(
                  <span className='text-success'>Good</span>
                )
                :
                (
                  percentage > 100 && percentage < 110?(
                  <span className='text-[#FBA801]'>Tolerable</span>
                  )
                  :
                  (
                    <span className='text-red animate-pulse'>UnTolerable</span>
                  )
 
                )
              }                
              </label>
                      
            </div> 
          )})}
        </div>

      </div>
    </AdminDashboard>
  )
}

export default Dashboard