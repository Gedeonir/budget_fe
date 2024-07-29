import React from 'react'
import {AiOutlineLoading3Quarters} from "react-icons/ai"

const AddIncomeStatement = (props) => {
    const [loading,setLoading]=React.useState(false);
  return (
    <div className='px-8 py-4 flex items-center overflow-hidden absolute bottom-0 top-0 left-0 w-full z-20 min-h-screen max-h-screen'>
        <div className='px-4 py-2 bg-primary2 shadow-lg drop-shadow-lg rounded-lg w-full'>
            <div className="mb-2">
                <h1 className='grid text-text_primary text-lg mb-2 font-bold'>Add new income statement</h1>
            </div>
            <form className='text-lg text-text_primary'>
                <div className='flex justify-between gap-4 my-4'>
                    <div className='w-full'>
                        <label>Source of Income</label>
                        <select placeholder='Income source' className='border w-full px-4 py-2 text-text_primary rounded-lg border-text_primary border-opacity-40' required>
                            <option value={'source'}>Source</option>
                            <option value={'source'}>Source</option>
                        </select>
                    </div>
                    

                    <div className='w-full'>

                        <label>Amount received</label>
                        <input type="number" name='Amount' className="text-text_secondary rounded-lg outline-primary block w-full px-4 py-1 border border-text_primary border-opacity-40 placeholder-text_primary" placeholder="Amount" required/>
                    </div>
                </div>
               
                <div className='flex justify-between gap-4 my-4'>
                    <div className='w-full'>
                        <label>Income category</label>
                        <select placeholder='Income Category' className='border w-full px-4 py-2 text-text_primary rounded-lg border-text_primary border-opacity-40' required>
                            <option value={'source'}>Category</option>
                            <option value={'source'}>Category</option>
                        </select>
                    </div>
                    <div className='w-full'>
                        <label>Date of income</label>
                        <input type="date" name='incomeDate' className="text-text_secondary outline-primary block w-full px-4 py-1 border-2 rounded-lg border-text_primary border-opacity-40 placeholder-text_primary" placeholder="Date of income" required/>
                    </div>
                    
                </div>
                <div className='flex justify-between gap-4 my-4'>
                    <div className='w-full'>
                        <label>Income details</label>
                        <textarea rows={5} className="text-text_secondary outline-primary block w-full px-4 py-2 border-2 border-text_primary rounded-lg border-opacity-40 placeholder-text_primary" placeholder="Date of income" required></textarea>
                    </div>
                    <div className='w-full'>
                        <label>Payement method</label>
                        <select placeholder='Income source' className='border my-2 w-full px-4 py-2 text-text_primary rounded-lg border-text_primary border-opacity-40' required>
                            <option value={'source'}>Payement method</option>
                            <option value={'source'}>Source</option>
                        </select>

                        <label>Evidences</label>
                        <input type="file" name='Attachements' className="my-2 text-text_secondary outline-primary block w-full px-4 py-2 border-2 rounded-lg border-text_primary border-opacity-40 placeholder-text_primary" placeholder="Proofs/Evidences" required/>
                    </div>
                   
                </div>

                <div className='flex justify start gap-4'>
                    <input type='checkbox' className='text-text_secondary outline-primary block px-4 py-8 border-2 rounded-lg border-text_primary border-opacity-40 placeholder-text_primary' required/>
                    <label>I certify that information submitted through this form is legit and true.</label>
                </div>

                <div className='flex justify-between gap-4'>
                    <button type='reset' size="sm" className=' my-4 text-text_primary w-full border-2 border-text_primary border-opacity-40 font-bold p-2' onClick={()=>props.openModal(false)}>Cancel</button>
                    <button type='submit' size='sm' className={`my-4 bg-secondary text-center text-primary font-bold p-2 w-full ${loading? 'cursor-not-allowed ':'cursor-pointer'}`} disabled={loading? true : false}>
                        {loading?<p className="flex justify-center gap-2"><AiOutlineLoading3Quarters size={20} className="animate-spin h-5 w-5"/><span> Saving income</span></p>:'Save income'}
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddIncomeStatement