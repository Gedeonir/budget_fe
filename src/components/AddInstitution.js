import React from 'react'
import {AiOutlineLoading3Quarters} from "react-icons/ai"
import { IoSearchOutline } from 'react-icons/io5';
import { BiArrowBack } from "react-icons/bi";
import { MdDomainAdd } from "react-icons/md";
import { RiAddCircleFill } from "react-icons/ri";

const AddInstitution = (props) => {
    const [loading,setLoading]=React.useState(false);
    const [showDirector,setShowDirector]=React.useState(false);

    
  return (
    <div className='lg:w-11/12 w-full absolute left-0 inset-y-0 min-h-screen flex lg:items-start lg:justify-center items-center'>
        <div className='relative bg-primary2 shadow-lg rounded-lg lg:w-2/4 w-full lg:px-4 px-2 py-4'>
            <div className="mb-2">
                <h1 className='grid text-text_primary text-lg mb-2 font-bold'>Add new institution</h1>
            </div>
            <form className=''>
                <div className='w-full mb-2'>
                    <label>Institution Name</label>
                    <input type="text" name='institution' className="text-text_secondary rounded-lg outline-primary block w-full px-4 py-1 border border-text_primary border-opacity-40 placeholder-text_primary" placeholder="Institution Name" required/>
                </div>

                <div className='w-full mb-2'>
                    <label>Institution Acronym</label>
                    <input type="text" name='institutionAcronym' className="text-text_secondary rounded-lg outline-primary block w-full px-4 py-1 border border-text_primary border-opacity-40 placeholder-text_primary" placeholder="InstitutionAcronym" required/>
                </div>

                <div className='w-full mb-2'>
                    <label>Institution Logo</label>
                    <input type="file" name='Attachements' className="my-2 text-text_secondary outline-primary block w-full px-4 py-2 border-2 rounded-lg border-text_primary border-opacity-40 placeholder-text_primary" placeholder="Proofs/Evidences" required/>
                </div>

                <div className='w-full'>
                    <label>Government officials</label>
                    <input type="text" name='Minister/Director' className="text-text_secondary rounded-lg outline-primary block w-full px-4 py-1 border border-text_primary border-opacity-40 placeholder-text_primary cursor-pointer" placeholder="Minister/Director" required readOnly onClick={()=>setShowDirector(!showDirector)}/>
                    {showDirector && (
                        <div className='p-2 w-full h-full absolute bg-primary text-text_primary top-0 left-0 rounded-lg'>
                            <div className='flex justify-start'>
                                <div className='p-2'>
                                    <BiArrowBack size={20} className='cursor-pointer font-normal text-text_primary hover:text-list_hover delay-100 duration-500' onClick={()=>setShowDirector(!showDirector)}/>
                                </div>
                                <div className='relative w-full mb-2'>
                                    <input type='search' placeholder='Search' className='py-1 px-2 border-2 outline-none border-primary w-full rounded-lg placeholder:text-text_primary placeholder:text-opacity-50'/>
                                    <IoSearchOutline size={20} className='cursor-pointer font-normal text-text_primary hover:text-list_hover delay-100 duration-500 absolute right-2 top-2'/>
                                </div>
                                <div className='p-2 text-secondary  duration-200 delay-100 cursor-pointer'>
                                    <RiAddCircleFill size={20}/>
                                </div>
                            </div>
                            
                            <ul className='list-none -ml-4'>
                                <li>Admin</li>
                            </ul>
                        </div>
                    )}
                    
                </div>

                <div className='flex justify-between gap-4'>
                    <button type='reset' size="sm" className=' my-4 text-text_primary w-full border-2 border-text_primary border-opacity-40 font-bold p-2' onClick={()=>props.setAddInstitutionModal(false)}>Cancel</button>
                    <button type='submit' size='sm' className={`my-4 bg-secondary text-center text-primary font-bold p-2 w-full ${loading? 'cursor-not-allowed ':'cursor-pointer'}`} disabled={loading? true : false}>
                        {loading?<p className="flex justify-center gap-2"><AiOutlineLoading3Quarters size={20} className="animate-spin h-5 w-5"/><span> Saving income</span></p>:'Save income'}
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddInstitution