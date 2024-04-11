import axios from 'axios'
import React, { useRef, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'

const ResetPassword = () => {
    const navigate=useNavigate()

    const [error,setError] = React.useState("")
    const [loading,setLoading]=React.useState(false);
    const [success,setSuccess] = React.useState("");
    const [showPassword,setShowPassword]=React.useState(false);

    const [digits, setDigits] = useState(['', '', '','','']);

    const getNumbersAsString = () => {
        return digits.join(''); // Concatenate the digits into a single string
      };

    const [formData,setFormData]=React.useState({
        password:"",
    })

    const [redirect,setRedirect]=useState(false);

    const handleChange=async(e)=>{
        e.preventDefault()
        setError("")
        setLoading(true);
        setSuccess("");

        try {
            const response = await axios.patch(
              `${process.env.BACKEND_URL}/auth/resetpassword`,{
                    OTPCode:getNumbersAsString(),
                    password:formData.password 
                }
            );

            setSuccess(response?.data?.message)
            setFormData({
                password:""
            });
            setDigits(['', '', '','','']);
            setTimeout(() => {
                navigate('/signin'); // Redirect to the signin page
              }, 2000);
        } catch (error) {
            console.log(error)
            setError(error?.response?.data?.message?error?.response?.data?.message:error?.message);
        }
        setLoading(false);
        
    }

    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleInputChange = (index, value) => {
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    if (value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus(); // Move focus to the next input field
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData('text/plain');
    if (/^\d{1,5}$/.test(pastedData)) {
      const newDigits = pastedData.split('').slice(0, 5);
      setDigits(newDigits.concat(Array(5 - newDigits.length).fill('')));
    }
  }

  return (
    <div className='bg-primary min-h-screen max-h-screen overflow-hidden flex items-center justify-center px-8'>
        <div className='lg:w-2/5 w-full bg-primary2 h-full rounded-lg drop-shadow-sm shadow-lg p-4'>
            <div className="mb-2">
                <h1 className='grid text-text_primary lg:text-lg text-md mb-2 font-bold'>Reset password</h1>
            </div>

            <form onSubmit={(event)=>handleChange(event)}>
                <p className={`text-sm text-success text-center py-1 ${success && 'bg-success'} bg-opacity-20 px-2`}>{success}</p>

                <p className={`text-sm text-red text-center py-1 ${error && 'bg-red'} bg-opacity-20 px-2`}>{error}</p>
                
                <div className='mb-4'>
                    <label className="text-text_primary font-bold text-md mb-2">OTPCode: <span className="text-red">*</span></label>

                    <div className='grid grid-cols-5 gap-2 w-full p-2'>
                        {inputRefs.map((inputRef, index) => (
                            <input 
                            key={index} 
                            type="text" 
                            ref={inputRef} 
                            maxLength={1}
                            required
                            value={digits[index]} 
                            onChange={(e) => handleInputChange(index, e.target.value)} 
                            className=' text-2xl w-full h-12 text-center p-4 text-text_primary outline-primary block px-2 py-2 border-2 border-primary placeholder-text_primary' placeholder='_'
                            onPaste={handlePaste}

                            />
                        ))}

                    </div>
                </div>
                
                <div className="mb-4 p-2">
                    <label className="text-text_primary font-bold text-md mb-2">New password: <span className="text-red">*</span></label>
                    
                    <input type={!showPassword?"password":"text"} name="password" value={formData.password} className="text-text_primary text-sm outline-primary block w-full px-2 py-2 border-2 border-primary placeholder-text_primary" placeholder="Password" required
                    onChange={(e)=>{
                        setFormData({
                            ...formData,
                            password:e.target.value
                        })
                    }}/>
                    <p className='text-sm text-right text-secondary'><span className='cursor-pointer hover:underline' onClick={()=>setShowPassword(!showPassword)}>{showPassword?'Hide password':'Show password'}</span></p>
                </div>

                <button type='submit' size='sm' className={`my-4 bg-secondary text-sm text-center text-primary hover:bg-opacity-50 font-bold p-2 w-full ${loading? 'cursor-not-allowed ':'cursor-pointer'}`} disabled={loading? true : false}>
                    {loading?<p className="flex justify-center gap-2"><AiOutlineLoading3Quarters size={20} className="animate-spin h-5 w-5"/><span> Resetting your password</span></p>:'Reset password'}
                </button>

                <div className="mb-4">
                    <Link className='text-sm text-secondary cursor-pointer hover:underline' to="/signin">Go back to signin page</Link>
                </div>

            </form>

        </div>
    </div>
  )
}

export default ResetPassword