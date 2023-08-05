import Secret from "./Secret";
import {
  getPlayerContainer,
  getSecretContainer,
  isSetSecretButton,
  isSetGuessButton,
  getSecretInput,
  getGuessNumberInput,
  isValid,
  createGuessContainer,
  isGameReadyToStart,
  startGame,
} from "./logic";

const secrets = {};

document.addEventListener("click", ({ target }) => {
  const playerContainer = getPlayerContainer({ node: target });

  if (!playerContainer) return;

  const playerNumber = playerContainer.dataset.playerNumber;

  if (isSetSecretButton({ node: target })) {
    const secretNumberInput = getSecretInput({ playerContainer });

    if (!isValid({ value: secretNumberInput.value })) {
      alert("secret number is not valid!");
      return;
    }

    secrets[playerNumber] = new Secret(secretNumberInput.value);

    getSecretContainer({ playerContainer }).remove();

    playerContainer.append(createGuessContainer());

    if (isGameReadyToStart()) {
      startGame();
    }

    return;
  }

  if (isSetGuessButton({ node: target })) {
    const guessNumberInput = getGuessNumberInput({ playerContainer });

    if (!isValid({ value: guessNumberInput.value })) {
      alert("guess number is not valid!");
      return;
    }

    const oppositePlayerNumber = playerNumber === "1" ? "2" : "1";

    const result = secrets[oppositePlayerNumber].setGuess(
      guessNumberInput.value
    );

    if (result.bulls === 4) {
      alert(`Player ${playerNumber} won!`);
    }

    return;
  }
});
