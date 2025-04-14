import { validateWord } from '../utils/wordValidator.js';

describe('Validation des mots pour Wordle', () => {
  // Cas de mots valides
  test('Mots valides sont acceptés', () => {
    expect(validateWord('HELLO')).toBe(true);
    expect(validateWord('WORLD')).toBe(true);
    expect(validateWord('react')).toBe(true); // Test insensibilité à la casse
  });

  // Cas de mots invalides
  test('Mots trop courts sont rejetés', () => {
    expect(validateWord('TEST')).toBe(false);
    expect(validateWord('HI')).toBe(false);
  });

  test('Mots trop longs sont rejetés', () => {
    expect(validateWord('TESTER')).toBe(false);
    expect(validateWord('LONGWORD')).toBe(false);
  });

  test('Mots avec des caractères non alphabétiques sont rejetés', () => {
    expect(validateWord('HEL2O')).toBe(false);
    expect(validateWord('WOR-LD')).toBe(false);
    expect(validateWord('HE LLO')).toBe(false);
  });

  test('Entrées nulles ou incorrectes sont rejetées', () => {
    expect(validateWord(null)).toBe(false);
    expect(validateWord(undefined)).toBe(false);
    expect(validateWord(123)).toBe(false);
  });
});