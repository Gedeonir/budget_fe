import React,{useEffect, useState} from 'react'
import { AiFillDelete } from "react-icons/ai";
import { TbEditCircle } from "react-icons/tb";
import { MdDomainAdd } from "react-icons/md";
import {AiOutlineLoading3Quarters} from "react-icons/ai"
import { RiAddCircleFill } from "react-icons/ri";
import { IoWallet } from "react-icons/io5";
import { Link } from 'react-router-dom';
import AddExpenses from './AddExpenses';
import getAcademicYears from '../utils/AcademicYears';
import { connect } from 'react-redux';
import { addBudget, getMyBudgets } from '../redux/Actions/BudgetActions';




const BudgetPlanningForm = (props) => {
    const [academicYear,setAcademiYears]=useState(getAcademicYears());
    const [loading,setLoading]=React.useState(false);
    const [openModal,setOpenModal]=useState(false);
    const [expenses, setExpenses] = useState(() => {
        const savedExpenses = localStorage.getItem('expenses');
        return savedExpenses ? JSON.parse(savedExpenses) : [];
    });

    const [total,setTotal]=useState(0)    

    const getTotalBudget=()=>{
        setTotal(expenses.reduce((sum,item)=>parseInt(sum + item.amountToSpent,10),0))
    }

    function recalculatePercentages(expenses) {
        const totalAmount = expenses.reduce((total, obj) => total + obj.amountToSpent, 0);
      
        expenses.forEach(obj => {
          obj.percentage = ((obj.amountToSpent / totalAmount) * 100).toFixed(6);
        });
    }
    
    useEffect(()=>{
        getTotalBudget();
        localStorage.setItem('expenses', JSON.stringify(expenses));
        if (expenses.length !==0) {
            recalculatePercentages(expenses);
        }
        props.getMyBudgets();
    },[expenses])
    
    const deleteExpense = (indexToDelete) => {
        const updatedExpenses = expenses.filter((_, index) => index !== indexToDelete);
        setExpenses(updatedExpenses);
    };

    const [fyi,setFyi]=useState([]);

    const handleAddFyi=(value)=>{
        if(fyi.includes(value)){
            const updatedFyi=fyi.filter(item=>item !== value);
            setFyi(updatedFyi);
        }else
            setFyi((prev)=>[...prev,value]);
    }

    const [formData,setFormData]=useState({
        "accept":false,
        "confirm":false,
        description:""
    })

    const [error,setError]=useState({
        errorType:"",
        errorMsg:""
    }); 
    
    const handleAddBudget=()=>{
        if (fyi.length ===0) {
            setError({
                ...error,
                errorType:"fyi",
                errorMsg:"Financial year is required",
            })
        }if(expenses.length ===0) {
            setError({
                ...error,
                errorType:"expenses",
                errorMsg:"Add at least one expense",
            })
        } if(!formData.accept) {
            setError({
                ...error,
                errorType:"accept",
                errorMsg:"Please accept Terms and condition",
            })
        } if(!formData.confirm) {
            setError({
                ...error,
                errorType:"confirm",
                errorMsg:"Please confirm creating budget",
            })
        }if(!formData.description) {
            setError({
                ...error,
                errorType:"description",
                errorMsg:"Description is required",
            })
        }else {
            try {
                fyi.map(item=>{
                    const data={
                        expenses:expenses,
                        amount:total,
                        fyi:item,
                        institution:props.userData?.getProfile?.institution?._id,
                        description:formData.description,
                        user:props.userData?.getProfile?._id
                    }
                    props.addBudget(data);
                    localStorage.setItem('expenses',[]);
                })  
            } catch (error) {
                console.log(error);
            } 
        }
    }  

    
    
    const fyiItems = props?.data?.budgets?.resp?.data?.map(obj => obj.fyi);

    const filteredFyi = academicYear?.filter(year => !fyiItems?.includes(year));

  return (
    <div>
        <div className='py-4 sticky top-12 z-10 bg-primary  text-text_primary w-full overflow-x-hidden'>
            <div className='lg:flex justify-between items-center'>
                <div className='flex justify-start gap-4 font-bold w-full'>
                    <p>Budget planning</p>
                </div>

                <div className='flex lg:justify-end gap-4 items-center text-secondary w-full'>
                    <div className='flex justify-start gap-2'>
                        <label className='font-bold'>Total Budget:</label>
                        <p>{total} RF</p>
                    </div>

                    <Link to={"/my-budgets"} className='group flex justify-start items-center gap-2 cursor-pointer'>
                        <div className='group-hover:bg-list_hover p-2 w-8 h-8 rounded-full border flex items-center justify-center text-primary2 bg-secondary  duration-200 delay-100'>
                            <IoWallet size={30}/>
                        </div>
                        <label className='group-hover:text-list_hover text-secondary cursor-pointer'>My budgets</label>  
                    </Link>
                    
                </div>
            </div>
            <label className='text-success text-sm' >{props?.data?.addBudget?.success && 'Budget saved successfully'}</label>
            <label className='text-red text-sm' >{props?.data?.addBudget?.error && props?.data?.addBudget?.error?.message}</label>

        </div>
 
        <div className='text-text_primary text-justify py-4 mb-4'>
            <p>At <span className='font-bold'>{props?.userData?.getProfile?.institution?.institutionName}</span>, we are committed to ensuring the effective allocation and management of resources to support the delivery of high quality  services and promote the well-being of our citizens. This budget planning page serves as a transparent and informative 
            resource, providing insight into how  funds are allocated, priorities are set, and performance is measured</p>
        </div>

        <div className=''>
            <section className={`relative py-4 px-4 mb-4 bg-primary2 shadow-lg rounded-lg ${error.errorType ==='description' && 'border border-[#FBA801]'}`}>
                <div className='w-full text-text_primary'>
                    <h1 className='py-2 font-bold'>Description</h1>
                    
                    {error.errorType ==='description' && <label className={`text-[#FBA801] text-xs`}>{error.errorMsg}</label>}
                    <textarea rows={5} value={formData.description} className="text-text_primary outline-primary block w-full px-4 py-2 border-2 border-text_primary rounded-lg border-opacity-40 placeholder-text_primary" placeholder="Budget description" required
                    onChange={(e)=>setFormData({...formData,description:e.target.value})}></textarea>
                </div>
            </section>
            <section className={`relative py-4 px-4 mb-4 bg-primary2 shadow-lg rounded-lg ${error.errorType ==='fyi' && 'border border-[#FBA801]'}`}>
                <div className='font-bold text-text_primary py-2 lg:flex justify-between items-start'>
                    <h1>Financial Year<span className='text-sm font-normal'>(Select all that apply)</span></h1>
                    {error.errorType ==='fyi' && <label className={`text-[#FBA801] text-xs`}>{error.errorMsg}</label>}
                </div>

                <div className='flex text-sm flex-wrap gap-4 w-full py-2 h-56 overflow-y-auto'>
                    {filteredFyi.map((item,index)=>(
                        <div key={index} 
                        className={`${fyi.includes(item)?'bg-secondary text-primary2':'text-text_primary'} hover:text-primary2 hover:bg-secondary duration-500 delay-100 cursor-pointer py-1 text-center  px-2 rounded-md border border-primary`}
                        onClick={()=>handleAddFyi(item)}>
                            {item}
                        </div>
                    ))}

                </div>
            </section>
            <section className={`relative py-4 px-4 bg-primary2 shadow-lg rounded-lg ${error.errorType ==='expense' && 'border border-[#FBA801]'}`}>

                <div className='font-bold text-text_primary py-2 flex justify-between items-start'>
                    <h1>Budget percentage allocated to each expenditure</h1>
                    <div className='p-2 bg-secondary rounded-lg text-primary2 text-center cursor-pointer hover:opacity-50 duration-200 delay-100' onClick={()=>setOpenModal(!openModal)}>
                        <p><MdDomainAdd size={10}/></p>
                    </div>
                </div>
                {error.errorType ==='expense' && <label className={`text-[#FBA801] text-xs`}>{error.errorMsg}</label>}

                <div className='max-h-72 overflow-y-auto'>
                    <table border={10} cellSpacing={0} cellPadding={10} className='mb-8 lg:text-lg text-xs w-full py-2 text-text_primary text-left'>
                        <thead className='font-bold lg:text-lg text-sm'>
                            <tr>
                                <th className='w-2'>#</th>
                                <th>Expense Category</th>
                                <th>Planned Amount</th>
                                <th>Percentage (%)</th>
                            </tr>
                        </thead>
                        <tbody>
                        {expenses.length ===0? <tr><td colSpan={4} className='text-center py-4 text-xs'>No data Found</td></tr>
                        :
                        (expenses.map((item,index)=>(
                            <tr key={index} className='relative group cursor-pointer lg:text-lg text-xs'>
                                <td className='w-2'>{index+1}</td>
                                <td>{item.expense}</td>
                                <td>{item.amountToSpent}</td>
                                <td>
                                    {item.percentage}%
                                    <div className='absolute top-0 right-0 z-10 w-2/5 px-2 py-2 justify-end items-end bg-gradient-to-l from-primary to-transparent text-text_primary hidden group-hover:flex gap-4'>
                                        <AiFillDelete size={20} className='hover:text-list_hover duration-200 delay-100' aria-placeholder='delete' onClick={()=>deleteExpense(index)}/>
                                    </div>
                                </td>

                                
                            </tr>
                        )))}
                        
                        </tbody>
                    </table>    
                </div>

                <div>
                    {error.errorType ==='accept' && <label className={`text-[#FBA801] text-xs`}>{error.errorMsg}</label>}
                    <div className='flex justify-start gap-2 items-start mb-2'>
                        <input onChange={()=>setFormData({...formData,accept:!formData.accept})} value={formData.accept} required type='checkbox' name='accept' 
                        className={`text-text_secondary rounded-lg px-4 my-1 border  placeholder-text_primary cursor-pointer`}/>
                        <label className='text-text_primary text-sm'>
                            I read and accept <Link to={"#"} className="text-secondary cursor-pointer delay-100 duration-500 hover:text-list_hover">Terms and Conditions</Link> 
                        </label>

                    </div>
                    
                    {error.errorType ==='confirm' && <label className={`text-[#FBA801] text-xs`}>{error.errorMsg}</label>}
                    <div className='flex justify-start gap-2 items-start'>
                        <input onChange={()=>setFormData({...formData,confirm:!formData.confirm})} value={formData.confirm} required type='checkbox' name='confirm' className="text-text_secondary rounded-lg outline-primary px-4 my-1 border border-text_primary border-opacity-40 placeholder-text_primary cursor-pointer"/>
                        <label className='text-text_primary text-sm'>
                            I certify that the information provided above is accurate and complete to the best of my knowledge. 
                            I understand that providing false or misleading information may result in consequences as specified by the <Link to={"#"} className="text-secondary cursor-pointer delay-100 duration-500 hover:text-list_hover">Terms and Conditions</Link> of this form. 
                            By checking this box, I acknowledge that this serves as my electronic signature.
                        </label>

                    </div>
                </div>
                {openModal && <AddExpenses recalculatePercentages={recalculatePercentages} expenses={expenses} total={total} setOpenModal={setOpenModal} setExpenses={setExpenses}/>}
                
            </section>
        </div>
       
        <div className='flex justify-start gap-4 lg:w-1/5 w-full'>
            <button type='reset' size="sm" className=' my-4 text-xs text-text_primary w-full border-2 border-text_primary border-opacity-40 font-bold p-2'>Save as Draft</button>
            <button
            onClick={()=>handleAddBudget()}
            type='submit' size='sm' className={`my-4 text-xs bg-secondary text-center text-primary font-bold p-2 w-full ${props?.data?.addBudget?.loading? 'cursor-not-allowed ':'cursor-pointer'}`} disabled={props?.data?.addBudget?.loading? true : false}>
                {props?.data?.addBudget?.loading?<p className="flex justify-center gap-2"><AiOutlineLoading3Quarters size={20} className="animate-spin h-5 w-5"/><span> Saving Budget</span></p>:'Save'}
            </button>
        </div>
    </div>
  )
}
const mapState=(data)=>({
    data:data
})
export default connect(mapState,{addBudget,getMyBudgets})(BudgetPlanningForm)