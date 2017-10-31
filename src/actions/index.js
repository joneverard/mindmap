import {randomPosition} from '../utilities';
export const CREATE = 'create';
export const SELECT = 'select';

export function createNode(title) {
    var d = new Date();
    return {
        type: CREATE,
        payload: {
            title: title,
            nodeType: 'A',
            color: '#fff',
            id: d.getTime(),
            position: [0,0]
        }
    }
}

export function selectNode(id) {
    return {
        type: SELECT,
        payload: id
    }
}

