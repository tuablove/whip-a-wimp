"use strict";
//states: idle walk attack
//conditions canAttck canWalk feelObstacle seePlayer seeItem

waw.MobPigWalker = waw.MobRandomWalker.extend({
    mobType: "PigWalker",
    shadowYoffset: 4,
    spriteYoffset: -4,
    state: "idle",
    ctor: function () {
        this._super();
        //console.info("MobPigWalker ctor");
        this.setContentSize(16, 16);
        this.speed = 1+Math.random()*2;
        this.safePos = cc.p(0, 0);

        var animData =
        {
            "down_right":
            {
                frameRects:
                    [
                        cc.rect(1+49*0, 1, 48, 48),
                        cc.rect(1+49*1, 1, 48, 48),
                        cc.rect(1+49*2, 1, 48, 48),
                        cc.rect(1+49*1, 1, 48, 48)
                    ],
                delay: 0.3
            },
            "down_left":
            {
                frameRects:
                    [
                        cc.rect(1+49*0, 1, 48, 48),
                        cc.rect(1+49*1, 1, 48, 48),
                        cc.rect(1+49*2, 1, 48, 48),
                        cc.rect(1+49*1, 1, 48, 48)
                    ],
                delay: 0.3,
                flippedX: true
            },
            "up_right":
            {
                frameRects:
                    [
                        cc.rect(1+49*0, 1+49*1, 48, 48),
                        cc.rect(1+49*1, 1+49*1, 48, 48),
                        cc.rect(1+49*2, 1+49*1, 48, 48),
                        cc.rect(1+49*1, 1+49*1, 48, 48)
                    ],
                delay: 0.3
            },
            "up_left":
            {
                frameRects:
                    [
                        cc.rect(1+49*0, 1+49*1, 48, 48),
                        cc.rect(1+49*1, 1+49*1, 48, 48),
                        cc.rect(1+49*2, 1+49*1, 48, 48),
                        cc.rect(1+49*1, 1+49*1, 48, 48)
                    ],
                delay: 0.3,
                flippedX: true
            }
        };
        this.sprite = new waw.AnimatedSprite(s_Pig, animData);
        this.sprite.playAnimation(this.calcAnimationFrame(0,0));

        this.sprite.setPosition(0,this.spriteYoffset); //pig 48x48
        this.sprite.setAnchorPoint(0.5, 0);
        this.addChild(this.sprite);
        this.debugCross.setAnchorPoint(0.5, 0);

        //create monsters shadow sprite
        this.shadowSprite = new cc.Sprite(s_Shadow24x12);
        this.shadowSprite.setScale(1.4);
        this.shadowSprite.setAnchorPoint(0.5, 0.5);
    },
    calcAnimationFrame: function(x,y){
        var t="";
        if(Math.round(x) == 0){
            //TODO it doesnt work
            //when it moves vertically, make its left-right direction random
            x = 0.5 - Math.random();
        }
        if(Math.round(y)>0)
            t = "up_";
        else
            t = "down_";
        if(Math.round(x)<0)
             return t+"left";
        return t+"right";
    },
    update: function () {
        var currentTime = new Date();
        this.conditions = this.getConditions();
        if (this.stateSchedule.isDone()) {
            this.pickAISchedule();
        }
        this.stateSchedule.update(this); //we pass 'this' to make anon funcs in schedule see current monsters vars

        if(showDebugInfo && this.label) {
            this.label.setString(this.mobType+"-"+this.x.toFixed(1)+","+this.y.toFixed(1)+"\n "+this.state+" "+this.dx.toFixed(1)+","+this.dy.toFixed(1) );
        }
    }
})
;