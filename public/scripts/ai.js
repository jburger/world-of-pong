function AI(options) {
    var tex = options.texture || PIXI.Texture.fromImage("images/paddle.png");
    
    PIXI.Sprite.call(this, tex, options.width || 64, options.height || 16);
    
    this.anchor.x = options.anchorX || 0.5;
    this.anchor.y = options.anchorY || 0.5;

    this.position.x = options.xloc || 0;
    this.position.y = options.yloc || 0;
    
    this.hitArea = new PIXI.Rectangle(options.xloc || 0, options.yloc || 0, options.width || 64, options.height || 16);
    this.difficulty = options.difficulty || 160;
}

AI.constructor = AI;
AI.prototype = Object.create(PIXI.Sprite.prototype);
AI.prototype.lastPosX = 0;
AI.prototype.lastPosY = 0;

AI.prototype.update = function (ballPosition) {
    var lastPosX = this.position.x
    
    this.lastPosX = this.position.x;
    this.lastPosY = this.position.y;  
     
    if(ballPosition.y < this.difficulty) {
            this.position.x = math.lerp(this.position.x, ballPosition.x, 0.1);;
    }
};