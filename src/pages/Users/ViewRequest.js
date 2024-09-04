import React, { useEffect,useState } from 'react'
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom'
import { addReviewer, getRequest, removeReviewer } from '../../redux/Actions/BudgetActions';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import { RiAddCircleFill } from "react-icons/ri";
import { IoSearchOutline } from 'react-icons/io5';
import { getAllUsers } from '../../redux/Actions/usersAction';
import NoDataFound from '../../components/NoDataFound';

const ViewRequest = (props) => {
    const params=useParams();

    const Request=props?.data?.oneRequest;

    const [reload,setReload]=useState(false);

    useEffect(()=>{
        props.getRequest(params.id);
        props.getAllUsers();
    },[reload])
    const [userData,setUserData]=useState([]);
    const [section,setSection]=useState("");
    const [searchWord,setSearchWord]=useState("");
    const users=props?.data?.users;


    const filteredUsers=()=>{
        return users?.resp?.data?.getUsers?.filter((item)=>item.fullNames.toLowerCase().includes(searchWord.toLowerCase()) && item.email.toLowerCase() !== userData?.getProfile?.email.toLowerCase());
    }


    const handleAddReviewer=(reviewers)=>{
        if(props.addReviewer(params?.id,{reviewers:[{user:reviewers}]})){
            setReload(true);
            props.getRequest(params.id);
        }
  
    }
    
    const handleRemoveReviewer=(reviewers)=>{
        console.log(reviewers);
        
        if(props.removeReviewer(params?.id,{reviewers:{user:reviewers}})){
            setReload(true);
            props.getRequest(params.id)
        }
  
    } 
        

  return (
    <Layout setUserData={setUserData}>
        {Request?.loading?(
            <Loading/>
        ):(
            Request?.success?(
                <>
                    <div className='text-text_primary w-full mb-4'>
                        <h1 className='font-bold py-2'>FYI {Request?.resp?.data?.budget.fyi} Budget</h1>
                        <div className='flex items-center justify-start gap-2'>
                            <label className={`${Request?.resp?.data?.status ==='approved'?'bg-success':Request?.resp?.data?.status === 'rejected'?'bg-red':'bg-[#FBA801]'} text-primary2 font-bold px-1 text-xs py-2 rounded-lg`}>{Request?.resp?.data?.status}</label>
                            <p className='text-xs text-text_primary font-light'>{Request?.resp?.data?.budget.institution.institutionName} requested to approve budget</p>
                        </div>
                    </div>

                    <div className=''>
                        <ul className='list-none flex justify-start -mx-6 w-full font-semibold text-sm'>
                            <li onClick={()=>setSection("")} className={`${section.toLowerCase()==""?'text-secondary bg-primary2':'text-text_primary'} px-2 py-2 cursor-pointer hover:text-secondary transition-all duration-300 delay-100`}>Comments</li>
                            <li onClick={()=>setSection("pending")} className={`${section.toLowerCase()=="pending"?'text-secondary bg-primary2':'text-text_primary'} px-2 py-2 cursor-pointer hover:text-secondary transition-all duration-300 delay-100`}>Budget</li>
                        </ul>
                    </div>

                    <section className={`grid ${section.toLowerCase()=="" &&'lg:grid-cols-5'} gap-2 w-full items-start`}>

                        <div className='lg:col-span-4 w-full gap-2 bg-primary2 shadow-lg rounded-lg px-2 py-2 max-h-screen h-full'>
                            {section.toLowerCase()==""?(
                                <div className='justify-start items-start gap-4 text-text_primary flex'>
                                    <div className={`lg:h-12 h-8 delay-100 duration-200 cursor-pointer px-2 rounded-full lg:w-12 w-8 bg-[url(https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png)] bg-cover bg-center bg-no-repeat`}/>
                                    <form method='POST' className='w-full'>
                                        <div className='w-full'>
                                            <label>Add comment</label>
                                            <textarea rows={5} className="text-text_secondary outline-primary block w-full px-4 py-2 border-2 border-text_primary rounded-lg border-opacity-40 placeholder-text_primary" placeholder="Comment" required></textarea>
                                        </div>

                                        <div className='w-full flex justify-start items-center gap-2'>
                                            <button type="submit" className={`my-4 text-xs bg-secondary text-center text-primary font-bold p-2 ${props?.data?.newRequest?.loading? 'cursor-not-allowed ':'cursor-pointer'}`} disabled={props?.data?.newRequest?.loading? true : false}>
                                                {props?.data?.newRequest?.loading?<p className="flex justify-center gap-2"><AiOutlineLoading3Quarters size={20} className="animate-spin h-5 w-5"/></p>:'Cancel Request'}
                                            </button>

                                            <button type="submit" className={`my-4 text-xs bg-primary text-center text-text_primary font-bold p-2 ${props?.data?.newRequest?.loading? 'cursor-not-allowed ':'cursor-pointer'}`} disabled={props?.data?.newRequest?.loading? true : false}>
                                                {props?.data?.newRequest?.loading?<p className="flex justify-center gap-2"><AiOutlineLoading3Quarters size={20} className="animate-spin h-5 w-5"/></p>:'Comment'}
                                            </button>
                                        </div>
                                        
                                    </form>
                                </div> 
                            )
                            :
                            (
                                <div className='text-text_primary text-sm px-2'>
                                    <div className='lg:flex justify-between items-center mb-2'>
                                        <div className='w-full'>
                                            <p className='font-bold'>FYI {Request?.resp?.data?.budget.fyi} Budget</p>
                                            <label className='py-2 text-text_primary text-xs font-light'>
                                                {Request?.resp?.data?.budget.institution?.institutionName}
                                            </label>
                                        </div>

                                        <div className='flex justify-end gap-2 w-full'>
                                            <label className='font-bold'>Total Budget:</label>
                                            <p>{Request?.resp?.data?.budget.amount} $</p>
                                        </div>
                                            
                                    </div>

                                    <div className='w-full text-text_primary'>
                                        <h1 className='py-2 font-bold'>Description</h1>
                                        <p>{Request?.resp?.data?.budget.description}</p>
                                    </div>

                                    <div className=' text-text_primary py-2'>
                                        <h1 className='font-bold'>Budget percentage allocated to each expenditure</h1>

                                        <div className='max-h-72 overflow-y-auto'>
                                            <table border={10} cellSpacing={0} cellPadding={10} className='mb-8  w-full py-2 text-text_primary text-left'>
                                                <thead className='font-bold text-sm'>
                                                    <tr>
                                                        <th className='w-2'>#</th>
                                                        <th>Expense Category</th>
                                                        <th>Planned Amount in USD</th>
                                                        <th>Percentage (%)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {Request?.resp?.data?.budget?.expenditures?.length ===0? <tr><td colSpan={4} className='text-center py-4 text-xs'>No data Found</td></tr>
                                                :
                                                (Request?.resp?.data?.budget?.expenditures?.map((item,index)=>(
                                                    <tr key={index} className='relative group cursor-pointer text-xs'>
                                                        <td className='w-2'>{index+1}</td>
                                                        <td>{item.expense}</td>
                                                        <td>{item.amountToSpent}</td>
                                                        <td>{item.percentage} %</td>                                                          
                                                    </tr>
                                                )))}
                                                
                                                </tbody>
                                            </table>    
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                        </div>
                        {section.toLowerCase()=="" &&
                            <div className='relative overflow-hidden mb-4 rounded-lg bg-primary2 w-full py-4'>
                                <div className=' text-text_primary px-2 flex justify-between items-center mb-2'>
                                    <h1 className='text-sm font-bold'>Reviewers</h1>
                                    <div className='group text-secondary  duration-200 delay-100 cursor-pointer'>
                                        <RiAddCircleFill size={20}/>

                                        <div className='group-hover:block hidden absolute top-6 w-11/12 right-2 rounded-lg shadow-lg py-4 text-sm bg-primary2 px-2'>
                                            <div className='relative w-full mb-2'>
                                                <input type='search' placeholder='Search' className='py-1 px-2 border-2 outline-none border-primary w-full rounded-lg placeholder:text-text_primary placeholder:text-opacity-50' onChange={(e)=>setSearchWord(e.target.value)}/>
                                                {!searchWord && <IoSearchOutline size={20} className='cursor-pointer font-normal text-text_primary hover:text-list_hover delay-100 duration-500 absolute right-2 top-2'/>}
                                            </div>

                                            {users?.loading?(
                                                <Loading/>
                                            )
                                            :
                                            (users?.success?(
                                                filteredUsers().length <=0?(
                                                    <NoDataFound/>
                                                )
                                                :
                                                (
                                                    <ul className='list-none -ml-4'>
                                                    {filteredUsers().map((item,index)=>(
                                                        
                                                        <li className={`flex items-center justify-start gap-2 relative mb-2 py-2 duration-500 delay-100 cursor-pointer text-text_primary font-light hover:text-secondary text-xs`} key={index}
                                                        onClick={()=>handleAddReviewer(item._id)}
                                                        >
                                                            <div className={`h-4 delay-100 duration-200 cursor-pointer px-2 rounded-full w-4 bg-[url(https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png)] bg-cover bg-center bg-no-repeat`}/>
                                                            <p>{item.fullNames}</p>
                                                            {/* {props.formData === item.institutionName && <TiTick/>} */}
                                                        </li>
                                                    ))}
                                                    </ul>
                                                )
                                            )
                                            :
                                            (
                                                <Error code={users?.error?.code} message={users?.error?.message}/>
                                            )
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className='py-2 px-2 h-32 overflow-y-auto'>
                                    {Request?.resp?.data?.reviewers.length ===0?(
                                        <p className='text-xs font-light text-center text-text_primary'>No reviewer added yet</p>
                                    ):(
                                        Request?.resp?.data?.reviewers?.map((item,index)=>(
                                            <div key={index} className='justify-between items-center flex mb-2'>
                                                <div className='flex justify-start gap-2 items-start'>
                                                    <div className={`h-4 delay-100 duration-200 cursor-pointer rounded-full w-4 bg-[url(https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png)] bg-cover bg-center bg-no-repeat`}/>
                                                    
                                                    <div className='text-xs text-text_primary'>
                                                        <p>{item.user?.fullNames}</p>
                                                    </div>  
                                                </div>

                                                <div className='text-xs text-red'>
                                                    <button type="submit" className='delay-100 duration-500 hover:text-list_hover' onClick={()=>handleRemoveReviewer(item.user._id)}>Remove</button>
                                                </div>
                                            </div>
                                        ))
                                        
                                    )}
                                    
                                </div>
                            </div>
                        }

                    </section>
                </> 
            )
            :
            (
                <Error code={Request?.error?.code} message={Request?.error?.message}/>
            )
            
        )} 
    </Layout>

  )
}

const mapState=(data)=>({data:data})

export default connect(mapState,{getRequest,getAllUsers,addReviewer,removeReviewer}) (ViewRequest)