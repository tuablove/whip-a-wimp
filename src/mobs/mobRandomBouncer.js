"use strict";
//states: idle walk attack
//conditions canAttck canWalk feelObstacle seePlayer seeItem

waw.MobRandomBouncer = waw.Enemy.extend({
        ctor: function () {
            this._super();
            //console.info("MobRandomBouncer ctor");
            this.speed = 1 + Math.random() * 2;
        },
        pickAISchedule: function () {
            switch (this.state) {
                case "idle":
                    if (Math.random() < 0.7) {
                        this.state = "idle";
                        this.stateSchedule = this.SCHEDULE_IDLE;
                    } else if (Math.random() < 0.3) {
                        this.state = "bounce";
                        this.stateSchedule = this.SCHEDULE_BOUNCE;
                    }
                    break;
                case "attack":
                    this.state = "idle";
                    this.stateSchedule = this.SCHEDULE_IDLE;
                    console.log("mob attacks player end");
                    break;
                case "hurt":
                    this.state = "follow";
                    this.stateSchedule = this.SCHEDULE_FOLLOW;
                    this.stateSchedule.reset();
                    this.speed += 1;
                    console.log("mobs hurt stat end");
                    break;
                case "follow":
                case "bounce":
                    if (Math.random() < 0.3) {
                        this.state = "idle";
                        this.stateSchedule = this.SCHEDULE_IDLE;
                    } else {
                        this.state = "bounce";
                        this.stateSchedule = this.SCHEDULE_BOUNCE;
                    }
                    break;
            }
        }

    }
);