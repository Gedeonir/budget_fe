import React,{useEffect} from 'react'
import AdminDashboard from '../../components/AdminDashboard'
import Pagination from '../../components/Pagination';
import { IoSearchOutline } from 'react-icons/io5';
import { RiFilter3Line } from "react-icons/ri";
import { MdDomainAdd } from "react-icons/md";
import AddOfficials from '../../components/AddOfficials';
import { useState } from 'react';
import Card from '../../components/Card';
import { connect } from 'react-redux';
import { deleteUser, getAllUsers } from '../../redux/Actions/usersAction';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import NoDataFound from '../../components/NoDataFound';
import { pagination } from '../../utils/paginationHandler';
import { useNavigate } from 'react-router-dom';
import DeleteConfirm from '../../components/DeleteConfirm';


const Officials = (props) => {
    const [userData,setUserData]=useState([]);
    const [AddOfficialsModal, setAddOfficialsModal] = useState(false);
    const [reload,setReload]=useState(false);
    const [currentPage,setCurrentPage]=useState(0);
    const [Delete,setDelete]=useState({
        id:"",
        open:false
    })

    const navigate=useNavigate()

    const handlePagination = (pageNumber) => {
        setCurrentPage (pageNumber);
    };

    useEffect(()=>{
        props.getAllUsers()
    },[reload,userData])

    const users=props?.data?.users;

    const [searchWord,setSearchWord]=useState("");

    const filteredUsers=()=>{
        return users?.resp?.data?.getUsers?.filter((item)=>item.fullNames.toLowerCase().includes(searchWord.toLowerCase()) && item.email.toLowerCase() !== userData?.getProfile?.email.toLowerCase());
    }
        
    const handleOpenDelete=(id)=>{  
        setDelete({id:id,open:true});      
    }

    const handleOpenEdit=(id)=>{
        navigate(`/dashboard/user/${id}`)
    }

    const handleDelete=(id)=>{
        props.deleteUser(id)
        setDelete({id:"",open:false})
        setReload(!reload); 

    }
    

  return (
    <AdminDashboard setUserData={setUserData}>
        <div className='py-4 font-bold text-text_primary'>
            <p>Government Officials</p>
        </div>

        {users?.loading?(
            <Loading/>
        )
        :
        (users?.success?(
            <div className='relative w-full gap-2 bg-primary2 shadow-lg rounded-lg lg:px-8 px-2 py-4 max-h-screen h-full'>
                <div className='lg:flex justify-between mb-2 items-center '>
                    <div className='text-sm text-text_primary w-full flex justify-between mb-2'>
                        <label>{filteredUsers().length} Officials</label>

                        <div className='flex items-center justify-end'>
                            <div className='mx-4 p-2 bg-secondary rounded-lg text-primary2 text-center cursor-pointer hover:opacity-50 duration-200 delay-100' onClick={()=>setAddOfficialsModal(!AddOfficialsModal)}>
                                <p><MdDomainAdd size={20}/></p>
                            </div>   
                        </div>  
                    </div>

                    <div className='relative lg:w-2/5 w-full mb-2'>
                        <input type='search' placeholder='Search' className='py-1 px-2 border-2 outline-none border-primary w-full rounded-lg placeholder:text-text_primary placeholder:text-opacity-50' onChange={(e)=>setSearchWord(e.target.value)}/>
                        {!searchWord && <IoSearchOutline size={20} className='cursor-pointer font-normal text-text_primary hover:text-list_hover delay-100 duration-500 absolute right-2 top-2'/>}
                    </div>
                    
                    
                </div>

                {filteredUsers().length <=0?(
                    <NoDataFound/>
                )
                :
                (
                    <>
                        <div className='grid lg:grid-cols-5 grid-cols-1 gap-4'>
                            {pagination(filteredUsers,10).length>0 && pagination(filteredUsers,10)[currentPage].map((item,index)=>(
                                <Card 
                                    key={index} 
                                    img={"https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png"} 
                                    name={item.fullNames} 
                                    email={item.email} 
                                    inst={item?.institution?.institutionName}
                                    pos={item.position}
                                    id={item._id} 
                                    editHandler={handleOpenEdit} 
                                    deleteHandler={handleOpenDelete}
                                />
                            ))}
                        </div>

                        <Pagination
                            length={users?.resp?.data?.getUsers?.length}
                            postsPerPage={10}
                            handlePagination={handlePagination}
                            currentPage={currentPage}
                        />
                  </>
                )}       
                {Delete.open && <DeleteConfirm handleDelete={handleDelete} Delete={Delete} item={"user"} setDelete={setDelete}/>}                

                {AddOfficialsModal && <AddOfficials setReload={setReload} setAddOfficialsModal={setAddOfficialsModal}/>}
            </div>
        )
        :
        (
            <Error code={users?.error?.code} message={users?.error?.message}/>
        )
        )}
    </AdminDashboard>
  )
}

const mapState=(data)=>({
    data:data
})

export default connect(mapState,{getAllUsers,deleteUser}) (Officials)