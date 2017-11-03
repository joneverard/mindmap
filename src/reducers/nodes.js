import { CREATE, UPDATE, UPDATE_ANCHOR } from '../actions';

var initialState = []
initialState.push(
    {
        title: 'this is an initial node',
        type: 'A',
        color: 'white',
        position: {x: 350, y: 350},
        anchor: {x: 350, y: 350},
        id: 12345678910
    }
);


export default function NodesReducer(state=initialState, action) {
    switch (action.type) {
        case CREATE:
            return [...state, action.payload];
        case UPDATE:
            var data = [...state].map(function (node) {
                if (node.id === action.payload.id) {
                    node.position = action.payload.position
                }
                return node;
            })
            // console.log(data);
            return data;
        case UPDATE_ANCHOR:
            var data = [...state].map(function(node) {
                if (node.id === action.payload.id) {
                    node.anchor = action.payload.anchor;
                }
                return node;
            })
            return data;
        default:
            return state;
    }
}