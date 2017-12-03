import { combineReducers } from 'redux';
import initial from './defaultState';
import NodesReducer from './nodes';
import SelectReducer from './select';
import ConnectionReducer from './connections';
import styleReducer from './style_reducer';
import connectNodeReducer from './connect_pair';

const rootReducer = combineReducers({
    initial: initial,
    Nodes: NodesReducer,
    Selected: SelectReducer,
    Connections: ConnectionReducer,
    style: styleReducer,
    connect: connectNodeReducer
})

export default rootReducer;