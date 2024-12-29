import * as types from '../Actions/actionTypes';

const initialState={
    error:null,
    resp:null,
    success:false,
    loading:false
}

export const fetchUsers=(state=initialState,action)=>{
    switch(action.type){
        case types.GET_ALL_USER_LOADING:
            return{
                ...state,
                loading:true
            }
        case types.GET_ALL_USER_SUCCESS:
            return{
                ...state,
                loading:false,
                resp:action.payload,
                success:true
            }

        case types.GET_ALL_USER_FAIL:
            return{
                ...state,
                loading:false,
                success:false,
                error:action.payload
            }
        default:
            return state
    }
}

export const newUsers=(state=initialState,action)=>{
    switch(action.type){
        case types.REGISTER_USER_LOADING:
            return{
                ...state,
                loading:true
            }
        case types.REGISTER_USER_SUCCESS:
            return{
                ...state,
                loading:false,
                resp:action.payload,
                success:true
            }

        case types.REGISTER_USER_FAIL:
            return{
                ...state,
                loading:false,
                success:false,
                error:action.payload
            }
        default:
            return state
    }
}

export const deleteUser=(state=initialState,action)=>{
    switch(action.type){
        case types.DELETE_USER_LOADING:
            return{
                ...state,
                loading:true
            }
        case types.DELETE_USER_SUCCESS:
            return{
                ...state,
                loading:false,
                resp:action.payload,
                success:true
            }
        case types.DELETE_USER_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload,
                success:false
            }
        default:
            return state
    }
}

export const changePassword=(state=initialState,action)=>{
    switch(action.type){
        case types.CHANGE_PASSWORD_LOADING:
            return{
                ...state,
                loading:true
            }
        case types.CHANGE_PASSWORD_SUCCESS:
            return{
                ...state,
                loading:false,
                resp:action.payload,
                success:true
            }
        case types.CHANGE_PASSWORD_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload,
                success:false
            }
        default:
            return state
    }
}

export const updateUser=(state=initialState,action)=>{
    switch(action.type){
        case types.UPDATE_USER_LOADING:
            return{
                ...state,
                loading:true
            }
        case types.UPDATE_USER_SUCCESS:
            return{
                ...state,
                loading:false,
                resp:action.payload,
                success:true
            }
        case types.UPDATE_USER_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload,
                success:false
            }
        default:
            return state
    }
}

export const getUser=(state=initialState,action)=>{
    switch(action.type){
        case types.GET_ONE_USER_LOADING:
            return{
                ...state,
                loading:true,

            }
        case types.GET_ONE_USER_SUCCESS:
            return{
                ...state,
                loading:false,
                resp:action.payload,
                success:true
            }
        case types.GET_ONE_USER_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload,
                success:false
            }
        default:
            return state
    }
}

export const updatePic=(state=initialState,action)=>{
    switch(action.type){
        case types.UPLOAD_IMAGE_LOADING:
            return{
                ...state,
                loading:true
            }
        case types.UPLOAD_IMAGE_SUCCESS:
            return{
                ...state,
                loading:false,
                resp:action.payload,
                success:true
            }
        case types.UPLOAD_IMAGE_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload,
                success:false
            }
            case types.UPLOAD_INST_IMAGE_LOADING:
            return{
                ...state,
                loading:true
            }
        case types.UPLOAD_INST_IMAGE_SUCCESS:
            return{
                ...state,
                loading:false,
                resp:action.payload,
                success:true
            }
        case types.UPLOAD_INST_IMAGE_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload,
                success:false
            }
        default:
            return state
    }
}