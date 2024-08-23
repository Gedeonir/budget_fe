import React from 'react'
import AdminDashboard from '../../components/AdminDashboard'
import GovernmentLogo from '../../assets/Govt.png';
import Pagination from '../../components/Pagination';
import { AiFillDelete } from "react-icons/ai";
import { TbEditCircle } from "react-icons/tb";
import { IoSearchOutline } from 'react-icons/io5';
import { RiFilter3Line } from "react-icons/ri";
import { MdDomainAdd } from "react-icons/md";
import AddOfficials from '../../components/AddOfficials';
import { useState } from 'react';
import Card from '../../components/Card';

const inst=[
    {
        "institution":"Ministry of Health",
        "Ministry":"Dr xxx",
    },
    {
        "institution":"Ministry of Youth",
        "Ministry":"Dr xxx",
    },
    {
        "institution":"Ministry of Trade",
        "Ministry":"Mr xxx",
    },
    {
        "institution":"Ministry of Justice",
        "Ministry":"Prof xxxxxxx",
    },
    {
        "institution":"Ministry of Defence",
        "Ministry":"Gen xy",
    },
    {
        "institution":"Ministry of Health",
        "Ministry":"Dr xxx",
    },
    {
        "institution":"Ministry of Youth",
        "Ministry":"Dr xxx",
    },
    {
        "institution":"Ministry of Education",
        "Ministry":"Mr xxx",
    },
    {
        "institution":"Ministry of Labour",
        "Ministry":"Prof xxxxxxx",
    },
    {
        "institution":"Rwanda National Police",
        "Ministry":"Gen xy",
    },
]

const Officials = () => {
    const [userData,setUserData]=useState([]);
    const [AddOfficialsModal, setAddOfficialsModal] = useState(false);


    const handlePagination = (pageNumber) => {
        setCurrentPage (pageNumber);
    };

  return (
    <AdminDashboard setUserData={setUserData}>
        <div className='py-4 font-bold text-text_primary'>
            <p>Government Officials</p>
        </div>

        <div className='relative w-full gap-2 bg-primary2 shadow-lg rounded-lg lg:px-8 px-2 py-4 min-h-screen h-full'>
            <div className='lg:flex justify-between mb-2 items-center '>
                <div className='text-sm text-text_primary w-full flex justify-between'>
                    <label>200 total Officials</label>

                    <div className='flex items-center justify-end'>
                        <div className='p-2 bg-secondary rounded-lg text-primary2 text-center cursor-pointer hover:opacity-50 duration-200 delay-100' onClick={()=>setAddOfficialsModal(!AddOfficialsModal)}>
                            <p><MdDomainAdd size={20}/></p>
                        </div>

                        <div className='p-2  rounded-lg text-text_primary text-center cursor-pointer hover:text-list_hover duration-200 delay-100'>
                            <p><RiFilter3Line size={20}/></p>
                        </div>
                    </div>  
                </div>

                <div className='relative lg:w-2/5 w-full'>
                    <input type='search' placeholder='Search' className='py-1 px-2 border-2 outline-none border-primary w-full rounded-lg placeholder:text-text_primary placeholder:text-opacity-50'/>
                    <IoSearchOutline size={20} className='cursor-pointer font-normal text-text_primary hover:text-list_hover delay-100 duration-500 absolute right-2 top-2'/>
                </div>
                
                
            </div>
            <div className='grid lg:grid-cols-5 grid-cols-1 gap-4'>
                {inst.map((item,index)=>(
                    <Card Ministry={item.Ministry} institution={item.institution}/>
                ))}
            </div>

            <Pagination
                length={100}
                postsPerPage={20}
                handlePagination={handlePagination}
            />

           {AddOfficialsModal && <AddOfficials setAddOfficialsModal={setAddOfficialsModal}/>}
        </div>

    </AdminDashboard>
  )
}

export default Officials