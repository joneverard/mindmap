import { combineReducers } from 'redux';
import initial from './defaultState';
import NodesReducer from './nodes';
import SelectReducer from './select';
import ConnectionReducer from './connections';

const rootReducer = combineReducers({
    initial: initial,
    Nodes: NodesReducer,
    Selected: SelectReducer,
    Connections: ConnectionReducer
})

export default rootReducer;