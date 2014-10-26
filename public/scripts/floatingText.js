function FloatingText(options) {
    var fontOptions = "";
    switch(options.size) {
        case "small":
            fontOptions = { font: "9px Verdana", fill: options.color || "white", align: options.alignment || "left" }
            break;
        case "medium":
            fontOptions = { font: "18px Verdana", fill: options.color || "white", align: options.alignment || "left" }
            break;
        case "large":
            fontOptions = { font: "35px Verdana", fill: options.color || "white", align: options.alignment || "left" }
            break;
    }
    
    PIXI.Text.call(this, options.message, fontOptions);
    
    this.position.x = options.xloc || 0;
    this.position.y = options.yloc || 0;
}

FloatingText.constructor = FloatingText;
FloatingText.prototype = Object.create(PIXI.Text.prototype);
FloatingText.prototype.update = function () {
    
  this.position.x += 0.5;  
  this.position.y += 0.1 + Math.random();  
  if (this.alpha === 0) {
    this.destroy();
  } else {
    this.alpha -= 0.01;
  }
this.tint += 0xFFEFFF;
};