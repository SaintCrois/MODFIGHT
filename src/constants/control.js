export const Control = {
    LEFT: 'left',
    RIGHT: 'right',
    UP: 'up',
    DOWN: 'down',
    LIGHT_PUNCH: 'lightPunch',
    HEAVY_PUNCH: 'heavyPunch',
    LIGHT_KICK: 'lightKick',
    HEAVY_KICK: 'heavyKick',
};

export const controls = [
    {
        keyboard: {
            [Control.LEFT]: 'ArrowLeft',
            [Control.RIGHT]: 'ArrowRight',
            [Control.UP]: 'ArrowUp',
            [Control.DOWN]: 'ArrowDown',
            [Control.LIGHT_PUNCH]: 'Slash',
            [Control.HEAVY_PUNCH]: 'Space',
            [Control.LIGHT_KICK]: 'Semicolon',
            [Control.HEAVY_KICK]: 'Quote',
        },
    },
    {
        keyboard: {
            [Control.LEFT]: 'KeyA',
            [Control.RIGHT]: 'KeyD',
            [Control.UP]: 'KeyW',
            [Control.DOWN]: 'KeyS',
            [Control.LIGHT_PUNCH]: 'KeyE',
            [Control.HEAVY_PUNCH]: 'KeyQ',
            [Control.LIGHT_KICK]: 'KeyZ',
            [Control.HEAVY_KICK]: 'KeyC',
        },
    }
];