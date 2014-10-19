
function Ball(options) {
    'use strict';
    var texture = options.texture || PIXI.Texture.fromImage("images/ball.png");
    
    PIXI.Sprite.call(this, texture, options.width || 16, options.height || 16);
    this.anchor.x = options.anchorX || 0.5;
    this.anchor.y = options.anchorY || 0.5;

    this.position.x = options.xloc || 0;
    this.position.y = options.yloc || 0;

    this.speedX = options.initialSpeedX || 0;
    this.speedY = options.initialSpeedY || 0;
    this.hitArea = new PIXI.Rectangle(options.xloc || 0, options.yloc || 0, options.width || 16, options.height || 16);
}

Ball.constructor = Ball;
Ball.prototype = Object.create(PIXI.Sprite.prototype);

Ball.prototype.update = function () {
    'use strict';
    this.position.x += this.speedX;
    this.position.y += this.speedY;
};

Ball.prototype.collidedWith = function(other) {
    var myBounds = this.hitArea;
    var theirBounds = other.hitArea;
    
    var rightTest = this.position.x + myBounds.width/2  > other.position.x - theirBounds.width/2;
    var leftTest = this.position.x - myBounds.width/2  < other.position.x + theirBounds.width/2;
    var topTest = this.position.y + myBounds.height/2  > other.position.y - theirBounds.height/2;
    var bottomTest = this.position.y - myBounds.height/2  < other.position.y + theirBounds.height/2;
    
    return rightTest && leftTest && topTest && bottomTest;
};