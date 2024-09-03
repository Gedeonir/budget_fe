import axios from "axios";
import * as types from './actionTypes';

export const getRequest=(id)=>async(dispatch)=>{
    try {
        dispatch({
            type:types.GET_REQUEST_LOADING
        })
        const res=await axios.get(`${process.env.BACKEND_URL}/budget/request/${id}`,
            {
                headers:{
                    "Authorization":`Bearer ${sessionStorage.getItem('userToken')}`
                }
            }
        );
        dispatch({
            type:types.GET_REQUEST_SUCCESS,payload:res
        });
    } catch (error) {
        dispatch({
            type:types.GET_REQUEST_FAIL,payload:error
        });
    }
}
export const getRequests=()=>async(dispatch)=>{
    try {
        dispatch({
            type:types.GET_REQUESTS_LOADING
        })
        const res=await axios.get(`${process.env.BACKEND_URL}/budget/request/all`,
            {
                headers:{
                    "Authorization":`Bearer ${sessionStorage.getItem('userToken')}`
                }
            }
        );
        dispatch({
            type:types.GET_REQUESTS_SUCCESS,payload:res
        });
    } catch (error) {
        dispatch({
            type:types.GET_REQUESTS_FAIL,payload:error
        });
    }
}

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

export const newRequest=(formData)=>async(dispatch)=>{
    try {
        dispatch({
            type:types.NEW_REQUEST_LOADING
        })

        const res=await axios.post(`${process.env.BACKEND_URL}/budget/request/createRequest`,formData,
            {
                headers:{
                    "Authorization":`Bearer ${sessionStorage.getItem('userToken')}`
                }
            }
        )

        dispatch({
            type:types.NEW_REQUEST_SUCCESS,payload:res,
        })
    } catch (error) {
        dispatch({
            type:types.NEW_REQUEST_FAIL,payload:error
        })

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

