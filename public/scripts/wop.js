var app = function (spriteFactory, colorFactory) {
    'use strict';
    var renderer = PIXI.autoDetectRenderer(320, 480),
        levelOne = spriteFactory.createLevelOneStage(),
        ball = levelOne.ball,
        player1 = levelOne.player1,
        ai = levelOne.ai,
        body = document.getElementById('game');
    
    function detectCollisions(level) {
        var playerHit = ball.collidedWith(player1),
            aiHit = ball.collidedWith(ai);
        
        if (playerHit || aiHit) {
            //reverse direction
            ball.speedY = (ball.speedY) * -1;
        }
        
        //did the paddle impart some lateral velocity on the ball?
        var impartedLateralVelocity = 0;
        if(playerHit) {
            impartedLateralVelocity = player1.speedX;
        }
        
        if(aiHit) {
            impartedLateralVelocity = ai.speedX;
        }
        //ball.speedX += impartedLateralVelocity;
    }
    
    function update() {
        var currentTime = 
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