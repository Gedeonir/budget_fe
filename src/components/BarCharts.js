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
    function getMonthlyIncomeAndExpenses(transactions, fiscalYear) {
        // Extract the starting year from the fiscal year string (e.g., "2024-25")
        const startYear = parseInt(fiscalYear.split('-')[0]);
        const startMonthIndex = 8; // September (0 = January, 8 = September)
      
        // Generate month names for the fiscal year
        const fiscalYearMonths = Array.from({ length: 12 }, (_, index) => {
          const monthIndex = (startMonthIndex + index) % 12;
          const yearOffset = (startMonthIndex + index) >= 12 ? 1 : 0;
          const year = startYear + yearOffset;
          return {
            month: new Date(year, monthIndex).toLocaleString('default', { month: 'short' }) + " " + year,
            income: 0,
            expenses: 0,
            expensesPercentage: "0%",
            incomePercentage: "0%",
          };
        });
      
        const filteredTransactions = () => {
          return transactions?.filter((item) => 
            item.budget.fyi.toLowerCase().includes(fiscalYear)
          );
        };
      
        let totalExpense = 0;
        let totalIncome = 0;
      
        filteredTransactions()?.forEach(transaction => {
          // Parse the date and determine the fiscal year month index
          const dateObj = new Date(transaction.dateTransactionsTookPlace);
          const transactionYear = dateObj.getFullYear();
          const transactionMonth = dateObj.getMonth();
          const transactionFiscalIndex =
            (transactionYear === startYear && transactionMonth >= startMonthIndex) 
              ? transactionMonth - startMonthIndex
              : (transactionYear === startYear + 1 && transactionMonth < startMonthIndex)
                ? transactionMonth + (12 - startMonthIndex)
                : null;
      
          if (transactionFiscalIndex !== null && transactionFiscalIndex >= 0 && transactionFiscalIndex < 12) {
            // Accumulate amounts based on the transaction type
            const amount = parseFloat(transaction.amount); // Ensure the amount is a number          
            if (transaction.type.toLowerCase() === 'income') {
              fiscalYearMonths[transactionFiscalIndex].income += amount;
              totalIncome += amount;
            } else if (transaction.type.toLowerCase() === 'expense') {
              fiscalYearMonths[transactionFiscalIndex].expenses += amount;
              totalExpense += amount;
            }
          }
        });
      
        // Calculate percentages for income and expenses
        fiscalYearMonths.forEach(month => {
          const total = month.income + month.expenses;
          if (total > 0) {
            month.expensesPercentage = ((month.expenses / totalExpense) * 100).toFixed(2) + "%";
            month.incomePercentage = ((month.income / totalIncome) * 100).toFixed(2) + "%";
          }
          // Format amounts as strings for consistency
          month.income = month.income.toFixed(2);
          month.expenses = month.expenses.toFixed(2);
        });
      
        return fiscalYearMonths;
      }
      

      
    const monthlySummary = getMonthlyIncomeAndExpenses(transactions, props.financialYear);
     
      

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
                    <div className="flex items-end w-2 h-72 hover:opacity-25 z-10">
                        <div className={`relative flex justify-center flex-grow bg-success`} style={{ height: value.incomePercentage }}></div>
                        <div className="relative flex justify-center flex-grow bg-red"  style={{ height: value.expensesPercentage}}></div>	
                    </div>
                    <span className="absolute -bottom-5 text-[10px]">{value.month}</span>
                </div>
            ))}
        </div>
    </div>
  )
}

export default BarCharts