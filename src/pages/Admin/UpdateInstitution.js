import React,{useEffect, useState} from 'react'
import AdminDashboard from '../../components/AdminDashboard';
import GovernmentLogo from '../../assets/Govt.png';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchOne, updateInstitution } from '../../redux/Actions/InstitutionActions';
import {AiOutlineLoading3Quarters} from "react-icons/ai"


const UpdateInstitution = (props) => {
  const [userData,setUserData]=useState([]);

  const params=useParams();

  const instData =props?.data?.oneInst?.resp?.data?.oneInstitution;  

  const handleGetInstitution=()=>{
    props.fetchOne(params?.id)
  }

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

  const handleUpdate=(e)=>{
    e.preventDefault();
    props.updateInstitution(params?.id,formData)
  }

  useEffect(()=>{
    handleGetInstitution();

    if (props?.data?.oneInst?.success) {
      setFormData({
        institutionName: instData.institutionName || "",
        acronym: instData.acronym || "",
        email: instData.email || "",
        mobile: instData.mobile || ""
      });
    }
  },[params?.id,props?.data?.oneInst?.success])

  return (
    <AdminDashboard setUserData={setUserData}>

      <div className='grid lg:grid-cols-4 gap-4 lg:w-10/12 mx-auto lg:max-h-screen lg:overflow-y-hidden items-start py-4'>
        <div className='w-full bg-primary2 rounded-lg shadow-lg py-4 px-4'>
          <div className='w-full h-1/4 group relative cursor-pointer mb-4'>
            <img src={GovernmentLogo} className='w-full h-full'/>
          </div>
          <div className='w-4/5 mx-auto'>
            <button size='sm' className='w-full bg-secondary text-xs text-center text-primary font-bold p-2'>Change picture</button>
          </div>
        </div>

        <div className='lg:col-span-3 bg-primary2 rounded-lg shadow-lg py-4 px-4'>
          <div className="mb-2">
            <h1 className='grid text-text_primary text-lg mb-2 font-bold'>Update institution</h1>
          </div>

          <div className='text-success text-sm py-4' >{props?.data?.updateInst?.success && 'Institution Updated'}</div>

          <form className='text-text_primary grid lg:grid-cols-2 gap-4' onSubmit={(e)=>handleUpdate(e)}>
            <div className='w-full mb-2'>
              <label>Institution Name</label>
              <input onChange={handleChange} value={formData.institutionName ||""} type="text" name='institutionName' className="text-text_secondary rounded-lg outline-primary block w-full px-4 py-1 border border-text_primary border-opacity-40 placeholder-text_primary" placeholder="Institution Name" required/>
            </div>

            <div className='w-full mb-2'>
              <label>Institution Acronym</label>
              <input onChange={handleChange} value={formData.acronym ||""} type="text" name='acronym' className="text-text_secondary rounded-lg outline-primary block w-full px-4 py-1 border border-text_primary border-opacity-40 placeholder-text_primary" placeholder="InstitutionAcronym" required/>
            </div>

            <div className='w-full mb-2'>
              <label>Institution Email</label>
              <input onChange={handleChange} value={formData.email ||""} type="email" name='email' className="text-text_secondary rounded-lg outline-primary block w-full px-4 py-1 border border-text_primary border-opacity-40 placeholder-text_primary" placeholder="Institution Email" required/>
            </div>

            <div className='w-full mb-2'>
              <label>Institution Contact</label>
              <input onChange={handleChange} value={formData.mobile ||""} type="number" name='mobile' className="text-text_secondary rounded-lg outline-primary block w-full px-4 py-1 border border-text_primary border-opacity-40 placeholder-text_primary" placeholder="InstitutionContact" required/>
            </div>

            <div className='flex justify-between gap-4 w-1/4'>
              <button type='submit' size='sm' className={`bg-secondary text-center text-xs text-primary p-2 w-full ${props?.data?.updateInst?.loading? 'cursor-not-allowed ':'cursor-pointer'}`} disabled={props?.data?.updateInst?.loading? true : false}>
                {props?.data?.updateInst?.loading?<p className="flex justify-center gap-2"><AiOutlineLoading3Quarters size={20} className="animate-spin h-5 w-5"/></p>:'Save'}
              </button>
          </div>

            
          </form>

        </div>

      </div>

    </AdminDashboard>
  )
}

const mapState=(data)=>({
  data:data
})

export default connect(mapState,{fetchOne,updateInstitution}) (UpdateInstitution)