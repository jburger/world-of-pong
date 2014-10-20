function UiText(options) {
    var fontOptions = "";
    switch(options.size) {
        case "small":
            fontOptions = { font: "9px Helvetica", fill: options.color || "white", align: options.alignment || "left" }
            break;
        case "medium":
            fontOptions = { font: "18px Helvetica", fill: options.color || "white", align: options.alignment || "left" }
            break;
        case "large":
            fontOptions = { font: "35px Helvetica", fill: options.color || "white", align: options.alignment || "left" }
            break;
    }
    
    PIXI.Text.call(this, options.message, fontOptions);
    
    this.position.x = options.xloc || 0;
    this.position.y = options.yloc || 0;
}

UiText.constructor = UiText;
UiText.prototype = Object.create(PIXI.Text.prototype);
UiText.prototype.update = function (mousePosition) {
};