import { Control, controls } from '../constants/control.js';
import { FighterDirection } from '../constants/fighter.js';

const heldKeys = new Set();
const pressedKeys = new Set();

const mappedKeys = controls.map(({keyboard}) => Object.values(keyboard)).flat();

function handleKeyDown(event) {
    if (!mappedKeys.includes(event.code)) return;
    
    event.preventDefault();
    heldKeys.add(event.code);
}

function handleKeyUp(event) {
    if (!mappedKeys.includes(event.code)) return;
    
    event.preventDefault();
    heldKeys.delete(event.code);
    pressedKeys.delete(event.code);
}

export function registerKeyboardEvents() {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
}

export const isKeyDown = (code) => heldKeys.has(code);
export const isKeyUp = (code) => !heldKeys.has(code);

export function isKeyPressed(code) {
    if(heldKeys.has(code) && !pressedKeys.has(code)) {
        pressedKeys.add(code);
        return true;
    }

    return false;
}

export const isLeft = (id) => isKeyDown(controls[id].keyboard[Control.LEFT]);
export const isRight = (id) => isKeyDown(controls[id].keyboard[Control.RIGHT]);
export const isUp = (id) => isKeyDown(controls[id].keyboard[Control.UP]);
export const isDown = (id) => isKeyDown(controls[id].keyboard[Control.DOWN]);
export const isControlDown = (id) => isKeyDown(controls[id].keyboard[Control.LIGHT_PUNCH]);
export const isControlPressed = (id) => isKeyPressed(controls[id].keyboard[Control.LIGHT_PUNCH]);
export const isHeavyPressed = (id) => isKeyPressed(controls[id].keyboard[Control.HEAVY_PUNCH]);
export const isLKickPressed = (id) => isKeyPressed(controls[id].keyboard[Control.LIGHT_KICK]);
export const isHKickPressed = (id) => isKeyPressed(controls[id].keyboard[Control.HEAVY_KICK]);

export const isForward = (id, direction) => direction === FighterDirection.RIGHT ? isRight(id) : isLeft(id);
export const isBackward = (id, direction) => direction === FighterDirection.LEFT ? isRight(id) : isLeft(id);

export const isIdle = (id) => !(isLeft(id)) || (isRight(id)) || (isUp(id)) || (isDown(id));

export const isLightPunch = (id) => isControlPressed(id, Control.LIGHT_PUNCH);
export const isHeavyPunch = (id) => isHeavyPressed(id, Control.HEAVY_PUNCH);

export const isLightKick = (id) => isLKickPressed(id, Control.LIGHT_KICK);
export const isHeavyKick = (id) => isHKickPressed(id, Control.HEAVY_KICK);