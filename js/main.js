/*----- constants -----*/
const playerPiece = {
    'null' : 'lightslategrey',
    '1' : 'blue',
    '-1': 'red',
} 

// playerPiece.style.fontSize = large;
const winningCombos = [
    //all possible winning combinations
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const playCount = 0;

/*----- app's state (variables) -----*/
// referenced in init function
let board; //array
let turn; // 1 or -1
let winner; // null = no winner; 1 or -1 if there's a winner; 'T'= tie

/*----- cached element references -----*/
//each div on the board
const locationEls = Array.from([...document.querySelectorAll('#board > div')]);

const btnEl = document.querySelector('button');
const msgEl = document.querySelector('h1');

/*----- event listeners -----*/
// selection made when user clicks a location in the board array
document.getElementById('board')
.addEventListener('click', playerChoice);

btnEl.addEventListener('click', init);

/*----- functions -----*/
//initialize the game
init();

//initialize all state, then call render
function init() {
    // board for game
    board = [
        null, null, null, //top row
        null, null, null, // middle row
        null, null, null, // bottom row
    ];
    winner = null;
    turn = 1;
    render();
    // locationEls.style.backgroundColor = 'none';
}

 function render() {
        renderBoard();
        renderMsg();
        btnEl.style.visibility = winner ? 'visible' : 'hidden';
}

function playerChoice(evt) {
    //player selects location
    let locationIdx = parseInt(evt.target.id.replace('cell', ''));
    // if space is filled, no play can be made
    if (board[locationIdx] !== null) return;
    board[locationIdx] = turn;
    turn *= -1;     //switch players
    winner = getWinner();
    render();
}

function renderBoard() {
    // change piece color based on click
        board.forEach(function(cell, index) {
            locationEls[index].style.backgroundColor = playerPiece[cell];
    });
}

function renderMsg() {
    if (winner === 't') {
      msgEl.innerHTML = 'A tie!';
    } else if (winner) {
      msgEl.innerHTML = `<span style="color: ${playerPiece[winner]}">${playerPiece[winner]}</span> Wins!`;
    }  else {
      msgEl.innerHTML = `<span style="color: ${playerPiece[turn]}">${playerPiece[turn]}</span>'s Turn`;
    } 
  }

function getWinner() {
    for (let winCombo of winningCombos) {
        let total = board[winCombo[0]] + board[winCombo[1]] + board[winCombo[2]];
        if (Math.abs(total) === 3) return turn *= -1;
    };
    if (board.includes(null)) return null; 
    return 't';
}

    