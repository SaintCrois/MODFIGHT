import { registerKeyboardEvents } from './engine/InputHandler.js';
import { getContext } from './utils/context.js';
import { BattleScene } from './scene/BattleScene.js';

export class StreetFighterGame {
    context = getContext();
    frameTime = {
        previous: 0,
        secondPassed: 0,
    };

    constructor() {
        this.scene = new BattleScene();
    }
    
    frame(time) {
        window.requestAnimationFrame(this.frame.bind(this));

        this.frameTime = {
            secondPassed: (time - this.frameTime.previous) / 1000,
            previous: time,
        };

        this.scene.update(this.frameTime, this.context);
        this.scene.draw(this.context);
    }

    start() {
        registerKeyboardEvents();

        window.requestAnimationFrame(this.frame.bind(this));
    }
}