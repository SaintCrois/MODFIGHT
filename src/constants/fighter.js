export const PUSH_FRICTION = 66;
export const FIGHTER_START_DISTANCE = 88;

export const FighterDirection = {
    LEFT: -1,
    RIGHT: 1,
};

export const FighterId = {
    NATASHA: 'Natasha',
    JUMPOL: 'Jumpol',
};

export const FighterAttackType = {
    PUNCH: 'punch',
    KICK: 'kick',
}

export const FighterAttackStrength = {
    LIGHT: 'light',
    HEAVY: 'heavy',
};

export const FighterAttackBaseData = {
    [FighterAttackStrength.LIGHT]: {
        score: 200,
        damage: 12,
    },
    [FighterAttackStrength.HEAVY]: {
        score: 500,
        damage: 28
    }
};

export const FighterState = {
    IDLE: 'idle',
    WALK_FORWARD: 'walkForwards',
    WALK_BACKWARD: 'walkBackwards',
    JUMP_START: 'jumpStart',
    JUMP_UP: 'jumpUP',
    JUMP_FORWARD: 'jumpForwards',
    JUMP_BACKWARD: 'jumpBackwards',
    JUMP_LAND: 'jumpLand',
    CROUCH: 'crouch',
    CROUCH_DOWN: 'crouchDown',
    CROUCH_UP: 'crouchUp',
    IDLE_TURN: 'idleTurn',
    CROUCH_TURN: 'crouchTurn',
    LIGHT_PUNCH: 'lightPunch',
    HEAVY_PUNCH: 'heavyPunch',
    LIGHT_KICK: 'lightKick',
    HEAVY_KICK: 'heavyKick',
};

export const FrameDelay = {
    FREEZE: 0,
    TRANSITION: -1,
}

export const PushBox = {
    IDLE: [-16, -100, 38, 100],
    JUMP: [-16, -121, 32, 80],
    BEND: [-16, -78, 32, 100],
    CROUCH: [-16, -70, 32, 72],
};
export const HurtBox = {
    IDLE: [[-15, -112, 24, 25], [-20, -90, 40, 42], [-26, -51, 40, 52]],
    JIDLE: [[-10, -112, 24, 25], [-20, -90, 40, 42], [-20, -51, 40, 52]],
    FORWARD: [[-15, -112, 24, 25], [-20, -90, 40, 42], [-26, -51, 40, 52]],
    JFORWARD: [[-15, -112, 24, 25], [-20, -90, 40, 42], [-20, -51, 40, 52]],
    BACKWARD: [[-15, -112, 24, 25], [-20, -90, 40, 42], [-26, -51, 40, 52]],
    JBACKWARD: [[-10, -112, 24, 25], [-20, -90, 40, 42], [-20, -51, 40, 52]],
    JUMP: [[-15, -112, 24, 25], [-30, -90, 40, 42], [-26, -51, 40, 52]],
    JJUMP: [[-15, -112, 24, 25], [-20, -90, 40, 42], [-26, -51, 40, 52]],
    BEND: [[-15, -112, 24, 25], [-20, -90, 40, 42], [-26, -51, 40, 52]],
    CROUCH: [[-15, -90, 24, 25], [-20, -70, 40, 42], [-26, -51, 40, 52]],
    PUNCH: [[-15, -112, 24, 25], [-20, -90, 40, 42], [-26, -51, 40, 52]],
};