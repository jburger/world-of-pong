function Paddle(options) {
    var tex = options.texture || PIXI.Texture.fromImage("images/paddle.png");
    
    PIXI.Sprite.call(this, tex, options.width || 64, options.height || 16);
    
    this.anchor.x = options.anchorX || 0.5;
    this.anchor.y = options.anchorY || 0.5;

    this.position.x = options.xloc || 0;
    this.position.y = options.yloc || 0;
    
    this.hitArea = new PIXI.Rectangle(options.xloc || 0, options.yloc || 0, options.width || 64, options.height || 16);
    
    this.setInteractive(true);
    
}

Paddle.constructor = Paddle;
Paddle.prototype = Object.create(PIXI.Sprite.prototype);
Paddle.prototype.update = function (mousePosition) {
    var lastPosX = this.position.x
    this.position.x = mousePosition.x;
    this.speedX = (this.position.x - lastPosX);
};