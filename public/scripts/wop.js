var app = function (levelFac) {
    'use strict';
    var renderer = PIXI.autoDetectRenderer(320, 480),
        levelOne = levelFac.createLevelOneStage(),
        ball = levelOne.ball,
        player1 = levelOne.player1,
        ai = levelOne.ai,
        body = document.getElementById('game'),
        previousTime = 0,
        deltaTime = 0,
        currentTime = 0,
        elapsedTime = 0,
        score = 0;
    
    function detectCollisions() {
        var playerHit = ball.collidedWith(player1),
            aiHit = ball.collidedWith(ai);
        
        if (playerHit || aiHit) {
            //reverse direction
            ball.speedY *= -1;
            //add some random direction
            var rnd = Math.random();
            ball.speedX += rnd > 0.5 ? rnd : rnd * -1;
            //add some speed from paddle
            ball.speedX += player1.speedX * 0.1;
            
                
        }
        
        //check wall hits
        if(ball.position.x <= ball.width / 2 || ball.position.x >= 320 - ball.width / 2) {
            ball.speedX *= -1;
        }
        
        //check score
        if(playerHit) {
            if(player1.speedX > 1) {
                console.log("nice shot!")
                addPointsToScore(10);
            } else {
                console.log("hit");
                addPointsToScore(5);
            }
        }
        
        if(ball.position.y <= 0) {
            console.info("bonus!");
            addPointsToScore(50);
            ball.reset();
        } else if (ball.position.y >= 480) {
            console.info("oh noes!");
            addPointsToScore(-50);
            ball.reset();
        }
    }
    
    function addPointsToScore(amount) {
        score += amount;
    }
    
    function update() {
        previousTime = currentTime;
        currentTime = Date.now();
        deltaTime = currentTime - previousTime;
        //elapsedTime += deltaTime;
        console.info("time elapsed: " + deltaTime + " " + elapsedTime);
        requestAnimFrame(update);
        renderer.render(levelOne.stage);
        ball.update();
        player1.update(levelOne.stage.interactionManager.mouse.global);
        ai.update(ball.position, deltaTime);
        detectCollisions();
        console.info(score);
    }
    body.appendChild(renderer.view);
    requestAnimFrame(update);
};

app(levelFactory);