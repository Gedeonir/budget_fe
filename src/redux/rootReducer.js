
import { combineReducers } from 'redux';
import reducer from './Reducers/counterReducer';
import { addBudgets, fetchMyBudgets } from './Reducers/BudgetReducer';
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
    removeUser:deleteUser
});

export default rootReducer;