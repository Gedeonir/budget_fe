import React, { useState } from 'react'
import {AiOutlineLoading3Quarters} from "react-icons/ai"
import { IoSearchOutline } from 'react-icons/io5';
import { BiArrowBack } from "react-icons/bi";
import { MdDomainAdd } from "react-icons/md";
import { RiAddCircleFill } from "react-icons/ri";
import { connect } from 'react-redux';
import { addInstitution } from '../redux/Actions/InstitutionActions';

const AddInstitution = (props) => {
    const [loading,setLoading]=React.useState(false);
    const [showDirector,setShowDirector]=React.useState(false);

    const [formData,setFormData]=useState({
        institutionName:"",
        acorynm:"",
        email:"",
        email:""

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

        if(props.addInstitution(formData)){
            props.setReload(true);
            props.setAddInstitutionModal(false)
        }
    }

    
  return (
    <div className='lg:w-11/12 w-full absolute left-0 inset-y-0 max-h-screen flex lg:items-start lg:justify-center items-center'>
        <div className='relative bg-primary2 shadow-lg rounded-lg lg:w-2/4 w-full lg:px-4 px-2 py-4'>
            <div className="mb-2">
                <h1 className='grid text-text_primary text-lg mb-2 font-bold'>Add new institution</h1>
            </div>
            <label className='text-success text-sm' >{props?.data?.addInst?.success && 'Institution added'}</label>

            <form className='text-text_primary' onSubmit={(e)=>handleAdd(e)}>
                <div className='w-full mb-2'>
                    <label>Institution Name</label>
                    <input onChange={handleChange} type="text" name='institutionName' className="text-text_secondary rounded-lg outline-primary block w-full px-4 py-1 border border-text_primary border-opacity-40 placeholder-text_primary" placeholder="Institution Name" required/>
                </div>

                <div className='w-full mb-2'>
                    <label>Institution Acronym</label>
                    <input onChange={handleChange} type="text" name='acorynm' className="text-text_secondary rounded-lg outline-primary block w-full px-4 py-1 border border-text_primary border-opacity-40 placeholder-text_primary" placeholder="InstitutionAcronym" required/>
                </div>

                <div className='w-full mb-2'>
                    <label>Institution Email</label>
                    <input onChange={handleChange} type="email" name='email' className="text-text_secondary rounded-lg outline-primary block w-full px-4 py-1 border border-text_primary border-opacity-40 placeholder-text_primary" placeholder="Institution Email" required/>
                </div>

                <div className='w-full mb-2'>
                    <label>Institution Contact</label>
                    <input onChange={handleChange} type="text" name='mobile' className="text-text_secondary rounded-lg outline-primary block w-full px-4 py-1 border border-text_primary border-opacity-40 placeholder-text_primary" placeholder="InstitutionContact" required/>
                </div>

                {/* <div className='w-full mb-2'>
                    <label>Institution Logo</label>
                    <input onChange={handleChange} type="file" name='Attachements' className="my-2 text-text_secondary outline-primary block w-full px-4 py-2 border-2 rounded-lg border-text_primary border-opacity-40 placeholder-text_primary" placeholder="Proofs/Evidences" required/>
                </div> */}

                <div className='flex justify-between gap-4'>
                    <button type='reset' size="sm" className=' my-4 text-text_primary w-full border-2 border-text_primary border-opacity-40 font-bold p-2' onClick={()=>props.setAddInstitutionModal(false)}>Cancel</button>
                    <button type='submit' size='sm' className={`my-4 bg-secondary text-center text-primary font-bold p-2 w-full ${loading? 'cursor-not-allowed ':'cursor-pointer'}`} disabled={loading? true : false}>
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

export default connect(mapState,{addInstitution}) (AddInstitution)