import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowTrendDown } from "react-icons/fa6";
import Layout from '../components/Layout';
import { MdEditNote } from "react-icons/md";
import BarCharts from '../components/BarCharts';


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

function Homepage() {
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
    <Layout setUserData={setUserData}>
      <div className='py-4 font-extrabold text-text_primary'>
        <p>{salutation()} <span className='text-secondary'>{userData?.getProfile?.fullNames}</span>. Welcome to <span className='text-secondary'>{userData?.getProfile?.institution?.institutionName} BPE</span>  Dashboard</p>
      </div>
      <div className="w-full grid grid-cols-3 gap-4 h-full items-start py-4 mb-8">
        <div className='col-span-2 w-full'>
          <div className='flex justify-start gap-8 w-full mb-4'>
            <div className='p-8 w-full h-52 font-extrabold bg-secondary rounded-lg shadow-lg drop-shadow-lg'>
              <h1 className='text-5xl text-primary2'>Total</h1>
              <p className='text-lg text-primary px-2'>Budget</p>

              <div className='flex relative justify-between mt-8 text-primary2'>
                <p className='text-5xl'>5000000</p>
                <label className='absolute left-0 -top-4'>USD</label>
              </div>

              <MdEditNote size={25} className='text-primary2 cursor-pointer hover:text-primary delay-100 duration-200 absolute top-8 right-8 z-10'/>

              <div className='absolute top-0 right-0 left-0 w-full h-52 bg-gradient-to-r from-secondary to-primary opacity-50 rounded-lg'/>
            </div>
            <div className='pl-8 grid grid-cols-1 gap-2 w-full h-52 border-l border-text_primary border-opacity-10'>
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
          <div className='w-full p-4 rounded-lg  bg-primary2 shadow-lg drop-shadow-lg'>
            <BarCharts/>
          </div>

        </div>
        <div className='w-full overflow-hidden h-full rounded-lg  bg-primary2 shadow-lg drop-shadow-md'>
          <div className='p-4 text-lg font-extrabold text-text_primary mb-2'>
            Income & Revenues categories
          </div>
          <div className='h-full overflow-y-auto px-4 '>
            {incomes.map((value,index)=>(
              <div className='flex justify-between gap-2 text-text_primary mb-4'>
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
      <div className='w-full h-full text-text_primary bg-primary2 p-4 rounded-lg shadow-lg drop-shadow-lg'>
        <div className='text-lg font-extrabold text-text_primary mb-4'>
          Budget allocated to various instutitions
        </div>        
        <table className='w-full'>
          <thead>
            <tr class="text-md font-semibold tracking-wide text-left text-text_primary  capitalize">
              <th class="px-4 py-2 border w-2/5" colSpan={2}>institution</th>
              <th class="px-4 py-2 border w-1/5">Budget amount allocated</th>
              <th class="px-4 py-2 border w-1/5">Budget percentage allocated</th>
            </tr>
          </thead>
          <tbody class="">
            <tr class="text-text_primary">
              <td class="px-4 py-3 border" colSpan={2}>
                <div class="flex items-center text-sm">
                  <div class="relative w-8 h-8 mr-3 rounded-full md:block">
                    <img class="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" loading="lazy" />
                    <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                  </div>
                  <div>
                    <p class="font-semibold text-black">RWANDA BIMEDICAL CENTER</p>
                    <p class="text-xs text-gray-600">RBC</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 text-ms font-semibold border">22000000000000</td>
              <td class="px-4 py-3 text-xs border">
                <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> 10%</span>
              </td>
            </tr>
            </tbody>

        </table>
        
      </div>
    </Layout>
  )
}

export default Homepage