import React,{useState,useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';
import Layout from '../../components/Layout';
import { connect } from 'react-redux';
import { getMyBudgets, newRequest } from '../../redux/Actions/BudgetActions';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';


const NewRequest = (props) => {
    const [userData,setUserData]=useState([]);
    const location=useLocation();
    const [searchWord,setSearchWord]=useState("");
    const [reload,setReload]=useState(false)

    const myBudgetData=props?.data?.budgets;
    const navigate=useNavigate();
    
    useEffect(()=>{
        props.getMyBudgets()

        if (props?.data?.newRequest?.success) {
            navigate(`/budget/requests/${props?.data?.newRequest?.resp?.data?.budget}`)
        }
    },[props?.data?.newRequest?.success])

    const filteredBudget=()=>{
        return myBudgetData?.resp?.data?.filter((item)=>item.institution.institutionName.toLowerCase().includes(userData?.getProfile?.institution?.institutionName.toLowerCase()));
    }

    const [formData,setFormData]=useState({
        budget:"",
        description:""
    })

    
    const handleChange=(e)=>{
        const { name, value } = e.target;
        setFormData(formData=>({
            ...formData,
            [name]:value
        }));
    }

    const handleRequest=(e)=>{
        e.preventDefault()
        props.newRequest(formData);

    }    

    
    

  return (
    <Layout setUserData={setUserData}>
        <div className='py-4 font-bold text-text_primary text-sm flex justify-start gap-4'>
            <Link to={"/my-budgets"} className={`${location.pathname.includes("my-budgets") && 'text-secondary border-b-2 pb-2'}`}>My budgets</Link>
            <Link to={"/budget/requests"} className={`${location.pathname.includes("requests") && 'text-secondary border-b-2 pb-2'}`}>Requests</Link>
        </div>
        
        <label className='text-red text-sm' >{props?.data?.newRequest?.error && 'Sending Request failed'}</label>
        
        <form onSubmit={(e)=>handleRequest(e)} method='POST' className='relative w-full gap-2 bg-primary2 text-text_primary shadow-lg rounded-lg lg:px-8 px-2 py-2 max-h-screen h-full'>
            <div className='relative mb-4'>
                <label>Budget</label>
                <select onChange={handleChange} name='budget' className='py-2 border w-full px-4 text-text_primary rounded-lg border-text_primary border-opacity-40' required>
                    <option value={""}>--Select Budget--</option>
                    {myBudgetData.success && filteredBudget().map((item,index)=>(
                        <option key={index} value={item._id}>FYI {item.fyi} Budget</option>
                    ))}
                </select>
            </div>

            <div className='w-full mb-4'>
                <label>Request description</label>
                <textarea onChange={handleChange} value={formData.description} rows={5} name='description' className="text-text_secondary outline-primary block w-full px-4 py-2 border-2 border-text_primary rounded-lg border-opacity-40 placeholder-text_primary" placeholder="Budget request description" required></textarea>
            </div>
            
            <div className='lg:w-1/5 w-full'>
                <button type="submit" className={`my-4 text-xs bg-secondary text-center text-primary font-bold p-2 w-3/5${props?.data?.newRequest?.loading? 'cursor-not-allowed ':'cursor-pointer'}`} disabled={props?.data?.newRequest?.loading? true : false}>
                    {props?.data?.newRequest?.loading?<p className="flex justify-center gap-2"><AiOutlineLoading3Quarters size={20} className="animate-spin h-5 w-5"/></p>:'Create request'}
                </button>    
            </div>
            
        </form>
    </Layout>
  )
}

const mapState=(data)=>({
    data:data
})

export default connect(mapState,{getMyBudgets,newRequest})(NewRequest)