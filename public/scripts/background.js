function Background(options) {
    'use strict';
    var tex = options.texture || PIXI.Texture.fromImage("images/bkg.lvl.1.png");
    PIXI.Sprite.call(this, tex);
    this.position.x = options.xloc || 0;
    this.position.y = options.yloc || 0;
}

Background.constructor = Background;
Background.prototype = Object.create(PIXI.Sprite.prototype);
