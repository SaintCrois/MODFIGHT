import { StreetFighterGame } from './StreetFighterGame.js';

window.addEventListener ('load', function() {
    new StreetFighterGame().start();
});

window.addEventListener('DOMContentLoaded', () => {
    const restartButton = document.getElementById('restart-button');
    restartButton.addEventListener('click', function() {
        location.reload();
    });
});
