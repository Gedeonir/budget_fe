import React, { useEffect, useState } from 'react'
import AdminDashboard from '../../components/AdminDashboard'
import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';
import ProgressBar from '../../components/ProgressBar';
import { FaCircleDot } from "react-icons/fa6";
import { MdOutlineLibraryBooks } from "react-icons/md";
import AddIncomeStatement from '../../components/AddIncomeStatement';



const recentIncomes = [
   {
    "income":"Government budget allocation",
    "amount":100000,
    "percentage":78
   },
   {
    "income":"Government budget allocation",
    "amount":100000,
    "percentage":17
   },
   {
    "income":"External Aid and Donor funding",
    "amount":100000,
    "percentage":19
   },
   {
    "income":"Government budget allocation",
    "amount":100000,
    "percentage":100
   },
   {
    "income":"Taxes and Levies",
    "amount":100000,
    "percentage":67
   },
   {
    "income":"Government budget allocation",
    "amount":100000,
    "percentage":10
   },
  ];

  const incomeCollected = [
      {
        "month":"Jan",
        "percentage":10
      },
      {
        "month":"Jan",
        "percentage":67
      },
      {
        "month":"Jan",
        "percentage":100
      },
      {
        "month":"Jan",
        "percentage":85
      },
      {
        "month":"Jan",
        "percentage":99
      },
      {
        "month":"Jan",
        "percentage":79
      },
      {
        "month":"Jan",
        "percentage":56
      },
      {
        "month":"Jan",
        "percentage":43
      },
      {
        "month":"Jan",
        "percentage":99
      },
      {
        "month":"Jan",
        "percentage":79
      },
      {
        "month":"Jan",
        "percentage":56
      },
      {
        "month":"Jan",
        "percentage":43
      },
  ]

  const groupIncomes=(income)=>{
    let result=[];
    let length=income.length;
    for(let i=0;i<length;i+=3){
      result.push(income.slice(i,i+3))
    }

    return result;
  }

const IncomeStatements = () => {
    const options = {
        nav: false,
        navText: ["<div className='bg-secondary text-primary2 w-8 h-8 rounded-full absolute inset-y-10 -left-6 text-xl'>‹</div>", "<div className='bg-secondary text-primary2 w-8 h-8 rounded-full absolute inset-y-10 -right-6 text-xl'>›</div>"],
        autoplay: true,
        dots: true,
        // autoplayTimeout: 8500,
        smartSpeed: 2500,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        },
      };
      let income=groupIncomes(recentIncomes);

      const [open,openModal]=useState(false);
    useEffect(()=>{
      
      
    },[])
  return (
    <AdminDashboard openModal={open}>
        <div className='py-4 font-extrabold text-text_primary'>
            <p>Incomes and Revenues statement</p>
        </div>
        <div className='w-full bg-primary2 shadow-lg rounded-lg px-8 py-4'>
            <p className='text-lg text-secondary font-bold'>Recent Incomes</p>
            <OwlCarousel className="w-11/12 relative" {...options} >
            {recentIncomes.map((src,index)=>{
            return(
                <div key={index} className='border border-primary rounded-lg mx-2 py-2 px-2'>
                    <p className='text-text_primary font-bold'>{src.income}</p>
                    <div className='flex relative justify-between mt-4 text-secondary'>
                      <p className='text-xl font-bold'>5000000</p>
                      <label className='absolute left-0 -top-4 text-xs'>USD</label>
                    </div>
                </div>
                )
                })}
            </OwlCarousel>
        </div>

        <section className='mt-8 h-92 w-full'>

          <div className='flex justify-start gap-2 w-full'>
            <div className='w-1/5 bg-primary2 rounded-lg drop-shadow shadow-lg text-center py-4 px-2'>
              <h1 className='text-secondary font-extrabold text-sm '>Income Collected</h1>
              <div className='w-24 h-24 my-2 mx-auto'>
                <ProgressBar percentage={10}/>
              </div>
              <div className='flex gap-2 animate-pulse justify-center items-center px-2 text-red'>
                <FaCircleDot size={10}/>
                <label className='font-bold py-2'>
                  Poor
                </label>
              </div>
            </div>
            <div className='w-3/5 flex justify-between flex-wrap items-center bg-primary2 rounded-lg drop-shadow shadow-lg text-center py-4 px-2'>
              {income[0]?.map((item,index)=>(
                <div key={index} className='border border-primary rounded-lg py-2 px-4 flex justify-between items-center gap-2'>
                  <div>
                    <p className='text-text_primary font-bold'>{item.income}</p>
                    <div className='flex relative justify-between mt-2 text-secondary'>
                        <p className='font-bold'>5000000<span>USD</span></p>
                    </div>
                  </div>
                  <div className='w-12'>
                    <ProgressBar percentage={50}/>
                  </div>
                </div>
              ))}
              
            </div>
            <button className='w-1/5 px-2 group' onClick={()=>openModal(!open)}>
              <div className='w-full h-3/4 group-hover:text-secondary delay-100 duration-200 cursor-pointer text-text_primary opacity-50 flex justify-center items-center text-center border border-dashed rounded-lg group-hover:border-secondary border-text_primary'>
                <MdOutlineLibraryBooks size={80}/>
              </div>
              <p className={`mt-2 bg-secondary text-sm text-center text-primary font-bold p-2 w-full`}>
                Record new income
              </p>              
            </button>
          </div>
          <div className='mt-4 flex justify-start gap-4'>
            <div className='bg-primary2 w-3/5 rounded-lg py-4 px-4 shadow-lg'>
                <div className='font-extrabold text-text_primary'>
                    <p className='font-semibold'>Income average</p>
                    <label className='text-xl font-normal'>$200.15/Month</label>
                </div>
                <div className='flex relative h-72 justify-center items-end flex-shrink gap-6 mt-4 pb-8'>
                    {incomeCollected.map((item)=>(
                        <div style={{height:item.percentage+'%'}} className={`relative cursor-pointer group hover:bg-secondary duration-300 delay-100 transition-all flex items-end justify-center w-8 rounded-md bg-text_primary bg-opacity-30`}>
                            <p className='text-text_primary text-center text-xs font-semibold group-hover:text-primary2 duration-300 delay-100 transition-all'>{item.percentage}%</p>
                            <div className='w-20 rounded-md absolute hidden group-hover:block -left-16 -top-4 bg-primary2 drop-shadow-lg shadow-lg p-2'>
                                <p className='text-right font-bold text-xs text-text_primary'>$1000.906</p>
                                <div className='bg-secondary w-4 h-4 rounded-full flex items-center justify-center absolute -bottom-2 -right-2'>
                                    <div className='bg-primary2 h-2 w-2 rounded-full'/>
                                </div>
                            </div>
                            <p className='absolute -bottom-8 text-text_primary group-hover:text-secondary font-bold group-hover:underline duration-300 delay-100 transition-all'>{item.month}</p>
                        </div>
                    ))}
                    
                </div>
            </div>
            <div className='overflow-y-hidden w-2/5 bg-primary2 shadow-lg rounded-lg pb-2'>
              <div className='w-full py-4 sticky top-0 px-4 bg-primary2 z-10 border-b border-primary'>
                <h1 className='text-text_primary font-bold text-lg'>Top Revenues</h1>              
              </div>
              <div className='overflow-y-auto h-80 text-md'>
              {recentIncomes.map((src,index)=>{
                  return(
                      <div key={index} className=' py-2 px-4 flex justify-between items-center'>
                        <div>
                          <p className='text-text_primary font-bold'>{src.income}</p>
                          <div className='flex relative justify-between mt-2 text-secondary'>
                              <p className='font-bold'>5000000<span>USD</span></p>
                          </div>
                        </div>
                        <div className='w-12'>
                          <ProgressBar percentage={src.percentage}/>
                        </div>
                      </div>
                      )
                      })}
              </div>
            </div>
          </div>
        
        </section>
        {open && <AddIncomeStatement open={open} openModal={openModal}/>}
    </AdminDashboard>
  )
}

export default IncomeStatements