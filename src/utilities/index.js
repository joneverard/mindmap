export function randomPosition(max, min) {
    return [(Math.random()*max+min).toString() + 'px', (Math.random()*max+min).toString() + 'px'];
}

export function getCylindricalCoords(origin, point) {
    var vector = {x: (point.x - origin.x), y: (origin.y - point.y)}
    var radius = Math.sqrt(vector.x**2 + vector.y**2);
    var angle = Math.asin(vector.y / radius);
    return {radius, angle}
}

export function getCartesianCoords(origin, radius, angle) {
    var dx = Math.cos(angle)*radius;
    var dy = Math.sin(angle)*radius;
    return {x: origin.x + dx, y: origin.y + dy}
}