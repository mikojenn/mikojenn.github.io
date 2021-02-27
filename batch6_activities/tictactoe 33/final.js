const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
var currentIndex;
const WINNING_COMBINATIONS = [
    //WINNING COMBINATION ROW
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //WINNING COMBINATION
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]
let moves = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];
const scores = {
    player1: 0,
    player2: 0
}
// let moveshistory = new Array();
let moveshistory = [];
// moveshistory[0] = [
//     ["", "", ""],
//     ["", "", ""],
//     ["", "", ""]
// ];
const cellElements = document.querySelectorAll('[data-cell]')
const player1 = document.querySelector('#player-one-score');
const player2 = document.querySelector('#player-two-score');
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
//2d ARRAY-------------------
let moves1 = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

let circleTurn
//START OF THE GAME---------------

startGame()

//RESTART BUTTON------------------
restartButton.addEventListener('click', startGame);

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    //PLACE MARK
    placeMark(cell, currentClass)
    console.log('moveshistory', moveshistory)

    //2d ARRAY-------------------,
    let z = 0;
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            if (cellElements[z].classList.contains('x')) {
                moves[y][x] = 'x';
            }
            else if (cellElements[z].classList.contains('circle')) {
                moves[y][x] = 'o';
            }
            else {
                moves[y][x] = '';
            } z++
        }

    }
    for (let i = 0; i < 3; i++) {
        moves1[i] = moves[i].slice();
    }
    moveshistory.push(moves1.slice())

    //CHECK FOR WIN
    if (checkWin(currentClass)) {
        console.log('winner')
        endGame(false)
        currentIndex = moveshistory.length - 1;
        console.log(currentIndex)
    } else if (isDraw()) {
        endGame(true)
        console.log(moveshistory.length);
        currentIndex = moveshistory.length - 1;
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

//ENDGAME FUNCTION-------------------
function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Neither of you is a Star!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O" : "X"} is the Star!`
        const playerWinner = circleTurn ? "player2" : "player1";
        scores[playerWinner] += 1;
        player1.innerHTML = scores.player1;
        player2.innerHTML = scores.player2;
    }
    winningMessageElement.classList.add('show')
    //moveshistory can now be accessed

}
//DRAW FUNCTION----------------
function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

//PLACE MARK FUNCTION----------------
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}
//SWAP TURN FUNCTION----------------
function swapTurns() {
    circleTurn = !circleTurn
}
//SWITCH TURN FUNCTION----------------
function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)

    } else {
        board.classList.add(X_CLASS)

    }
}
//CHECK FUNCTION----------------
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}
//BUTTONS---------------
function moveNext() {
    currentIndex++;
    console.log("current index: " + currentIndex);
    if (currentIndex >= moveshistory.length - 1) {
        currentIndex = moveshistory.length - 1;
    }
    traverseHistory(currentIndex);
    console.log("naclick yung next");
}

function movePrev() {
    currentIndex--;
    console.log("current index: " + currentIndex);
    if (currentIndex <= 0) {
        currentIndex = 0;
    }
    traverseHistory(currentIndex);
    console.log("naclick yung prev");

}

function traverseHistory(index) {
    let entry = moveshistory[index]
    console.log(entry);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (i === 0) {
                if (entry[i][j] === "x") {
                    cellElements[i + j].classList.add(X_CLASS)
                    cellElements[i + j].classList.remove(CIRCLE_CLASS)
                }
                else if (entry[i][j] === "o") {
                    cellElements[i + j].classList.add(CIRCLE_CLASS)
                    cellElements[i + j].classList.remove(X_CLASS)
                }
                else {
                    cellElements[i + j].classList.remove(X_CLASS)
                    cellElements[i + j].classList.remove(CIRCLE_CLASS)
                }
            }

            else if (i === 1) {
                if (entry[i][j] === "x") {
                    cellElements[i + j + 2].classList.add(X_CLASS)
                    cellElements[i + j + 2].classList.remove(CIRCLE_CLASS)
                }
                else if (entry[i][j] === "o") {
                    cellElements[i + j + 2].classList.add(CIRCLE_CLASS)
                    cellElements[i + j + 2].classList.remove(X_CLASS)
                }
                else {
                    cellElements[i + j + 2].classList.remove(X_CLASS)
                    cellElements[i + j + 2].classList.remove(CIRCLE_CLASS)
                }
            }

            else {
                if (entry[i][j] === "x") {
                    cellElements[i + j + 4].classList.add(X_CLASS)
                    cellElements[i + j + 4].classList.remove(CIRCLE_CLASS)
                }
                else if (entry[i][j] === "o") {
                    cellElements[i + j + 4].classList.add(CIRCLE_CLASS)
                    cellElements[i + j + 4].classList.remove(X_CLASS)
                }
                else {
                    cellElements[i + j + 4].classList.remove(X_CLASS)
                    cellElements[i + j + 4].classList.remove(CIRCLE_CLASS)
                }

            }
        }
    }
}