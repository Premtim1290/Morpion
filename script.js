const cells = [...document.querySelectorAll('.cell')];
const status = document.querySelector('#status');
const playerX = document.querySelector('#player-x');
const playerO = document.querySelector('#player-o');
const winningLines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

let board;
let currentPlayer;
let finished;

function render(winningLine = []) {
  cells.forEach((cell, index) => {
    cell.textContent = board[index];
    cell.classList.toggle('o', board[index] === 'O');
    cell.classList.toggle('winner', winningLine.includes(index));
    cell.setAttribute('aria-label', `Case ${index + 1}, ${board[index] || 'vide'}`);
    cell.setAttribute('aria-disabled', String(finished || board[index] !== ''));
  });
  playerX.classList.toggle('active', !finished && currentPlayer === 'X');
  playerO.classList.toggle('active', !finished && currentPlayer === 'O');
}

function play(index) {
  if (finished || board[index] !== '') return;
  board[index] = currentPlayer;

  const winningLine = winningLines.find(line =>
    line.every(position => board[position] === currentPlayer)
  );

  if (winningLine) {
    finished = true;
    status.textContent = `${currentPlayer} a gagné !`;
  } else if (board.every(Boolean)) {
    finished = true;
    status.textContent = 'Match nul !';
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Au tour de ${currentPlayer}`;
  }
  render(winningLine);
}

function newGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  finished = false;
  status.textContent = 'Au tour de X';
  render();
}

cells.forEach((cell, index) => cell.addEventListener('click', () => play(index)));
document.querySelector('#restart').addEventListener('click', newGame);
newGame();
