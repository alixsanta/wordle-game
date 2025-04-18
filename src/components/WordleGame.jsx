import React, { useState, useEffect } from "react";
import { isValidWord, updateGameState, WORD_LENGTH, MAX_ATTEMPTS } from "../utils/gameLogic";

const dictionary = new Set(["hello", "world", "chien", "table", "etape", "chats", "mouru", "boire", "verte", "pomme", "chate", "livre", "gazon", "route", "amour", "boisé", "fleur", "garde", "plage", "ronde", "chute", "riche", "trame", "pitre", "poire", "alpha"]);

const WordleGame = () => {
    const [targetWord, setTargetWord] = useState("apple"); // Mot à deviner
    const [attempts, setAttempts] = useState([]);
    const [currentGuess, setCurrentGuess] = useState("");
    const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS);
    const [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Sélectionner un mot aléatoire au début du jeu
        const wordsArray = Array.from(dictionary);
        setTargetWord(wordsArray[Math.floor(Math.random() * wordsArray.length)]);
    }, []);

    const handleInputChange = (e) => {
        if (e.target.value.length <= WORD_LENGTH) {
            setCurrentGuess(e.target.value.toLowerCase());
        }
    };

    const handleSubmit = () => {
        if (gameOver) return;

        if (!isValidWord(currentGuess, dictionary)) {
            setMessage("Mot invalide !");
            return;
        }

        const gameState = updateGameState(currentGuess, targetWord, attemptsLeft);
        setAttempts([...attempts, { word: currentGuess, feedback: gameState.feedback }]);
        setAttemptsLeft(gameState.attemptsLeft);
        setGameOver(gameState.isGameOver);
        
        if (gameState.isWin) {
            setMessage("🎉 Bravo ! Vous avez trouvé le mot !");
        } else if (gameState.isGameOver) {
            setMessage(`😢 Perdu ! Le mot était "${targetWord}".`);
        } else {
            setMessage("");
        }

        setCurrentGuess("");
    };

    return (
        <div className="wordle-container">
            <h1>Wordle</h1>
            <div className="grid">
                {Array.from({ length: MAX_ATTEMPTS }).map((_, i) => (
                    <div key={i} className="row">
                        {(attempts[i]?.word || "").padEnd(WORD_LENGTH, " ").split("").map((char, j) => (
                            <div key={j} className={`cell ${attempts[i]?.feedback[j] || ""}`}>
                                {char}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {!gameOver && (
                <div className="input-section">
                    <input 
                        type="text"
                        value={currentGuess}
                        onChange={handleInputChange}
                        maxLength={WORD_LENGTH}
                        placeholder="Tapez un mot..."
                    />
                    <button onClick={handleSubmit}>Valider</button>
                </div>
            )}

            <p className="message">{message}</p>
        </div>
    );
};

export default WordleGame;
