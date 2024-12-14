import { FighterId } from '../constants/fighter.js';
import { createDefaultFighterState } from './FighterState.js';

export const gameState = {
  fighters: [
    createDefaultFighterState(FighterId.NATASHA),
    createDefaultFighterState(FighterId.JUMPOL),
  ],
};
