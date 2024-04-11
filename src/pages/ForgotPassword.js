import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {AiOutlineLoading3Quarters} from "react-icons/ai"
const ForgotPassword = () => {
    const navigate=useNavigate()

    const [formData,setFormData]=React.useState({
        email:"",
    })

    const [error,setError] = React.useState("")
    const [loading,setLoading]=React.useState(false);
    const [success,setSuccess] = React.useState("");

    const handleLogin=async(e)=>{
        e.preventDefault()
        setError("")
        setLoading(true);

        try {
            const response = await axios.patch(
              `${process.env.BACKEND_URL}/auth/forgotpassword`,
              formData
            );

            setSuccess(response?.data?.message)

            navigate("/reset-password")

        } catch (error) {
            setError(error?.response?.data?.message?error?.response?.data?.message:error?.message);
        }
        setLoading(false);
        
    }
  return (
    <div className='bg-primary min-h-screen max-h-screen overflow-hidden flex items-center justify-center px-8'>
        <div className='lg:w-2/5 w-full bg-primary2 h-full rounded-lg drop-shadow-sm shadow-lg p-4'>
            <div className="mb-2">
                <h1 className='grid text-text_primary lg:text-lg text-md mb-2 font-bold'>Please enter your email to reset your password</h1>
            </div>

            <form onSubmit={(event)=>handleLogin(event)}>
                <p className={`text-sm text-success text-center py-1 ${success && 'bg-success'} bg-opacity-20 px-2`}>{success}</p>

                <p className={`text-sm text-red text-center py-1 ${error && 'bg-red'} bg-opacity-20 px-2`}>{error}</p>
                <div className="mb-4">
                    <label className="text-text_primary font-bold text-md mb-2">Email <span className="text-red">*</span></label>
                    <input type="email" name='email' value={formData.email} className="text-text_secondary text-sm outline-primary block w-full px-2 py-2 border-2 border-primary placeholder-text_primary" placeholder="Email" required
                    onChange={(e)=>{
                        setFormData({
                            ...formData,
                            email:e.target.value
                        })
                    }}/>
                    
                </div>

                <button type='submit' size='sm' className={`my-4 bg-secondary text-sm text-center text-primary hover:bg-opacity-50 font-bold p-2 w-full ${loading? 'cursor-not-allowed ':'cursor-pointer'}`} disabled={loading? true : false}>
                    {loading?<p className="flex justify-center gap-2"><AiOutlineLoading3Quarters size={20} className="animate-spin h-5 w-5"/><span> Sending OTP code</span></p>:'Generate OTP code'}
                </button>

                <div className="mb-4">
                    <Link className='text-sm text-secondary cursor-pointer hover:underline' to="/signin">Go back to signin page</Link>
                </div>

            </form>

        </div>
    </div>
  )
}

export default ForgotPassword