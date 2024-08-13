import React from 'react'
import AdminDashboard from '../../components/AdminDashboard'
import { GoStop } from "react-icons/go";
import { Link } from 'react-router-dom';
import LineChart from '../../components/LineChart';

const Forecast = () => {
  return (
    <AdminDashboard>
        <div className='grid grid-cols-3 gap-3 w-full p-2'>
            <div className=''>
                <div className='py-4 font-extrabold text-text_primary w-full overflow-x-hidden'>
                    <p>Budget projection</p>
                </div>

                <div className='flex justify-between mb-4'>
                    <div className='text-text_primary'>
                        <label className='text-sm my-2'>Income collected</label>
                        <p className='text-lg font-bold'>300000</p>
                    </div>
                    <div className='text-text_primary'>
                        <label className='text-sm my-2'>Income Expected</label>
                        <p className='text-lg font-bold'>800000</p>
                    </div>
                </div>

                <div className='flex justify-between mb-4'>
                    <div className='text-text_primary'>
                        <label className='text-sm my-2'>Budget spent</label>
                        <p className='text-lg font-bold'>300000</p>
                    </div>
                    <div className='text-text_primary'>
                        <label className='text-sm my-2'>Expense Expected</label>
                        <p className='text-lg font-bold'>800000</p>
                    </div>
                </div>
            </div>
            <div className='px-4'>
                <div className='py-4 font-extrabold text-text_primary w-full overflow-x-hidden'>
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
                <div className='py-4 font-extrabold text-text_primary w-full overflow-x-hidden'>
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
                <div className='py-4 font-extrabold text-text_primary w-full overflow-x-hidden'>
                    <p>Budget Flow Chart</p>
                </div>

                <form className='justify-start gap-1 hidden lg:flex'>
                    <select className='border w-24 text-text_primary rounded-lg border-text_primary border-opacity-40'>
                        <option value={"Income"}>Income</option>
                        <option value={"Expenses"}>Expenses</option>
                    </select>
                </form>
            </div>

            <LineChart/>

        </section>
    </AdminDashboard>
  )
}

export default Forecast