import { combineReducers } from 'redux';
import NodesReducer from './nodes';
import SelectReducer from './select';
import ConnectionReducer from './connections';
import styleReducer from './style_reducer';
import connectNodeReducer from './connect_pair';

const rootReducer = combineReducers({
    Nodes: NodesReducer,
    Selected: SelectReducer,
    Connections: ConnectionReducer,
    style: styleReducer,
    connect: connectNodeReducer
})

export default rootReducer;