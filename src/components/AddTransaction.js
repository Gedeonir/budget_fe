import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { connect } from 'react-redux';
import { getMyBudgets, recordTransaction, viewCategories } from '../redux/Actions/BudgetActions';
import { categories } from './AddExpenses';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';


const months = [
  "Jan", "Feb", "Mar", "Apr",
  "May", "Jun", "Jul", "Aug",
  "Sept", "Oct", "Nov", "Dec"
];
const AddTransaction = (props) => {

  const [formData, setFormData] = useState({
    transactionDescription: "",
    amount: "",
    type: "",
    institution: props?.userData && props?.userData?.getProfile?.institution?._id || "",
    budget: "",
    category: "",
    dateTransactionsTookPlace: "",
  });
  

  const institutionName = useRef()
  const budget = useRef()

  useEffect(() => {
    props.getMyBudgets()
  }, [props?.institution, props?.budget])


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.recordTransaction(formData);
  };

  const navigate = useNavigate()

  const filterBudget = props?.data?.budgets?.resp?.data?.filter(item => item?.institution?.institutionName?.toLowerCase().includes(props?.userData?.getProfile?.institution?.institutionName?.toLowerCase()))

  const categories = props?.data?.categories;
  const myFilteredCategories = () => {
    return categories?.resp?.data?.filter((item) => item?.type?.toLowerCase().includes(formData.type.toLowerCase())
      && item?.institution?.institutionName?.toLowerCase().includes(props?.userData?.getProfile?.institution?.institutionName?.toLowerCase())
    )
  }

  useEffect(() => {
    if (props?.data?.addTransaction?.success) {
      navigate(-1)
    }
  }, [props?.data?.addTransaction?.success])


  const [fyi, setFyi] = useState(null)

  function getFiscalYearDateRange(fiscalYear) {
    const [startYear, endYear] = fiscalYear.split('-');
    const start = parseInt(startYear); // First year (e.g., 2024 or 1999)
    const end = parseInt("20" + endYear); // Correct the end year to the next century if needed
  
    // In case the endYear is in the 00s (like '99' becomes '1999' and '00' becomes '2000')
    const correctedEndYear = endYear === "00" ? start + 1 : end; 
  
    const minDate = new Date(start, 8, 1); // 1st September of the start year
    const maxDate = new Date(correctedEndYear, 7, 31); // 31st August of the corrected end year
  
    return { minDate, maxDate };
  }

  const { minDate, maxDate } = fyi && getFiscalYearDateRange(fyi) || {};

  console.log(formData);
  
  

  return (
    <div className='w-full absolute left-0 inset-y-0 h-full bg-primary bg-opacity-50 flex lg:items-center lg:justify-center items-center'>
      <div className='relative bg-primary2 shadow-lg rounded-lg lg:w-3/4 w-full lg:px-4 px-2 py-4'>
        {props?.data?.addTransaction?.success ?
          <label className='text-success text-sm' >{'Transaction saved successfully'}</label>
          :
          <label className='text-red text-sm' >{props?.data?.addTransaction?.error && props?.data?.addTransaction?.error?.response?.data?.message}</label>
        }
        <form onSubmit={handleSubmit} className="p-4 text-sm text-text_primary lg:grid grid-cols-2 gap-4">
          <div className='w-full mb-1'>
            <label>Transaction Type</label>
            <select name='transactionType' className='py-1 border w-full px-4 text-text_primary rounded-lg border-text_primary border-opacity-40' required
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
              <option value={""}>--Choose transaction type--</option>
              {location.pathname.includes("dashboard") && <option value="income">Income</option>}
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className='w-full mb-2 text-text_primary'>
            <label>Transaction category</label>
            <select onChange={(e) => setFormData({ ...formData, category: e.target.value })} name='expense' placeholder='Income Category' className='border w-full px-4 py-1 text-text_primary rounded-lg border-text_primary border-opacity-40' required>
              <option value={""}>--Select Category--</option>
              {
                myFilteredCategories()?.map((item, index) => {
                  return (
                    <option key={index} value={item.category}>{item.category}</option>
                  )
                })
              }
            </select>
          </div>

          <div className='w-full mb-2'>
            <div className='w-full mb-1'>
              <label>Amount</label>
              <input onChange={(e) => setFormData({ ...formData, amount: e.target.value })} type="number" name='amount' className="text-text_secondary rounded-lg outline-primary block w-full px-4 py-1 border border-text_primary border-opacity-40 placeholder-text_primary" placeholder="Amount" required />
            </div>
            <div className='w-full mb-1'>
              <label>Institution</label>
              <input type="text" ref={institutionName} defaultValue={props?.userData?.getProfile?.institution?.institutionName} name='institution' className="mb-2 text-text_secondary rounded-lg outline-primary block w-full px-4 py-1 border border-text_primary border-opacity-40 placeholder-text_primary" disabled />
            </div>
            <div className='w-full mb-1'>
              <label>Select budget</label>

              <select name='budget' className='py-1 border w-full px-4 text-text_primary rounded-lg border-text_primary border-opacity-40' required
                onChange={(e) => {
                  const selectedBudgetId = e.target.value;
                  const selectedBudget = filterBudget.find((item) => item._id === selectedBudgetId);
                  setFormData({ ...formData, budget: selectedBudgetId }); // Update the budget
                  setFyi(selectedBudget?.fyi || "");
                }}>
                <option value={""}>--Choose budget--</option>
                {filterBudget?.map((item) => (
                  <option key={item._id} value={item._id}>{item.fyi + " Budget"}</option>
                ))}
              </select>

            </div>
            {fyi &&
              <div className='w-full mb-1'>
                <label>Transaction took place on</label>

                <input type='date' name='budget' className='py-1 border w-full px-4 text-text_primary rounded-lg border-text_primary border-opacity-40' required
                  min={minDate.toISOString().split('T')[0]} max={maxDate.toISOString().split('T')[0]} onChange={(e) => setFormData({ ...formData, dateTransactionsTookPlace: e.target.value })} />


              </div>
            }
          </div>

          <div className='w-full mb-1'>
            <label>Transaction description</label>
            <textarea rows={10} value={formData.transactionDescription} className="text-text_primary outline-primary block w-full px-4 py-2 border-2 border-text_primary rounded-lg border-opacity-40 placeholder-text_primary" placeholder="Transaction description" required
              onChange={(e) => setFormData({ ...formData, transactionDescription: e.target.value })}></textarea>
          </div>

          <div className='flex justify-between gap-4 col-span-2'>
            <button type='reset' size="sm" className=' text-xs text-text_primary w-full border-2 border-text_primary border-opacity-40 font-bold p-2' onClick={() => navigate(-1)}>Cancel</button>
            <button type='submit' size='sm' className={`text-xs bg-secondary text-center text-primary font-bold p-2 w-full ${props?.data?.addTransaction?.loading ? 'cursor-not-allowed ' : 'cursor-pointer'}`} disabled={props?.data?.addTransaction?.loading ? true : false}>
              {props?.data?.addTransaction?.loading ? <p className="flex justify-center gap-2"><AiOutlineLoading3Quarters size={20} className="animate-spin h-5 w-5" /><span> Submitting....</span></p> : 'Submit transaction'}
            </button>
          </div>
          {/* Submit Button */}

        </form>
      </div>
    </div>
  )
}


const maspState = (data) => ({
  data: data
})

export default connect(maspState, { recordTransaction, getMyBudgets, viewCategories })(AddTransaction)