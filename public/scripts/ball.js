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
}

Ball.constructor = Ball;
Ball.prototype = Object.create(PIXI.Sprite.prototype);

Ball.prototype.update = function () {
    'use strict';
    this.position.x += this.speedX;
    this.position.y += this.speedY;
};