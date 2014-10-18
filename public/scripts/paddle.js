function Paddle(options) {
    var tex = options.texture || PIXI.Texture.fromImage("images/paddle.png"),
        normals = PIXI.Texture.fromImage("images/paddle_norm.png"),
        normalMapFilter = new PIXI.NormalMapFilter(normals);
    
    PIXI.Sprite.call(this, tex, options.width || 64, options.height || 16);
    
    this.filters = [normalMapFilter];
    this.anchor.x = options.anchorX || 0.5;
    this.anchor.y = options.anchorY || 0.5;

    this.position.x = options.xloc || 0;
    this.position.y = options.yloc || 0;
    this.setInteractive(true);
    
}

Paddle.constructor = Paddle;
Paddle.prototype = Object.create(PIXI.Sprite.prototype);
Paddle.prototype.update = function (mousePosition) {
    this.position.x = mousePosition.x;
    this.filters[0].uniforms.LightPos.value[0] = mousePosition.x;
    this.filters[0].uniforms.LightPos.value[1] = mousePosition.y;
};