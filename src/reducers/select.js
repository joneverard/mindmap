import { SELECT } from '../actions';

export default function SelectReducer(state=null, action) {
    switch (action.type) {
        case SELECT:
            return action.payload; // payload is id only.
        default:
            return state;
    }
}