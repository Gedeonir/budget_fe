import axios from "axios";
import * as types from './actionTypes';

export const getMyBudgets=()=>async(dispatch)=>{
    try {
        dispatch({
            type:types.GET_ALL_BUDGETS_LOADING
        })

        const res=await axios.get(`${process.env.BACKEND_URL}/budget/`,
            {
                headers:{
                    "Authorization":`Bearer ${sessionStorage.getItem('userToken')}`
                }
            }
        );

        dispatch({
            type:types.GET_ALL_BUDGETS_SUCCESS,payload:res
        });

    } catch (error) {
        dispatch({
            type:types.GET_ALL_BUDGETS_FAIL,payload:error
        });       

    }
}

export const addBudget=(formData)=>async(dispatch)=>{
    try {
        dispatch({
            type:types.ADD_NEW_BUDGET_LOADING
        })

        const res=await axios.post(`${process.env.BACKEND_URL}/budget/new`,formData,
            {
                headers:{
                    "Authorization":`Bearer ${sessionStorage.getItem('userToken')}`
                }
            }
        );

        dispatch({
            type:types.ADD_NEW_BUDGET_SUCCESS,payload:res
        });

    } catch (error) {
        dispatch({
            type:types.ADD_NEW_BUDGET_FAIL,payload:error
        });

        console.log(error);

    }
}

