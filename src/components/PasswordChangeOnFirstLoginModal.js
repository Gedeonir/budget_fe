import React, { useState } from 'react'
import { connect } from 'react-redux';
import { changePassword } from '../redux/Actions/usersAction';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const PasswordChangeOnFirstLoginModal = (props) => {
    
    const[formData,setFormData]=useState({
        oldpassword:"",
        newpassword1:"",
        newpassword2:""
    })
    
    const[showPassword,setShowPassword]=useState(false);
    const handleChange=(e)=>{
        e.preventDefault()
        props.changePassword(formData)
    }

    const pssd=props?.data?.changePassword;
    
    
  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
        <form className='bg-primary2 shadow-lg rounded-lg lg:w-1/2 w-full mx-auto py-2 px-4' onSubmit={(event)=>handleChange(event)}>
        <div className="mb-2">
            <h1 className='grid text-text_primary lg:text-lg text-md mb-2 font-bold'>To continue change your password first</h1>
        </div>

        {pssd?.error && <label className='text-red text-sm' >{pssd?.error?.response?.data?.message}</label>}
        <div className="mb-4 p-2">
            <label className="text-text_primary font-bold text-md mb-2">Current password: <span className="text-red">*</span></label>
            
            <input type={!showPassword?"password":"text"} name="password" value={formData.password} className="text-text_primary text-sm outline-primary block w-full px-2 py-2 border-2 border-primary placeholder-text_primary" placeholder="Old password" required
            onChange={(e)=>{
                setFormData({
                    ...formData,
                    oldpassword:e.target.value
                })
            }}/>
        </div>

        <div className="mb-4 p-2">
            <label className="text-text_primary font-bold text-md mb-2">New password: <span className="text-red">*</span></label>
            
            <input type={!showPassword?"password":"text"} name="password" value={formData.password} className="text-text_primary text-sm outline-primary block w-full px-2 py-2 border-2 border-primary placeholder-text_primary" placeholder="new password" required
            onChange={(e)=>{
                setFormData({
                    ...formData,
                    newpassword1:e.target.value
                })
            }}/>
        </div>

        <div className="mb-4 p-2">
            <label className="text-text_primary font-bold text-md mb-2">Confirm New password: <span className="text-red">*</span></label>
            
            <input type={!showPassword?"password":"text"} name="password" value={formData.password} className="text-text_primary text-sm outline-primary block w-full px-2 py-2 border-2 border-primary placeholder-text_primary" placeholder="Re-enter password" required
            onChange={(e)=>{
                setFormData({
                    ...formData,
                    newpassword2:e.target.value
                })
            }}/>
        </div>

        <p className='text-sm text-right text-secondary'><span className='cursor-pointer hover:underline' onClick={()=>setShowPassword(!showPassword)}>{showPassword?'Hide password':'Show password'}</span></p>
        <button type='submit' size='sm' className={`my-4 bg-secondary text-sm text-center text-primary hover:bg-opacity-50 font-bold p-2 w-full ${pssd?.loading? 'cursor-not-allowed ':'cursor-pointer'}`} disabled={pssd?.loading? true : false}>
            {pssd?.loading?<p className="flex justify-center gap-2"><AiOutlineLoading3Quarters size={20} className="animate-spin h-5 w-5"/><span> Resetting your password</span></p>:'Change password'}
        </button>
        </form>
    </div>
  )
}

const mapState=(data)=>({
    data:data
})
export default connect(mapState,{changePassword})(PasswordChangeOnFirstLoginModal)
