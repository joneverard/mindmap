export function randomPosition(max, min) {
    return [(Math.random()*max+min).toString() + 'px', (Math.random()*max+min).toString() + 'px'];
}
