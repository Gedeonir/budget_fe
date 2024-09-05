import * as types from "../Actions/actionTypes";

const initialState={
    error:null,
    resp:null,
    success:null,
    loading:false
};

export const addReviewer=(state=initialState,action)=>{
    switch(action.type){
        case types.ADD_REVIEWER_LOADING:
            return{
                ...state,
                loading:true
            }
        case types.ADD_REVIEWER_SUCCESS:
            return{
                ...state,
                loading:false,
                resp:action.payload,
                success:false
            }
        case types.ADD_REVIEWER_FAIL:
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

export const removeReviewer=(state=initialState,action)=>{
    switch(action.type){
        case types.REMOVE_REVIEWER_LOADING:
            return{
                loading:true
            }
        case types.REMOVE_REVIEWER_SUCCESS:
            return{
                loading:false,
                resp:action.payload,
                success:true
            }
        case types.REMOVE_REVIEWER_FAIL:
            return{
                loading:false,
                error:action.payload,
                success:false
            }
        default:
            return state
    }
}

export const addComment=(state=initialState,action)=>{
    switch(action.type){
        case types.ADD_COMMENT_LOADING:
            return{
                loading:true
            }
        case types.ADD_COMMENT_SUCCESS:
            return{
                loading:false,
                resp:action.payload,
                success:true
            }
        case types.ADD_COMMENT_FAIL:
            return{
                loading:false,
                error:action.payload,
                success:false
            }
        default:
            return state
    }
}

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

export const fetchRequests=(state=initialState,action)=>{
    switch(action.type){
        case types.GET_REQUESTS_LOADING:
            return{
                ...state,
                loading:true
            }

        case types.GET_REQUESTS_SUCCESS:
            return{
                ...state,
                loading:false,
                resp:action.payload,
                success:true
            }    
        
        case types.GET_REQUESTS_FAIL:
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

export const getRequest=(state=initialState,action)=>{
    switch(action.type){
        case types.GET_REQUEST_LOADING:
            return{
                ...state,
                loading:true
            }

        case types.GET_REQUEST_SUCCESS:
            return{
                ...state,
                loading:false,
                resp:action.payload,
                success:true
            }

        case types.GET_REQUEST_FAIL:
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

export const newRequest=(state=initialState,action)=>{
    switch(action.type){
        case types.NEW_REQUEST_LOADING:
            return{
                ...state,
                loading:true
            }
        case types.NEW_REQUEST_SUCCESS:
            return{
                ...state,
                loading:false,
                resp:action.payload,
                success:true
            }
        case types.NEW_REQUEST_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload,
                success:true
            }
        default:
            return state
    }
}

export const addBudgets=(state=initialState,action)=>{
    switch(action.type){
        case types.ADD_NEW_BUDGET_LOADING:
            return{
                ...state,
                loading:true
            }

        case types.ADD_NEW_BUDGET_SUCCESS:
            return{
                ...state,
                loading:false,
                resp:action.payload,
                success:true
            }
        
        case types.ADD_NEW_BUDGET_FAIL:
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

export const sendReview=(state=initialState,action)=>{
    switch(action.type){
        case types.SEND_REVIEW_LOADING:
            return{
                ...state,
                loading:true
            }
        case types.SEND_REVIEW_SUCCESS:
            return{
                ...state,
                loading:false,
                resp:action.payload,
                success:true
            }
        case types.SEND_REVIEW_FAIL:
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