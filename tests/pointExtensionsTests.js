var point1 = new PIXI.Point(1,1),
    point2 = new PIXI.Point(2,2);
var point3 = new PIXI.Point(3,3),
    point4 = new PIXI.Point(3,3);
var point5 = new PIXI.Point(-13.3,-3.2),
    point6 = new PIXI.Point(11.2, 79.4);
    

QUnit.test( "distance between two points", function(assert) {
    assert.equal(point1.distanceFrom(point2), Math.sqrt(2));
    assert.equal(point3.distanceFrom(point4), 0);
    assert.equal(point5.distanceFrom(point6), Math.sqrt(7423.01));
});