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