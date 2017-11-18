import {
    CREATE,
    UPDATE_POS,
    DELETE_NODE,
    UPDATE_ANCHOR,
    EDIT_NODE,
    SELECT,
    SAVE_NODE,
    ZOOM
} from '../actions';

var initialState = []
initialState.push(
    {
        title: 'this is an initial node',
        type: 'A',
        color: 'white',
        position: {x: 350, y: 350},
        anchor: {x: 350, y: 350},
        edit: false,
        id: 12345678910
    }
);


export default function NodesReducer(state=initialState, action) {
    var data;
    switch (action.type) {
        case CREATE:
            return [...state, action.payload];

        case SAVE_NODE:
            data = [...state].map(function(node) {
                if (node.id === action.payload.nodeId) {
                    node.title = action.payload.title;
                }
                return node;
            });
            return data;

        case SELECT:
            data = [...state].map(function(node) {
                if (node && action.payload ) {
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

        case ZOOM:
            // need to calculate the unit vector for each node. then scale along that vector.
            data = [...state].map(function(node) {
                var vector = [node.anchor.x-action.payload.origin.x, node.anchor.y-action.payload.origin.y];
                // var magnitude = Math.sqrt(Math.pow(vector[0],2)+Math.pow(vector[1],2));
                var unitVector = [vector[0], vector[1]];
                node.position.x += action.payload.scale*unitVector[0];
                node.position.y += action.payload.scale*unitVector[1];
                node.anchor.x += action.payload.scale*unitVector[0];
                node.anchor.y += action.payload.scale*unitVector[1];
                return node
            });
            return data

        default:
            return state;
    }
}