import { isValidWord, updateGameState } from './gameLogic.js';

/**
 * Gère une tentative de devinette dans le jeu.
 * @param {string} guess - Le mot soumis par le joueur.
 * @param {string} targetWord - Le mot cible à deviner.
 * @param {Object} game - L'état actuel du jeu contenant le dictionnaire, les tentatives restantes et l'historique.
 * @returns {Object} - Le nouvel état mis à jour du jeu après la tentative.
 */
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
