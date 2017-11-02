import { DRAG } from './actions';

const initial = {
    x1: 100,
    x2: 200,
    y1: 100,
    y2: 200
    id: 123456789
}


export default function ConnectionsReducer(state=initial, action) {
    switch (action.type) {
        case DRAG:
            return {
                x1: 100,
                x2: state.x2+=action.payload.dx,
                y1: 100,
                y2: state.y2+=action.payload.dy
                id: 123456789
            }
        default:
            return state;
    }
}