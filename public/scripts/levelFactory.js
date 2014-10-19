var levelFactory = (function (colorFactory) {
    'use strict';
    return {
        createLevelOneStage: function () {
            var stage = new PIXI.Stage(colorFactory.sceneBackground),
                bkgTex = PIXI.Texture.fromImage("images/bkg.lvl.1.png"),
                ballTex = PIXI.Texture.fromImage("images/ball.png"),
                paddleTex = PIXI.Texture.fromImage("images/paddle.png"),
                bkg = new Background({texture: bkgTex}),
                player1 = new Paddle({
                    texture: paddleTex,
                    width: 64,
                    height: 16,
                    xloc: 160,
                    yloc: 440
                }),
                ai = new AI({
                    texture: paddleTex,
                    width: 64,
                    height: 16,
                    xloc: 160,
                    yloc: 40
                }),
                ball = new Ball({
                    texture: ballTex,
                    width: 16,
                    height: 16,
                    initialSpeedX: Math.random() < 0.5 ? Math.random() * -1 : Math.random(),
                    initialSpeedY: 5,
                    xloc: 160,
                    yloc: 60
                });
            
            stage.addChild(bkg);
            stage.addChild(player1);
            stage.addChild(ai);
            stage.addChild(ball);
            stage.setInteractive(true);
            stage.mousemove = stage.touchmove = function(data) {
                var lastPosX = player1.position.x
                player1.position.x = data.global.x;
                player1.speedX = (player1.position.x + lastPosX);
                
            }
    
            return {
                stage: stage,
                ball: ball,
                player1: player1,
                ai: ai
            };
        }
    };
}(colorFactory));

        