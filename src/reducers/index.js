import { combineReducers } from 'redux';
import initial from './defaultState';
import NodesReducer from './nodes';

const rootReducer = combineReducers({
    initial: initial,
    Nodes: NodesReducer
})

export default rootReducer;