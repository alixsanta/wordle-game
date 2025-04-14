// src/utils/gameState.js
import { isValidWord, updateGameState } from './gameLogic.js';

export function makeGuess(guess, targetWord, game) {
  const { dictionary, attemptsLeft, history } = game;

  if (!isValidWord(guess, dictionary)) {
    return {
      ...game,
      message: 'Invalid word.',
    };
  }

  const result = updateGameState(guess, targetWord, attemptsLeft);

  return {
    ...game,
    attemptsLeft: result.attemptsLeft,
    isWin: result.isWin,
    isGameOver: result.isGameOver,
    feedback: result.feedback,
    history: [...history, { guess, feedback: result.feedback }],
    message: '',
  };
}
