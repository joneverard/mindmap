export const CREATE = 'create';

export function createNode() {
    var d = new Date();

    console.log(d.getTime());
    return {
        type: CREATE,
        payload: {
            title: 'New Node',
            nodeType: 'A',
            color: '#333333',
            id: d.getTime()
        }
    }
}