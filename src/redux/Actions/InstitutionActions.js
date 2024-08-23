import * as types from './actionTypes'
import axios from 'axios'

export const addInstitution=(formData)=>async(dispatch)=>{
    try {
        dispatch({
            type:types.ADD_NEW_BUDGET_LOADING
        })

        const res=await axios.post(`${process.env.BACKEND_URL}/institutions/new`,formData,
            {
                headers:{
                    "Authorization":`Bearer ${sessionStorage.getItem('userToken')}`
                }
            }
        )

        dispatch({
            type:types.ADD_NEW_BUDGET_SUCCESS,payload:res
        })
    } catch (error) {
        dispatch({
            type:types.ADD_NEW_BUDGET_FAIL,payload:error
        })

        console.log(error);
    }
}

export const deleteInstution=(id)=>async(dispatch)=>{
    try {
        dispatch({
            type:types.DELETE_INST_LOADING
        })

        const res=await axios.delete(`${process.env.BACKEND_URL}/institutions/${id}`,
            {
                headers:{
                    "Authorization":`Bearer ${sessionStorage.getItem('userToken')}`
                }
            }
        )

        dispatch({
            type:types.DELETE_INST_SUCCESS,payload:res
        })
    } catch (error) {
        dispatch({
            type:types.DELETE_INST_FAIL,payload:error
        })

        console.log(error);
    }
}

export const fetchInst=()=>async(dispatch)=>{
    try {
        dispatch({
            type:types.GET_ALL_BUDGETS_LOADING
        })

        const res=await axios.get(`${process.env.BACKEND_URL}/institutions/`,
            {
                headers:{
                    "Authorization":`Bearer ${sessionStorage.getItem('userToken')}`
                }
            }
        );
        dispatch({
            type:types.GET_ALL_INST_SUCCESS,payload:res
        });

    } catch (error) {
        dispatch({
            type:types.GET_ALL_INST_FAIL,payload:error
        });        

    }
}