
import { combineReducers } from 'redux';
import reducer from './Reducers/counterReducer';
import { addBudgets, addReviewer, fetchMyBudgets, fetchRequests, getRequest, newRequest, removeReviewer,addComment, sendReview, changeStatus, approveBudget, getBudget, getBudgetReducer, transactionsReducer, addTransaction } from './Reducers/BudgetReducer';
import { addInstitution, deleteInstitution, fetchInstitution, fetchOne, updateInstitution } from './Reducers/InstReducer';
import { changePassword, deleteUser, fetchUsers, newUsers } from './Reducers/usersReducer';

const rootReducer = combineReducers({
    counter: reducer,
    addBudget:addBudgets,
    budgets:fetchMyBudgets,
    oneBudget:getBudgetReducer,

    inst:fetchInstitution,
    deleteInst:deleteInstitution,
    addInst:addInstitution,
    oneInst:fetchOne,
    updateInst:updateInstitution,

    users:fetchUsers,
    newUser:newUsers,
    removeUser:deleteUser,
    changePassword:changePassword,

    newRequest:newRequest,
    allRequest:fetchRequests,
    oneRequest:getRequest,
    addReviewer:addReviewer,
    removeReviewer:removeReviewer,
    addComment:addComment,
    sendReview:sendReview,
    changeStatus:changeStatus,
    approveBudget:approveBudget,

    allTransactions:transactionsReducer,
    addTransaction:addTransaction
    
});

export default rootReducer;