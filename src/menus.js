"use strict";
waw.Score = cc.Node.extend({
    shadowSprite: null,
    label: null,

    items: {},

    ctor: function () {
        this._super();
        this.setAnchorPoint(0,0.5);

        this.items = {
            keys: {
                sprite: new cc.Sprite(waw.gfx.items, cc.rect(1 + 19 * 0, 0, 16, 16)),
                oldValue: 0,
                usage: function () {
                    console.log(this.name + " is used automatically")
                },
                update: function () {
                }
                //show:function(){ this.items.keys.sprite.visible = true; },
                //hide:function(){ this.items.keys.sprite.visible = false;}
            },
            coins: {
                sprite:new cc.Sprite(waw.gfx.items, cc.rect(1 + 18 * 1, 1, 16, 16)),
                oldValue: 0,
                usage:function(){console.log(this.name+" is used automatically")},
                update:function(){}
                //show:function(){ this.items.coins.sprite.visible = true; },
                //hide:function(){ this.items.coins.sprite.visible = false;}
            },
            gems: {
                sprite:new cc.Sprite(waw.gfx.items, cc.rect(1 + 18 * 2, 1, 16, 16)),
                oldValue: 0,
                usage:function(){console.log(this.name+" is used automatically")},
                update:function(){}
                //show:function(){ this.items.gems.sprite.visible = true; },
                //hide:function(){ this.items.gems.sprite.visible = false;}
            }
        };

        this.items.keys.sprite.visible = false;
        this.items.coins.sprite.visible = false;
        this.items.gems.sprite.visible = false;

        this.addChild(this.items.keys.sprite);
        this.items.keys.sprite.setPosition(0*16, 0);
        this.addChild(this.items.coins.sprite);
        this.items.coins.sprite.setPosition(1*16, 0);
        this.addChild(this.items.gems.sprite);
        this.items.gems.sprite.setPosition(2*16, 0);

        this.scheduleUpdate();

    },
    update: function(){
        if(waw.keys !== this.items.keys.oldValue){
            switch(waw.keys){
                case 0:
                    //this.items.keys.sprite.removeAllChildren();
                    this.items.keys.sprite.visible = false;
                    break;
                case 1:
                    if(this.items.keys.oldValue === 0){
                        this.items.keys.sprite.visible = true;
                    } else {
                        this.items.keys.sprite.removeAllChildren();
                    }
                    break;
                case 2:
                    var keySpr = new cc.Sprite(waw.gfx.items, cc.rect(1 + 19 * 0, 0, 16, 16));
                    if(this.items.keys.oldValue === 1){
                        this.items.keys.sprite.addChild(keySpr, -1);
                        keySpr.setAnchorPoint(0.5, 0.5);
                        keySpr.setPosition(1+Math.random()*2, 1+Math.random()*2);
                        keySpr.opacity = 200;
                    } else {
                        this.items.keys.sprite.removeAllChildren();
                        this.items.keys.sprite.addChild(keySpr, -1);
                        keySpr.setAnchorPoint(0.5, 0.5);
                        keySpr.setPosition(2, 2);
                        keySpr.opacity = 200;
                        keySpr = new cc.Sprite(waw.gfx.items, cc.rect(1 + 19 * 0, 0, 16, 16));
                        this.items.keys.sprite.addChild(keySpr, -2);
                        keySpr.setAnchorPoint(0.5, 0.5);
                        keySpr.setPosition(4, 4);
                        keySpr.opacity = 127;
                    }
                    break;
                case 3:
                    var keySpr = new cc.Sprite(waw.gfx.items, cc.rect(1 + 19 * 0, 0, 16, 16));
                    if(this.items.keys.oldValue === 2){
                        this.items.keys.sprite.addChild(keySpr, -2);
                        keySpr.setAnchorPoint(0.5, 0.5);
                        keySpr.setPosition(4, 4);
                        keySpr.opacity = 127;
                    }
                    break;
            }
            this.items.keys.oldValue = waw.keys;
        }
        if(waw.coins !== this.items.coins.oldValue){
            this.items.coins.sprite.visible = (waw.coins>0);
            this.items.coins.oldValue = waw.coins;
        }
        if(waw.gems !== this.items.gems.oldValue){
            this.items.gems.sprite.visible = (waw.gems>0);
            this.items.gems.oldValue = waw.gems;
        }

    }
}
);

waw.ItemMenu = function (layer) {
    //create items list
    var itemsPassive = [];
    //
    if(waw.keys>0)
        itemsPassive.push({name:"key",
            sprite:new cc.Sprite(waw.gfx.items, cc.rect(1 + 19 * 0, 0, 16, 16)),
            usage:function(){console.log(this.name+" is used automatically")},
            update:function(){}
        });
    if(waw.whip.chainLength>0)
        itemsPassive.push({name:"whip",
            sprite:new cc.Sprite(waw.gfx.items, cc.rect(1 + 18 * 4, 1, 16, 16)),
            usage:function(){console.log(this.name+" is used automatically")},
            update:function(){}
        });
    if(waw.coins>0)
        itemsPassive.push({name:"coin",
            sprite:new cc.Sprite(waw.gfx.items, cc.rect(1 + 18 * 1, 1, 16, 16)),
            usage:function(){console.log(this.name+" is used automatically")},
            update:function(){}
        });
    if(waw.gems>0)
        itemsPassive.push({name:"gem",
            sprite:new cc.Sprite(waw.gfx.items, cc.rect(1 + 18 * 2, 1, 16, 16)),
            usage:function(){console.log(this.name+" is used automatically")},
            update:function(){}
        });

    var bottomLayer = new cc.Node();
    for(var i=0; i<itemsPassive.length; i++){
        var t = itemsPassive[i];
        bottomLayer.addChild(t.sprite);
        t.sprite.setPosition(i*14, 0);

        if(i === 2) {
            t.sprite.runAction(
                new cc.RepeatForever(
                    new cc.Sequence(
                        new cc.FadeOut(0.5),
                        new cc.FadeIn(0.5)
                    )
                )
            );
        }
    }
    return  bottomLayer;
};

waw.MenuDebug = function (layer) {
    var menu, labelDebug;
    labelDebug = new cc.LabelTTF("Spawn", "System", 12);
    var debugOnOffItem = new cc.MenuItemLabel(labelDebug,
        function () {
//        debugger;
            switch (Math.round(Math.random() * 0)) {
                //switch(0){
                case 0:
                default:
                    var e = new waw.MobKiwi();
                    break;
                case 3:
                    var e = new waw.MobPigBouncer();
                    break;
                case 1:
                    var e = new waw.MobPigWalker();
                    break;
                case 2:
                    var e = new waw.MobMerchant();
                    break;
            }
            var m = {x: 100, y: 110};
            var pos = cc.p(e.toSafeXCoord(m.x), e.toSafeYCoord(m.y));
            e.setPosition(pos);
            e.setScale(0.1);
            e.runAction(new cc.ScaleTo(0.5, 1));
            //e.runAction(new cc.Blink(1, 4)); //Blink Foe sprite
            this.addChild(e, 6);
            e.setZOrder(250 - pos.y);
            //attach monsters shadow to layer OVER BG floor (its Z index = -15)
            this.addChild(e.shadowSprite, -14);
            //position shadow
            e.shadowSprite.setPosition(pos.x, pos.y - 0);
            waw.mobs.push(e);

        }, layer);
    //debugOnOffItem.setAnchorPoint(0.5, 0.5);
    menu = new cc.Menu(debugOnOffItem);
    menu.setPosition(0, 0);
    layer.addChild(menu, 300);
    debugOnOffItem.setPosition(16+2, 239 - 28);

    labelDebug = new cc.LabelTTF("HitBox", "System", 10);
    var debugOnOffItem = new cc.MenuItemLabel(labelDebug,
        function () {
            showDebugInfo = !showDebugInfo;
            waw.player.label.setVisible(showDebugInfo);
            waw.player.debugCross.setVisible(showDebugInfo);
            for (var i in waw.mobs) {
                if (!waw.mobs[i])
                    continue;
                waw.mobs[i].label.setVisible(showDebugInfo);
                waw.mobs[i].debugCross.setVisible(showDebugInfo);
            }
            for (var i in waw.units) {
                if (!waw.units[i])
                    continue;
                waw.units[i].debugCross.setVisible(showDebugInfo);
            }
            for (var i in waw.items) {
                if (!waw.items[i])
                    continue;
                waw.items[i].debugCross.setVisible(showDebugInfo);
                waw.items[i].label.setVisible(showDebugInfo);
            }
        }, layer);
    //debugOnOffItem.setAnchorPoint(0.5, 0.5);
    menu = new cc.Menu(debugOnOffItem);
    menu.setPosition(0, 0);
    layer.addChild(menu, 300);
    debugOnOffItem.setPosition(16, 239 - 7 - 38);

//---
    labelDebug = new cc.LabelTTF("Music", "System", 10);
    var debugMusicOnOff = new cc.MenuItemLabel(labelDebug,
        function () {
          if(cc.audioEngine.isMusicPlaying()){
              cc.audioEngine.pauseMusic();
              //cc.audioEngine.stopAllEffects();
          } else {
              cc.audioEngine.resumeMusic();
            }
        }, layer
    );
    menu = new cc.Menu(debugMusicOnOff);
    menu.setPosition(0, 0);
    layer.addChild(menu, 300);
    debugMusicOnOff.setPosition(16, 239 - 7 - 48);


    labelDebug = new cc.LabelTTF("N/A", "System", 10);
    var debugDoors = new cc.MenuItemLabel(labelDebug,
        function () {
            //
        }, layer);
    menu = new cc.Menu(debugDoors);
    menu.setPosition(0, 0);
    layer.addChild(menu, 300);
    debugDoors.setPosition(16, 160);


    labelDebug = new cc.LabelTTF("Ch.Weapon", "System", 10);
    var debugMenu10 = new cc.MenuItemLabel(labelDebug,
        function () {
            switch(waw.player.currentWeapon){
                case "":
                case "punch":
                    waw.player.currentWeapon = "whip";
                    break;
                case "whip":
                    waw.player.currentWeapon = "candelabre";
                    break;
                case "candelabre":
                    waw.player.currentWeapon = "punch";
                    break;
            }
        }, layer);
    menu = new cc.Menu(debugMenu10);
    menu.setPosition(10, 0);
    layer.addChild(menu, 300);
    debugMenu10.setPosition(16, 150);

    labelDebug = new cc.LabelTTF("Dark", "System", 10);
    var debugMenu11 = new cc.MenuItemLabel(labelDebug,
        function () {
            waw.curRoom.dark = !waw.curRoom.dark;
        }, layer);
    menu = new cc.Menu(debugMenu11);
    menu.setPosition(0, 0);
    layer.addChild(menu, 300);
    debugMenu11.setPosition(16, 140);

    labelDebug = new cc.LabelTTF("Chest", "System", 12);
    var debugSpawnChest = new cc.MenuItemLabel(labelDebug,
       function () {
            var e = new waw.NoMobChest();
            var pos = waw.player.getPosition();
            e.setPosition(pos);
            e.setScale(0.1);
            e.runAction(new cc.ScaleTo(0.5, 1));
            this.addChild(e, 6);
            this.addChild(e.shadowSprite, -14);
            e.setZOrder(250 - pos.y);
            e.shadowSprite.setPosition(pos.x, pos.y + e.shadowYoffset);
            e.setTag(TAG_CHEST);
            console.log(waw.units.length);
            //waw.mobs.push(e);
            //waw.units[waw.mobs.length-1] = e;   //to make it obstacle&

            this.scheduleOnce(function () {
                waw.units.push(e);   //to make it obstacle&
                console.log(waw.units.length);
            }, 1);

    }, layer);

    menu = new cc.Menu(debugSpawnChest);
    menu.setPosition(0, 0);
    layer.addChild(menu, 300);
    debugSpawnChest.setPosition(16, 126);

    labelDebug = new cc.LabelTTF("Key+", "System", 12);
    var debugGetKey = new cc.MenuItemLabel(labelDebug,
        function () {
            waw.keys ++;
        }, layer);

    menu = new cc.Menu(debugGetKey);
    menu.setPosition(0, 0);
    layer.addChild(menu, 300);
    debugGetKey.setPosition(16, 116);
};