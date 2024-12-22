import React, { useState } from 'react'

export const categories = ["Health human resources",
    "Maternal and Child Health",
    "Health sector planning ang information",
    "Financial and geographical accessibility",
    "Specialized health services",
    "Disease prevention and Control "];

const AddExpenses = ({ setOpenModal, setExpenses, total,totalincome, expenses,incomes, categories,userData,setRevenues,categorytype }) => {
    const [loading, setLoading] = React.useState(false);

    const [formData, setFormData] = useState({
        expense: "",
        amountToSpent: 0,
        percentage: ""
    })

    const [incomeData,setIncomeData]=useState({
        income:"",
        amountToCollect:"",
        percentage:""
    })


    const handleChange = (e) => {
        const { name, value } = e.target;
        categorytype?.toLowerCase() === "expense"?(
            setFormData(formData => ({
                ...formData,
                [name]: value
            }))
        )
        :
        (
            setIncomeData(formData => ({
                ...formData,
                [name]: value
            }))
        )
    }

    const handleAddExpense = () => {
        if (!formData.expense || !formData.amountToSpent) {
            alert("All fields are required");
        } else {
            const amount = total + parseInt(formData.amountToSpent, 10);
            const percentage = Math.floor((formData.amountToSpent / amount) * 100);
            const values = {
                expense: formData.expense,
                amountToSpent: parseInt(formData.amountToSpent, 10),
                percentage: percentage
            }

            setExpenses((prev) => [...prev, values]);
            setOpenModal(false)
        }
    }

    const handleAddIncome=() => {
        if (!incomeData.income || !incomeData.amountToCollect) {
            alert("All fields are required");
        } else {
            const amount = totalincome + parseInt(incomeData.amountToCollect, 10);
            const percentage = Math.floor((incomeData.amountToCollect / amount) * 100);
            const values = {
                income: incomeData.income,
                amountToCollect: parseInt(incomeData.amountToCollect, 10),
                percentage: percentage
            }

            setRevenues((prev) => [...prev, values]);
            setOpenModal(false)
        }
    }

    const expenseItems = categorytype?.toLowerCase()==='expense'?expenses?.map(obj => obj.expense):incomes?.map(obj => obj.income);
    
    

    const myFilteredCategories = () => {
        return categories?.resp?.data?.filter((item) => item?.institution?.institutionName?.toLowerCase().includes(userData?.getProfile?.institution?.institutionName?.toLowerCase()) 
        && item.type.toLowerCase().includes(categorytype?.toLowerCase() === "expense"?"expense":"income"))
    }
    

    const filteredExpenses = myFilteredCategories()?.filter(expense => !expenseItems.includes(expense?.category));
    

    return (
        <div className='w-full absolute left-0 inset-y-0 h-full bg-primary bg-opacity-50 flex lg:items-center lg:justify-center items-center'>
            <div className='relative bg-primary2 shadow-lg rounded-lg lg:w-2/4 w-full lg:px-4 px-2 py-4'>
                <div className="mb-2">
                    <h1 className='grid text-text_primary text-lg mb-2 font-bold'>{categorytype?.toLowerCase() === "expense"?"Add new expense":"Add new Income"}</h1>
                </div>

                <div className='w-full mb-2 text-text_primary'>
                    <label>{categorytype?.toLowerCase() === "expense"?"Expense":"Income"} category</label>
                    <select onChange={handleChange} name={categorytype?.toLowerCase() === "expense"?'expense':'income'} placeholder='Income Category' className='border w-full px-4 py-2 text-text_primary rounded-lg border-text_primary border-opacity-40' required>
                        <option value={""}>--Select Category--</option>
                        {filteredExpenses?.map((item, index) => {
                            return (
                                <option key={index} value={item.category}>{item.category}</option>
                            )
                        })}
                    </select>
                </div>

                <div className='w-full mb-2 text-text_primary'>
                    <label>{categorytype?.toLowerCase() === "expense"?"Amount to spend":"Amount to collect"}</label>
                    <input onChange={handleChange} type="number" name={categorytype?.toLowerCase() === "expense"?'amountToSpent':'amountToCollect'} className="text-text_secondary rounded-lg outline-primary block w-full px-4 py-1 border border-text_primary border-opacity-40 placeholder-text_primary" placeholder="Planned Amount" required />
                </div>

                <div className='flex justify-start gap-4 w-full'>
                    <button type='reset' size="sm" className=' my-4 text-xs text-text_primary w-full border-2 border-text_primary border-opacity-40 font-bold p-2' onClick={() => setOpenModal(false)}>Cancel</button>
                    <button type='submit' size='sm' className={`my-4 text-xs bg-secondary text-center text-primary font-bold p-2 w-full`}
                        onClick={() => categorytype?.toLowerCase() === "expense"?handleAddExpense():handleAddIncome()}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddExpenses