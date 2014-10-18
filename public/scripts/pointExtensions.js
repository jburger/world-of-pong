/**
 *
 * returns the distance between this point and another
 *
**/
PIXI.Point.prototype.distanceFrom = function(point) {
    return distanceBetweenTwoPoints(this, point);
};

function distanceBetweenTwoPoints(p, q) {
    return Math.sqrt(Math.pow((p.x - q.x), 2) + Math.pow((p.y - q.y), 2));
}