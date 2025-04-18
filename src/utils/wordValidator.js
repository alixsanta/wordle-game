import { WordleGame } from '../components/WordleGame.jsx';

// export function validateWord(word) {
//   const dictionary = WordleGame();
//   return dictionary.has(word.toLowerCase());
// }

/**
 * Valide un mot pour le jeu Wordle
 * @param {string} word - Le mot à valider
 * @returns {boolean} - Indique si le mot est valide
 */
export function validateWord(word) {
    // Vérifier si le mot est une chaîne non nulle
    if (!word || typeof word !== 'string') {
      return false;
    }
  
    // Convertir en majuscules
    const normalizedWord = word.toUpperCase();
  
    // Critères de validation
    const isCorrectLength = normalizedWord.length === 5;
    
    // Vérification des caractères alphabétiques
    const isAlphabetic = /^[A-Z]{5}$/.test(normalizedWord);
  
    // Retourne true si tous les critères sont respectés
    return isCorrectLength && isAlphabetic;
  }