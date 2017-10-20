import {randomPosition} from '../utilities';
export const CREATE = 'create';

export function createNode() {
    var d = new Date();
    var pos = randomPosition(500,100);

    console.log(d.getTime());
    return {
        type: CREATE,
        payload: {
            title: 'New Node',
            nodeType: 'A',
            color: '#fff',
            id: d.getTime(),
            position: pos
        }
    }
}