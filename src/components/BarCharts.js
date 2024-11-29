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

function BarCharts(props) {
    const transactions=props.transactions;
    function getMonthlyIncomeAndExpenses(transactions) {
        // Initialize the results array with 12 months
        const monthlyData = Array.from({ length: 12 }, (_, index) => ({
          month: new Date(0, index).toLocaleString('default', { month: 'short' }), // Short month names (e.g., "Jan")
          income: 0,
          expenses: 0,
          expensesPercentage: "0%", // Default percentage
          incomePercentage: "0%"    // Default percentage
        }));

        const filteredTransactions=()=>{
            return transactions?.filter((item)=>item.budget.fyi.toLowerCase().includes(props.financialYear));
        }
      
        filteredTransactions()?.forEach(transaction => {
          // Parse the month from the transaction date
          const dateObj = new Date(transaction.createdAt);
          const monthIndex = dateObj.getMonth(); // 0 = January, 11 = December
      
          // Accumulate amounts based on the transaction type
          const amount = parseFloat(transaction.amount); // Ensure the amount is a number          
          if (transaction.type === 'Income') {
            monthlyData[monthIndex].income += amount;
          } else if (transaction.type === 'Expense') {
            monthlyData[monthIndex].expenses += amount;
          }
        });
      
        // Calculate percentages for income and expenses
        monthlyData.forEach(month => {
          const total = month.income + month.expenses;
          if (total > 0) {
            month.expensesPercentage = ((month.expenses / total) * 100).toFixed(0) + "%";
            month.incomePercentage = ((month.income / total) * 100).toFixed(0) + "%";
          }
          // Format amounts as strings for consistency
          month.income = month.income.toFixed(2);
          month.expenses = month.expenses.toFixed(2);
        });
      
        return monthlyData;
      }

      
    const monthlySummary = getMonthlyIncomeAndExpenses(transactions);
     
      

  return (
    <div className='flex justify-end h-80'>
        <div className='h-72 border-r border-text_primary border-opacity-10 w-2 lg:w-8 flex items-end relative'>
            <div className='h-1/4 border-t border-text_primary border-opacity-30 w-2 absolute right-0'/>
            <div className='h-1/2 border-t border-text_primary border-opacity-30 w-2 absolute right-0'/>
            <div className='h-3/4 border-t border-text_primary border-opacity-30 w-2 absolute right-0'/>
            <div className='h-full border-t border-text_primary border-opacity-30 w-2 absolute right-0'/>

        </div>
        <div className="flex h-72 items-end justify-start flex-grow w-full lg:w-11/12 lg:space-x-2 space-x-1 relative text-text_primary">
            {monthlySummary?.map((value,index)=>(
                <div key={index} className="relative flex flex-col items-center flex-grow group cursor-pointer">
                    <div className="absolute top-8 -right-12 z-20 hidden text-xs group-hover:block rounded-lg p-2 w-40 bg-primary shadow-lg drop-shadow-lg">
                        <p><span className='text-success'>I:</span>{value.income}({value.incomePercentage})</p>
                        <p><span className='text-red'>E:</span>{value.expenses}({value.expensesPercentage})</p>
                    </div>
                    <div className="flex items-end w-4 h-72 hover:opacity-25 z-10">
                        <div className={`relative flex justify-center flex-grow bg-success`} style={{ height: value.incomePercentage }}></div>
                        <div className="relative flex justify-center flex-grow bg-red"  style={{ height: value.expensesPercentage}}></div>	
                    </div>
                    <span className="absolute -bottom-5 text-xs font-bold ">{value.month}</span>
                </div>
            ))}
        </div>
    </div>
  )
}

export default BarCharts