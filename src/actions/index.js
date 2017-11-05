// import {randomPosition} from '../utilities';
export const CREATE = 'create';
export const SELECT = 'select';
export const UPDATE_POS = 'update';
export const EDIT_NODE = 'edit_node';
export const DRAG = 'drag';
export const CREATE_CONN = 'create_conn';
export const UPDATE_ANCHOR = 'update_anchor';
export const DELETE_NODE = 'delete_node';
export const SAVE_NODE = 'save_node';

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
        type: UPDATE_POS,
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

export function deleteNode(nodeId) {
    // console.log(node.id);
    return {
        type: DELETE_NODE,
        payload: nodeId
    }
}

export function editNode(nodeId) {
    return {
        type: EDIT_NODE,
        payload: nodeId
    }
}

export function saveNode(nodeId, title) {
    return {
        type: SAVE_NODE,
        payload: {nodeId, title} // this will eventually be a full node object containing content state from draft js aswell.
    }
}
//{x: rect.x + rect.width/2, y: rect.y + rect.height/2}