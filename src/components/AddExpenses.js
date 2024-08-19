import React from 'react'

const AddExpenses = ({setOpenModal}) => {
    const [loading,setLoading]=React.useState(false);

  return (
    <div className='w-full absolute left-0 inset-y-0 h-full bg-primary bg-opacity-50 flex lg:items-center lg:justify-center items-center'>
        <div className='relative bg-primary2 shadow-lg rounded-lg lg:w-2/4 w-full lg:px-4 px-2 py-4'>
            <div className="mb-2">
                <h1 className='grid text-text_primary text-lg mb-2 font-bold'>Add new institution</h1>
            </div>

            <div className='w-full mb-2 text-text_primary'>
                <label>Income category</label>
                <select placeholder='Income Category' className='border w-full px-4 py-2 text-text_primary rounded-lg border-text_primary border-opacity-40' required>
                    <option value={'source'}>Category</option>
                    <option value={'source'}>Category</option>
                </select>
            </div>

            <div className='w-full mb-2 text-text_primary'>
                <label>Planned Amount</label>
                <input type="number" name='Planned Amount' className="text-text_secondary rounded-lg outline-primary block w-full px-4 py-1 border border-text_primary border-opacity-40 placeholder-text_primary" placeholder="Planned Amount" required/>
            </div>

            <div className='flex justify-start gap-4 w-full'>
                <button type='reset' size="sm" className=' my-4 text-xs text-text_primary w-full border-2 border-text_primary border-opacity-40 font-bold p-2' onClick={()=>setOpenModal(false)}>Cancel</button>
                <button type='submit' size='sm' className={`my-4 text-xs bg-secondary text-center text-primary font-bold p-2 w-full ${loading? 'cursor-not-allowed ':'cursor-pointer'}`} disabled={loading? true : false}>
                    {loading?<p className="flex justify-center gap-2"><AiOutlineLoading3Quarters size={20} className="animate-spin h-5 w-5"/><span> Saving Budget</span></p>:'Save'}
                </button>
            </div>
        </div>
    </div>
  )
}

export default AddExpenses