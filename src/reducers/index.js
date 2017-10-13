import { combineReducers } from 'redux';
import initial from './defaultState';

const rootReducer = combineReducers({
    initial: initial
})

export default rootReducer;