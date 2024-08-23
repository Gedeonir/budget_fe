
import { combineReducers } from 'redux';
import reducer from './Reducers/counterReducer';
import { fetchMyBudgets } from './Reducers/BudgetReducer';
import { addInstitution, deleteInstitution, fetchInstitution } from './Reducers/InstReducer';

const rootReducer = combineReducers({
    counter: reducer,
    MyBudgets:fetchMyBudgets,
    inst:fetchInstitution,
    deleteInst:deleteInstitution,
    addInst:addInstitution
});

export default rootReducer;