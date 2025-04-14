// src/__tests__/gameState.test.js
import { makeGuess } from '../utils/gameState.js';

const targetWord = 'apple';
const dictionary = new Set(['apple', 'peach', 'grape', 'plums']);

describe('makeGuess()', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      attemptsLeft: 6,
      isWin: false,
      isGameOver: false,
      feedback: [],
      history: [],
      dictionary,
      message: '',
    };
  });

  test('should update state correctly for valid winning guess', () => {
    const newState = makeGuess('apple', targetWord, initialState);

    expect(newState.isWin).toBe(true);
    expect(newState.isGameOver).toBe(true);
    expect(newState.feedback).toEqual(['green', 'green', 'green', 'green', 'green']);
    expect(newState.attemptsLeft).toBe(5); // no penalty for correct guess
    expect(newState.history.length).toBe(1);
  });

  test('should update state correctly for incorrect guess', () => {
    const newState = makeGuess('grape', targetWord, initialState);

    expect(newState.isWin).toBe(false);
    expect(newState.isGameOver).toBe(false);
    expect(newState.feedback).toBeInstanceOf(Array);
    expect(newState.attemptsLeft).toBe(5);
    expect(newState.history.length).toBe(1);
  });

  test('should reject invalid guess not in dictionary', () => {
    const newState = makeGuess('zzzzz', targetWord, initialState);

    expect(newState.message).toBe('Invalid word.');
    expect(newState.history.length).toBe(0);
    expect(newState.attemptsLeft).toBe(6); // no change
  });

  test('should set isGameOver to true when attempts reach 0', () => {
    const oneTryLeft = { ...initialState, attemptsLeft: 1 };
    const newState = makeGuess('grape', targetWord, oneTryLeft);

    expect(newState.attemptsLeft).toBe(0);
    expect(newState.isGameOver).toBe(true);
    expect(newState.isWin).toBe(false);
  });
});
