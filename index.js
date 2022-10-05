let boardCell=document.getElementsByClassName('boardSpace')

gameState= {
    player1:        'Player 1',
    player2:        'Player 2',
    turnCounter:     0,
    // gameBoard:      [[null, null, null],
    //                  [null, null, null],
    //                  [null, null, null]],
                     //  change these locations to applicable divs like @line 21
    gameBoard:      [[boardCell[0],boardCell[1],boardCell[2]],
                     [boardCell[3],boardCell[4],boardCell[5]],
                     [boardCell[6],boardCell[7],boardCell[8]]]
}
// boardCell[0] pulls line 40 boardSpace?
// -------------------------------Win Conditions--------------------------------
winState= [
    [[0][0],[0][1],[0][2]],
    [[1][0],[1][1],[1][2]],
    [[2][0],[2][1],[3][2]],
    [[0][0],[1][0],[2][0]],
    [[0][1],[1][1],[2][1]],
    [[0][2],[1][2],[2][2]],
    [[0][0],[1][1],[2][2]],
    [[0][2],[1][1],[2][0]]
]

//
let headerAnnounce = document.getElementById('gameTitle')

function didIWin(player) {
    return winState.some(wins =>{
    // .some checks to see if parts of an array match
        return wins.every(cell => {
            return gameState[gameBoard][cell].classList.contains(player)
    // This should pull every array from gameBoard and use is as 'wins' variable
    // to check against winState
        })
    })
}

// ----------------------Name Settings---------------------------------------
let player1Name = document.getElementById('player1Name')
let player2Name = document.getElementById('player2Name')
let player1input = document.getElementById('player1input')
let player2input = document.getElementById('player2input')
let p1submit = document.getElementById('player1submit')
let p2submit = document.getElementById('player2submit')

p1submit.addEventListener('click', Name1Lock)

function Name1Lock(){
    gameState.player1 = player1input.value
    player1Name.textContent = gameState.player1
}
p2submit.addEventListener('click', Name2Lock)

function Name2Lock(){
    gameState.player2 = player2input.value
    player2Name.textContent = gameState.player2
}
// -------------------------Reset Button-------------------------------------
const board = document.getElementById("gameBoard")
let reset = document.getElementById("resetButton")


reset.addEventListener('click', resetGame)

function resetGame() {
    gameState.turnCounter = 0;
    for ( i= 0; i < boardCell.length; i++) {
        headerAnnounce.textContent = 'Tic Tac Toe'
        boardCell[i].classList.remove('xMarker')
        boardCell[i].classList.remove('oMarker')
    }
}
board.addEventListener('click', playMove)

function playMove(event){
// Make setting so if gameState.player2 = Com it activates AI/random placement on
// even turns
    const target=event.target
    if (target.className ==='boardSpace'){
        if(gameState.turnCounter % 2 == 0){
            target.classList.add('xMarker')
            didIWin('xMarker')
            if (didIWinX('xMarker')) {
                headerAnnounce.textContent = gameState.player1 + ' wins!'
            } else {
                gameState.turnCounter++
            }
        } else {
            target.classList.add('oMarker')
            didIWin('oMarker')
            if (didIWin('oMarker')) {
                headerAnnounce.textContent= gameState.player2 + ' wins!'
            } else {
                gameState.turnCounter++
            }
        }
    }
}
