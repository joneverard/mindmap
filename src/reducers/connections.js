import { DRAG, CREATE_CONN, DELETE_NODE } from '../actions';


export default function ConnectionsReducer(state=[], action) {
    var data;
    switch (action.type) {
        case DRAG:
            data = [...state].map(function(connection) {
                if (connection.end.id === action.payload.id) {
                    connection.end.position.x = action.payload.anchor.x
                    connection.end.position.y = action.payload.anchor.y

                }
                if (connection.start.id === action.payload.id) {
                    connection.start.position.x = action.payload.anchor.x
                    connection.start.position.y = action.payload.anchor.y
                }
                return connection
            });
            return data;
        case CREATE_CONN:
            // console.log('start node', action.payload.start);
            // console.log('end node', action.payload.end);
            if (action.payload.start) {
                var newConn = {
                    start: {
                        id: action.payload.start.id,
                        position: {x: action.payload.start.anchor.x, y: action.payload.start.anchor.y}
                    },
                    end: {
                        id: action.payload.end.id,
                        position: {x: action.payload.end.anchor.x, y: action.payload.end.anchor.y}
                    }
                }
                return [...state, newConn];
            } else {
                return state
            }
        case DELETE_NODE:
            data = [...state];
            var filteredStart = data.filter(function(conn) {
                return (conn.start.id !== action.payload);
            });
            var filteredEnd = filteredStart.filter(function(conn) {
                return (conn.end.id !== action.payload);
            });
            console.log(data);
            // console.log(filtered);
            return filteredEnd;

        default:
            return state;
    }
}