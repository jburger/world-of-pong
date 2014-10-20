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
        diagnosticMode = true;
    
    function detectCollisions() {
        var playerHit = ball.collidedWith(player1),
            aiHit = ball.collidedWith(ai);
        
        if (playerHit || aiHit) {
            ball.speedY = -ball.speedY; // reverse direction
            ball.speedX += player1.speedX * 0.5; // add some of players x velocity to ball
            ball.speedY < 0 ? ball.speedY -= 0.1 : ball.speedY += 0.1 ; // increase speed
            if(ball.speedY > 20 ) { ball.speedY = 20; } // capped at '20'
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
        if(score < 0) { score = 0; }
    }
    
    var scoreText = new UiText({ 
        message: "score: 0", 
        xloc: 5, 
        yloc: 5, 
        size: "medium",
        color: "pink"
    });
    level.stage.addChild(scoreText);
    
    var diagText = diagText || new UiText({ 
        message: "", 
        xloc: 100, 
        yloc: 100, 
        size: "small",
        color: "white"
    });
    
    if(diagnosticMode) { level.stage.addChild(diagText); }
    
    function renderDiagnostics(options) {
        var msg = "ball.x: " + options.ballPos.x 
                     + "\nball.y: " + options.ballPos.y
                     + "\nplayer.x: " + options.player1Pos.x
                     + "\nplayer.y: " + options.player1Pos.y
                     + "\nball.speedX: " + options.ballSpeedX
                     + "\nball.speedY: " + options.ballSpeedY
                     + "\nplayer.speedX: " + options.player1SpeedX
                     + "\nplayer.speedY: " + options.player1SpeedY
                     + "\nscore: " + options.score;
        diagText.setText(msg);
    }
    
    function update() {
        previousTime = currentTime;
        currentTime = Date.now();
        deltaTime = currentTime - previousTime;
        //elapsedTime += deltaTime;
        
        requestAnimFrame(update);
        renderer.render(level.stage);
        ball.update();
        player1.update();
        ai.update(ball.position, deltaTime);
        detectCollisions();
        console.info(score);
        scoreText.setText("score: " + score);
        if(diagnosticMode) {
            renderDiagnostics({
                player1SpeedX: player1.speedX,
                player1SpeedY: player1.speedY,
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