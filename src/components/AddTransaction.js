import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { connect } from 'react-redux';
import { recordTransaction } from '../redux/Actions/BudgetActions';
import { categories } from './AddExpenses';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
const AddTransaction = (props) => {

  const [formData, setFormData] = useState({
    transactionDescription:"",
    amount:"",
    type:"",
    institution:props?.institution?._id || "",
    budget:props?.budget?._id || "",
    category:"",
  });

  const institutionName=useRef()
  const budget=useRef()

  useEffect(()=>{
    setFormData(formData=>({...formData,institution:props?.institution?._id || "",budget:props?.budget?._id || ""}))
  },[props?.institution,props?.budget])


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.recordTransaction(formData);
  };

  const navigate=useNavigate()
  console.log(props);
    
  

  return (
    <div  className='w-full absolute left-0 inset-y-0 h-full bg-primary bg-opacity-50 flex lg:items-center lg:justify-center items-center'>
      <div className='relative bg-primary2 shadow-lg rounded-lg lg:w-3/4 w-full lg:px-4 px-2 py-4'>
        {props?.data?.addTransaction?.success ? 
        <label className='text-success text-sm' >{'Transaction saved successfully'}</label>
        :
        <label className='text-red text-sm' >{props?.data?.addTransaction?.error && props?.data?.addTransaction?.error?.response?.data?.message}</label>
        }
        <form onSubmit={handleSubmit} className="p-4 text-sm text-text_primary lg:grid grid-cols-2 gap-4">
          <div className='w-full mb-1'>
            <label>Transaction Type</label>
            <select name='transactionType' className='py-2 border w-full px-4 text-text_primary rounded-lg border-text_primary border-opacity-40' required 
            onChange={(e)=>setFormData({...formData,type:e.target.value})}>
                <option value={""}>--Choose transaction type--</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>
          </div>

          <div className='w-full mb-2 text-text_primary'>
            <label>Transaction category</label>
            <select onChange={(e)=>setFormData({...formData,category:e.target.value})} name='expense' placeholder='Income Category' className='border w-full px-4 py-2 text-text_primary rounded-lg border-text_primary border-opacity-40' required>
              <option value={""}>--Select Category--</option>
              {categories.map((item,index)=>{
                  return(
                    <option key={index} value={item}>{item}</option>
                  )
              })}
            </select>
        </div>

          {/* File Input */}
          {/* <div className='w-full mb-1'>
            <span className="text-text_primary">Supporting documents</span>
            <input
              type="file"
              className="text-text_secondary rounded-lg outline-primary block w-full px-4 py-1 border border-text_primary border-opacity-40 placeholder-text_primary"
              onChange={(e)=>setFormData({
                ...formData,
                selectedFile:e.target.files[0]
              })}
              required
            />
            
            {/* Display Selected File
            {formData.selectedFile && (
              <p className="text-sm text-gray-600">Selected File: {formData.selectedFile.name}</p>
            )}
          </div> */}

          <div className='w-full mb-2'>
            <div className='w-full mb-1'>
              <label>Amount</label>
              <input onChange={(e)=>setFormData({...formData,amount:e.target.value})} type="number" name='amount' className="text-text_secondary rounded-lg outline-primary block w-full px-4 py-1 border border-text_primary border-opacity-40 placeholder-text_primary" placeholder="Amount" required/>
            </div>
            <div className='w-full mb-1'>
              <label>Institution</label>
              <input type="text" ref={institutionName} defaultValue={props?.institution?.institutionName} name='institution' className="mb-2 text-text_secondary rounded-lg outline-primary block w-full px-4 py-1 border border-text_primary border-opacity-40 placeholder-text_primary" disabled/>
            </div>
            <div className='w-full mb-1'>
              <label>Budget</label>
              <input type="text" ref={budget} defaultValue={props?.budget?.fyi && props?.budget?.fyi + " Budget"} name='budget' className="text-text_secondary rounded-lg outline-primary block w-full px-4 py-1 border border-text_primary border-opacity-40 placeholder-text_primary" disabled/>          
            </div>
          </div>

          <div className='w-full mb-1'>
            <label>Transaction description</label>
            <textarea rows={6} value={formData.transactionDescription} className="text-text_primary outline-primary block w-full px-4 py-2 border-2 border-text_primary rounded-lg border-opacity-40 placeholder-text_primary" placeholder="Transaction description" required
            onChange={(e)=>setFormData({...formData,transactionDescription:e.target.value})}></textarea>
          </div>

          <div className='flex justify-between gap-4 col-span-2'>
            <button type='reset' size="sm" className=' text-xs text-text_primary w-full border-2 border-text_primary border-opacity-40 font-bold p-2' onClick={()=>navigate(-1)}>Cancel</button>
            <button type='submit' size='sm' className={`text-xs bg-secondary text-center text-primary font-bold p-2 w-full ${props?.data?.addTransaction?.loading? 'cursor-not-allowed ':'cursor-pointer'}`} disabled={props?.data?.addTransaction?.loading? true : false}>
              {props?.data?.addTransaction?.loading?<p className="flex justify-center gap-2"><AiOutlineLoading3Quarters size={20} className="animate-spin h-5 w-5"/><span> Submitting....</span></p>:'Submit transaction'}
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

export default connect(maspState,{recordTransaction})(AddTransaction)