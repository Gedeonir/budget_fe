import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getUser } from '../redux/Actions/usersAction'
import { useParams } from 'react-router-dom';
import Error from './Error';
import Loading from './Loading';

const Profile = (props) => {
    const params = useParams();
    const user = props?.data?.getUser;

    const handleGetUser = () => {
        props.getUser(params?.id)
    }
    useEffect(() => {
        if (params?.id) {
            handleGetUser();
        }
    }, [params?.id])


    return (
        <div className='grid lg:grid-cols-4 gap-4 w-11/12 mx-auto lg:max-h-screen lg:overflow-y-hidden items-start py-4'>
            {user?.loading ? <Loading /> :
                user?.success ? (
                    <>
                        <div className='w-full relative bg-primary2 rounded-lg shadow-lg py-4 px-4 lg:h-56'>
                            <div className='w-full lg:h-52 group relative cursor-pointer mb-4 '>
                                <img src={user?.resp?.data?.oneUser?.profilePicture ? user?.resp?.data?.oneUser?.profilePicture : "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png"} className='w-full h-full object-contain' />
                            </div>
                        </div>
                        <div className='lg:col-span-3 bg-primary2 rounded-lg shadow-lg py-4 px-4 relative text-text_primary'>
                            <div className="mb-2">
                                <h1 className='grid text-text_primary text-lg mb-2 font-bold'>Personal Information</h1>
                            </div>

                            <>
                                <div className='w-full mb-2 text-sm'>
                                    <label className='font-bold'>Member Title</label>
                                    <p className='border-b border-text_primary'>{user?.resp?.data?.oneUser?.title}</p>
                                </div>

                                <div className='w-full mb-2 text-sm'>
                                    <label className='font-bold'>Names</label>
                                    <p className='border-b border-text_primary'>{user?.resp?.data?.oneUser?.fullNames}</p>
                                </div>

                                <div className='w-full mb-2 text-sm'>
                                    <label className='font-bold'>Position</label>
                                    <p className='border-b border-text_primary'>{user?.resp?.data?.oneUser?.position}</p>
                                </div>

                                <div className='w-full mb-2 text-sm'>
                                    <label className='font-bold'>Email</label>
                                    <p className='border-b border-text_primary'>{user?.resp?.data?.oneUser?.email}</p>
                                </div>

                                <div className='w-full mb-2 text-sm'>
                                    <label className='font-bold'>Mobile</label>
                                    <p className='border-b border-text_primary'>{user?.resp?.data?.oneUser?.mobile}</p>

                                </div>

                                <div className='w-full mb-2 text-sm'>
                                    <label className='font-bold'>Institution</label>
                                    <p className='border-b border-text_primary'>{user?.resp?.data?.oneUser?.institution?.institutionName}</p>

                                </div>
                            </>


                        </div>
                    </>
                ) :
                    (
                        <Error message={props?.data?.getUser?.error && (props?.data?.getUser?.error?.response?.data?.message || props?.data?.getUser?.error?.message)} />
                    )
            }


        </div>
    )
}

const mapState = (data) => ({
    data: data
})

export default connect(mapState, { getUser })(Profile)