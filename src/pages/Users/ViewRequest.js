import React, { useEffect,useState } from 'react'
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom'
import { addComment, addReviewer, getRequest, removeReviewer, sendReview } from '../../redux/Actions/BudgetActions';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import { RiAddCircleFill } from "react-icons/ri";
import {IoSearchOutline } from 'react-icons/io5';
import { getAllUsers } from '../../redux/Actions/usersAction';
import NoDataFound from '../../components/NoDataFound';
import { IoMdArrowDropdown, IoMdChatboxes, } from "react-icons/io";
import { FaEye } from 'react-icons/fa6';
import { FaEyeSlash } from "react-icons/fa";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineBlock } from "react-icons/md";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const ViewRequest = (props) => {
    const params=useParams();

    const Request=props?.data?.oneRequest;

    const [reload,setReload]=useState(false);

    useEffect(()=>{
        props.getRequest(params.id);
        props.getAllUsers();
    },[])

    const [userData,setUserData]=useState([]);
    const [section,setSection]=useState("");
    const [searchWord,setSearchWord]=useState("");
    const users=props?.data?.users;

    const reviewerIds = Request?.resp?.data?.reviewers?.map(reviewer =>{ return Request?.resp?.data?.reviewers?.length>0?reviewer.user._id:[]});
    const filteredUsers=()=>{
        return users?.resp?.data?.getUsers?.filter((item)=>item.fullNames.toLowerCase().includes(searchWord.toLowerCase()) 
        && item.email.toLowerCase() !== userData?.getProfile?.email.toLowerCase()
        && !reviewerIds.includes(item._id)
    );
    } 

    const [addReviewerModal,setAddReviewerModal]=useState(false);

    const handleAddReviewer=(reviewers)=>{
        try{
            props.addReviewer(params?.id,{reviewers:[{user:reviewers}]})
            props.addComment(params.id,{comment:{
                user:userData?.getProfile?._id,
                message:"",
                category:"reviewer",
                requested:reviewers
            }})

            setAddReviewerModal(false);
            
        }catch(error){
            console.log(error);
        }
  
    }
    
    const handleRemoveReviewer=(reviewers)=>{        
        try{
            props.removeReviewer(params?.id,{reviewers:{user:reviewers}})
            props.addComment(params.id,{comment:{
                user:userData?.getProfile?._id,
                message:"",
                category:"noreviewer",
                requested:reviewers
            }})
            setReload(true);
            props.getRequest(params.id)
        }catch(error){
            console.log(error);
        }
  
    }
    
    const [review,openReview]=useState(false);
    const [message,setMessage]=useState("")

    const handleAddComment=(e)=>{
        e.preventDefault();

        props.addComment(params.id,{comment:{
            user:userData?.getProfile?._id,
            message:message,
            category:"comment",
        }})
    }
    
    const [reviewMsg,setReviewMsg]=useState("");
    const [action,setAction]=useState("")

    const handleChange=(e)=>{
        setAction(e.target.value);
    }

    
    

    const handleSubmitReview=(e)=>{
        e.preventDefault();

        try {

            if (action !=="comment") {
                props.sendReview(params.id,
                    {
                        "reviewerStatus": action.toLowerCase() ==="reject"?"rejected":action ==="approve"?"approved":"request for change"
                    }
                )
            }

            props.addComment(params.id,{
                comment:{
                    user:userData?.getProfile?._id,
                    message:reviewMsg,
                    category:action==="comment"?"comment":action.toLowerCase() ==="reject"?"rejected":action ==="approve"?"approved":"request for change",
                }
            })
            openReview(!review)
        } catch (error) {
            console.log(error)
        }

       
    }

    console.log(Request);
    
    
        

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
                            <label className={`${Request?.resp?.data?.status ==='approved'?'bg-success':Request?.resp?.data?.status === 'rejected'?'bg-red':'bg-secondary'} text-primary2 font-bold px-2 text-xs py-2 rounded-md`}>{Request?.resp?.data?.status}</label>
                            <p className='text-xs text-text_primary font-light'>{Request?.resp?.data?.budget.institution.institutionName} requested to approve budget</p>
                        </div>
                    </div>

                    <div className=''>
                        <ul className='list-none flex justify-start -mx-6 w-full text-sm'>
                            <li onClick={()=>setSection("")} className={`${section.toLowerCase()==""?'text-secondary bg-primary2':'text-text_primary'} px-2 py-2 cursor-pointer hover:text-secondary transition-all duration-300 delay-100`}>Timeline</li>
                            <li onClick={()=>setSection("pending")} className={`${section.toLowerCase()=="pending"?'text-secondary bg-primary2':'text-text_primary'} px-2 py-2 cursor-pointer hover:text-secondary transition-all duration-300 delay-100`}>Budget</li>
                        </ul>
                    </div>

                    <section className={`grid ${section.toLowerCase()=="" &&'lg:grid-cols-5'} gap-2 w-full items-start`}>

                        <div className='lg:col-span-4 w-full gap-2 bg-primary2 shadow-lg rounded-lg px-2 py-2 h-full'>
                            {section.toLowerCase()==""?(
                                <>
                                    <div className='justify-start items-start gap-4 text-text_primary flex mb-4'>
                                        <div className={`h-4 delay-100 duration-200 cursor-pointer px-2 rounded-full w-4 bg-[url(https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png)] bg-cover bg-center bg-no-repeat`}/>

                                        <div className='w-full'>
                                            <div className='w-full border border-primary rounded-b-lg rounded-r-lg mb-4'>
                                                <div className="border-b border-primary py-2 px-2 text-xs rounded-r-lg bg-text_primary bg-opacity-10">
                                                    <label>{Request?.resp?.data?.requestedBy?.fullNames} requested to review budget on {new Date(Request?.resp?.data?.createdAt).toLocaleDateString()}</label>
                                                </div>
                                                <div className='py-4 px-2 text-sm'>
                                                    <p>{Request?.resp?.data?.description}</p>
                                                </div> 
                                            </div>

                                            {Request?.resp?.data?.comment?.map((item,index)=>(
                                                
                                                <div key={index} className='flex items-center justify-start gap-2 py-2'>
                                                    <div className='p-2 w-8 h-8 rounded-full flex items-center justify-center text-text_primary bg-primary  duration-200 delay-100 cursor-pointer'>
                                                        {item.category === "comment"? 
                                                            <IoMdChatboxes size={15}/>
                                                        :
                                                        item.category === "reviewer"? 
                                                            <FaEye size={15}/>
                                                        :
                                                        item.category.toLowerCase() === "request for change"?
                                                            <MdOutlinePublishedWithChanges size={15}/>
                                                        :
                                                        item.category ==="approved"?
                                                            <IoMdCheckmarkCircleOutline size={15}/>
                                                        :
                                                        item.category ==="rejected"?
                                                            <MdOutlineBlock size={15}/>
                                                        :
                                                        <FaEyeSlash size={15}/>}

                                                    </div>

                                                    <div>
                                                        <label className='text-xs'>
                                                            <span className='font-bold mr-2'>{item?.user?.fullNames === userData?.getProfile?.fullNames?'You':item?.user?.fullNames}</span>
                                                            {item.category === "comment"?<span>added comment</span>
                                                            :
                                                            item.category === "reviewer"?<span>requested review from <span className='font-bold'>{item?.requested?.fullNames === userData?.getProfile?.fullNames?'You':item?.requested?.fullNames}</span></span>
                                                            :
                                                            item.category === "noreviewer"?<span>removed <span className='font-bold'>{item?.requested?.fullNames === userData?.getProfile?.fullNames?'You':item?.requested?.fullNames}</span> from reviewers </span>
                                                            :
                                                            item.category.toLowerCase() === "request for change"?<span>requested for changes on this budget</span>
                                                            :item.category ==="approved"?<span>approved this budget</span>
                                                            :
                                                            <span>rejected this budget</span>} on {new Date(item?.createdAt).toLocaleDateString()}
                                                        </label>
                                                        <p className='text-xs'>{item?.message}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className='justify-start items-start gap-4 text-text_primary flex'>
                                        <div className={`h-4 delay-100 duration-200 cursor-pointer px-2 rounded-full w-4 bg-[url(https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png)] bg-cover bg-center bg-no-repeat`}/>
                                        <form method='POST' className='w-full' onSubmit={(e)=>handleAddComment(e)}>
                                            <div className='w-full text-xs'>
                                                <label>Add comment</label>
                                                <textarea rows={5} value={message} onChange={(e)=>setMessage(e.target.value)} className="text-text_secondary outline-primary block w-full px-4 py-2 border-2 border-text_primary rounded-lg border-opacity-40 placeholder-text_primary" placeholder="Comment" required></textarea>
                                            </div>

                                            <div className='w-full flex justify-start items-center gap-2'>
                                                {Request?.resp?.data?.requestedBy?._id === userData?.getProfile?._id && reviewerIds.includes(userData?.getProfile?._id) && (
                                                    <button type="submit" className={`my-4 text-xs bg-secondary text-center text-primary font-bold p-2 ${props?.data?.newRequest?.loading? 'cursor-not-allowed ':'cursor-pointer'}`} disabled={props?.data?.newRequest?.loading? true : false}>
                                                        {props?.data?.newRequest?.loading?<p className="flex justify-center gap-2"><AiOutlineLoading3Quarters size={20} className="animate-spin h-5 w-5"/></p>:'Cancel Request'}
                                                    </button>
                                                )}
                                                

                                                <button type="submit" className={`my-4 text-xs border-2 ${!message && 'opacity-20'} border-text_primary text-center text-text_primary font-bold p-2 ${props?.data?.addComment?.loading || !message? 'cursor-not-allowed ':'cursor-pointer'}`} disabled={props?.data?.addComment?.loading? true : !message?true:false}>
                                                    {props?.data?.addComment?.loading?<p className="flex justify-center gap-2"><AiOutlineLoading3Quarters size={20} className="animate-spin h-5 w-5"/></p>:'Comment'}
                                                </button>
                                            </div>
                                            
                                        </form>
                                    </div>

                                </> 
                            )
                            :
                            (
                                
                                <div className='text-text_primary text-sm px-2'>
                                    <div className='lg:flex justify-between items-center mb-2'>
                                        <div className='w-full mb-2'>
                                            <p className='font-bold'>FYI {Request?.resp?.data?.budget.fyi} Budget</p>
                                            <label className='py-2 text-text_primary text-xs font-light'>
                                                {Request?.resp?.data?.budget.institution?.institutionName}
                                            </label>
                                        </div>

                                        <div className='flex lg:justify-end justify-between items-center gap-2 lg:w-2/5 relative mb-2'>
                                            <div className='flex lg:justify-end justify-start gap-2 w-full'>
                                                <label className='font-bold'>Total Budget:</label>
                                                <p>{Request?.resp?.data?.budget.amount} $</p>
                                            </div>

                                            {Request?.resp?.data?.requestedBy?._id !== userData?.getProfile?._id && reviewerIds.includes(userData?.getProfile?._id) &&
                                                <div className='w-3/4'>
                                                    <button onClick={()=>openReview(!review)} className='text-xs bg-secondary text-center text-primary p-1 flex items-center justify-center gap-2 w-full'>
                                                        Review budget
                                                        <IoMdArrowDropdown size={15}/>
                                                    </button>
                                                    {review && (
                                                        <div className='absolute top-8 right-0 bg-primary rounded-lg shadow-lg w-full py-2 px-4 z-20'>
                                                            <div className='w-full mb-2 py-2'>
                                                                <p className='font-bold'>Submit your review</p>
                                                            </div>
                                                            <form className='w-full' method='POST' onSubmit={(e)=>handleSubmitReview(e)}>

                                                                <div className='w-full text-xs mb-4'>
                                                                    <textarea rows={5}onChange={(e)=>setReviewMsg(e.target.value)} value={reviewMsg}  className="text-text_secondary outline-primary block w-full px-4 py-2 border-2 border-text_primary rounded-lg border-opacity-40 placeholder-text_primary" placeholder="Leave a comment" required></textarea>
                                                                </div>
                                                                <div className='text-xs mb-2 flex justify-start items-start gap-2'>
                                                                    <input onChange={handleChange} type="radio" name="action" value={"comment"} className="text-text_secondary mr-2 rounded-lg outline-primary px-4 my-1 border border-text_primary border-opacity-40 placeholder-text_primary cursor-pointer" checked={action === "comment"?true:false}/>
                                                                    <div>
                                                                        <label className='font-bold'>Comment</label>
                                                                        <p className='text-xs font-light'>Submit feedback and Without approval</p>
                                                                    </div>
                                                                </div>
                                                                <div className='text-xs mb-2 flex justify-start items-start gap-2'>
                                                                    <input onChange={handleChange} type="radio" name="action" value={"approve"} className="text-text_secondary mr-2 rounded-lg outline-primary px-4 my-1 border border-text_primary border-opacity-40 placeholder-text_primary cursor-pointer" checked={action === "approve"?true:false}/>
                                                                    <div>
                                                                        <label className='font-bold'>Approve</label>
                                                                        <p className='text-xs font-light'>Submit feedback and Approve this budget</p>
                                                                    </div>
                                                                </div>
                                                                <div className='text-xs mb-2 flex items-start justify-start gap-2'>
                                                                    <input onChange={handleChange} type="radio" name="action" value={"Request for change"} className="text-text_secondary mr-2 rounded-lg outline-primary px-4 my-1 border border-text_primary border-opacity-40 placeholder-text_primary cursor-pointer" checked={action === "Request for change"?true:false}/>
                                                                    <div>
                                                                        <label className='font-bold'>Request for change</label>
                                                                        <p className='text-xs font-light'>Submit feedback which will be considered before approving</p>
                                                                    </div>
                                                                </div>
                                                                <div className='text-xs mb-2 flex items-start justify-start gap-2'>
                                                                    <input onChange={handleChange} type="radio" name="action" value={"Reject"} className="text-text_secondary mr-2 rounded-lg outline-primary px-4 my-1 border border-text_primary border-opacity-40 placeholder-text_primary cursor-pointer" checked={action === "Reject"?true:false}/>
                                                                    <div>
                                                                        <label className='font-bold'>Reject</label>
                                                                        <p className='text-xs font-light'>Submit feedback and reject this request</p>
                                                                    </div>
                                                                </div>

                                                                <button className={` ${!action? "cursor-not-allowed opacity-40": "cursor-pointer"} text-xs bg-secondary text-center text-primary p-1 flex items-center justify-center gap-2 w-2/4 mt-4`} disabled={!action?true:false}>
                                                                    {props?.data?.sendReview?.loading?<p className="flex justify-center gap-2"><AiOutlineLoading3Quarters size={20} className="animate-spin h-5 w-5"/></p>:'Submit review'}
                                                                </button>
                                                            </form>
                                                        </div>
                                                    )}
                                                </div>
                                            }
                                            
                                        </div>
                                            
                                    </div>

                                    <div className='w-full text-text_primary'>
                                        <h1 className='py-2 font-bold'>Description</h1>
                                        <p>{Request?.resp?.data?.budget.description}</p>
                                    </div>

                                    <div className=' text-text_primary py-2'>
                                        <h1 className='font-bold'>Budget percentage allocated to each expenditure</h1>

                                        <div className='lg:max-h-72 max-h-full overflow-y-auto'>
                                            <table border={10} cellSpacing={0} cellPadding={10} className='mb-8  w-full py-2 text-text_primary text-left'>
                                                <thead className='font-bold lg:text-sm text-xs'>
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

                        {/* Reviewers section */}
                        {section.toLowerCase()=="" &&
                            <div className='relative overflow-hidden mb-4 rounded-lg bg-primary2 w-full py-4'>
                                <div className=' text-text_primary px-2 flex justify-between items-center mb-2'>
                                    <h1 className='text-sm font-bold'>Reviewers</h1>

                                    {Request?.resp?.data?.requestedBy?._id === userData?.getProfile?._id &&
                                    <div className='group text-secondary  duration-200 delay-100'>
                                        <RiAddCircleFill size={20} className='cursor-pointer' onClick={()=>setAddReviewerModal(true)}/>

                                        {addReviewerModal && (
                                       
                                            <div className='absolute top-6 w-11/12 right-2 rounded-lg shadow-lg py-2 text-sm bg-primary2 px-2'>
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
                                                        <ul className='list-none -ml-4 h-32 overflow-y-auto'>
                                                        {filteredUsers().map((item,index)=>(
                                                            
                                                            <li key={index} className={`flex items-center justify-start gap-2 relative mb-2 py-2 duration-500 delay-100 cursor-pointer text-text_primary font-light hover:text-secondary text-xs`}
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
                                                 
                                        )}
                                    </div>
                                    }
                                    
                                </div>
                                

                                <div className='py-2 px-2 h-40 overflow-y-auto'>
                                    {Request?.resp?.data?.reviewers.length ===0?(
                                        <p className='text-xs font-light text-center text-text_primary'>No reviewer added yet</p>
                                    ):(
                                        Request?.resp?.data?.reviewers?.map((item,index)=>(
                                            <div key={index} className='relative flex justify-between gap-2 items-start cursor-pointer hover:text-secondary duration-500 delay-100 text-text_primary' onClick={()=>Request?.resp?.data?.requestedBy?._id === userData?.getProfile?._id && handleRemoveReviewer(item.user._id)}>
                                                <div  className='relative flex justify-start gap-2 items-start'>
                                                    <div className={`h-4 delay-100 duration-200 cursor-pointer rounded-full w-4 bg-[url(https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png)] bg-cover bg-center bg-no-repeat`}/>
                                                    
                                                    <div className='text-xs'>
                                                        <p>{item.user?.fullNames}</p>
                                                    </div>
                                                </div>

                                                {item.reviewerStatus.toLowerCase() === "request for change"?
                                                    <MdOutlinePublishedWithChanges size={15}/>
                                                :
                                                item.reviewerStatus ==="approved"?
                                                    <IoMdCheckmarkCircleOutline size={15}/>
                                                :
                                                    <MdOutlineBlock size={15}/>
                                                }

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

export default connect(mapState,{getRequest,getAllUsers,addReviewer,removeReviewer,addComment,sendReview}) (ViewRequest)