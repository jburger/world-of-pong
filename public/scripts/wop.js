var app = function (levelFac) {
    'use strict';
    var renderer = PIXI.autoDetectRenderer(320, 480),
        level = levelFac.createLevelOneStage(),
        ball = level.ball,
        player1 = level.player1,
        ai = level.ai,
        body = document.getElementById('game'),
        previousTime = 0,
        deltaTime = 0,
        currentTime = 0,
        elapsedTime = 0,
        score = 0,
        diagnosticMode = false,
        scoreText = new UiText({
            message: "score: 0",
            xloc: 5,
            yloc: 5,
            size: "medium",
            color: "pink"
        });
    
    function addPointsToScore(amount) {
        score += amount;
        if (score < 0) {
            score = 0;
        }
        var scoreText = new FloatingText({
            xloc: ball.position.x,
            yloc: ball.position.y,
            color: "#59e53f",
            size: "medium",
            message: amount
        });
        level.stage.addChild(scoreText);
       
    }
    
    
    function detectCollisions() {
        var playerHit = ball.collidedWith(player1),
            aiHit = ball.collidedWith(ai);
        
        if (playerHit || aiHit) {
            ball.position.x = ball.lastPosition.x;
            ball.position.y = ball.lastPosition.y;
            ball.speedY = -ball.speedY; // reverse direction
            ball.speedX += player1.speedX * 0.5; // add some of players x velocity to ball
            ball.speedY += (ball.speedY < 0) ? -0.2 : 0.2; // increase speed
            if (ball.speedY > 20) { ball.speedY = 20; } // capped at '20'
            if (ball.speedY < -20) { ball.speedY = -20; } // capped at '20'
            if (ball.speedX > 20) { ball.speedX = 20; } // capped at '20'
            if (ball.speedX < -20) { ball.speedX = -20; } // capped at '20'
        }
        
        //check wall hits
        if (ball.position.x <= ball.width / 2 || ball.position.x >= 320 - ball.width / 2) {
            ball.speedX *= -1;
        }
        
        //check score
        if (playerHit) {
            var absSpeed = Math.floor(Math.abs(ball.speedY));
            if (player1.speedX > 1) {
                addPointsToScore(2 * absSpeed);
            } else {
                addPointsToScore(absSpeed);
            }
        }
        
        if (ball.position.y <= 0) {
            addPointsToScore(50);
            ball.reset();
        } else if (ball.position.y >= 480) {
            addPointsToScore(-50);
            ball.reset();
        }
    }
    
    level.stage.addChild(scoreText);
    if (diagnosticMode) { level.stage.addChild(diagText); }
    
    function renderDiagnostics(options) {
        var msg = "ball.x: " + options.ballPos.x
                     + "\nball.y: " + options.ballPos.y
                     + "\nplayer.x: " + options.player1Pos.x
                     + "\nplayer.y: " + options.player1Pos.y
                     + "\nball.speedX: " + options.ballSpeedX
                     + "\nball.speedY: " + options.ballSpeedY
                     + "\nscore: " + options.score;
        diagText.setText(msg);
    }
    
    function update() {
        requestAnimFrame(update);
        renderer.render(level.stage);
        //ball.update();
        //player1.update();
        var type = "";
        var len = level.stage.children.length;
        for (var i = 0; i < len; i++) {
            var displayObj = level.stage.children[i];
            try {
                displayObj.update(); 
            } catch(e) {
                //bad code
            }
        }
        ai.update(ball.position);
        scoreText.setText("score: " + score);
        detectCollisions();
        
        if(diagnosticMode) {
            renderDiagnostics({
                player1Pos: player1.position,
                ballSpeedX: ball.speedX,
                ballSpeedY: ball.speedY,
                ballPos: ball.position,
                score: score
            });
        }
    }
    body.appendChild(renderer.view);
    requestAnimFrame(update);
};

app(levelFactory);