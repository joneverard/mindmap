import { CREATE } from '../actions';

var initialState = []
initialState.push(
    {
        title: 'this is an initial node',
        type: 'A',
        color: 'white',
        position: ['0','0'],
        id: 12345678910
    }
);

export default function NodesReducer(state=initialState, action) {
    switch (action.type) {
        case CREATE:
            return [...state, action.payload];
        default:
            return state;
    }
}