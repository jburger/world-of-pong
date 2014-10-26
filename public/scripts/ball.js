
function Ball(options) {
    'use strict';
    this.options = options;
    var texture = options.texture || PIXI.Texture.fromImage("images/ball.png");
    
    PIXI.Sprite.call(this, texture, options.width || 16, options.height || 16);
    this.anchor.x = options.anchorX || 0.5;
    this.anchor.y = options.anchorY || 0.5;

    this.position.x = options.xloc || 0;
    this.position.y = options.yloc || 0;
    this.lastPosition = this.position;
    
    this.speedX = options.initialSpeedX || 0;
    this.speedY = options.initialSpeedY || 0;
    this.hitArea = new PIXI.Rectangle(options.xloc || 0, options.yloc || 0, options.width || 16, options.height || 16);
}

Ball.constructor = Ball;
Ball.prototype = Object.create(PIXI.Sprite.prototype);

Ball.prototype.update = function () {
    'use strict';
    this.position.x += this.speedX + 0.01;
    this.position.y += this.speedY;
};

Ball.prototype.collidedWith = function(other) {
    var wePos = this.position;
    var theyPos = other.position;
    var theyWidth = other.hitArea.width;
    var theyHeight = other.hitArea.height;
    
    var leftTest = wePos.x > (theyPos.x - theyWidth/2),
        rightTest = wePos.x < (theyPos.x + theyWidth/2),
        topTest = wePos.y > (theyPos.y - theyHeight/2),
        bottomTest = wePos.y < (theyPos.y + theyHeight/2);

    return rightTest && leftTest && topTest && bottomTest;
};

Ball.prototype.reset = function() {
    this.lastPosition.x = this.position.x;
    this.lastPosition.y = this.position.y;
    this.position.x = this.options.xloc || 0;
    this.position.y = this.options.yloc || 0;

    //if we're going too fast - put the brakes on
    if(this.speedX > 10) {
        this.speedX = this.options.initialSpeedX || 0;
    }
    this.speedY = this.options.initialSpeedY || 0;
}