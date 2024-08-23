import * as types from "../Actions/actionTypes";

const initialState={
    error:null,
    resp:null,
    success:null,
    loading:false
};

export const fetchMyBudgets=(state=initialState,action)=>{
    switch(action.type){
        case types.GET_ALL_BUDGETS_LOADING:
            return{
                ...state,
                loading:true
            }

        case types.GET_ALL_BUDGETS_SUCCESS:
            return{
                ...state,
                loading:false,
                resp:action.payload,
                success:true
            }
        
        case types.GET_ALL_BUDGETS_FAIL:
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