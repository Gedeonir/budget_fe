import React, { useEffect, useState } from 'react'
import { getBudget } from '../redux/Actions/BudgetActions'
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from './Loading';
import Error from './Error';
import { AiFillDelete } from "react-icons/ai";
import { TbEditCircle } from "react-icons/tb";
import { MdDomainAdd } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { RiAddCircleFill } from "react-icons/ri";
import { IoWallet } from "react-icons/io5";
import { Link } from 'react-router-dom';



const ViewBudget = (props) => {

    const params = useParams();
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({
        "accept": false,
        "confirm": false,
        description: ""
    })

    const [error, setError] = useState({
        errorType: "",
        errorMsg: ""
    });


    useEffect(() => {
        props.getBudget(params.id);
    }, [])

    console.log(props?.data?.oneBudget);



    return (
        <div>
            {props?.data?.oneBudget?.loading ? (
                <div className='w-full min-h-screen flex justify-center items-center'>
                    <Loading />
                </div>
            )
                :
                (
                    props?.data?.oneBudget?.success ? (
                        <>
                            <div className='py-2 sticky top-12 z-10 bg-primary  text-text_primary w-full overflow-x-hidden lg:text-sm text-xs'>
                                <div className='lg:flex justify-between items-center'>
                                    <div className='flex justify-start gap-4 font-bold w-full'>
                                        <p>FYI {props?.data?.oneBudget?.resp?.data?.fyi} Budget</p>
                                        <label className={`${props?.data?.oneBudget?.resp?.data?.status.toLowerCase() === "approved" ? "text-success" : props?.data?.oneBudget?.resp?.data?.status.toLowerCase() === "rejected" ? "text-red" : props?.data?.oneBudget?.resp?.data?.status.toLowerCase() === "under review" ? "text-[#FBA801]" : "text-text_primary"} opacity-50 text-[10px] flex justify-start gap-1 items-center p-1`}>
                                            <span className={`w-1 h-1 rounded-full ${props?.data?.oneBudget?.resp?.data?.status.toLowerCase() === "approved" ? "bg-success" : props?.data?.oneBudget?.resp?.data?.status.toLowerCase() === "rejected" ? "bg-red" : props?.data?.oneBudget?.resp?.data?.status.toLowerCase() === "under review" ? "bg-[#FBA801]" : "bg-text_primary"} opacity-50`} />
                                            <label>{props?.data?.oneBudget?.resp?.data?.status}</label>
                                        </label>
                                    </div>

                                    <div className='flex lg:justify-end gap-4 items-center text-secondary w-full'>
                                        <div className='flex justify-start gap-2'>
                                            <label className='font-bold'>Total Budget:</label>
                                            <p>{props?.data?.oneBudget?.resp?.data?.amount}$</p>
                                        </div>
                                        {!location.pathname.toLowerCase()?.includes("dashboard") &&
                                            <Link to={"/my-budgets"} className='group flex justify-start items-center gap-2 cursor-pointer'>
                                                <div className='group-hover:bg-list_hover p-2 w-8 h-8 rounded-full border flex items-center justify-center text-primary2 bg-secondary  duration-200 delay-100'>
                                                    <IoWallet size={30} />
                                                </div>
                                                <label className='group-hover:text-list_hover text-secondary cursor-pointer'>My budgets</label>
                                            </Link>
                                        }

                                    </div>
                                </div>
                            </div>



                            <div className=''>
                                <section className={`relative py-2 px-4 mb-4 bg-primary2 shadow-lg rounded-lg`}>
                                    <div className='w-full text-text_primary text-sm'>
                                        <h1 className='py-2 font-bold'>Budget Owner</h1>
                                        <p className='text-sm'>{props?.data?.oneBudget?.resp?.data?.institution?.institutionName}</p>
                                    </div>
                                </section>
                                <section className={`relative py-2 px-4 mb-4 bg-primary2 shadow-lg rounded-lg`}>
                                    <div className='w-full text-text_primary text-sm'>
                                        <h1 className='py-2 font-bold'>Description</h1>
                                        <p className='text-sm'>{props?.data?.oneBudget?.resp?.data?.description}</p>
                                    </div>
                                </section>
                                <section className={`relative py-2 px-4 mb-4 bg-primary2 shadow-lg rounded-lg  text-text_primary `}>
                                    <div className='font-bold py-2 lg:flex justify-between items-start text-sm'>
                                        <h1>Financial Year<span className='text-sm font-normal'>(FYI)</span></h1>
                                    </div>
                                    <label className='text-sm'>{props?.data?.oneBudget?.resp?.data?.fyi}</label>
                                </section>
                                <section className={`relative py-4 px-4 mb-4 bg-primary2 shadow-lg rounded-lg`}>

                                    <div className='font-bold text-text_primary py-2 flex justify-between items-start text-sm'>
                                        <h1>Budget percentage allocated to each expenditure</h1>
                                    </div>
                                    <div className='max-h-72 overflow-y-auto'>
                                        <table border={10} cellSpacing={0} cellPadding={10} className='mb-8 lg:text-sm text-xs w-full py-2 text-text_primary text-left'>
                                            <thead className='font-bold lg:text-sm text-xs'>
                                                <tr>
                                                    <th className='w-2'>#</th>
                                                    <th>Expense Category</th>
                                                    <th>Planned Amount in RF</th>
                                                    <th>Percentage (%)</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {props?.data?.oneBudget?.resp?.data?.expenditures?.length <= 0 ? <tr><td colSpan={4} className='text-center py-4 text-xs'>No data Found</td></tr>
                                                    :
                                                    (props?.data?.oneBudget?.resp?.data?.expenditures?.map((item, index) => (
                                                        <tr key={index} className='relative group cursor-pointer lg:text-sm text-xs'>
                                                            <td className='w-2'>{index + 1}</td>
                                                            <td>{item.expense}</td>
                                                            <td>{item.amountToSpent}</td>
                                                            <td>
                                                                {item.percentage}%
                                                                {/* <div className='absolute top-0 right-0 z-10 w-2/5 px-2 py-2 justify-end items-end bg-gradient-to-l from-primary to-transparent text-text_primary hidden group-hover:flex gap-4'>
                                                    <AiFillDelete size={20} className='hover:text-list_hover duration-200 delay-100' aria-placeholder='delete' onClick={()=>deleteExpense(index)}/>
                                                </div> */}
                                                            </td>


                                                        </tr>
                                                    )))}

                                            </tbody>
                                        </table>
                                    </div>
                                    {!location.pathname.toLowerCase()?.includes("dashboard") &&
                                        <Link to={"/budget/requests"} className='delay-100 duration-200 hover:bg-opacity-70 bg-secondary text-xs text-center text-primary p-2 lg:w-1/5 w-full'>
                                            {props?.data?.oneBudget?.resp?.data?.status.toLowerCase() === 'pending' ? "Send" : "Resend"} budget request
                                        </Link>
                                    }
                                    {/* <div>
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
                            {openModal && <AddExpenses recalculatePercentages={recalculatePercentages} expenses={expenses} total={total} setOpenModal={setOpenModal} setExpenses={setExpenses}/>} */}

                                </section>
                                {location.pathname.toLowerCase()?.includes("dashboard") &&
                                    <section className={`relative py-4 px-4 mb-4 bg-primary2 shadow-lg rounded-lg`}>

                                        <div className='font-bold text-text_primary py-2 flex justify-between items-start text-sm'>
                                            <h1>Projected incomes</h1>
                                        </div>
                                        <div className='max-h-72 overflow-y-auto'>
                                            <table border={10} cellSpacing={0} cellPadding={10} className='mb-8 lg:text-sm text-xs w-full py-2 text-text_primary text-left'>
                                                <thead className='font-bold lg:text-sm text-xs'>
                                                    <tr>
                                                        <th className='w-2'>#</th>
                                                        <th>Income Category</th>
                                                        <th>Planned Amount in RF</th>
                                                        <th>Percentage (%)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {props?.data?.oneBudget?.resp?.data?.expenditures?.length <= 0 ? <tr><td colSpan={4} className='text-center py-4 text-xs'>No data Found</td></tr>
                                                        :
                                                        (props?.data?.oneBudget?.resp?.data?.revenues?.map((item, index) => (
                                                            <tr key={index} className='relative group cursor-pointer lg:text-sm text-xs'>
                                                                <td className='w-2'>{index + 1}</td>
                                                                <td>{item.income}</td>
                                                                <td>{item.amountToCollect}</td>
                                                                <td>
                                                                    {item.percentage}%
                                                                </td>


                                                            </tr>
                                                        )))}

                                                </tbody>
                                            </table>
                                        </div>
                                    </section>
                                }
                            </div>


                        </>
                    )
                        :
                        (
                            <div className='w-full min-h-screen flex justify-center items-center'>
                                <Error code={props?.data?.oneBudget?.error?.code} message={props?.data?.oneBudget?.error?.message} />
                            </div>
                        )
                )

            }


        </div>
    )
}

const mapState = (data) => ({
    data: data
})

export default connect(mapState, { getBudget })(ViewBudget)