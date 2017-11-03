import { SELECT, UPDATE } from '../actions';

export default function SelectReducer(state=null, action) {
    switch (action.type) {
        case SELECT:
            // console.log(action.payload)
            return action.payload; // payload is whole node object.
        case UPDATE:
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
        default:
            return state;
    }
}


// return {
//         type: UPDATE,
//         payload: {id: nodeid, position: {x:rect.x, y:rect.y}}
//     }