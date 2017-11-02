import { DRAG } from '../actions';

const initial = {
    x1: 100,
    x2: 200,
    y1: 100,
    y2: 200,
    id: 123456789
}

const initial_2 = [{
    start: {id: 200, position: {x: 250, y: 250}},
    end: {id: 12345678910, position: {x: 450, y: 350}}
}]


export default function ConnectionsReducer(state=initial_2, action) {
    switch (action.type) {
        case DRAG:
            var data = [...state].map(function(connection) {
                // if (connection.end.id === action.payload.id) {
                connection.end.position.x = action.payload.delta.clientX
                connection.end.position.y = action.payload.delta.clientY
                return connection
            });
            // console.log(data);
            return data;
        default:
            return state;
    }
}


// data[i] = {x: [d.x[0]+=event.dx, d.x[1]+=event.dx], y:[d.y[0]+=event.dy, d.y[1]+=event.dy]}