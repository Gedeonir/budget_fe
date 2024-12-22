import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { connect } from 'react-redux';
import { addCategory, getMyBudgets, recordTransaction } from '../redux/Actions/BudgetActions';
import { categories } from './AddExpenses';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
const AddExpenseOrIncomeCategory = (props) => {

  const [formData, setFormData] = useState({
    category:"",
    type:"",
    institution:props?.institution?._id || "",
  });

  const institutionName=useRef()

  useEffect(()=>{
    setFormData(formData=>({...formData,institution:props?.institution?._id || ""}))
  },[props?.institution])

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addCategory(formData);
  };

  const navigate=useNavigate()

  console.log(formData);
  
  

  return (
    <div  className='w-full absolute left-0 inset-y-0 h-full bg-primary bg-opacity-50 flex lg:items-center lg:justify-center items-center'>
      <div className='relative bg-primary2 shadow-lg rounded-lg lg:w-3/4 w-full lg:px-4 px-2 py-4'>
        {props?.data?.addCategory?.success ? 
        <label className='text-success text-sm' >{'Category saved successfully'}</label>
        :
        <label className='text-red text-sm' >{props?.data?.addCategory?.error && props?.data?.addCategory?.error?.response?.data?.message}</label>
        }
        <form onSubmit={handleSubmit} className="p-4 text-sm text-text_primary gap-4">
          <div className='w-full mb-2 text-text_primary'>
            <label>Category name</label>
            <input onChange={(e)=>setFormData({...formData,category:e.target.value})} type="text" name='category' className="text-text_secondary rounded-lg outline-primary block w-full px-4 py-1 border border-text_primary border-opacity-40 placeholder-text_primary" placeholder="Category name" required/>
          </div>
          <div className='w-full mb-1'>
            <label>Category type</label>
            <select name='transactionType' className='py-2 border w-full px-4 text-text_primary rounded-lg border-text_primary border-opacity-40' required 
            onChange={(e)=>setFormData({...formData,type:e.target.value})}>
                <option value={""}>--Choose category type--</option>
                {location.pathname.includes("dashboard") && <option value="income">Income</option>}
                <option value="expense">Expense</option>
            </select>
          </div>

          <div className='w-full mb-1'>
            <label>Institution</label>
            <input type="text" ref={institutionName} defaultValue={props?.institution?.institutionName} name='institution' className="mb-2 text-text_secondary rounded-lg outline-primary block w-full px-4 py-1 border border-text_primary border-opacity-40 placeholder-text_primary" disabled/>
          </div>

          <div className='flex justify-between gap-4 col-span-2'>
            <button type='reset' size="sm" className=' text-xs text-text_primary w-full border-2 border-text_primary border-opacity-40 font-bold p-2' onClick={()=>navigate(-1)}>Cancel</button>
            <button type='submit' size='sm' className={`text-xs bg-secondary text-center text-primary font-bold p-2 w-full ${props?.data?.addCategory?.loading? 'cursor-not-allowed ':'cursor-pointer'}`} disabled={props?.data?.addCategory?.loading? true : false}>
              {props?.data?.addCategory?.loading?<p className="flex justify-center gap-2"><AiOutlineLoading3Quarters size={20} className="animate-spin h-5 w-5"/><span> Submitting....</span></p>:'Submit'}
            </button>
          </div>
          {/* Submit Button */}
          
        </form>
      </div>
    </div>
  )
}


const maspState=(data)=>({
  data:data
})

export default connect(maspState,{addCategory,getMyBudgets})(AddExpenseOrIncomeCategory)