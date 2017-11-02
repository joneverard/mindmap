import {randomPosition} from '../utilities';
export const CREATE = 'create';
export const SELECT = 'select';
export const UPDATE = 'update';

export function createNode(title) {
    var d = new Date();
    return {
        type: CREATE,
        payload: {
            title: title,
            nodeType: 'A',
            color: '#fff',
            id: d.getTime(),
            position: {x: 100, y: 100}
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
        payload: {id: nodeid, position: {x:rect.x, y:rect.y}}
    }
}