import * as types from './actionTypes'
import axios from 'axios'

export const fetchInst=()=>async(dispatch)=>{
    try {
        dispatch({
            type:types.GET_ALL_INST_LOADING
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
export const addInstitution=(formData)=>async(dispatch)=>{
    try {
        dispatch({
            type:types.ADD_NEW_INST_LOADING
        })

        const res=await axios.post(`${process.env.BACKEND_URL}/institutions/new`,formData,
            {
                headers:{
                    "Authorization":`Bearer ${sessionStorage.getItem('userToken')}`
                }
            }
        )

        dispatch({
            type:types.ADD_NEW_INST_SUCCESS,payload:res
        })

        dispatch(fetchInst())
    } catch (error) {
        dispatch({
            type:types.ADD_NEW_INST_FAIL,payload:error
        })
    }
}

export const updateInstitution=(id,formData)=>async(dispatch)=>{
    try {
        dispatch({
            type:types.UPDATE_INST_LOADING
        })

        const res=await axios.patch(`${process.env.BACKEND_URL}/institutions/${id}`,formData,
            {
                headers:{
                    "Authorization":`Bearer ${sessionStorage.getItem('userToken')}`
                }
            }
        )

        dispatch({
            type:types.UPDATE_INST_SUCCESS,payload:res
        })
    } catch (error) {
        dispatch({
            type:types.UPDATE_INST_FAIL,payload:error
        })

        console.log(error)
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

        dispatch(fetchInst());

    } catch (error) {
        dispatch({
            type:types.DELETE_INST_FAIL,payload:error
        })

    }
}

export const fetchOne=(id)=>async(dispatch)=>{
    try {
        dispatch({
            type:types.GET_ONE_INST_LOADING
        })

        const res=await axios.get(`${process.env.BACKEND_URL}/institutions/one/${id}`,
            {
                headers:{
                    "Authorization":`Bearer ${sessionStorage.getItem('userToken')}`
                }
            }
        )

        dispatch({
            type:types.GET_ONE_INST_SUCCESS,payload:res
        })
    } catch (error) {
        dispatch({
            type:types.GET_ONE_INST_FAIL,payload:error
        })
    }
}

export const uploadInstImage = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: types.UPLOAD_INST_IMAGE_LOADING
        })

        const res = await axios.patch(`${process.env.BACKEND_URL}/institutions/upload_profile_picture/upload`, formData,
            {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem('userToken')}`
                }
            }
        )

        dispatch({ type: types.UPLOAD_INST_IMAGE_SUCCESS, payload: res })
    } catch (error) {
        dispatch({
            type: types.UPLOAD_INST_IMAGE_FAIL, payload: error
        })
    }
}