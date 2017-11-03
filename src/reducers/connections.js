import { DRAG, CREATE_CONN } from '../actions';

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


export default function ConnectionsReducer(state={}, action) {
    switch (action.type) {
        case DRAG:
            var data = [...state].map(function(connection) {
                if (connection.end.id === action.payload.id) {
                    connection.end.position.x = action.payload.anchor.x
                    connection.end.position.y = action.payload.anchor.y

                } else if (connection.start.id === action.payload.id) {
                    connection.start.position.x = action.payload.anchor.x
                    connection.start.position.y = action.payload.anchor.y
                }
                return connection
            });
            // console.log(data);
            return data;
        case CREATE_CONN:
            // console.log(action.payload);
            var newConn = {
                start: {
                    id: action.payload.start.id,
                    position: {x: action.payload.start.position.x, y: action.payload.start.position.y}
                },
                end: {
                    id: action.payload.end.id,
                    position: {x: action.payload.end.position.x, y: action.payload.end.position.y}
                }
            }
            return [...state, newConn];
        default:
            return state;
    }
}


// data[i] = {x: [d.x[0]+=event.dx, d.x[1]+=event.dx], y:[d.y[0]+=event.dy, d.y[1]+=event.dy]}