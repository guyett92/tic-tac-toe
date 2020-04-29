// MODEL //
/*----- constants -----*/
const players = {
    '1': 'X',
    '-1': 'O',
};

const combos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
];

/*----- app's state (variables) -----*/
let turn, gameboard, winner;

// CONTROLLER //
/*----- cached element references -----*/
const spanEl = document.querySelector('span');
const gameboardEl = document.getElementById('gameboard');
const squareEls = document.getElementsByClassName('square');
const buttonEl = document.querySelector('button');

/*----- event listeners -----*/
gameboardEl.addEventListener('click', handleClick);
buttonEl.addEventListener('click', init);

init();

/*----- functions -----*/
function init() {
    // This function will initialize or reset the game
    winner = false;
    turn = 1; // start with player X's turn
    gameboard = Array(9).fill(null);

    render();
}

function handleClick(evt) {
    const selectedIdx =  evt.target.dataset.index;
    // If a square is clicked on, the gameboard state has to be updated
    // If a square has a value, don't update it
    if(winner || gameboard[selectedIdx]) return;
    if (gameboard[selectedIdx]) return;
    gameboard[selectedIdx] = turn;
    // Check to see if there is a winner
    winner = checkWinner();
    // Turn has to be toggled as well
    turn *= -1;
    // Transfer the state of the game
    render();
}

function checkWinner() {
    // Loop through the combos to check to see if the board state matches a combo
    for(let i = 0; i < combos.length; i++) {
        if(Math.abs(gameboard[combos[i][0]] + gameboard[combos[i][1]] + gameboard[combos[i][2]]) === 3) return gameboard[combos[i][0]];
    }
    if(gameboard.includes(null)) return false;
    return 'T';
    // Whoever is the winner will return the given value of their property (1, -1)
    // If no winner and no nulls we have a tie
}

function render() {
    // Transfer the state of the board array to DOM elements
    gameboard.forEach(function(position, index) {
        squareEls[index].textContent = players[position];
    });
    if (!winner) {
        spanEl.textContent = players[turn];
    } else if (winner === 'T') {
        alert('Tie Game');
    } else {
        alert(`${players[winner]} wins!!`)
    }
}

// Pseudocode
/*
 0. Need to initialize the game and set the turn to X
    0.1. The gameboard needs to keep track of all the pieces
    0.2. Set the winner to false
    0.3. Need to store the winning combinations in a data structure
    0.4. Need to store the existing players in a data structure
        0.4.1. Need to be able to toggle between players
 1. All the squares need to be clickable
    1.1. Need to know which square was clicked on
 2. If a square is clicked, an X or O needs to be placed depending on who's turn it is




*/
