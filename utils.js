export function clickedOnSetSecretButton({ node }) {
  return node.hasAttribute("data-set-secret-button");
}

export function clickedOnSetGuessButton({ node }) {
  return node.hasAttribute("data-set-guess-button");
}

export function createGuessContainer() {
  const element = document.createElement("div");

  element.textContent = "Guess number: ";

  const input = document.createElement("input");
  input.type = "text";
  input.maxLength = "4";
  input.setAttribute("data-guess-number-input", "");

  element.append(input);

  const button = document.createElement("button");
  button.textContent = "Set guess";
  button.disabled = true;
  button.setAttribute("data-set-guess-button", "");

  element.append(button);

  return element;
}

export function isGameReadyToStart() {
  const disabledButtons = getDisabledButtons();
  return disabledButtons.length === 2;
}

export function getDisabledButtons() {
  return document.querySelectorAll("[data-set-guess-button]:disabled");
}

export function getPlayerContainer({ node }) {
  return node.closest("[data-player]");
}

export function getSecretContainer({ playerContainer }) {
  return playerContainer.querySelector(`[data-set-secret]`);
}

export function getSecretInput({ playerContainer }) {
  return playerContainer.querySelector(`[data-secret-number-input]`);
}

export function getGuessNumberInput({ playerContainer }) {
  return playerContainer.querySelector(`[data-guess-number-input]`);
}

export function isValueValid({ value }) {
  return new Set([...value]).size === 4;
}
