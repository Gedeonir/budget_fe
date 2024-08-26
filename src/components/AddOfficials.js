import React,{useState} from 'react'
import {AiOutlineLoading3Quarters} from "react-icons/ai"
import AllInstitutionsModal from './AllInstitutionsModal';
import { connect } from 'react-redux';
import { registerUser } from '../redux/Actions/usersAction';

const AddOfficials = (props) => {
    const [loading,setLoading]=React.useState(false);
    const [showDirector,setShowDirector]=React.useState(false);

    const [formData,setFormData]=useState({
        title:"",
        fullNames:"",
        email:"",
        mobile:"",
        password:Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000,
        position:"",
        institution:"",
        institutionName:""
    })

    const handleChange=(e)=>{
        const { name, value } = e.target;
        setFormData(formData=>({
            ...formData,
            [name]:value
        }));
    }
    
    const handleRegister=(e)=>{
        e.preventDefault();
        if(props.registerUser(formData)){
            props.setReload(true)
        }
    }
    
  return (
    <div className='lg:w-11/12 w-full absolute left-0 inset-y-0 max-h-screen flex lg:items-start lg:justify-center items-center'>
        <div className='relative bg-primary2 shadow-lg rounded-lg lg:w-2/4 w-full lg:px-4 px-2 py-4'>
            <div className="mb-2">
                <h1 className='grid text-text_primary text-lg mb-2 font-bold'>Add new Member</h1>
            </div>
            <label className='text-success text-sm' >{props?.data?.newUser?.success && 'New user added'}</label>
            <label className='text-red text-sm' >{props?.data?.newUser?.error && 'Adding user Failed'}</label>

            <form className='text-text_primary' onSubmit={(e)=>handleRegister(e)}>
                <div className='w-full mb-2'>
                    <label>Member Title</label>
                    <select name='title' className='py-2 border w-full px-4 text-text_primary rounded-lg border-text_primary border-opacity-40' onChange={handleChange} required>
                        <option value={""}>--Select title--</option>
                        <option value={"Dr"}>Dr</option>
                        <option value={"Hon"}>Hon.</option>
                        <option value={"Amb"}>Amb.</option>
                    </select>
                </div>

                <div className='w-full mb-2'>
                    <label>Names</label>
                    <input type="text" value={formData.fullNames} name='fullNames' className="py-1 text-text_secondary rounded-lg outline-primary block w-full px-4 border border-text_primary border-opacity-40 placeholder-text_primary" placeholder="Names" onChange={handleChange} required/>
                </div>

                <div className='w-full mb-2'>
                    <label>Position</label>
                    <select name='position' className='py-2 border w-full px-4 text-text_primary rounded-lg border-text_primary border-opacity-40' onChange={handleChange} required>
                        <option value={""}>--Select Position--</option>
                        <option value={"Minister"}>Minister</option>
                        <option value={"State Minister"}>State Minister</option>
                        <option value={"Finance Director"}>Finance Director</option>
                    </select>
                </div>

                <div className='w-full mb-2'>
                    <label>Email</label>
                    <input onChange={handleChange} value={formData.email} type="email" name='email' className="py-1 text-text_secondary rounded-lg outline-primary block w-full px-4 border border-text_primary border-opacity-40 placeholder-text_primary" placeholder="Email" required/>
                </div>

                <div className='w-full mb-2'>
                    <label>Mobile</label>
                    <input onChange={handleChange} value={formData.mobile} type="number" name='mobile' className="py-1 text-text_secondary rounded-lg outline-primary block w-full px-4 border border-text_primary border-opacity-40 placeholder-text_primary" placeholder="Mobile" required/>
                </div>

                <div className='w-full mb-2'>
                    <label>Institution</label>
                    <input type="text" value={formData.institutionName} name='institution' className="py-1 text-text_secondary rounded-lg outline-primary block w-full px-4 border border-text_primary border-opacity-40 placeholder-text_primary cursor-pointer" placeholder="Institution" required readOnly onClick={()=>setShowDirector(!showDirector)}/>
                    {showDirector && (
                        <AllInstitutionsModal setShowDirector={setShowDirector} setFormData={setFormData} formData={formData}/>
                    )}
                    
                </div>

                <div className='flex justify-between gap-4'>
                    <button type='reset' size="sm" className=' text-xs text-text_primary w-full border-2 border-text_primary border-opacity-40 font-bold p-2' onClick={()=>props.setAddOfficialsModal(false)}>Cancel</button>
                    <button type='submit' size='sm' className={`text-xs bg-secondary text-center text-primary font-bold p-2 w-full ${props?.data?.newUser?.loading? 'cursor-not-allowed ':'cursor-pointer'}`} disabled={props?.data?.newUser?.loading? true : false}>
                        {props?.data?.newUser?.loading?<p className="flex justify-center gap-2"><AiOutlineLoading3Quarters size={20} className="animate-spin h-5 w-5"/></p>:'Save'}
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

const mapState=(data)=>({
    data:data
})

export default connect(mapState,{registerUser}) (AddOfficials)