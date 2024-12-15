import { Fighter } from './Fighter.js';
import {FighterState, FrameDelay, HurtBox, PushBox} from '../../constants/fighter.js';

export class Jumpol extends Fighter {
    constructor(playerId, onAttackHit) {
        super(playerId, onAttackHit);

        this.image = document.querySelector('img[alt="jumpol"]');

        this.frames = new Map([
            ['Idle-1', [[[21, 243, 70, 116], [35, 115]], PushBox.IDLE, HurtBox.JIDLE]],
            ['Idle-2', [[[141, 244, 70, 115], [35, 114]], PushBox.IDLE, HurtBox.JIDLE]],

            ['jump-up-1', [[[21, 483, 70, 116], [35, 115]], PushBox.JUMP, HurtBox.JIDLE]],
            ['jump-up-2', [[[133, 485, 78, 113], [39, 112]], PushBox.JUMP, HurtBox.JIDLE]],
            ['jump-up-3', [[[258, 486, 83, 101], [41, 100]], PushBox.JUMP, HurtBox.JIDLE]],

            ['jump-start-1', [[[258, 486, 83, 101], [41, 100]], PushBox.CROUCH, HurtBox.CROUCH]],

            ['jump-land', [[[1, 604, 70, 116], [35, 115]], PushBox.IDLE, HurtBox.CROUCH]],

            ['crouch-1', [[[21, 363, 70, 116], [35, 115]], PushBox.CROUCH, HurtBox.CROUCH]],
            ['crouch-2', [[[141, 366, 66, 113], [33, 112]], PushBox.CROUCH, HurtBox.CROUCH]],
            ['crouch-3', [[[273, 380, 59, 97], [27, 96]], PushBox.CROUCH, HurtBox.CROUCH]],

            ['crouch-turn-1', [[[273, 380, 59, 97], [27, 96]], PushBox.CROUCH, HurtBox.CROUCH]],
            ['crouch-turn-2', [[[15, 873, 49, 97], [24, 96]], PushBox.CROUCH, HurtBox.CROUCH]],
            ['crouch-turn-3', [[[83, 874, 59, 97], [29, 96]], PushBox.CROUCH, HurtBox.CROUCH]],

            ['idle-turn-1', [[[141, 3, 80, 116], [40, 115]], PushBox.IDLE, HurtBox.IDLE]],
            ['idle-turn-2', [[[392, 3, 66, 115], [33, 114]], PushBox.IDLE, HurtBox.IDLE]],
            ['idle-turn-3', [[[258, 3, 73, 116], [31, 115]], PushBox.IDLE, HurtBox.IDLE]],


            ['jump-roll-1', [[[1, 604, 70, 116], [35, 115]], PushBox.JUMP, HurtBox.JJUMP]],
            ['jump-roll-2', [[[133, 599, 93, 111], [46, 110]], PushBox.JUMP, HurtBox.JJUMP]],
            ['jump-roll-3', [[[1, 604, 70, 116], [35, 115]], PushBox.JUMP, HurtBox.JJUMP]],
            ['jump-roll-4', [[[50, 723, 70, 116], [35, 115]], PushBox.JUMP, HurtBox.JJUMP]],
            ['jump-roll-5', [[[161, 721, 62, 117], [31, 116]], PushBox.JUMP, HurtBox.JJUMP]],
            ['jump-roll-6', [[[240, 723, 70, 115], [35, 114]], PushBox.JUMP, HurtBox.JJUMP]],

            ['forwards-1', [[[21, 3, 70, 116], [35, 115]], PushBox.IDLE, HurtBox.JFORWARD]],
            ['forwards-2', [[[141, 3, 80, 116], [40, 115]], PushBox.IDLE, HurtBox.JFORWARD]],
            ['forwards-3', [[[258, 3, 73, 116], [31, 115]], PushBox.IDLE, HurtBox.JFORWARD]],
            ['forwards-4', [[[392, 3, 66, 115], [33, 114]], PushBox.IDLE, HurtBox.JFORWARD]],

            ['backwards-1', [[[14, 123, 82, 116], [41, 115]], PushBox.IDLE, HurtBox.JBACKWARD]],
            ['backwards-2', [[[141, 123, 70, 116], [35, 115]], PushBox.IDLE, HurtBox.JBACKWARD]],

            ['light-punch-1', [[[120, 1008, 58, 116], [29, 115]], PushBox.IDLE, HurtBox.IDLE]],
            ['light-punch-2', [[[212, 1008, 81, 116], [35, 115]], PushBox.IDLE, [[-10, -112, 24, 25], [-5, -90, 40, 42], [-20, -51, 40, 52]], [-10, -85, 55, 10]]],

            ['heavy-punch-1', [[[120, 1008, 58, 116], [29, 115]], PushBox.IDLE, HurtBox.IDLE]],
            ['heavy-punch-2', [[[304, 1008, 61, 116], [31, 115]], PushBox.IDLE, HurtBox.IDLE, [-18, -85, 55, 10]]],
            ['heavy-punch-3', [[[378, 1008, 73, 116], [36, 115]], PushBox.IDLE, [[-10, -112, 24, 25], [-5, -90, 40, 42], [-20, -51, 40, 52]], [-18, -85, 55, 10]]],

            ['light-kick-1', [[[21, 243, 70, 116], [35, 115]], PushBox.IDLE, HurtBox.IDLE]],
            ['light-kick-2', [[[122, 1370, 87, 115], [43, 114]], PushBox.IDLE, [[-10, -112, 24, 25], [-20, -90, 40, 42], [-15, -51, 50, 55]], [-12, -51, 50, 55]]],

            ['heavy-kick-1', [[[21, 243, 70, 116], [35, 115]], PushBox.IDLE, [[-10, -112, 24, 25], [-20, -90, 40, 42], [-25, -51, 50, 55]]]],
            ['heavy-kick-2', [[[122, 1370, 87, 115], [43, 114]], PushBox.IDLE, [[-10, -112, 24, 25], [-20, -90, 40, 42], [-25, -51, 50, 55]], [-12, -51, 50, 55]]],
            ['heavy-kick-3', [[[135, 1128, 68, 113], [34, 112]], PushBox.IDLE, [[-10, -112, 24, 25], [-20, -90, 40, 42], [-10, -55, 50, 55]], [-10, -57, 50, 55]]],
        ]);

        this.animations = {
            [FighterState.IDLE] : [
                ['Idle-1', 4], ['Idle-2', 4], ['Idle-2', 4], ['Idle-1', 4],
            ],
            [FighterState.WALK_FORWARD] : [
                ['forwards-1', 4], ['forwards-2', 4], ['forwards-3', 4], ['forwards-2', 4],
            ],
            [FighterState.WALK_BACKWARD] : [
                ['backwards-1', 4], ['backwards-2', 4], ['backwards-1', 4], ['backwards-2', 4],
            ],
            [FighterState.JUMP_START]: [
                ['jump-start-1', 6], ['jump-start-1', FrameDelay.TRANSITION],
            ],
            [FighterState.JUMP_UP]: [
                ['jump-up-1', 21], ['jump-up-2', 12], ['jump-up-3', 21],
            ],
            [FighterState.JUMP_FORWARD]: [
                ['jump-roll-1', 9], ['jump-roll-2', 9], ['crouch-3', 12], ['jump-roll-3', 21],
            ],
            [FighterState.JUMP_BACKWARD]: [
                ['jump-roll-4', 21], ['jump-roll-5', 12], ['jump-roll-6', 21],
            ],
            [FighterState.JUMP_LAND]: [
                ['jump-land', 2], ['jump-land', 7], ['jump-land', FrameDelay.TRANSITION],
            ],
            [FighterState.CROUCH]: [
                ['crouch-3', FrameDelay.FREEZE],
            ],
            [FighterState.CROUCH_DOWN]: [
                ['crouch-1', 2], ['crouch-2', 2], ['crouch-3', 2], ['crouch-3', FrameDelay.TRANSITION],
            ],
            [FighterState.CROUCH_UP]: [
                ['crouch-3', 2], ['crouch-2', 2], ['crouch-1', 2], ['crouch-1', FrameDelay.TRANSITION], 
            ],
            [FighterState.IDLE_TURN]: [
                ['idle-turn-3', 2], ['idle-turn-2', 2], ['idle-turn-1', 2], ['idle-turn-1', FrameDelay.TRANSITION], 
            ],
            [FighterState.CROUCH_TURN]: [
                ['crouch-turn-3', 2], ['crouch-turn-2', 2], ['crouch-turn-1', 2], ['crouch-turn-1', FrameDelay.TRANSITION],
            ],
            [FighterState.LIGHT_PUNCH]: [
                ['light-punch-1', 2], ['light-punch-2', 5], ['light-punch-1', 4], ['light-punch-1', FrameDelay.TRANSITION],
            ],
            [FighterState.HEAVY_PUNCH]: [
                ['heavy-punch-1', 3], ['heavy-punch-2', 2], ['heavy-punch-3', 8],
                ['heavy-punch-2', 10], ['heavy-punch-1', 11], ['heavy-punch-1', FrameDelay.TRANSITION],
            ],
            [FighterState.LIGHT_KICK]: [
                ['light-kick-1', 8], ['light-kick-2', 9], ['light-kick-1', 4], ['light-kick-1', FrameDelay.TRANSITION],
            ],
            [FighterState.HEAVY_KICK]: [
                ['heavy-kick-1', 2], ['heavy-kick-2', 4], ['heavy-kick-3', 8],
                ['heavy-kick-2', 10], ['heavy-kick-1', 8], ['heavy-kick-1', FrameDelay.TRANSITION],
            ],
        };

        this.initialVelocity = {
            x: {
                [FighterState.WALK_FORWARD] : 3 * 60,
                [FighterState.WALK_BACKWARD] : -(2 * 60),
                [FighterState.JUMP_FORWARD]: ((48 * 3) + (12 * 2)),
                [FighterState.JUMP_BACKWARD]: -((45 * 4 ) + (15 * 3)),
            },
            jump: -450,
        };

        this.gravity = 1000;
    }
}
