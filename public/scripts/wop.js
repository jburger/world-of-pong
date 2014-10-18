var app = function (spriteFactory, colorFactory) {
    'use strict';
    var renderer = PIXI.autoDetectRenderer(320, 480),
        levelOne = spriteFactory.createLevelOneStage(),
        ball = levelOne.ball,
        player1 = levelOne.player1,
        ai = levelOne.ai,
        body = document.getElementById('game');
    
    function update() {
        requestAnimFrame(update);
        renderer.render(levelOne.stage);
        ball.update();
        player1.update(levelOne.stage.interactionManager.mouse.global);
    }
    body.appendChild(renderer.view);
    requestAnimFrame(update);
};

app(levelFactory);