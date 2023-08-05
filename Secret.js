export default class Secret {
  #secret;
  guesses = [];

  constructor(secret) {
    this.#secret = secret;
  }

  setGuess(guess) {
    const guessResult = this.#calculateGuess(guess);
    this.guesses.push(guessResult);
    return guessResult;
  }

  #calculateGuess(guess) {
    let cows = 0;
    let bulls = 0;

    for (let i = 0; i < 4; i++) {
      if (guess[i] === this.#secret[i]) {
        bulls += 1;
        continue;
      }

      if (`${this.#secret}`.includes(guess[i])) {
        cows += 1;
      }
    }

    return {
      guess,
      cows,
      bulls,
    };
  }
}
