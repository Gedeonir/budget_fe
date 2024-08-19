import React, { useState,useEffect } from 'react'
import Layout from '../../components/Layout'
import { AiFillDelete } from "react-icons/ai";
import { TbEditCircle } from "react-icons/tb";
import { MdDomainAdd } from "react-icons/md";
import {AiOutlineLoading3Quarters} from "react-icons/ai"
import { RiAddCircleFill } from "react-icons/ri";
import { IoWallet } from "react-icons/io5";
import { Link } from 'react-router-dom';
import AddExpenses from '../../components/AddExpenses';

const expenses=[
    {
        "expenseCategory":"Disease prevention and control",
        "planedBudget":100458099,
        "percentage":"15%"

    },
    {
        "expenseCategory":"Disease prevention and control",
        "planedBudget":100458099,
        "percentage":"15%"

    },
    {
        "expenseCategory":"Disease prevention and control",
        "planedBudget":100458099,
        "percentage":"15%"

    },
    {
        "expenseCategory":"Disease prevention and control",
        "planedBudget":100458099,
        "percentage":"15%"

    },
    
]

const Plan_new_budget = () => {
    const [userData,setUserData]=useState([]);
    const [loading,setLoading]=React.useState(false);
    const [academicYear,setAcademiYears]=useState([]);
    const [openModal,setOpenModal]=useState(false);

    console.log(openModal);
    

    const getAcademicYears=()=>{
        let year = new Date().getFullYear();
        let lastyear = new Date().getFullYear()-1;
        let range = [];
        let lastrange = [];
        let academicYear=[];
        lastrange.push(lastyear);
        range.push(year);
        for (let i = 1; i < 100; i++) 
        {
            lastrange.push(lastyear + i);    
            range.push(year + i);
            academicYear.push(lastrange[i-1]+"-"+(lastrange[i]).toString().slice(-2));
            let fullyear = lastrange.concat(range);
        }
        setAcademiYears(academicYear);
    }

    useEffect(()=>{
        getAcademicYears();
    },[])

    return (
        <Layout setUserData={setUserData}>
            <div className='py-4 sticky top-16 z-10 bg-primary  text-text_primary w-full overflow-x-hidden flex justify-between items-center'>
                <div className='flex justify-start gap-4 font-bold w-full'>
                    <p>Budget planning</p>
                    <label className='p-2 text-[#FBA801] text-xs flex justify-start gap-1 items-center'>
                        <span className='w-2 h-2 rounded-full bg-[#FBA801]'/>
                        <label>Under review</label>
                    </label>
                </div>

                <div className='flex justify-end gap-4 items-center text-secondary w-full'>
                    <form className='justify-start gap-1 flex items-center'>
                        <label className='text-text_primary text-sm'>FYI</label>
                        <select className='border w-24 text-text_primary rounded-lg border-text_primary border-opacity-40'>
                            {academicYear.map((item)=>{
                                return(
                                    <option value={item} key={item}>{item}</option>
                                )
                            })}
                        </select>
                    </form>

                    <div className='flex justify-start gap-2'>
                        <label className='font-bold'>Total Budget:</label>
                        <p>0 $</p>
                    </div>
                    
                </div>
            </div>

            <div className='text-text_primary text-justify py-4 mb-4'>
                <p>At [Organization Name], we are committed to ensuring the effective allocation and management of resources to support the delivery of highquality healthcare services and promote the well-being of our citizens. This budget planning page serves as a transparent and informative 
                resource, providing insight into how healthcare funds are allocated, priorities are set, and performance is measured</p>
            </div>

            <div className='grid grid-cols-4 gap-4'>
                <section className='relative col-span-3 py-4 px-4 bg-primary2 shadow-lg rounded-lg'>

                    <div className='font-bold text-text_primary py-2 flex justify-between items-start'>
                        <h1>Budget percentage allocated to each expenditure</h1>
                        <div className='p-2 bg-secondary rounded-lg text-primary2 text-center cursor-pointer hover:opacity-50 duration-200 delay-100' onClick={()=>setOpenModal(!openModal)}>
                            <p><MdDomainAdd size={10}/></p>
                        </div>
                    </div>

                    <div className='max-h-72 overflow-y-auto'>
                        <table border={10} cellSpacing={0} cellPadding={10} className='my-2 lg:text-lg text-xs w-full py-2 text-text_primary text-left'>
                            <thead className='font-bold text-lg'>
                                <tr>
                                    <th className='w-2'>#</th>
                                    <th>Expense Category</th>
                                    <th>Planned Amount</th>
                                    <th>Percentage (%)</th>
                                </tr>
                            </thead>
                            <tbody>
                            {expenses.map((item,index)=>(
                                <tr key={index} className='relative group cursor-pointer'>
                                    <td className='w-2'>{index+1}</td>
                                    <td>{item.expenseCategory}</td>
                                    <td>{item.planedBudget}</td>
                                    <td>
                                        {item.percentage}
                                        <div className='absolute top-0 right-0 z-10 w-2/5 px-2 py-2 justify-end items-end bg-gradient-to-l from-primary to-transparent text-text_primary hidden group-hover:flex gap-4'>
                                            <TbEditCircle size={20} className='hover:text-list_hover duration-200 delay-100' aria-placeholder='edit'/>
                                            <AiFillDelete size={20} className='hover:text-list_hover duration-200 delay-100' aria-placeholder='delete'/>
                                        </div>
                                    </td>

                                    
                                </tr>
                            ))}
                            
                            </tbody>
                        </table>    
                    </div>

                    <div>
                        <div className='flex justify-start gap-2 items-start mb-2'>
                            <input required type='checkbox' className="text-text_secondary rounded-lg outline-primary px-4 my-1 border border-text_primary border-opacity-40 placeholder-text_primary cursor-pointer"/>
                            <label className='text-text_primary'>
                                I read and accept <Link to={"#"} className="text-secondary cursor-pointer delay-100 duration-500 hover:text-list_hover">Terms and Conditions</Link> 
                            </label>

                        </div>

                        <div className='flex justify-start gap-2 items-start'>
                            <input required type='checkbox' className="text-text_secondary rounded-lg outline-primary px-4 my-1 border border-text_primary border-opacity-40 placeholder-text_primary cursor-pointer"/>
                            <label className='text-text_primary'>
                                I certify that the information provided above is accurate and complete to the best of my knowledge. 
                                I understand that providing false or misleading information may result in consequences as specified by the <Link to={"#"} className="text-secondary cursor-pointer delay-100 duration-500 hover:text-list_hover">Terms and Conditions</Link> of this form. 
                                By checking this box, I acknowledge that this serves as my electronic signature.
                            </label>

                        </div>
                    </div>
                    {openModal && <AddExpenses setOpenModal={setOpenModal}/>}
                    
                </section>

                <section>
                    <div className='relative bg-primary2 rounded-lg shadow-lg overflow-hidden mb-4'>
                        <div className='font-bold text-text_primary py-2 px-4 flex justify-between items-center'>
                            <h1>Contributors</h1>
                            <div className=' text-secondary  duration-200 delay-100 cursor-pointer'>
                                <RiAddCircleFill size={20}/>
                            </div>
                        </div>

                        <div className='py-2 px-4 h-32 overflow-y-auto'>
                            <div className='justify-between items-center flex'>
                                <div className='flex justify-start gap-2 items-center'>
                                    <div className='w-8 h-8 bg-primary rounded-full'>

                                    </div>
                                    <div className='text-xs text-text_primary'>
                                        <p>Contributor 1</p>
                                    </div>
                                </div>

                                <div className='text-xs text-red'>
                                    <button type="submit" className='delay-100 duration-500 hover:text-list_hover'>Remove</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='relative bg-primary2 rounded-lg shadow-lg overflow-hidden mb-4'>
                        <div className='font-bold text-text_primary py-2 px-4 flex justify-between items-center'>
                            <h1>Reviewers</h1>
                            <div className='p-2 text-secondary  duration-200 delay-100 cursor-pointer'>
                                <RiAddCircleFill size={20}/>
                            </div>
                        </div>

                        <div className='py-2 px-4 h-32 overflow-y-auto'>
                            <div className='justify-between items-center flex'>
                                <div className='flex justify-start gap-2 items-center'>
                                    <div className='w-8 h-8 bg-primary rounded-full'>

                                    </div>
                                    <div className='text-xs text-text_primary'>
                                        <p>Reviewer 1</p>
                                    </div>
                                </div>

                                <div className='text-xs text-red'>
                                    <button type="submit" className='delay-100 duration-500 hover:text-list_hover'>Remove</button>
                                </div>
                            </div>
                            
                        </div>
                    </div>

                    <div className='group flex justify-start items-center gap-2 bg-primary2 shadow-lg rounded-lg py-4 px-4 cursor-pointer'>
                        <div className='group-hover:bg-list_hover p-2 w-8 h-8 rounded-full border flex items-center justify-center text-primary2 bg-secondary  duration-200 delay-100'>
                            <IoWallet size={30}/>
                        </div>
                        <label className='text-xs group-hover:text-list_hover text-secondary cursor-pointer'>My budgets</label>  
                    </div>
                </section>
            </div>
            <div className='flex justify-start gap-4 w-1/5'>
                <button type='reset' size="sm" className=' my-4 text-xs text-text_primary w-full border-2 border-text_primary border-opacity-40 font-bold p-2'>Save as Draft</button>
                <button type='submit' size='sm' className={`my-4 text-xs bg-secondary text-center text-primary font-bold p-2 w-full ${loading? 'cursor-not-allowed ':'cursor-pointer'}`} disabled={loading? true : false}>
                    {loading?<p className="flex justify-center gap-2"><AiOutlineLoading3Quarters size={20} className="animate-spin h-5 w-5"/><span> Saving Budget</span></p>:'Save'}
                </button>
            </div>
        </Layout>
    )
}

export default Plan_new_budget