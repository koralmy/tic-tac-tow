const gameBoard = document.querySelector("#game-board");
const infoDisplay = document.querySelector("#info");
const statCells = ["", "", "", "", "", "", "", "", ""];
const restartBtn = document.querySelector("#restart");

let go = "circle";
infoDisplay.innerHTML = "circle goes first";

function createBoard() {
  statCells.forEach((_cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;
    cellElement.addEventListener("click", addGo);
    gameBoard.append(cellElement);
  });
};

createBoard();

function addGo(e) {
  const goDisplay = document.createElement("div");
  goDisplay.classList.add(go);
  e.target.append(goDisplay);
  go = go === "circle" ? "cross" : "circle";
  infoDisplay.innerHTML =  go + "'s turn";

  e.target.removeEventListener("click", addGo);

  checkScore();
};

function checkScore() {
  const allSquares = document.querySelectorAll(".square");

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  winningCombos.forEach((array) => {
    const circleWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("circle")
    );

    if (circleWins) {
      infoDisplay.innerHTML = "circle wins!";
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      return;
    }
  });

  winningCombos.forEach((array) => {
    const crossWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("cross")
    );

    if (crossWins) {
      infoDisplay.innerHTML = "cross wins!";
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      return;
    }
  });

  handleTie(); //  במקרה של שיוויון
};

function handleTie() {
  const allSquares = document.querySelectorAll(".square");
  const isTie = Array.from(allSquares).every(
    (square) =>
      square.firstChild &&
      (square.firstChild.classList.contains("circle") ||
        square.firstChild.classList.contains("cross"))
  );

  if (isTie) {
    infoDisplay.innerHTML = "It's a tie!";
    allSquares.forEach((square) => square.replaceWith(square.cloneNode(true)));
  }
};


function restartGame() {
  const allSquares = document.querySelectorAll(".square");

  allSquares.forEach((square) => {
    square.innerHTML = ""; // מנקה את כל הריבועים שיכולים להכיל איקס או עיגול
    square.addEventListener("click", addGo); // מחזיר את האיוונט
  });

  go = "circle"; // מאתחל שוב את עיגול להתחיל
  infoDisplay.innerHTML = "circle goes first"; 
}

// Add event listener to the restart button
restartBtn.addEventListener("click", restartGame);