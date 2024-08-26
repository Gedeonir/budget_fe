import React, { useEffect,useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5';
import { BiArrowBack } from "react-icons/bi";
import { MdDomainAdd } from "react-icons/md";
import { RiAddCircleFill } from "react-icons/ri";
import { connect } from 'react-redux';
import { fetchInst } from '../redux/Actions/InstitutionActions';
import Loading from './Loading';
import Error from './Error';
import NoDataFound from './NoDataFound';
import { TiTick } from 'react-icons/ti';


const AllInstitutionsModal = (props) => {
    const [searchWord,setSearchWord]=useState("");

    const institution=props?.data?.inst;    

    const filteredInst=()=>{
        return institution?.resp?.data?.getInstitutions?.filter((item)=>(
            item.institutionName.toLowerCase().includes(searchWord.toLowerCase()) || item.acronym.toLowerCase().includes(searchWord.toLowerCase())
        ));
    }

    useEffect(()=>{
        props.fetchInst()
    },[])

    

  return (
    <div className='p-2 w-full h-full absolute bg-primary2 text-text_primary top-0 left-0 rounded-lg'>
        <div className='flex justify-start'>
            <div className='p-2'>
                <BiArrowBack size={20} className='cursor-pointer font-normal text-text_primary hover:text-list_hover delay-100 duration-500' onClick={()=>props.setShowDirector(false)}/>
            </div>
            <div className='relative w-full mb-2'>
                <input type='search' placeholder='Search' className='py-1 px-2 border-2 outline-none border-primary w-full rounded-lg placeholder:text-text_primary placeholder:text-opacity-50' onChange={(e)=>setSearchWord(e.target.value)}/>
                {!searchWord && <IoSearchOutline size={20} className='cursor-pointer font-normal text-text_primary hover:text-list_hover delay-100 duration-500 absolute right-2 top-2'/>}
            </div>
        </div>
        {institution?.loading?(
            <Loading/>
        )
        :
        (institution?.success?(
            filteredInst().length <=0?(
                    <NoDataFound/>
                )
                :
                (
                    <ul className='list-none -ml-4'>
                    {filteredInst().map((item,index)=>(
                        
                        <li className={`flex items-center justify-between relative mb-2 py-2 duration-500 delay-100 cursor-pointer hover:text-secondary`} key={index}
                        onClick={()=>(
                            props.setFormData({...props.formData,institution:item._id,institutionName:item.institutionName}),
                            props.setShowDirector(false)
                            )}
                        >
                            {item.institutionName}
                            {/* {props.formData === item.institutionName && <TiTick/>} */}
                        </li>
                    ))}
                    </ul>
                )
        )
        :
        (
            <Error code={institution?.error?.code} message={institution?.error?.message}/>
        )
        )}
        
    </div>
  )
}

const mapState=(data)=>({
    data:data
})

export default connect(mapState,{fetchInst})(AllInstitutionsModal)