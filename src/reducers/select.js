import { SELECT, UPDATE_POS, DELETE_NODE } from '../actions';

export default function SelectReducer(state=null, action) {
    switch (action.type) {
        case SELECT:
            // console.log(action.payload)
            return action.payload; // payload is whole node object.
        case UPDATE_POS:
            var selected = {...state};
            // console.log('selected', selected);
            selected.position = {
                x: action.payload.position.x,
                y: action.payload.position.y
            }
            selected.anchor = {
                x: action.payload.anchor.x,
                y: action.payload.anchor.y
            }
            return selected;
        case DELETE_NODE:
            return null;
        default:
            return state;
    }
}
