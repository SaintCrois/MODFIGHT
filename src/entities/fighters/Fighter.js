import { FIGHTER_START_DISTANCE, FighterAttackBaseData, FighterAttackStrength, FighterAttackType, FighterDirection, FighterState, FrameDelay, PUSH_FRICTION } from '../../constants/fighter.js';
import {FRAME_TIME} from '../../constants/game.js'
import { STAGE_FLOOR, STAGE_MID_POINT, STAGE_PADDING, } from '../../constants/stage.js';
import { boxOverlap, getActualBoxDimensions, rectsOverlap } from '../../utils/collisions.js';
import * as control from '../../engine/InputHandler.js';
import { gameState } from '../../state/GameState.js';
import { DEBUG_drawCollisionInfo } from '../../utils/fighterDebug.js';

export class Fighter {

    soundAttacks = {
        [FighterAttackStrength.LIGHT]: document.querySelector('audio#sounds-fighter-Hattack'),
        [FighterAttackStrength.HEAVY]: document.querySelector('audio#sounds-fighter-Hattack'),
    };
    
    soundHits = {
        [FighterAttackStrength.LIGHT]: document.querySelector('audio#sounds-fighter-Hhit'),
        [FighterAttackStrength.HEAVY]: document.querySelector('audio#sounds-fighter-Hkick'),
    };
    
    soundLand = document.querySelector('audio#sounds-fighter-Land');
    

    constructor(playerId, onAttackHit) {
        this.playerId = playerId;
        this.position = { x: STAGE_MID_POINT + STAGE_PADDING + (playerId === 0 ? -FIGHTER_START_DISTANCE : FIGHTER_START_DISTANCE), 
            y: STAGE_FLOOR };
        this.velocity = {x: 0, y: 0};
        this.initialVelocity = {};
        this.direction = playerId === 0 ? FighterDirection.RIGHT : FighterDirection.LEFT;    
        this.gravity = 0;

        this.attackStruck = false;
        
        this.frames = new Map();
        this.animationFrame = 0;
        this.animationTimer = 0;
        this.animations = {};
        
        this.image = new Image();

        this.opponent;
        this.onAttackHit = onAttackHit;

        this.boxes = {
            push: {x: 0, y: 0 , width: 0, height: 0},
            hurt: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
            hurt: {x: 0, y: 0 , width: 0, height: 0},
        };

        this.states = {
            [FighterState.IDLE]: {
                init: this.handleIdleInit.bind(this),
                update: this.handleIdleState.bind(this),
                validForm: [
                    undefined,
                    FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD,
                    FighterState.JUMP_UP, FighterState.JUMP_FORWARD, FighterState.JUMP_BACKWARD,
                    FighterState.CROUCH_UP, FighterState.JUMP_LAND, FighterState.IDLE_TURN,
                    FighterState.LIGHT_PUNCH, FighterState.HEAVY_PUNCH,
                    FighterState.LIGHT_KICK, FighterState.HEAVY_KICK,
                ],
            },
            [FighterState.WALK_FORWARD]: {
                init: this.handleMoveInit.bind(this),
                update: this.handleWalkForwardState.bind(this),
                validForm: [FighterState.IDLE, FighterState.WALK_BACKWARD,],
            },
            [FighterState.WALK_BACKWARD]: {
                init: this.handleMoveInit.bind(this),
                update: this.handleWalkBackwardsState.bind(this),
                validForm: [FighterState.IDLE, FighterState.WALK_FORWARD,],
            },
            [FighterState.JUMP_START]: {
                init: this.handleJumpStartInit.bind(this),
                update: this.handleJumpStartState.bind(this),
                validForm: [
                    FighterState.IDLE, FighterState.JUMP_LAND,
                    FighterState.WALK_BACKWARD, FighterState.WALK_FORWARD,
                ],
            },
            [FighterState.JUMP_UP]: {
                init: this.handleJumpInit.bind(this),
                update: this.handleJumpState.bind(this),
                validForm: [FighterState.JUMP_START],
            },
            [FighterState.JUMP_FORWARD]: {
                init: this.handleJumpInit.bind(this),
                update: this.handleJumpState.bind(this),
                validForm: [FighterState.JUMP_START,],
            },
            [FighterState.JUMP_BACKWARD]: {
                init: this.handleJumpInit.bind(this),
                update: this.handleJumpState.bind(this),
                validForm: [FighterState.JUMP_START,],
            },
            [FighterState.JUMP_LAND]: {
                init: this.handleJumpLandInit.bind(this),
                update: this.handleJumpLandState.bind(this),
                validForm: [
                    FighterState.JUMP_UP,
                    FighterState.JUMP_BACKWARD, FighterState.JUMP_FORWARD,
                ],
            },
            [FighterState.CROUCH]: {
                init: () => {},
                update: this.handleCrouchState.bind(this),
                validForm: [FighterState.CROUCH_DOWN, FighterState.CROUCH_TURN, ],
            },
            [FighterState.CROUCH_DOWN]: {
                init: this.handleCrouchInit.bind(this),
                update: this.handleCrouchDownState.bind(this),
                validForm: [FighterState.IDLE, FighterState.WALK_BACKWARD, FighterState.WALK_FORWARD,],
            },
            [FighterState.CROUCH_UP]: {
                init: () => {},
                update: this.handleCrouchUpState.bind(this),
                validForm: [FighterState.CROUCH,],
            },
            [FighterState.IDLE_TURN]: {
                init: () => {},
                update: this.handleIdleTurnState.bind(this),
                validForm: [FighterState.IDLE, FighterState.JUMP_LAND,
                    FighterState.WALK_BACKWARD, FighterState.WALK_FORWARD,],
            },
            [FighterState.CROUCH_TURN]: {
                init: () => {},
                update: this.handleCrouchTurnState.bind(this),
                validForm: [FighterState.CROUCH,],
            },
            [FighterState.LIGHT_PUNCH]: {
                attackType: FighterAttackType.PUNCH,
                attackStrength: FighterAttackStrength.LIGHT,
                init: this.handleStandardLightAttackInit.bind(this),
                update: this.handleLightPunchState.bind(this),
                validForm: [FighterState.IDLE, FighterState.WALK_BACKWARD, FighterState.WALK_FORWARD,],
            },
            [FighterState.HEAVY_PUNCH]: {
                attackType: FighterAttackType.PUNCH,
                attackStrength: FighterAttackStrength.HEAVY,
                init: this.handleStandardHeavyAttackInit.bind(this),
                update: this.handleMediumPunchState.bind(this),
                validForm: [FighterState.IDLE, FighterState.WALK_BACKWARD, FighterState.WALK_FORWARD,],
            },
            [FighterState.LIGHT_KICK]: {
                attackType: FighterAttackType.KICK,
                attackStrength: FighterAttackStrength.LIGHT,
                init: this.handleStandardLightAttackInit.bind(this),
                update: this.handleLightKickState.bind(this),
                validForm: [FighterState.IDLE, FighterState.WALK_BACKWARD, FighterState.WALK_FORWARD,],
            },
            [FighterState.HEAVY_KICK]: {
                attackType: FighterAttackType.KICK,
                attackStrength: FighterAttackStrength.HEAVY,
                init: this.handleStandardHeavyAttackInit.bind(this),
                update: this.handleMediumKickState.bind(this),
                validForm: [FighterState.IDLE, FighterState.WALK_BACKWARD, FighterState.WALK_FORWARD,],
            },
        };

        this.changeState(FighterState.IDLE);
    }
    
    isAnimationCompleted = () => this.animations[this.currentState][this.animationFrame][1] === FrameDelay.TRANSITION;

    hasCollidedWithOpponent = () => rectsOverlap(
        this.position.x + this.boxes.push.x, this.position.y + this.boxes.push.y,
        this.boxes.push.width, this.boxes.push.height,
        this.opponent.position.x + this.opponent.boxes.push.x,
        this.opponent.position.y + this.opponent.boxes.push.y,
        this.opponent.boxes.push.width, this.opponent.boxes.push.height,
    );
    
    resetVelocities() {
        this.velocity.x = 0;
        this.velocity.y = 0;
    }

    getDirection() {
        if(this.position.x + this.boxes.push.x + this.boxes.push.width
            <= this.opponent.position.x + this.opponent.boxes.push.x) {
            return FighterDirection.RIGHT;
        } else if(this.position.x + this.boxes.push.x
            >= this.opponent.position.x + this.opponent.boxes.push.x + this.opponent.boxes.push.width) {
            return FighterDirection.LEFT;
        }
        return this.direction;
    }
    
    getBoxes(frameKey) {
        const [
            , [pushX = 0, pushY = 0, pushWidth = 0, pushHeight = 0] = [],
            [head = [0, 0, 0, 0], body = [0, 0, 0, 0], feet = [0, 0, 0, 0]] = [],
            [hitX = 0, hitY = 0, hitWidth = 0, hitHeight = 0] = [],
        ] = this.frames.get(frameKey);

        return {
            push: {x: pushX, y: pushY, width: pushWidth, height:pushHeight},
            hurt: [head, body, feet], 
            hit: {x: hitX, y: hitY, width: hitWidth, height: hitHeight},
        };
    }

    changeState(newState) {
        if(newState === this.currentState
            || !this.states[newState].validForm.includes(this.currentState)) return;
            this.currentState = newState;
            this.animationFrame = 0;
            
            this.states[this.currentState].init();
        }
        
        handleIdleInit() {
            this.resetVelocities();
            this.attackStruck = false;
        }
        handleMoveInit() {
            this.velocity.x = this.initialVelocity.x[this.currentState] ?? 0;
        }
        handleJumpInit() {
            this.velocity.y = this.initialVelocity.jump;
            this.handleMoveInit();
        }
        handleCrouchInit() {
            this.resetVelocities();
        }
        handleJumpStartInit () {
            this.resetVelocities();
        }
        handleJumpLandInit () {
            this.resetVelocities();
            this.soundLand.play();
        }
        handleStandardLightAttackInit() {
            this.resetVelocities();
            this.soundHits[FighterAttackStrength.LIGHT].play();
        }
        
        handleStandardHeavyAttackInit() {
            this.resetVelocities();
            this.soundAttacks[FighterAttackStrength.HEAVY].play();
        }
        
    handleIdleState() {
        if (control.isUp(this.playerId)) {this.changeState(FighterState.JUMP_START);} else
        if (control.isDown(this.playerId)) {this.changeState(FighterState.CROUCH_DOWN);} else
        if (control.isBackward(this.playerId, this.direction)) {this.changeState(FighterState.WALK_BACKWARD);} else
        if (control.isForward(this.playerId, this.direction)) {this.changeState(FighterState.WALK_FORWARD);} else
        if (control.isLightPunch(this.playerId)) {this.changeState(FighterState.LIGHT_PUNCH);} else
        if (control.isHeavyPunch(this.playerId)) {this.changeState(FighterState.HEAVY_PUNCH);} else
        if (control.isLightKick(this.playerId)) {this.changeState(FighterState.LIGHT_KICK);} else
        if (control.isHeavyKick(this.playerId)) {this.changeState(FighterState.HEAVY_KICK);}


        const newDirection = this.getDirection();

        if(newDirection !== this.direction) {
            this.direction = newDirection;
            this.changeState(FighterState.IDLE_TURN)
        }
    }
    handleWalkForwardState() {
        if (control.isDown(this.playerId)){ 
            this.changeState(FighterState.CROUCH_DOWN);
        } else if (control.isUp(this.playerId)) {
             this.changeState(FighterState.JUMP_START);
        }else if (!control.isForward(this.playerId, this.direction)) {
            this.changeState(FighterState.IDLE);
        }

        if (control.isForward(this.playerId, this.direction)) {this.changeState(FighterState.WALK_FORWARD);} else
        if (control.isLightPunch(this.playerId)) {this.changeState(FighterState.LIGHT_PUNCH);} else
        if (control.isHeavyPunch(this.playerId)) {this.changeState(FighterState.HEAVY_PUNCH);} else
        if (control.isLightKick(this.playerId)) {this.changeState(FighterState.LIGHT_KICK);} else
        if (control.isHeavyKick(this.playerId)) {this.changeState(FighterState.HEAVY_KICK);}

        this.direction = this.getDirection();
    }
    handleWalkBackwardsState() {
        if (control.isUp(this.playerId)) {
             this.changeState(FighterState.JUMP_START);
        }else if (control.isDown(this.playerId)){ 
            this.changeState(FighterState.CROUCH_DOWN);
        }else if (!control.isBackward(this.playerId, this.direction)) {
        this.changeState(FighterState.IDLE);
        }

        if (control.isForward(this.playerId, this.direction)) {this.changeState(FighterState.WALK_FORWARD);} else
        if (control.isLightPunch(this.playerId)) {this.changeState(FighterState.LIGHT_PUNCH);} else
        if (control.isHeavyPunch(this.playerId)) {this.changeState(FighterState.HEAVY_PUNCH);} else
        if (control.isLightKick(this.playerId)) {this.changeState(FighterState.LIGHT_KICK);} else
        if (control.isHeavyKick(this.playerId)) {this.changeState(FighterState.HEAVY_KICK);}
    this.direction = this.getDirection();
    }

    handleCrouchState() {
        if (!control.isDown(this.playerId)){ 
            this.changeState(FighterState.CROUCH_UP);
        }

        const newDirection = this.getDirection();

        if(newDirection !== this.direction) {
            this.direction = newDirection;
            this.changeState(FighterState.CROUCH_TURN)
        }
    }
    handleCrouchDownState() {
        if(this.isAnimationCompleted) {
            this.changeState(FighterState.CROUCH);
        }

        if (!control.isDown(this.playerId)) {
            this.currentState = FighterState.CROUCH_UP;
            this.animationFrame = this.animations[FighterState.CROUCH_UP][this.animationFrame].length - this.animationFrame;
        }
        
    }
    handleCrouchUpState() {
        if(this.isAnimationCompleted) {
            this.changeState(FighterState.IDLE);
        }
    }

    handleJumpState(time) {
        this.velocity.y += this.gravity * time.secondPassed;

        if (this.position.y > STAGE_FLOOR) {
            this.position.y = STAGE_FLOOR;
            this.changeState(FighterState.JUMP_LAND);
        }
    }

    handleJumpStartState() {
        if(this.isAnimationCompleted) {
            if (control.isBackward(this.playerId, this.direction)) {
                this.changeState(FighterState.JUMP_BACKWARD);
            }else if (control.isForward(this.playerId, this.direction)) {
                this.changeState(FighterState.JUMP_FORWARD);
            }else {
                this.changeState(FighterState.JUMP_UP);
            }
        }
    }
    handleJumpLandState () {
        if(this.animationFrame < 1) return;

        let newState = FighterState.IDLE;

        if(!control.isIdle(this.playerId)) {
            this.direction = this.getDirection();

            this.handleIdleState();
        } else {
            const newDirection = this.getDirection();

            if(newDirection !== this.getDirection) {
                this.direction = newDirection;
                newState = FighterState.IDLE_TURN;
            } else {
                if (!this.isAnimationCompleted()) return;
            }
        }

        this.changeState(newState);
    }

    handleIdleTurnState() {
        this.handleIdleState();

        if(!this.isAnimationCompleted()) return;
        this.changeState(FighterState.IDLE);
    }

    handleCrouchTurnState() {
        this.handleCrouchState();

        if(!this.isAnimationCompleted()) return;
        this.changeState(FighterState.CROUCH);
    }
    handleLightPunchState() {
        if(this.animationFrame < 2) return;
        if(control.isLightPunch(this.playerId)) this.animationFrame = 0;
        if(!this.isAnimationCompleted()) return;
        this.changeState(FighterState.IDLE);
    }
    handleMediumPunchState() {
        if(!this.isAnimationCompleted()) return;
        this.changeState(FighterState.IDLE);
    }
    handleLightKickState() {
        if(this.animationFrame < 2) return;
        if(control.isLightKick(this.playerId)) this.animationFrame = 0;
        if(!this.isAnimationCompleted()) return;
        this.changeState(FighterState.IDLE);
    }
    handleMediumKickState() {
        if(!this.isAnimationCompleted()) return;
        this.changeState(FighterState.IDLE);
    }

    updateAnimation(time) {
        const animation = this.animations[this.currentState];
        const [, frameDelay] = animation[this.animationFrame];

        if(time.previous <= this.animationTimer + frameDelay * FRAME_TIME) return;
        this.animationTimer = time.previous;
            
        if(frameDelay <= FrameDelay.FREEZE);
        this.animationFrame++;
            
        if (this.animationFrame >= animation.length)this.animationFrame = 0;
        this.boxes = this.getBoxes(animation[this.animationFrame][0]);
    }

    updateStageConstraints(time, context, camera) {
        if (this.position.x > camera.position.x + context.canvas.width - this.boxes.push.width) {
            this.position.x = camera.position.x + context.canvas.width - this.boxes.push.width;
        }
        if ( this.position.x < camera.position.x + this.boxes.push.width) {
            this.position.x = camera.position.x + this.boxes.push.width;
        }

        if (this.hasCollidedWithOpponent()) {
            const overlapLeft = this.position.x <= this.opponent.position.x;
            const overlapRight = this.position.x >= this.opponent.position.x;

            const overlapAmount = (
                (this.boxes.push.x + this.boxes.push.width) + 
                (this.opponent.boxes.push.x + this.opponent.boxes.push.width) - 
                Math.abs(this.position.x - this.opponent.position.x)
            ) / 2;
    
            if (overlapLeft) {

                this.position.x = Math.max(
                    this.position.x - overlapAmount,
                    camera.position.x + this.boxes.push.width
                );

                this.opponent.position.x = Math.min(
                    this.opponent.position.x + overlapAmount,
                    camera.position.x + context.canvas.width - this.opponent.boxes.push.width
                );
            }
    
            if (overlapRight) {

                this.position.x = Math.min(
                    this.position.x + overlapAmount,
                    camera.position.x + context.canvas.width - this.boxes.push.width
                );

                this.opponent.position.x = Math.max(
                    this.opponent.position.x - overlapAmount,
                    camera.position.x + this.opponent.boxes.push.width
                );
            }
        }
        
    }

    updateAttackBoxCollided() {
        if (!this.states[this.currentState].attackType || this.attackStruck) return;
    
        const actualHitBox = getActualBoxDimensions(this.position, this.direction, this.boxes.hit);
    
        for (const hurt of this.opponent.boxes.hurt) {
            if (!Array.isArray(hurt) || hurt.length !== 4) {
                console.error('Invalid hurt box:', hurt);
                continue;
            }
    
            const [x, y, width, height] = hurt;
            const actualOpponentHurtBox = getActualBoxDimensions(
                this.opponent.position,
                this.opponent.direction,
                { x, y, width, height },
            );
    
            if (!boxOverlap(actualHitBox, actualOpponentHurtBox)) continue;
    
            const hurtIndex = this.opponent.boxes.hurt.indexOf(hurt);
            const hurtName = ['head', 'body', 'feet'];
            const strength = this.states[this.currentState].attackStrength;

            const hitPosition = {
                x: (actualHitBox.x + (actualHitBox.width / 2) + actualOpponentHurtBox.x + (actualOpponentHurtBox.width /2)) /2,
                y: (actualHitBox.y + (actualHitBox.height / 2) + actualOpponentHurtBox.y + (actualOpponentHurtBox.height /2)) /2,
            };
            hitPosition.x -= 4 - Math.random() * 8;
            hitPosition.y -= 4 - Math.random() * 8;

            this.onAttackHit(this.playerId, this.opponent.playerId, hitPosition, strength);

            console.log(
                `${gameState.fighters[this.playerId].id} has hit ${gameState.fighters[this.opponent.playerId].id}'s ${hurtName[hurtIndex] || 'unknown area'}`
            );
            
            this.attackStruck = true;
            return;
    
        }
    }
    

    update(time, context, camera) {
        this.position.x += (this.velocity.x * this.direction) * time.secondPassed;
        this.position.y += this.velocity.y * time.secondPassed;

        this.states[this.currentState].update(time, context);
        this.updateAnimation(time);
        this.updateStageConstraints(time, context, camera);
        this.updateAttackBoxCollided(time);
    }


    

    draw(context, camera) {
        const[frameKey] = this.animations[this.currentState][this.animationFrame];
        const [[
            [x, y, width, height],
            [originX, originY],
        ]] = this.frames.get(frameKey);

        context.scale(this.direction, 1);

        context.drawImage(
            this.image, 
            x, y, 
            width, height, 
            Math.floor((this.position.x -  camera.position.x) * this.direction) - originX,
            Math.floor(this.position.y - camera.position.y) - originY, 
            width, height
        );
        context.setTransform(1, 0, 0, 1, 0, 0);

        DEBUG_drawCollisionInfo(this, context, camera);
    }
    
}
