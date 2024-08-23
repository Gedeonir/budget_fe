import * as types from '../Actions/actionTypes';

const initialState={
    error:null,
    resp:null,
    success:false,
    loading:false
}

export const addInstitution=(state=initialState,action)=>{
    switch(action.type){
        case types.ADD_NEW_INST_LOADING:
            return{
                ...state,
                loading:true
            }
        case types.ADD_NEW_INST_SUCCESS:
            return{
                ...state,
                loading:true,
                resp:action.payload,
                success:true
            }
        case types.ADD_NEW_INST_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload,
                success:false
            }
        default:
            return state;
    }
}

export const deleteInstitution=(state=initialState,action)=>{
    switch(action.type){
        case types.DELETE_INST_LOADING:
            return{
                ...state,
                loading:true
            }
        case types.DELETE_INST_SUCCESS:
            return{
                ...state,
                loading:false,
                resp:action.payload,
                success:true
            }
        case types.DELETE_INST_FAIL:
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

export const fetchInstitution=(state=initialState,action)=>{
    switch(action.type){
        case types.GET_ALL_INST_LOADING:
            return{
                ...state,
                loading:true
            }
        case types.GET_ALL_INST_SUCCESS:
            return{
                ...state,
                loading:false,
                resp:action.payload,
                success:true
            }

        case types.GET_ALL_INST_FAIL:
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

