import React, { useCallback, useEffect, useState } from 'react'
import AdminDashboard from '../../components/AdminDashboard';
import GovernmentLogo from '../../assets/Govt.png';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchOne, updateInstitution } from '../../redux/Actions/InstitutionActions';
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { getUser, updateUser, uploadImage } from '../../redux/Actions/usersAction';
import AllInstitutionsModal from '../../components/AllInstitutionsModal';
import DropImage from '../../components/DropImage';
import ImageGrid from '../../components/ImageGrid';
import cuid from 'cuid';
import Loading from '../../components/Loading';
import Error from '../../components/Error';


const UpdateUser = (props) => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showDirector, setShowDirector] = useState(false);
    const params = useParams();
    const [images, setImages] = React.useState([]);

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


    const user = props?.data?.getUser?.resp?.data?.oneUser;
    console.log(props?.data?.getUser);


    const handleGetUser = () => {
        props.getUser(params?.id)
    }



    const [formData, setFormData] = useState({
        title: "",
        fullNames: "",
        email: "",
        mobile: "",
        position: "",
        institution: "",
        institutionName: "",
        profilePicture: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }));
    }




    const handleUpdate = (e) => {
        e.preventDefault();
        props.updateUser(params?.id, formData)
    }
    useEffect(() => {
        if (params?.id) {
            handleGetUser();
        }
    }, [params?.id])

    useEffect(() => {

        if (props?.data?.getUser?.success && user) {
            setFormData({
                title: user?.title || "",
                fullNames: user?.fullNames || "",
                email: user?.email || "",
                mobile: user?.mobile || "",
                password: Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000,
                position: user?.position || "",
                institution: user?.institution?._id || "",
                institutionName: user?.institution?.institutionName || "",
                profilePicture: user?.profilePicture || ""
            });
        }
    }, [user, props?.data?.getUser?.success])


    const positions = [
        "Budget Officer",
        "Budget Monitoring Officer"
    ]

    const navigate = useNavigate();

    const handleUpload = (e) => {
        props.uploadImage({ picture: images[0]?.src });
    }


    return (
        <AdminDashboard setLoading={setLoading} setUserData={setUserData}>

            <div className='grid lg:grid-cols-4 gap-4 w-full mx-auto lg:max-h-screen lg:overflow-y-hidden items-start py-4'>
                <div>
                    <div className='w-full relative bg-primary2 rounded-lg shadow-lg py-4 px-4 lg:h-56'>
                        <div className='w-full lg:h-52 group relative cursor-pointer mb-4 '>
                            <img src={images.length === 0 ? formData?.profilePicture ? formData?.profilePicture : "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png" : images[0].src} className='w-full h-full object-cover' />
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

                <div className='lg:col-span-3 bg-primary2 rounded-lg shadow-lg py-4 px-4 relative'>
                    <div className="mb-2">
                        <h1 className='grid text-text_primary text-lg mb-2 font-bold'>Update official</h1>
                    </div>

                    {props?.data?.updateUser?.success ?
                        <label className='text-success text-xs'>{'Saved'}</label>
                        :
                        <label className='text-red text-xs'>{props?.data?.updateUser?.error && (props?.data?.updateUser?.error?.response?.data?.message || props?.data?.updateUser?.error?.message)}</label>
                    }
                    {props?.data?.getUser?.loading ?
                        <Loading />
                        :
                        props?.data?.getUser?.success ? (
                            <form method='POST' className='text-text_primary lg:grid grid-cols-2 gap-2' onSubmit={(e) => handleUpdate(e)}>
                                <div className='w-full mb-2'>
                                    <label>Member Title</label>
                                    <select name='title' value={formData.title} className='py-2 border w-full px-4 text-text_primary rounded-lg border-text_primary border-opacity-40' onChange={handleChange} required>
                                        <option value={""}>--Select title--</option>
                                        <option value={"Dr"}>Dr</option>
                                        <option value={"Hon"}>Hon.</option>
                                        <option value={"Amb"}>Amb.</option>
                                        <option value={"Mr"}>Mr</option>
                                        <option value={"Ms"}>Ms</option>

                                    </select>
                                </div>

                                <div className='w-full mb-2'>
                                    <label>Names</label>
                                    <input type="text" value={formData.fullNames} name='fullNames' className="py-1 text-text_secondary rounded-lg outline-primary block w-full px-4 border border-text_primary border-opacity-40 placeholder-text_primary" placeholder="Names" onChange={handleChange} required />
                                </div>

                                <div className='w-full mb-2'>
                                    <label>Position</label>
                                    <select name='position' value={formData.position} className='py-2 border w-full px-4 text-text_primary rounded-lg border-text_primary border-opacity-40' onChange={handleChange} required>
                                        <option value={""}>--Select Position--</option>
                                        {positions.map((item, index) => (
                                            <option key={index} value={item} >{item}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className='w-full mb-2'>
                                    <label>Email</label>
                                    <input onChange={handleChange} value={formData.email} type="email" name='email' className="py-1 text-text_secondary rounded-lg outline-primary block w-full px-4 border border-text_primary border-opacity-40 placeholder-text_primary" placeholder="Email" required />
                                </div>

                                <div className='w-full mb-2'>
                                    <label>Mobile</label>
                                    <input onChange={handleChange} value={formData.mobile} type="number" name='mobile'
                                        className={`py-1 text-text_secondary rounded-lg outline-primary block w-full px-4 border border-text_primary border-opacity-40 placeholder-text_primary`} placeholder="Mobile" required />
                                </div>

                                <div className='w-full mb-2'>
                                    <label>Institution</label>
                                    <input type="text" value={formData.institutionName} name='institution' className="py-1 text-text_secondary rounded-lg outline-primary block w-full px-4 border border-text_primary border-opacity-40 placeholder-text_primary cursor-pointer" placeholder="Institution" required readOnly onClick={() => setShowDirector(!showDirector)} />
                                    {showDirector && (
                                        <AllInstitutionsModal setShowDirector={setShowDirector} setFormData={setFormData} formData={formData} />
                                    )}

                                </div>

                                <div className='flex justify-between gap-4 col-span-2'>
                                    <button type='reset' size="sm" className=' text-xs text-text_primary w-full border-2 border-text_primary border-opacity-40 font-bold p-2' onClick={() => { navigate(-1) }}>Go back</button>
                                    <button type='submit' size='sm' className={`text-xs bg-secondary text-center text-primary font-bold p-2 w-full ${props?.data?.updateUser?.loading ? 'cursor-not-allowed ' : 'cursor-pointer'}`} disabled={props?.data?.updateUser?.loading ? true : false}>
                                        {props?.data?.updateUser?.loading ? <p className="flex justify-center gap-2"><AiOutlineLoading3Quarters size={20} className="animate-spin h-5 w-5" /></p> : 'Save'}
                                    </button>
                                </div>
                            </form>
                        )
                            : (
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

export default connect(mapState, { getUser, updateUser, uploadImage })(UpdateUser);

