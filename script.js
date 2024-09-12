const columns = 7;
const rows = 6;
let currentPlayer = "red"; // red starts
let redScore = 0;
let yellowScore = 0;

let gameBoard = []; // 2D array for game board

// Initialize empty board
for (let row = 0; row < rows; row++) {
  gameBoard[row] = new Array(columns).fill(null);
}

const gameBoardElement = document.getElementById("game-board");
const resetButton = document.getElementById("reset-button");
const redScoreElement = document.getElementById("red-score");
const yellowScoreElement = document.getElementById("yellow-score");

// Create the board HTML
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < columns; col++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.row = row;
    cell.dataset.col = col;
    cell.addEventListener("click", handleCellClick);
    gameBoardElement.appendChild(cell);
  }
}

function handleCellClick(e) {
  const col = e.target.dataset.col;
  for (let row = rows - 1; row >= 0; row--) {
    if (!gameBoard[row][col]) {
      gameBoard[row][col] = currentPlayer;
      const cell = document.querySelector(
        `.cell[data-row="${row}"][data-col="${col}"]`
      );
      cell.classList.add(currentPlayer);

      if (checkForWin(row, col)) {
        setTimeout(() => {
          alert(`${currentPlayer.toUpperCase()} wins!`);
          updateScore();
        }, 10);
        return;
      }

      currentPlayer = currentPlayer === "red" ? "yellow" : "red";
      return;
    }
  }
}

function checkForWin(row, col) {
  return (
    checkDirection(row, col, 1, 0) || // Horizontal
    checkDirection(row, col, 0, 1) || // Vertical
    checkDirection(row, col, 1, 1) || // Diagonal Down-Right
    checkDirection(row, col, 1, -1) // Diagonal Down-Left
  );
}

function checkDirection(row, col, rowDir, colDir) {
  let total = 0;
  for (let dir = -3; dir <= 3; dir++) {
    const newRow = row + dir * rowDir;
    const newCol = col + dir * colDir;

    if (
      newRow >= 0 &&
      newRow < rows &&
      newCol >= 0 &&
      newCol < columns &&
      gameBoard[newRow][newCol] === currentPlayer
    ) {
      total++;
      if (total === 4) return true;
    } else {
      total = 0;
    }
  }
  return false;
}

function updateScore() {
  if (currentPlayer === "red") {
    redScore++;
    redScoreElement.textContent = redScore;
  } else {
    yellowScore++;
    yellowScoreElement.textContent = yellowScore;
  }
  resetGame();
}

function resetGame() {
  gameBoard = gameBoard.map((row) => row.fill(null));
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.classList.remove("red", "yellow");
  });
}

// Reset button click event
resetButton.addEventListener("click", resetGame);
