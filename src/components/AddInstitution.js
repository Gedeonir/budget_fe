import React, { useState } from 'react'
import {AiOutlineLoading3Quarters} from "react-icons/ai"
import { connect } from 'react-redux';
import { addInstitution, fetchInst } from '../redux/Actions/InstitutionActions';

const AddInstitution = (props) => {

    const [formData,setFormData]=useState({
        institutionName:"",
        acronym:"",
        email:"",
        mobile:""

    })

    const handleChange=(e)=>{
        const { name, value } = e.target;
        setFormData(formData=>({
            ...formData,
            [name]:value
        }));
    }

    const handleAdd=(e)=>{
        e.preventDefault();
        props.addInstitution(formData)
        props.setAddInstitutionModal(false)
        
    }

    
  return (
    <div className='lg:w-11/12 w-full absolute left-0 inset-y-0 max-h-screen flex lg:items-start lg:justify-center items-center'>
        <div className='relative bg-primary2 shadow-lg rounded-lg lg:w-2/4 w-full lg:px-4 px-2 py-4'>
            <div className="mb-2">
                <h1 className='grid text-text_primary text-lg mb-2 font-bold'>Add new institution</h1>
            </div>

            <form method='POST' className='text-text_primary' onSubmit={(e)=>handleAdd(e)}>
                <div className='w-full mb-2'>
                    <label>Institution Name</label>
                    <input onChange={handleChange} type="text" name='institutionName' className="text-text_secondary rounded-lg outline-primary block w-full px-4 py-1 border border-text_primary border-opacity-40 placeholder-text_primary" placeholder="Institution Name" required/>
                </div>

                <div className='w-full mb-2'>
                    <label>Institution Acronym</label>
                    <input onChange={handleChange} type="text" name='acronym' className="text-text_secondary rounded-lg outline-primary block w-full px-4 py-1 border border-text_primary border-opacity-40 placeholder-text_primary" placeholder="InstitutionAcronym" required/>
                </div>

                <div className='w-full mb-2'>
                    <label>Institution Email</label>
                    <input onChange={handleChange} type="email" name='email' className="text-text_secondary rounded-lg outline-primary block w-full px-4 py-1 border border-text_primary border-opacity-40 placeholder-text_primary" placeholder="Institution Email" required/>
                </div>

                <div className='w-full mb-2'>
                    <label>Institution Contact</label>
                    <input onChange={handleChange} type="number" name='mobile' className="text-text_secondary rounded-lg outline-primary block w-full px-4 py-1 border border-text_primary border-opacity-40 placeholder-text_primary" placeholder="InstitutionContact" required/>
                </div>

                {/* <div className='w-full mb-2'>
                    <label>Institution Logo</label>
                    <input onChange={handleChange} type="file" name='Attachements' className="my-2 text-text_secondary outline-primary block w-full px-4 py-2 border-2 rounded-lg border-text_primary border-opacity-40 placeholder-text_primary" placeholder="Proofs/Evidences" required/>
                </div> */}

                <div className='flex justify-between gap-4'>
                    <button type='reset' size="sm" className=' my-4 text-text_primary w-full border-2 border-text_primary border-opacity-40 font-bold p-2' >Cancel</button>
                    <button type='submit' size='sm' className={`my-4 bg-secondary text-center text-primary font-bold p-2 w-full ${props?.data?.addInst?.loading? 'cursor-not-allowed ':'cursor-pointer'}`} disabled={props?.data?.addInst?.loading? true : false}>
                        {props?.data?.addInst?.loading?<p className="flex justify-center gap-2"><AiOutlineLoading3Quarters size={20} className="animate-spin h-5 w-5"/><span> Saving institution</span></p>:'Save'}
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

export default connect(mapState,{addInstitution,fetchInst}) (AddInstitution)