import { isValidWord, updateGameState } from '../utils/gameLogic.js';

describe('isValidWord', () => {
  test('should return true for valid words', () => {
    expect(isValidWord('apple', new Set(['apple']))).toBe(true);
    expect(isValidWord('apple', new Set(['apple', 'banana']))).toBe(true);
  });

  test('should return false for invalid words', () => {
    expect(isValidWord('apple', new Set(['banana']))).toBe(false);
    expect(isValidWord('apple', new Set(['banana', 'cherry']))).toBe(false);
  });
});

describe('updateGameState', () => {
  test('should return correct feedback for valid words', () => {
    expect(updateGameState('apple', 'apple', 5)).toEqual({
      feedback: ['green', 'green', 'green', 'green', 'green'],
      attemptsLeft: 4,
      isGameOver: true,
      isWin: true
    });
  });

  test('should return correct feedback for invalid words', () => {
    expect(updateGameState('zzzzz', 'apple', 5)).toEqual({
      feedback: ['gray', 'gray', 'gray', 'gray', 'gray'],
      attemptsLeft: 4,
      isGameOver: false,
      isWin: false
    });
  });

  test('should return correct feedback for partially correct words', () => {
    expect(updateGameState('papel', 'apple', 5)).toEqual({
      feedback: ['yellow', 'yellow', 'green', 'yellow', 'yellow'],
      attemptsLeft: 4,
      isGameOver: false,
      isWin: false
    });
  });
});
