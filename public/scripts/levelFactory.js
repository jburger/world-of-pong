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
                ai = new Paddle({
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
                    initialSpeedX: 0,
                    initialSpeedY: 1,
                    xloc: 160,
                    yloc: 240
                });
            
            stage.addChild(bkg);
            stage.addChild(player1);
            stage.addChild(ai);
            stage.addChild(ball);
            stage.setInteractive(true);
            return {
                stage: stage,
                ball: ball,
                player1: player1,
                ai: ai
            };
        }
    };
}(colorFactory));

        