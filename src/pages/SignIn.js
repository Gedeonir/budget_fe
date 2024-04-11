import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import {AiOutlineLoading3Quarters} from "react-icons/ai"
import axios from 'axios';

const SignIn = () => {
    const [showPassword,setShowPassword]=React.useState(false);
    const location=useLocation();
    const navigate=useNavigate()

    const [formData,setFormData]=React.useState({
        email:"",
        password:"",
    })

    const [error,setError] = React.useState("")
    const [loading,setLoading]=React.useState(false);


    const handleLogin=async(e)=>{
        e.preventDefault()
        setLoading(true);

        try {
            const response = await axios.post(
              `${process.env.BACKEND_URL}/auth/login`,
              formData
            );

	        await sessionStorage.setItem('userToken', JSON.stringify(response?.data?.token));
            navigate("../");

        } catch (error) {
            setError(error?.response?.data?.message?error?.response?.data?.message:error?.message);
        }
        setLoading(false);
        
    }
  return (
    <div className='bg-primary min-h-screen max-h-screen overflow-hidden flex items-center justify-center px-8'>
        <div className='w-2/5 bg-primary2 h-full rounded-lg drop-shadow-sm shadow-lg p-4'>
            <div className="mb-2">
                <h1 className='grid text-text_primary text-lg mb-2 font-bold'>Log into your BPE account</h1>
            </div>

            <form onSubmit={(event)=>handleLogin(event)}>
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

                <div className="mb-4">
                    <label className="text-text_primary font-bold text-md mb-2">Password <span className="text-red">*</span></label>
                    <input type={!showPassword?"password":"text"} name="password" value={formData.password} className="text-text_secondary text-sm outline-primary block w-full px-2 py-2 border-2 border-primary placeholder-text_primary" placeholder="Password" required
                    onChange={(e)=>{
                        setFormData({
                            ...formData,
                            password:e.target.value
                        })
                    }}/>
                    <p className='text-sm text-right text-secondary'><span className='cursor-pointer hover:underline' onClick={()=>setShowPassword(!showPassword)}>{showPassword?'Hide password':'Show password'}</span></p>
                </div>

                <div className="mb-4">
                    <Link className='text-sm text-secondary cursor-pointer hover:underline' to="/forgotpassword">Can't remember my password</Link>
                </div>

                <button type='submit' size='sm' className={`my-4 bg-secondary text-sm text-center text-primary font-bold p-2 w-full ${loading? 'cursor-not-allowed ':'cursor-pointer'}`} disabled={loading? true : false}>
                    {loading?<p className="flex justify-center gap-2"><AiOutlineLoading3Quarters size={20} className="animate-spin h-5 w-5"/><span> Signing in....</span></p>:'Login'}
                </button>
            </form>

        </div>
    </div>
  )
}

export default SignIn