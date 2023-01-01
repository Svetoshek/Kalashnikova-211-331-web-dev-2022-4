function initBoard() {
  let gameBoard = document.getElementById("board");

  for (let i = 0; i < 9; i++) {
    let = createDiv = document.createElement("div");
    createDiv.className = "cell";
    createDiv.innerHTML = "";
    gameBoard.append(createDiv);
    createDiv.addEventListener("click", clickHandler);
  }
  return gameBoard;
}

let turn = 0;
let gameOver = false;

function clickHandler(event) {
  if (gameOver) {
    showMessage("Игра оконченна", "danger");
    return;
  }
  if (event.target.innerHTML != "") {
    showMessage("Поле занято", "danger");
    return;
  }
  event.target.innerHTML = turn == 0 ? "X" : "O";
  turn = (turn + 1) % 2;

  let winner = findWinner();
  if (winner != null || !checkAvaiblableSteps()) {
    showMessage(winner ? winner + " одержал победу!" : "Ничья");
    gameOver = true;
  }
}

function newGame() {
  let cells = document.querySelectorAll(".cell");
  for (let i = 0; i < 9; i++) {
    cells[i].innerHTML = "";
  }
  gameOver = false;
  turn = 0;
}

function checkAvaiblableSteps() {
  let cells = document.querySelectorAll(".cell");
  for (let i = 0; i < 9; i++) {
    if (cells[i].innerHTML == "") return true;
  }
  return false;
}

function findWinner() {
  let cells = document.querySelectorAll(".cell");
  let row, colomn, diag, diagl, winner;
  diag = cells[0].innerHTML != "" ? cells[0].innerHTML : null;
  diagl = cells[2].innerHTML != "" ? cells[2].innerHTML : null;
  for (let i = 0; i < 3; i++) {
    row = cells[i * 3].innerHTML != "" ? cells[i * 3].innerHTML : null;
    сolumn = cells[i].innerHTML != "" ? cells[i * 3].innerHTML : null;
    for (let j = 0; j < 3; j++) {
      if (!row && !colomn) {
        break;
      }

      if (cells[i * 3 + j].innerHTML != row) row = null;

      if (cells[j * 3 + i].innerHTML != colomn) colomn = null;
    }

    winner = row || colomn;
    if (winner) return winner;
    if (cells[i * 3 + i].innerHTML != diag) diag = null;
    if (cells[i * 3 + 2 - i].innerHTML != diagl) diagl = null;
  }
  winner = diag || diagl;
  return winner;
}

function showMessage(msg, category = "success") {
  let messages = document.querySelector(".messages");
  let createDiv = document.createElement("div");
  createDiv.classList.add("msg", category);
  createDiv.innerHTML = msg;
  messages.append(createDiv);
  setTimeout(() => createDiv.remove(), 2000);
}

window.onload = function () {
  initBoard();
  let button = document.querySelector(".new-game-btn");
  button.addEventListener("click", newGame);
};
