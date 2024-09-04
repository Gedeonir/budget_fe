
import { combineReducers } from 'redux';
import reducer from './Reducers/counterReducer';
import { addBudgets, addReviewer, fetchMyBudgets, fetchRequests, getRequest, newRequest, removeReviewer } from './Reducers/BudgetReducer';
import { addInstitution, deleteInstitution, fetchInstitution, fetchOne, updateInstitution } from './Reducers/InstReducer';
import { deleteUser, fetchUsers, newUsers } from './Reducers/usersReducer';

const rootReducer = combineReducers({
    counter: reducer,
    addBudget:addBudgets,
    budgets:fetchMyBudgets,
    inst:fetchInstitution,
    deleteInst:deleteInstitution,
    addInst:addInstitution,
    oneInst:fetchOne,
    updateInst:updateInstitution,
    users:fetchUsers,
    newUser:newUsers,
    removeUser:deleteUser,
    newRequest:newRequest,
    allRequest:fetchRequests,
    oneRequest:getRequest,
    addReviewer:addReviewer,
    removeReviewer:removeReviewer
});

export default rootReducer;