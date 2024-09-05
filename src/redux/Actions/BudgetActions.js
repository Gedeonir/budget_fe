import axios from "axios";
import * as types from './actionTypes';

export const removeReviewer=(id,formData)=>async(dispatch)=>{
    try {
        dispatch({
            type:types.REMOVE_REVIEWER_LOADING
        })

        const res=await axios.patch(`${process.env.BACKEND_URL}/budget/removeReviewers/${id}`,formData,
            {
                headers:{
                    "Authorization":`Bearer ${sessionStorage.getItem('userToken')}`
                }
            }
        )
        

        dispatch({
            type:types.REMOVE_REVIEWER_SUCCESS,payload:res
        })
        
    } catch (error) {
        dispatch({
            type:types.REMOVE_REVIEWER_FAIL,payload:error
        })

        console.log(error)
    }
}

export const addReviewer=(id,formData)=>async(dispatch)=>{
    try {
        dispatch({
            type:types.ADD_REVIEWER_LOADING
        })

        const res=await axios.patch(`${process.env.BACKEND_URL}/budget/addReviewers/${id}`,formData,
            {
                headers:{
                    "Authorization":`Bearer ${sessionStorage.getItem('userToken')}`
                }
            }
        )

        dispatch({
            type:types.ADD_REVIEWER_SUCCESS,payload:res
        })
    } catch (error) {
        dispatch({
            type:types.ADD_REVIEWER_FAIL,payload:error
        })
        
    }
}
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

        dispatch(getRequests())
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


    }
}

export const addComment=(id,comment)=>async(dispatch)=>{
    try {
        dispatch({
            type:types.ADD_COMMENT_LOADING
        })

        const res=await axios.patch(`${process.env.BACKEND_URL}/budget/request/comment/${id}`,comment,
            {
                headers:{
                    "Authorization":`Bearer ${sessionStorage.getItem('userToken')}`
                }
            }
        );

        dispatch({
            type:types.ADD_COMMENT_SUCCESS,payload:res
        });

        dispatch(getRequest(id))
        
    } catch (error) {
        dispatch({
            type:types.ADD_COMMENT_FAIL,payload:error
        });
    }
}

export const sendReview=(id,formData)=>async(dispatch)=>{
    try {
        dispatch({
            type:types.SEND_REVIEW_LOADING
        })
        const res=await axios.patch(`${process.env.BACKEND_URL}/budget/request/${id}/review`,formData,
            {
                headers:{
                    "Authorization":`Bearer ${sessionStorage.getItem('userToken')}`
                }
            }
        );
        dispatch({
            type:types.SEND_REVIEW_SUCCESS,payload:res
        });

        dispatch(getRequest(id))
    } catch (error) {
        dispatch({
            type:types.SEND_REVIEW_FAIL,payload:error
        });

        console.log(error);
        
    }
}

