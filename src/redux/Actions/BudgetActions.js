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

