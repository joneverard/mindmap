// import {randomPosition} from '../utilities';

import { ContentState } from 'draft-js';

export const CREATE = 'create';
export const SELECT = 'select';
export const UPDATE_POS = 'update';
export const EDIT_NODE = 'edit_node';
export const DRAG = 'drag';
export const CREATE_CONN = 'create_conn';
export const UPDATE_ANCHOR = 'update_anchor';
export const DELETE_NODE = 'delete_node';
export const SAVE_NODE = 'save_node';
export const ZOOM = 'zoom';
export const PAN = 'pan';
export const NODE_ONE = 'node_one';
export const CONNECT_NODES = 'connect_nodes';
export const TOGGLE_DISPLAY = 'toggle_display';
// some notes...
// this file is getting a little large. would be better to separate the action creators into files regarding nodes,
// connections, save / edit functions etc.



export function createNode(title, selected) {
    console.log('create fired');
    var d = new Date();
    return {
        type: CREATE,
        payload: {
            selected: selected,
            title: title,
            nodeType: 'A',
            color: '#fff',
            id: d.getTime(),
            position: {x: 100, y: 100},
            anchor: {x: 100, y: 100},
            display: false,
            content: ContentState.createFromText(' ')
        }
    }
}

export function selectNode(id) {
    console.log('select');
    return {
        type: SELECT,
        payload: id
    }
}

export function toggleDisplay(id) {
    console.log('toggle');
    return {
        type: TOGGLE_DISPLAY,
        payload: id
    }
}

export function updatePosition(nodeid, rect) {
    console.log('update position');
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
    console.log('drag');
    return {
        type: DRAG,
        payload: {id: nodeid, anchor: anchor}
    }
}

export function createConnection(start, end) {
    console.log('connections',start, end);
    return {
        type: CREATE_CONN,
        payload: {start, end}
    }
}

export function updateAnchor(nodeid, anchor) {
    console.log('anchor');
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
    console.log('edit');
    return {
        type: EDIT_NODE,
        payload: nodeId
    }
}

export function saveNode(nodeId, title) {
    console.log('save');
    return {
        type: SAVE_NODE,
        payload: {nodeId, title} // this will eventually be a full node object containing content state from draft js aswell.
    }
}

export function zoomMap(origin, scale) {
    console.log('zoom');
    return {
        type: ZOOM,
        payload: {
            origin,
            scale: scale/1000
        }
    }
}

export function panMap(origin, newPosition) {
    console.log('pan');
    // console.log(origin, newPosition);
    var delta = {
        x: newPosition.x - origin.x,
        y: newPosition.y - origin.y
    }
    return {
        type: PAN,
        payload: {
            delta
        }
    }
}

export function connectNode(node, active) {
    console.log('connect');
    return {
        type: CONNECT_NODES,
        payload: {
            node,
            active
        }
    }
}
//{x: rect.x + rect.width/2, y: rect.y + rect.height/2}