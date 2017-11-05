import { CREATE, UPDATE_POS, DELETE_NODE, UPDATE_ANCHOR, EDIT_NODE, SELECT } from '../actions';

var initialState = []
initialState.push(
    {
        title: 'this is an initial node',
        type: 'A',
        color: 'white',
        position: {x: 350, y: 350},
        anchor: {x: 350, y: 350},
        edit: true,
        id: 12345678910
    }
);


export default function NodesReducer(state=initialState, action) {
    var data;
    switch (action.type) {
        case CREATE:
            return [...state, action.payload];

        case SELECT:
            data = [...state].map(function(node) {
                if (node && action.payload) {
                    if (node.id !== action.payload.id) {
                        node.edit = false;
                    }
                };
                return node;
            });
            return data;

        case UPDATE_POS:
            data = [...state].map(function (node) {
                if (node.id === action.payload.id) {
                    node.position = action.payload.position
                }
                return node;
            })
            // console.log('data', data);
            return data;

        case EDIT_NODE:
            data = [...state].map(function(node) {
                if (node.id === action.payload) {
                    node.edit = true;
                } else {
                    node.edit = false; // only one at a time please!
                }
                return node;
            });
            return data;

        case DELETE_NODE:
            var array = [...state];
            var filtered = array.filter(function(node) { return node.id !== action.payload })
            // console.log(filtered);
            return filtered;

        case UPDATE_ANCHOR:
            data = [...state].map(function(node) {
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