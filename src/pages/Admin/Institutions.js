import React,{useEffect} from 'react'
import AdminDashboard from '../../components/AdminDashboard'
import Pagination from '../../components/Pagination';
import { IoSearchOutline } from 'react-icons/io5';
import { MdDomainAdd } from "react-icons/md";
import AddInstitution from '../../components/AddInstitution';
import { useState } from 'react';
import Card from '../../components/Card';
import { deleteInstution, fetchInst } from '../../redux/Actions/InstitutionActions';
import { connect } from 'react-redux';
import Loading from '../../components/Loading';
import NoDataFound from '../../components/NoDataFound';
import Error from '../../components/Error';
import { pagination } from '../../utils/paginationHandler';
import DeleteConfirm from '../../components/DeleteConfirm';
import { useNavigate } from 'react-router-dom';

const Institutions = (props) => {
    const [currentPage,setCurrentPage]=useState(0);
    const [reload,setReload]=useState(false);
    const [Delete,setDelete]=useState({
        id:"",
        open:false
    })

    const navigate=useNavigate();

    const handlePagination = (pageNumber) => {
        setCurrentPage (pageNumber);
    };

    const [AddInstitutionModal, setAddInstitutionModal] = useState(false);
    const [userData,setUserData]=useState([]);

    useEffect(()=>{
        props.fetchInst()
    },[reload])

    const institution=props?.data?.inst;    
    
    
    const handleOpenDelete=(id)=>{  
        setDelete({id:id,open:true});      
    }

    const handleOpenEdit=(id)=>{
        navigate(`/dashboard/institutions/${id}`)
    }

    const [searchWord,setSearchWord]=useState("");

    const filteredInst=()=>{
        return institution?.resp?.data?.getInstitutions?.filter((item)=>(
            item.institutionName.toLowerCase().includes(searchWord.toLowerCase()) || item.acronym.toLowerCase().includes(searchWord.toLowerCase())
        ));
    }

    const handleDelete=(id)=>{
        if (props.deleteInstution(id)) {
            setDelete({id:"",open:false})
            setReload(!reload);            
        }
    }
    


  return (
    <AdminDashboard setUserData={setUserData}>
        <div className='py-4 text-text_primary'>
            <p className='font-bold'>Government institutions</p>
            <label className='text-success text-sm' >{props?.data?.deleteInst?.success && 'Institution deleted'}</label>
        </div>
        {institution?.loading?(
            <Loading/>
        )
        :
        (institution?.success?(
            <div className='relative w-full gap-2 bg-primary2 shadow-lg rounded-lg lg:px-8 px-2 py-4 max-h-screen h-full'>
                <div className='lg:flex justify-between mb-2 items-center '>
                    <div className='text-sm text-text_primary w-full flex justify-between mx-4'>
                        <label>{filteredInst().length} institution</label>

                        <div className='flex items-center justify-end'>
                            <div className='p-2 bg-secondary rounded-lg text-primary2 text-center cursor-pointer hover:opacity-50 duration-200 delay-100' onClick={()=>setAddInstitutionModal(!AddInstitutionModal)}>
                                <p><MdDomainAdd size={20}/></p>
                            </div>

                        </div>  
                    </div>

                    <div className='relative lg:w-2/5 w-full'>
                        <input type='search' placeholder='Search' className='py-1 px-2 border-2 outline-none border-primary w-full rounded-lg placeholder:text-text_primary placeholder:text-opacity-50' onChange={(e)=>setSearchWord(e.target.value)}/>
                        {!searchWord && <IoSearchOutline size={20} className='cursor-pointer font-normal text-text_primary hover:text-list_hover delay-100 duration-500 absolute right-2 top-2'/>}
                    </div>
                    
                    
                </div>
                {filteredInst().length <=0?(
                    <NoDataFound/>
                )
                :
                (
                    <>
                        <div className='grid lg:grid-cols-5 grid-cols-1 gap-4'>
                            {pagination(filteredInst,10).length>0 && pagination(filteredInst,10)[currentPage].map((item,index)=>(
                                <Card key={index} email={item.email} name={item.institutionName} id={item._id} editHandler={handleOpenEdit} deleteHandler={handleOpenDelete}/>
                            ))}
                        </div>

                        <Pagination
                            length={institution?.resp?.data?.getInstitutions?.length}
                            postsPerPage={10}
                            handlePagination={handlePagination}
                            currentPage={currentPage}
                        />
                    </>
                )}

                {Delete.open && <DeleteConfirm handleDelete={handleDelete} Delete={Delete} item={"institution"} setDelete={setDelete}/>}                
                {AddInstitutionModal && <AddInstitution setReload={setReload} setAddInstitutionModal={setAddInstitutionModal}/>}
            </div>
        )
        :
        (
            <Error code={institution?.error?.code} message={institution?.error?.message}/>
        )
    )}
    </AdminDashboard>
  )
}

const mapState=(data)=>({
    data:data
})

export default connect(mapState,{fetchInst,deleteInstution}) (Institutions)