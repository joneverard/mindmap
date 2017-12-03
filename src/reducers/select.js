import { SELECT, UPDATE_POS, DELETE_NODE, CONNECT_NODES } from '../actions';

export default function SelectReducer(state=null, action) {
    switch (action.type) {
        case SELECT:
            // console.log(action.payload)
            return action.payload; // payload is whole node object.
        case UPDATE_POS:
            var selected = {...state};
            selected.position = {
                x: action.payload.position.x,
                y: action.payload.position.y
            }
            selected.anchor = {
                x: action.payload.anchor.x,
                y: action.payload.anchor.y
            }
            return selected;
        // case ZOOM:
        //     // need to calculate the unit vector for each node. then scale along that vector.
        //     var selected = {...state};

        //     data = [...state].map(function(node) {
        //         var vector = [node.anchor.x-action.payload.origin.x, node.anchor.y-action.payload.origin.y];
        //         // var magnitude = Math.sqrt(Math.pow(vector[0],2)+Math.pow(vector[1],2));
        //         var unitVector = [vector[0], vector[1]];
        //         node.position.x += action.payload.scale*unitVector[0];
        //         node.position.y += action.payload.scale*unitVector[1];
        //         node.anchor.x += action.payload.scale*unitVector[0];
        //         node.anchor.y += action.payload.scale*unitVector[1];
        //         return node
        //     });
        //     return data
        case DELETE_NODE:
            return null;
        default:
            return state;
    }
}

// repurposing this reducer to contain the state for connecting any two nodes.
// keeps track if a 'connect' action is active, and


// notes... I think this reducer is causing problems. having this violates the single source of truth philosophy of redux.
// a selected node is getting it's information from two different places. the nodes reducer and the selected reducer.
// making steps towards removing this file and having all information present on the node object will (hopefully) resolve some issues.

// noted: onzooming the anchor position of a selected node seems to be misplaced. that is why zoom code is present above.