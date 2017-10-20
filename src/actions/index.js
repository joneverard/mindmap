import {randomPosition} from '../utilities';
export const CREATE = 'create';

export function createNode(title) {
    var d = new Date();
    var pos = randomPosition(500,100);

    console.log(d.getTime());
    return {
        type: CREATE,
        payload: {
            title: title,
            nodeType: 'A',
            color: '#fff',
            id: d.getTime(),
            position: pos
        }
    }
}