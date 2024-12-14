import {Fighter} from './Fighter.js';
import {FighterState, FrameDelay, HurtBox, PushBox} from '../../constants/fighter.js';

export class Natasha extends Fighter {
    constructor(playerId, onAttackHit) {
        super(playerId, onAttackHit);

        this.image = document.querySelector('img[alt="natasha"]');

        this.frames = new Map([
            ['Idle-1', [[[21, 243, 66, 116], [33, 115]], PushBox.IDLE, HurtBox.IDLE]],
            ['Idle-2', [[[141, 244, 66, 115], [33, 114]], PushBox.IDLE, HurtBox.IDLE]],

            ['jump-up-1', [[[17, 485, 67, 113], [33, 112]], PushBox.JUMP, HurtBox.JUMP]],
            ['jump-up-2', [[[228, 481, 65, 106], [33, 105]], PushBox.JUMP, HurtBox.JUMP]],
            ['jump-up-3', [[[148, 483, 59, 116], [33, 115]], PushBox.JUMP, HurtBox.JUMP]],

            ['jump-start-1', [[[228, 481, 65, 106], [33, 105]], PushBox.CROUCH]],

            ['jump-land', [[[228, 481, 65, 106], [33, 105]], PushBox.IDLE, HurtBox.CROUCH]],

            ['crouch-1', [[[21, 363, 66, 116], [33, 115]], PushBox.IDLE, HurtBox.IDLE]],
            ['crouch-2', [[[137, 365, 67, 113], [33, 112]], PushBox.BEND, HurtBox.CROUCH]],
            ['crouch-3', [[[242, 382, 58, 89], [29, 88]], PushBox.CROUCH, HurtBox.CROUCH]],

            ['crouch-turn-1', [[[0, 853, 53, 89], [26, 88]], PushBox.CROUCH, HurtBox.CROUCH]],
            ['crouch-turn-2', [[[62, 853, 42, 89], [21, 88]], PushBox.CROUCH, HurtBox.CROUCH]],
            ['crouch-turn-3', [[[111, 853, 58, 89], [26, 88]], PushBox.CROUCH, HurtBox.CROUCH]],

            ['idle-turn-1', [[[21, 243, 66, 116], [33, 115]], PushBox.IDLE, HurtBox.IDLE]],
            ['idle-turn-2', [[[197, 854, 45, 116], [22, 115]], PushBox.IDLE, HurtBox.IDLE]],
            ['idle-turn-3', [[[248, 854, 66, 116], [33, 115]], PushBox.IDLE, HurtBox.IDLE]],

            ['jump-roll-1', [[[5, 603, 66, 116], [33, 115]], PushBox.JUMP, HurtBox.JUMP]],
            ['jump-roll-2', [[[131, 600, 84, 112], [33, 111]], PushBox.JUMP, [[-5, -112, 24, 25], [-5, -90, 40, 42], [-2, -51, 40, 52]]]],
            ['jump-roll-3', [[[291, 603, 68, 116], [34, 115]], PushBox.JUMP, HurtBox.JUMP]],
            ['jump-roll-4', [[[53, 724, 66, 116], [33, 115]], PushBox.JUMP, HurtBox.JUMP]],
            ['jump-roll-5', [[[162, 720, 63, 116], [33, 115]], PushBox.JUMP, HurtBox.JUMP]],
            ['jump-roll-6', [[[241, 724, 68, 116], [34, 115]], PushBox.JUMP, HurtBox.JUMP]],

            ['forwards-1', [[[32, 2, 66, 116], [33, 115]], PushBox.IDLE, HurtBox.IDLE]],
            ['forwards-2', [[[152, 2, 64, 116], [32, 115]], PushBox.IDLE, HurtBox.IDLE]],
            ['forwards-3', [[[281, 3, 58, 116], [29, 115]], PushBox.IDLE, HurtBox.IDLE]],
            ['forwards-4', [[[392, 3, 66, 115], [33, 114]], PushBox.IDLE, HurtBox.IDLE]],

            ['backwards-1', [[[32, 122, 66, 116], [33, 115]], PushBox.IDLE, HurtBox.IDLE]],
            ['backwards-2', [[[146, 123, 72, 115], [36, 113]], PushBox.IDLE, HurtBox.IDLE]],
            ['backwards-3', [[[272, 122, 67, 118], [33, 117]], PushBox.IDLE, HurtBox.IDLE]],
            ['backwards-4', [[[392, 121, 66, 117], [33, 116]], PushBox.IDLE, HurtBox.IDLE]],

            ['light-punch-1', [[[240, 977, 62, 116], [31, 115]], PushBox.IDLE, HurtBox.IDLE]],
            ['light-punch-2', [[[120, 977, 82, 116], [41, 115]], PushBox.IDLE, [[-15, -112, 24, 25], [-20, -90, 50, 42], [-26, -51, 40, 52]], [-16, -83, 55, 10]]],

            ['heavy-punch-1', [[[312, 977, 61, 116], [30, 115]], PushBox.IDLE, HurtBox.IDLE]],
            ['heavy-punch-2', [[[240, 977, 62, 116], [31, 115]], PushBox.IDLE, HurtBox.IDLE, [-19, -83, 45, 10]]],
            ['heavy-punch-3', [[[387, 977, 61, 116], [30, 115]], PushBox.IDLE, HurtBox.IDLE, [-19, -83, 45, 10]]],

            ['light-kick-1', [[[240, 977, 62, 116], [31, 115]], PushBox.IDLE, HurtBox.IDLE]],
            ['light-kick-2', [[[371, 1226, 70, 115], [35, 114]], PushBox.IDLE, [[-15, -112, 24, 25], [-20, -90, 40, 42], [-15, -51, 45, 52]], [-15, -51, 45, 52]]],

            ['heavy-kick-1', [[[240, 977, 62, 116], [31, 115]], PushBox.IDLE, HurtBox.IDLE]],
            ['heavy-kick-2', [[[371, 1226, 70, 115], [35, 114]], PushBox.IDLE, [[-15, -112, 24, 25], [-20, -90, 40, 42], [-15, -51, 45, 52]], [-15, -51, 45, 52]]],
            ['heavy-kick-3', [[[122, 1096, 88, 114], [44, 113]], PushBox.IDLE, [[-15, -112, 24, 25], [-20, -90, 40, 42], [-15, -51, 50, 52]], [-15, -51, 50, 52]]],


        ]);

        this.animations = {
            [FighterState.IDLE] : [
                ['Idle-1', 4], ['Idle-2', 4], ['Idle-2', 4], ['Idle-1', 4],
            ],
            [FighterState.WALK_FORWARD] : [
                ['forwards-1', 4], ['forwards-2', 4], ['forwards-3', 4], ['forwards-4', 4],
            ],
            [FighterState.WALK_BACKWARD] : [
                ['backwards-1', 4], ['backwards-2', 4], ['backwards-3', 4], ['backwards-4', 4],
            ],
            [FighterState.JUMP_UP]: [
                ['jump-up-1', 21], ['jump-up-2', 12], ['jump-up-3', 21],
            ],
            [FighterState.JUMP_START]: [
                ['jump-start-1', 8], ['jump-start-1', FrameDelay.TRANSITION],
            ],
            [FighterState.JUMP_FORWARD]: [
                ['jump-roll-1', 9], ['jump-roll-2', 12], ['crouch-3', 14], ['jump-roll-3', 21],
            ],
            [FighterState.JUMP_BACKWARD]: [
                ['jump-roll-4', 21], ['jump-roll-5', 12], ['jump-roll-6', 21],
            ],
            [FighterState.JUMP_LAND]: [
                ['jump-land', 2], ['jump-land', 8], ['jump-land', FrameDelay.TRANSITION],
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
                ['light-punch-1', 2], ['light-punch-2', 4], ['light-punch-1', 4], ['light-punch-1', FrameDelay.TRANSITION],
            ],
            [FighterState.HEAVY_PUNCH]: [
                ['heavy-punch-1', 4], ['heavy-punch-2', 2], ['heavy-punch-3', 8],
                ['heavy-punch-2', 10], ['heavy-punch-1', 7], ['heavy-punch-1', FrameDelay.TRANSITION],
            ],
            [FighterState.LIGHT_KICK]: [
                ['light-kick-1', 8], ['light-kick-2', 9], ['light-kick-1', 4], ['light-kick-1', FrameDelay.TRANSITION],
            ],
            [FighterState.HEAVY_KICK]: [
                ['heavy-kick-1', 3], ['heavy-kick-2', 4], ['heavy-kick-3', 8],
                ['heavy-kick-2', 10], ['heavy-kick-1', 7], ['heavy-kick-1', FrameDelay.TRANSITION],
            ],
        };

        this.initialVelocity = {
            x: {
                [FighterState.WALK_FORWARD] : 3 * 60,
                [FighterState.WALK_BACKWARD] : -(2 * 60),
                [FighterState.JUMP_FORWARD]: ((48 * 3) + (12 * 2)),
                [FighterState.JUMP_BACKWARD]: -((45 * 4 ) + (15 * 3)),
            },
            jump: -480,
        };

        this.gravity = 1000;
    }
}