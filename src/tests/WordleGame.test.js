import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import WordleGame from "../components/WordleGame";
import * as gameLogic from "../utils/gameLogic";

// Utilisation d'un fake dictionnaire (Set simplifié)
const fakeDictionary = new Set(["apple", "banane", "chien", "table"]);

describe("WordleGame", () => {
  beforeEach(() => {
    // Mock/stub de la fonction isValidWord
    jest.spyOn(gameLogic, "isValidWord").mockImplementation((word) => fakeDictionary.has(word));

    //jest.spyOn(gameLogic, "isValidWord").mockImplementation(() => false);
    
    // Stub de updateGameState selon le mot entré
    jest.spyOn(gameLogic, "updateGameState").mockImplementation((guess, target, attemptsLeft) => {
      if (guess === target) {
        return {
          feedback: Array(gameLogic.WORD_LENGTH).fill("green"),
          attemptsLeft: attemptsLeft - 1,
          isGameOver: true,
          isWin: true,
        };
      }
      return {
        feedback: Array(gameLogic.WORD_LENGTH).fill("gray"),
        attemptsLeft: attemptsLeft - 1,
        isGameOver: attemptsLeft - 1 <= 0,
        isWin: false,
      };
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("affiche l'en-tête du jeu", () => {
    render(<WordleGame />);
    expect(screen.getByText("Wordle")).toBeInTheDocument();
  });

  test("affiche une erreur pour un mot invalide", () => {
    render(<WordleGame />);
    const input = screen.getByPlaceholderText("Tapez un mot...");
    const button = screen.getByText("Valider");

    fireEvent.change(input, { target: { value: "xyzzy" } });
    fireEvent.click(button);

    expect(screen.getByText("Mot invalide !")).toBeInTheDocument();
  });

  test("affiche un message de victoire si le mot est deviné", () => {
    render(<WordleGame />);
    const input = screen.getByPlaceholderText("Tapez un mot...");
    const button = screen.getByText("Valider");

    fireEvent.change(input, { target: { value: "apple" } });
    fireEvent.click(button);

    expect(screen.getByText("🎉 Bravo ! Vous avez trouvé le mot !")).toBeInTheDocument();
  });

  test("affiche un message de défaite après la dernière tentative", () => {
    // fake : simule un jeu où on est à 1 tentative restante
    jest.spyOn(React, "useState")
      .mockImplementationOnce(() => ["apple", jest.fn()]) // targetWord
      .mockImplementationOnce(() => ([
        [], jest.fn()])) // attempts
      .mockImplementationOnce(() => ["banane", jest.fn()]) // currentGuess
      .mockImplementationOnce(() => [1, jest.fn()]) // attemptsLeft
      .mockImplementation(() => [false, jest.fn()]); // gameOver et autres states

    render(<WordleGame />);
    const button = screen.getByText("Valider");

    fireEvent.click(button);

    expect(screen.getByText(/Perdu/i)).toBeInTheDocument();
  });
});
