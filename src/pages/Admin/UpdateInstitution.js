import React, { useCallback, useEffect, useState } from 'react'
import AdminDashboard from '../../components/AdminDashboard';
import GovernmentLogo from '../../assets/Govt.png';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchOne, updateInstitution, uploadInstImage } from '../../redux/Actions/InstitutionActions';
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import DropImage from '../../components/DropImage';
import cuid from 'cuid';
import Loading from '../../components/Loading';
import Error from '../../components/Error';


const UpdateInstitution = (props) => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false)
  const params = useParams();

  const instData = props?.data?.oneInst?.resp?.data?.oneInstitution;


  const handleGetInstitution = () => {
    props.fetchOne(params?.id)
  }



  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      const maxSize = 10 * 1024 * 1024; // 10 MB in bytes
      if (file.size > maxSize) {
        alert(`File ${file.name} exceeds the maximum size limit of 10 MB.`);
        return;
      }
      const reader = new FileReader();
      setImages([])
      reader.onload = function (e) {
        setImages((previousState) => [
          ...previousState,
          { id: cuid(), src: e.target.result },
        ]);
      };

      reader.readAsDataURL(file);
      return file;
    })
  }, [])

  const [formData, setFormData] = useState({
    institutionName: "",
    acronym: "",
    email: "",
    mobile: ""

  })
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    props.updateInstitution(params?.id, formData)
  }

  useEffect(() => {
    if (params?.id)
      handleGetInstitution();
  }, [params?.id])

  useEffect(() => {

    if (props?.data?.oneInst?.success) {
      setFormData({
        institutionName: instData?.institutionName || "",
        acronym: instData?.acronym || "",
        email: instData?.email || "",
        mobile: instData?.mobile || "",
        profilePicture: instData?.profilePicture || ""
      });
    }
  }, [instData, props?.data?.oneInst?.success])

  const navigate=useNavigate();
  

  const handleUpload = (e) => {
    props.uploadInstImage({ picture: images[0]?.src, institution: params?.id });
  }

  return (
    <AdminDashboard setLoading={setLoading} setUserData={setUserData}>

      <div className='grid lg:grid-cols-4 gap-4 mx-auto lg:max-h-screen lg:overflow-y-hidden items-start py-4'>

        <div>
          <div className='w-full relative bg-primary2 rounded-lg shadow-lg py-4 px-4 lg:h-56'>
            <div className='w-full lg:h-52 group relative cursor-pointer mb-4 '>
              <img src={images.length === 0 ? formData?.profilePicture !=="" ? formData?.profilePicture : GovernmentLogo : images[0].src} className='w-full h-full object-cover' />
            </div>

            <DropImage onDrop={onDrop} accept={"image/*"} />

          </div>
          {images.length !== 0 &&
            <>
              <div className='w-full my-2 mx-auto'>
                <button type='submit' onClick={() => handleUpload()} size='sm' className={`text-xs bg-secondary text-center text-primary font-bold p-2 w-full ${props?.data?.updatePic?.loading ? 'cursor-not-allowed ' : 'cursor-pointer'}`} disabled={props?.data?.updatePic?.loading ? true : false}>
                  {props?.data?.updatePic?.loading ? <p className="flex justify-center gap-2"><AiOutlineLoading3Quarters size={20} className="animate-spin h-5 w-5" /></p> : 'Save'}
                </button>
              </div>
              {props?.data?.updatePic?.success ?
                <label className='text-success text-xs'>{'Saved'}</label>
                :
                <label className='text-red text-xs'>{props?.data?.updatePic?.error && (props?.data?.updatePic?.error?.response?.data?.message || props?.data?.updatePic?.error?.message)}</label>
              }

            </>

          }
        </div>

        <div className='lg:col-span-3 bg-primary2 rounded-lg shadow-lg py-4 px-4'>
          <div className="mb-2">
            <h1 className='grid text-text_primary text-lg mb-2 font-bold'>Update institution</h1>
          </div>

          <div className='text-success text-sm py-4' >{props?.data?.updateInst?.success && 'Institution Updated'}</div>
          {props?.data?.oneInst?.loading ?
          <Loading />
          :
          props?.data?.oneInst?.success ?(
<form className='text-text_primary grid lg:grid-cols-2 gap-4' onSubmit={(e) => handleUpdate(e)}>
            <div className='w-full mb-2'>
              <label>Institution Name</label>
              <input onChange={handleChange} value={formData.institutionName || ""} type="text" name='institutionName' className="text-text_secondary rounded-lg outline-primary block w-full px-4 py-1 border border-text_primary border-opacity-40 placeholder-text_primary" placeholder="Institution Name" required />
            </div>

            <div className='w-full mb-2'>
              <label>Institution Acronym</label>
              <input onChange={handleChange} value={formData.acronym || ""} type="text" name='acronym' className="text-text_secondary rounded-lg outline-primary block w-full px-4 py-1 border border-text_primary border-opacity-40 placeholder-text_primary" placeholder="InstitutionAcronym" required />
            </div>

            <div className='w-full mb-2'>
              <label>Institution Email</label>
              <input onChange={handleChange} value={formData.email || ""} type="email" name='email' className="text-text_secondary rounded-lg outline-primary block w-full px-4 py-1 border border-text_primary border-opacity-40 placeholder-text_primary" placeholder="Institution Email" required />
            </div>

            <div className='w-full mb-2'>
              <label>Institution Contact</label>
              <input onChange={handleChange} value={formData.mobile || ""} type="number" name='mobile' className="text-text_secondary rounded-lg outline-primary block w-full px-4 py-1 border border-text_primary border-opacity-40 placeholder-text_primary" placeholder="InstitutionContact" required />
            </div>

            <div className='flex justify-between gap-4'>
              <button type='reset' size="sm" className=' text-xs text-text_primary w-full border-2 border-text_primary border-opacity-40 font-bold p-2' onClick={() => { navigate(-1) }}>Go back</button>
              <button type='submit' size='sm' className={`bg-secondary text-center text-xs text-primary p-2 w-full ${props?.data?.updateInst?.loading ? 'cursor-not-allowed ' : 'cursor-pointer'}`} disabled={props?.data?.updateInst?.loading ? true : false}>
                {props?.data?.updateInst?.loading ? <p className="flex justify-center gap-2"><AiOutlineLoading3Quarters size={20} className="animate-spin h-5 w-5" /></p> : 'Save'}
              </button>
            </div>


          </form>
          )
          :
          (
            <Error message={props?.data?.getUser?.error && (props?.data?.getUser?.error?.response?.data?.message || props?.data?.getUser?.error?.message)} />
          )}
          

        </div>

      </div>

    </AdminDashboard>
  )
}

const mapState = (data) => ({
  data: data
})

export default connect(mapState, { fetchOne, updateInstitution,uploadInstImage })(UpdateInstitution)