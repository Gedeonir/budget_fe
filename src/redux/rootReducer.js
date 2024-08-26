
import { combineReducers } from 'redux';
import reducer from './Reducers/counterReducer';
import { fetchMyBudgets } from './Reducers/BudgetReducer';
import { addInstitution, deleteInstitution, fetchInstitution, fetchOne, updateInstitution } from './Reducers/InstReducer';

const rootReducer = combineReducers({
    counter: reducer,
    MyBudgets:fetchMyBudgets,
    inst:fetchInstitution,
    deleteInst:deleteInstitution,
    addInst:addInstitution,
    oneInst:fetchOne,
    updateInst:updateInstitution
});

export default rootReducer;