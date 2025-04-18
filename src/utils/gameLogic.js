export const WORD_LENGTH = 5;
export const MAX_ATTEMPTS = 6;

/**
 * Vérifie si un mot est valide (5 lettres, alphabétique)
 * @param {string} word - Mot soumis par le joueur
 * @param {Set<string>} dictionary - Dictionnaire des mots valides
 * @returns {boolean}
 */
export function isValidWord(word, dictionary) {
    return typeof word === "string" &&
           word.length === WORD_LENGTH &&
           /^[A-Za-z]+$/.test(word) &&
           dictionary.has(word.toLowerCase());
}

/**
 * Compare la proposition du joueur avec le mot cible
 * @param {string} guess - Proposition du joueur
 * @param {string} targetWord - Mot à deviner
 * @returns {Array} - Résultat sous forme de tableau d'indices (green, yellow, gray)
 */
export function checkGuess(guess, targetWord) {
    let result = Array(WORD_LENGTH).fill("gray");
    let targetLetters = targetWord.split("");

    // Vérifier les lettres bien placées (vertes)
    for (let i = 0; i < WORD_LENGTH; i++) {
        if (guess[i] === targetWord[i]) {
            result[i] = "green";
            targetLetters[i] = null; // Éviter de compter deux fois
        }
    }

    // Vérifier les lettres présentes mais mal placées (jaunes)
    for (let i = 0; i < WORD_LENGTH; i++) {
        if (result[i] === "green") continue;
        let index = targetLetters.indexOf(guess[i]);
        if (index !== -1) {
            result[i] = "yellow";
            targetLetters[index] = null; // Éviter de compter deux fois
        }
    }

    return result;
}

/**
 * Gère l'état du jeu (tentatives restantes, victoire/défaite)
 * @param {string} guess - Mot soumis
 * @param {string} targetWord - Mot cible
 * @param {number} attemptsLeft - Nombre d'essais restants
 * @returns {Object} - Nouvel état du jeu
 */
export function updateGameState(guess, targetWord, attemptsLeft) {
    const feedback = checkGuess(guess, targetWord);
    const isWin = guess === targetWord;
    const newAttemptsLeft = attemptsLeft - 1;
    const isGameOver = isWin || newAttemptsLeft === 0;

    return {
        feedback,
        attemptsLeft: newAttemptsLeft,
        isWin,
        isGameOver
    };
}
