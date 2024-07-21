"use strict";

const rollBtn = document.querySelector(".btn--roll");
const resetBtn = document.querySelector(".btn--new");
const holdBtn = document.querySelector(".btn--hold");
const total = document.querySelectorAll(".score");
const currentScores = document.querySelectorAll(".current-score");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");
const dice = document.querySelector(".dice");

eventListener();

function eventListener() {
  resetBtn.addEventListener("click", resetAll);
  rollBtn.addEventListener("click", diceRoll);
  holdBtn.addEventListener("click", holdBtnFunction);
}

let scores, currentScore, activePlayer, playing;

const start = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  score0.textContent = 0;
  score1.textContent = 0;

  playing = true;

  diceElement.classList.add("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
};

start();
resetAll();

function resetAll() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  score0.textContent = 0;
  score1.textContent = 0;

  diceElement.classList.add("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");

  total.forEach((score) => {
    score.innerText = 0;
  });
  currentScores.forEach((current) => {
    current.innerText = 0;
  });
}

function diceRoll() {
  if (playing) {
    const randomNumber = Math.floor(Math.random() * 6 + 1);
    const randomDice = "dice-" + randomNumber + ".png";
    const randomImageSource = "./image/" + randomDice;
    dice.setAttribute("src", randomImageSource);

    if (randomNumber !== 1) {
      currentScore = 0;
      currentScore += randomNumber;
      console.log(currentScore);
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchUser();
    }
  }
}

function switchUser() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
}

function holdBtnFunction() {
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  if (scores[activePlayer] >= 100) {
    dice.classList.add("hidden");
    playing = false;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");
  } else {
    switchUser();
  }
}
