import React,{useEffect, useState} from 'react'
import AdminDashboard from '../../components/AdminDashboard'
import { GoStop } from "react-icons/go";
import { Link } from 'react-router-dom';
import LineChart from '../../components/LineChart';
import { allTransactions, getMyBudgets } from '../../redux/Actions/BudgetActions';
import { connect } from 'react-redux';

const Forecast = (props) => {
    const[type,setType]=useState('income');
    const options = {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Budget',
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
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
    };

    const [userData,setUserData]=useState([]);
    const [financialYear,setFinancialYear]=useState(() => {
        const year = localStorage.getItem('financialYear');
        return year ? year : " ";
      })
    
      useEffect(()=>{
        localStorage.setItem('financialYear', financialYear);
    
        props?.allTransactions();
        props.getMyBudgets();
      },[financialYear])

      const transactions=props?.data?.allTransactions;

      const filteredTransactions=()=>{
        return transactions?.resp?.data?.filter((item)=>item?.budget?.fyi?.toLowerCase().includes(financialYear.toLowerCase()));
      }

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

      const myBudgetData=props?.data?.budgets;
      const filterBudget=()=>{
        return myBudgetData?.resp?.data?.filter((item)=>item.fyi.toLowerCase().includes(financialYear));
      }

      const calculateExpectedExpenses=()=>{
        let totalExpense=0;
    
        filterBudget()?.forEach((item) => {
            item?.expenditures?.forEach((budgetItem) => {
                totalExpense += parseInt(budgetItem.amountToSpent);
            })
        });
    
        return totalExpense;
      }

      const calculateExpectedIncome=()=>{
        let totalIncome=0;
    
        filterBudget()?.forEach((item) => {
            item?.revenues?.forEach((budgetItem) => {
                totalIncome += parseInt(budgetItem.amountToCollect);
            })
        });
    
        return totalIncome;
      }
    
    function generateChartDataByFiscalYear(transactions) {
      // Initialize the result object
      const data = {
        labels: [], // Fiscal year labels will be populated dynamically
        datasets: [
          {
            label: 'Actual',
            data: [], // Will accumulate actual expenses
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
            label: 'Expected',
            data: [], // Placeholder for expected values
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
    
      // Group transactions by fiscal year
      const fiscalYearData = {};
    
      transactions?.resp?.data?.forEach(transaction => {
        if (transaction.type.toLowerCase() ==type) {
          // Extract fiscal year from the budget
          const fiscalYear = transaction.budget.fyi; // Assuming budget ID correlates to fiscal year
    
          if (!fiscalYearData[fiscalYear]) {
            fiscalYearData[fiscalYear] = {
              actual: 0,
              expected: 0, // Placeholder for expected
            };
          }
    
          // Accumulate the expenses for the fiscal year
          fiscalYearData[fiscalYear].actual += Math.floor(parseFloat(transaction.amount));

          type == 'expense' && transaction.budget.expenditures.forEach(budget => {
            fiscalYearData[fiscalYear].expected += Math.floor(parseFloat(budget.amountToSpent));
          });

        }
      });
    
      const sortedFiscalYears = Object.keys(fiscalYearData).sort((a, b) => a.localeCompare(b));

      // Populate the chart data in sorted order
      sortedFiscalYears.forEach(fiscalYear => {
        const values = fiscalYearData[fiscalYear];
        data.labels.push(fiscalYear);
        data.datasets[0].data.push(values.actual);
        data.datasets[1].data.push(values.expected);
      });
    
      return data;
    }
    
    // Example usage
    
    const chartData = generateChartDataByFiscalYear(transactions);
      



  return (
    <AdminDashboard setUserData={setUserData} setFinancialYear={setFinancialYear}>
        <div className='grid lg:grid-cols-3 gap-3 w-full p-2'>
            <div className=''>
                <div className='py-4 font-bold text-text_primary w-full overflow-x-hidden'>
                    <p>Budget projection</p>
                </div>

                <div className='flex justify-between mb-4'>
                    <div className='text-text_primary'>
                        <label className='text-sm my-2'>Income collected</label>
                        <p className='text-lg font-bold'>{calculateIncome()}</p>
                    </div>
                    <div className='text-text_primary'>
                        <label className='text-sm my-2'>Income Expected</label>
                        <p className='text-lg font-bold'>{calculateExpectedIncome()}</p>
                    </div>
                </div>

                <div className='flex justify-between mb-4'>
                    <div className='text-text_primary'>
                        <label className='text-sm my-2'>Budget spent</label>
                        <p className='text-lg font-bold'>{calculateExpense()}</p>
                    </div>
                    <div className='text-text_primary'>
                        <label className='text-sm my-2'>Expense Expected</label>
                        <p className='text-lg font-bold'>{calculateExpectedExpenses()}</p>
                    </div>
                </div>
            </div>
            <div className='lg:px-4'>
                <div className='py-4 font-bold text-text_primary w-full overflow-x-hidden'>
                    <p>Budget Insights</p>
                </div>
                
                <div className='flex mb-2 justify-center items-center bg-red bg-opacity-10 rounded-lg w-12 h-12'>
                    <GoStop size={25} className='text-red'/>
                </div>
                <div>
                    <p className='text-sm text-text_primary'>You are about to reach your budget limit</p>
                    <Link to={"#"} className='text-secondary font-bold '>View details</Link>
                </div>
                <div className='flex justify-start gap-4 mt-3'>
                    <div className='w-2 h-2 bg-text_primary rounded-full bg-opacity-40'/>
                    <div className='w-2 h-2 bg-secondary rounded-full'/>
                    <div className='w-2 h-2 bg-text_primary rounded-full bg-opacity-40'/>
                </div>
                
            </div>
            <div className=''>
                <div className='py-4 font-bold text-text_primary w-full overflow-x-hidden'>
                    <p>Account watchlist</p>
                </div>

                <div className='w-full mb-2'>
                    <label className='text-md my-2 text-text_primary'>Income account</label>

                    <div className='w-full h-4 bg-success rounded-sm bg-opacity-10'>
                        <div className='w-1/2 h-full bg-success rounded-sm'/>
                    </div>

                    <label className='text-xs my-2 text-text_primary'>Your income is going good!</label>

                </div>

                <div className='w-full'>
                    <label className='text-md my-2 text-text_primary'>Expensess account</label>

                    <div className='w-full h-4 bg-red rounded-sm bg-opacity-10'>
                        <div className='w-1/2 h-full bg-red rounded-sm'/>
                    </div>

                    <label className='text-xs my-2 text-text_primary'>Your income is going good!</label>

                </div>
            </div>

        </div>

        <section className='w-full px-2'>
            <div className='flex justify-between items-center'>
                <div className='py-4 font-bold text-text_primary w-full overflow-x-hidden'>
                    <p>Budget Flow Chart</p>
                </div>

                <form className='justify-start gap-1 hidden lg:flex'>
                    <select className='border w-24 text-text_primary rounded-lg border-text_primary border-opacity-40' onChange={(e)=>setType(e.target.value)}>
                        <option value={"income"}>Income</option>
                        <option value={"expense"}>Expenses</option>
                    </select>
                </form>
            </div>

            <LineChart options={options} data={chartData}/>

        </section>
    </AdminDashboard>
  )
}

const mapState=(data)=>({
    data:data
  })
  
  export default connect(mapState,{allTransactions,getMyBudgets})(Forecast)