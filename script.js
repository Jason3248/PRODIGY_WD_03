const winningPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];

let isAIEnabled = false;
let boxes = document.querySelectorAll('.boxes');
let currentPlayer = 'X'; 
let gameActive = true;

document.querySelector('.winnermessage').innerText = `Player ${currentPlayer}'s Turn.`;

boxes.forEach((box) => {
  box.addEventListener('click', () => {
    if (gameActive && box.innerText === '') {
      box.innerText = currentPlayer;
      checkWinner();
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; 
      if (isAIEnabled && currentPlayer === 'O') {
        setTimeout(autoPlayMove, 1000);
      }
      updateMessage();
    }
  });
});

function resetGame() {
  currentPlayer = 'X';
  gameActive = true;
  isAIEnabled = false; 
  boxes.forEach((box) => {
    box.innerText = '';
  });
  document.querySelector('.winnermessage').innerText = `Player ${currentPlayer}'s Turn.`;
  document.querySelectorAll('.boxes').forEach((box) => {
    box.classList.add('hoverable');
    
    box.addEventListener('click', function() {
      this.classList.remove('hoverable');
    });
  });
}

document.querySelector('.reset').addEventListener('click', resetGame);

function autoPlayMove() {
  if (!gameActive || currentPlayer !== 'O') return;

  let availableBoxes = Array.from(boxes).filter(box => box.innerText === '');
  if (availableBoxes.length === 0) return;

  const randomCell = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
  randomCell.innerText = 'O';

  checkWinner();
  currentPlayer = 'X'; 
  updateMessage();
}

document.querySelector('.playai').addEventListener('click', () => {
  isAIEnabled = true;
  resetGame();
});

function checkWinner() {
  let board = Array.from(boxes).map(box => box.innerText);
  for (let pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      gameActive = false;
      document.querySelector('.winnermessage').innerText = `Congratulations! Player ${board[a]} Wins`;
      return;
    }
  }

  if (board.every(box => box !== '')) {
    gameActive = false;
    document.querySelector('.winnermessage').innerText = "Oops! It's a Draw";
  }
}

function updateMessage() {
  if (!gameActive) return;
  document.querySelector('.winnermessage').innerText = `Player ${currentPlayer}'s Turn.`;
}
document.querySelector('.playai').addEventListener('click', () => {
  isAIEnabled = !isAIEnabled; 
 
});
document.querySelectorAll('.boxes').forEach((box) => {
  box.classList.add('hoverable');
  
  box.addEventListener('click', function() {
    this.classList.remove('hoverable');
  });
});
