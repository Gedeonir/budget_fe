import React from 'react'

const barData = [
    {
        month:"Jan",
        income:"1000",
        expenses:"1450",
        expensespercentage:"30%",
        incomepercentage:"70%",
    },
    {
        month:"Feb",
        income:"100",
        expenses:"140",
        expensespercentage:"4%",
        incomepercentage:"10%",
    },
    {
        month:"Mar",
        income:"10000",
        expenses:"14505",
        expensespercentage:"68%",
        incomepercentage:"95%",
    },
    {
        month:"Apr",
        income:"1000000",
        expenses:"50",
        expensespercentage:"17%",
        incomepercentage:"65%",
    },
    {
        month:"May",
        income:"10",
        expenses:"14",
        expensespercentage:"3%",
        incomepercentage:"7%",
    },
    {
        month:"Jun",
        income:"1000",
        expenses:"1450",
        expensespercentage:"50%",
        incomepercentage:"50%",
    },
    {
        month:"Jul",
        income:"1000",
        expenses:"1450",
        expensespercentage:"30%",
        incomepercentage:"20%",
    },
    {
        month:"Aug",
        income:"1000",
        expenses:"1450",
        expensespercentage:"37%",
        incomepercentage:"79%",
    },
    {
        month:"Sept",
        income:"1000",
        expenses:"1450",
        expensespercentage:"37%",
        incomepercentage:"29%",
        
    },
    {
        month:"Oct",
        income:"1000",
        expenses:"1450",
        expensespercentage:"60%",
        incomepercentage:"99%",
    },
    {
        month:"Nov",
        income:"1000",
        expenses:"1450",
        expensespercentage:"37%",
        incomepercentage:"79%",
    },
    {
        month:"Dec",
        income:"1000",
        expenses:"1450",
        expensespercentage:"47%",
        incomepercentage:"87%",
    },
]

function BarCharts() {

  return (
    <div className='flex justify-end h-80'>
        <div className='h-72 border-r border-text_primary border-opacity-10 w-8 flex items-end relative'>
            <div className='h-1/4 border-t border-text_primary border-opacity-30 w-2 absolute right-0'/>
            <div className='h-1/2 border-t border-text_primary border-opacity-30 w-2 absolute right-0'/>
            <div className='h-3/4 border-t border-text_primary border-opacity-30 w-2 absolute right-0'/>
            <div className='h-full border-t border-text_primary border-opacity-30 w-2 absolute right-0'/>

        </div>
        <div className="flex h-72 items-end justify-start flex-grow w-11/12 space-x-2 sm:space-x-1 relative text-text_primary">
            {barData.map((value,index)=>(
                <div key={index} className="relative flex flex-col items-center flex-grow group cursor-pointer">
                    <div className="absolute top-8 right-2 z-20 hidden text-xs font-bold group-hover:block rounded-lg p-2 w-24 bg-primary shadow-lg drop-shadow-lg">
                        <p><span className='text-success'>I:</span>{value.income}({value.incomepercentage})</p>
                        <p><span className='text-red'>E:</span>{value.expenses}({value.expensespercentage})</p>
                    </div>
                    <div className="flex items-end w-4 h-72 hover:opacity-25 z-10">
                        <div className={`relative flex justify-center flex-grow bg-success`} style={{ height: value.incomepercentage }}></div>
                        <div className="relative flex justify-center flex-grow bg-red"  style={{ height: value.expensespercentage}}></div>	
                    </div>
                    <span className="absolute -bottom-5 text-xs font-bold ">{value.month}</span>
                </div>
            ))}
        </div>
    </div>
  )
}

export default BarCharts