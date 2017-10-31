import { combineReducers } from 'redux';
import initial from './defaultState';
import NodesReducer from './nodes';
import SelectReducer from './select';

const rootReducer = combineReducers({
    initial: initial,
    Nodes: NodesReducer,
    Selected: SelectReducer
})

export default rootReducer;