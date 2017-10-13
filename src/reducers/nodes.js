import { CREATE } from '../actions';

const initialState = [
    {
        title: 'this is an initial node',
        type: 'A',
        color: '#e34f62'
    }
]

export default function NodesReducer(state=initialState, action) {
    switch (action.type) {
        case 'hello this is not an action':
            return state.push(action.payload);
        default:
            return state
    }
}