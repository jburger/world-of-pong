var app = function (spriteFactory, colorFactory) {
    'use strict';
    var renderer = PIXI.autoDetectRenderer(320, 480),
        levelOne = spriteFactory.createLevelOneStage(),
        ball = levelOne.ball,
        player1 = levelOne.player1,
        ai = levelOne.ai,
        body = document.getElementById('game');
    
    function detectCollisions(level) {
        if (level.ball.didCollide(level.player1) ) {
            level.ball.speedY = level.ball.speedY * -1;
        }
    }
    
    function update() {
        requestAnimFrame(update);
        renderer.render(levelOne.stage);
        ball.update();
        player1.update(levelOne.stage.interactionManager.mouse.global);
        detectCollisions(levelOne);
    }
    body.appendChild(renderer.view);
    requestAnimFrame(update);
};

app(levelFactory);