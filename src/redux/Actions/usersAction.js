import axios from "axios";
import * as types from './actionTypes';

export const getAllUsers=()=>async(dispatch)=>{
    try {
        dispatch({
            type:types.GET_ALL_USER_LOADING
        })
    
        const res=await axios.get(`${process.env.BACKEND_URL}/users/`,
            {
                headers:{
                    "Authorization":`Bearer ${sessionStorage.getItem('userToken')}`
                }
            }
        );
        dispatch({
            type:types.GET_ALL_USER_SUCCESS,payload:res
        });
    } catch (error) {
        dispatch({
            type:types.GET_ALL_USER_FAIL,payload:error
        });  
    }
}

export const registerUser=(formData)=>async(dispatch)=>{
    try {
        dispatch({
            type:types.REGISTER_USER_LOADING
        })
    
        const res=await axios.post(`${process.env.BACKEND_URL}/users/new`,formData,
            {
                headers:{
                    "Authorization":`Bearer ${sessionStorage.getItem('userToken')}`
                }
            }
        );
        dispatch({
            type:types.REGISTER_USER_SUCCESS,payload:res
        });
    } catch (error) {
        dispatch({
            type:types.REGISTER_USER_FAIL,payload:error
        });  

        console.log(error);
    }

}

export const deleteUser=(id)=>async(dispatch)=>{
    try {
        dispatch({
            type:types.DELETE_USER_LOADING
        })

        const res=await axios.delete(`${process.env.BACKEND_URL}/users/${id}`,
            {
                headers:{
                    "Authorization":`Bearer ${sessionStorage.getItem('userToken')}`
                }
            }
        )

        dispatch({
            type:types.DELETE_USER_SUCCESS,payload:res
        })
    } catch (error) {
        dispatch({
            type:types.DELETE_USER_FAIL,payload:error
        })

    }
}