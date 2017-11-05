// import {randomPosition} from '../utilities';
export const CREATE = 'create';
export const SELECT = 'select';
export const UPDATE = 'update';
export const DRAG = 'drag';
export const CREATE_CONN = 'create_conn';
export const UPDATE_ANCHOR = 'update_anchor';
export const DELETE_NODE = 'delete_node';

export function createNode(title) {
    var d = new Date();
    return {
        type: CREATE,
        payload: {
            title: title,
            nodeType: 'A',
            color: '#fff',
            id: d.getTime(),
            position: {x: 100, y: 100},
            anchor: {x: 100, y: 100}
        }
    }
}

export function selectNode(id) {
    return {
        type: SELECT,
        payload: id
    }
}

export function updatePosition(nodeid, rect) {
    return {
        type: UPDATE,
        payload: {
            id: nodeid,
            position: {x:rect.x, y:rect.y},
            anchor: {x: rect.x + rect.width/2, y: rect.y + rect.height/2}
        }
    }
}

export function dragLines(nodeid, anchor) {
    return {
        type: DRAG,
        payload: {id: nodeid, anchor: anchor}
    }
}

export function createConnection(start, end) {
    // console.log(start, end);
    return {
        type: CREATE_CONN,
        payload: {start, end}
    }
}

export function updateAnchor(nodeid, anchor) {
    return {
        type: UPDATE_ANCHOR,
        payload: {id: nodeid, anchor: anchor}
    }
}

export function deleteNode(node) {
    console.log(node.id);
    return {
        type: DELETE_NODE,
        payload: node.id
    }
}

export function editNode(node) {
    console.log('hello');
    return {
        type: 'hello',
        payload: 1
    }
}

//{x: rect.x + rect.width/2, y: rect.y + rect.height/2}