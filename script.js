import Secret from "./Secret";
import {
  clickedOnSetSecretButton,
  clickedOnSetGuessButton,
  getPlayerContainer,
  getSecretContainer,
  getSecretInput,
  getGuessNumberInput,
  isValueValid,
  createGuessContainer,
  isGameReadyToStart,
  getDisabledButtons,
} from "./utils";

const secrets = {};

document.addEventListener("click", handleButtonClick);

function handleButtonClick({ target }) {
  const playerContainer = getPlayerContainer({ node: target });

  if (!playerContainer) return;

  const playerNumber = playerContainer.dataset.playerNumber;

  if (clickedOnSetSecretButton({ node: target })) {
    handleSetSecret(playerContainer, playerNumber);
    return;
  }

  if (clickedOnSetGuessButton({ node: target })) {
    handleSetGuess(playerContainer, playerNumber);
    return;
  }
}

function handleSetSecret(playerContainer, playerNumber) {
  const secretNumberInput = getSecretInput({ playerContainer });

  if (!isValueValid({ value: secretNumberInput.value })) {
    alert("secret number is not valid!");
    return;
  }

  secrets[playerNumber] = new Secret(secretNumberInput.value);

  getSecretContainer({ playerContainer }).remove();

  playerContainer.append(createGuessContainer());

  if (isGameReadyToStart()) {
    const disabledButtons = getDisabledButtons();

    disabledButtons.forEach((button) => {
      button.disabled = false;
    });
  }
}

function handleSetGuess(playerContainer, playerNumber) {
  const guessNumberInput = getGuessNumberInput({ playerContainer });

  if (!isValueValid({ value: guessNumberInput.value })) {
    alert("guess number is not valid!");
    return;
  }

  const oppositePlayerNumber = playerNumber === "1" ? "2" : "1";

  const result = secrets[oppositePlayerNumber].setGuess(guessNumberInput.value);

  if (result.bulls === 4) {
    alert(`Player ${playerNumber} won!`);
  }
}
