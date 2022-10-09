let boardCell=document.getElementsByClassName('boardSpace')

gameState= {
    player1:        'Player 1',
    player2:        'Player 2',
    turnCounter:     0,
    gameBoard:      [[null, null, null],
                     [null, null, null],
                     [null, null, null]],
    gameOver:       false
    // gameBoard:      [[boardCell[0],boardCell[1],boardCell[2]],
    //                  [boardCell[3],boardCell[4],boardCell[5]],
    //                  [boardCell[6],boardCell[7],boardCell[8]]],

        // gameBoard:      [boardCell[0],boardCell[1],boardCell[2],
        //                  boardCell[3],boardCell[4],boardCell[5],
        //                  boardCell[6],boardCell[7],boardCell[8]],
}
for(let i = 0; i < gameState.gameBoard.length; i++){
    for(let j = 0; j < gameState.gameBoard[i].length; j++){
        boardCell[i*3+j].id = `row${i}col${j}`
    }
}

// Checking a row for multiple matches
// decide on direction to check
// have to look at single object
// have a matchCounter if = 4 win
// for 
// if newcell === 'player' add matchcounter, go to next space, if newcell==='player' add matchcounter
// else 

// -------------------------------Win Conditions--------------------------------
// winState= [
//     [gameState.gameBoard[0][0],gameState.gameBoard[0][1],gameState.gameBoard[0][2]],
//     [gameState.gameBoard[1][0],gameState.gameBoard[1][1],gameState.gameBoard[1][2]],
//     [gameState.gameBoard[2][0],gameState.gameBoard[2][1],gameState.gameBoard[2][2]],
//     [gameState.gameBoard[0][0],gameState.gameBoard[1][0],gameState.gameBoard[2][0]],
//     [gameState.gameBoard[0][1],gameState.gameBoard[1][1],gameState.gameBoard[2][1]],
//     [gameState.gameBoard[0][2],gameState.gameBoard[1][2],gameState.gameBoard[2][2]],
//     [gameState.gameBoard[0][0],gameState.gameBoard[1][1],gameState.gameBoard[2][2]],
//     [gameState.gameBoard[0][2],gameState.gameBoard[1][1],gameState.gameBoard[2][0]]
// ]

// winState= [
//     [0,1,2],
//     [3,4,5],
//     [6,7,8],
//     [0,3,6],
//     [1,4,7],
//     [2,5,8],
//     [0,4,8],
//     [2,4,6]
// ]


//
let headerAnnounce = document.getElementById('gameTitle')
// maybe use a for/in loop to cycle through Gameboard Locations instead?
function didIWin(player) {
    winState= [
        [gameState.gameBoard[0][0],gameState.gameBoard[0][1],gameState.gameBoard[0][2]],
        [gameState.gameBoard[1][0],gameState.gameBoard[1][1],gameState.gameBoard[1][2]],
        [gameState.gameBoard[2][0],gameState.gameBoard[2][1],gameState.gameBoard[2][2]],
        [gameState.gameBoard[0][0],gameState.gameBoard[1][0],gameState.gameBoard[2][0]],
        [gameState.gameBoard[0][1],gameState.gameBoard[1][1],gameState.gameBoard[2][1]],
        [gameState.gameBoard[0][2],gameState.gameBoard[1][2],gameState.gameBoard[2][2]],
        [gameState.gameBoard[0][0],gameState.gameBoard[1][1],gameState.gameBoard[2][2]],
        [gameState.gameBoard[0][2],gameState.gameBoard[1][1],gameState.gameBoard[2][0]]
    ]
    return winState.some(wins =>{
    // .some checks to see if parts of an array match
        return wins.every(cell => {
            // let cellContainer = gameState.gameBoard[0][0]
            // console.log(cellContainer.classList.contains(player))
            // console.log(cell)
            // return gameState[gameBoard][0][cell].classList.contains(player)
            // return cellContainer[0][cell].classList.contains(player),
            //        cellContainer[1][cell].classList.contains(player), 
            //        cellContainer[2][cell].classList.contains(player)
        //  return gameState.gameBoard[cell]==player
        console.log(winState)
        return cell === player
        
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
    gameState.gameOver = false
    gameState.turnCounter = 0;
    gameState.gameBoard = [[null, null, null],
                           [null, null, null],
                           [null, null, null]]
    for ( i= 0; i < boardCell.length; i++) {
        headerAnnounce.textContent = 'Tic Tac Toe'
        boardCell[i].classList.remove('xMarker')
        boardCell[i].classList.remove('oMarker')
        
    }
}
board.addEventListener('click', playMove)
// -----------------------Playing a move------------------------------
function playMove(event){
    // Make setting so if gameState.player2 = Com it activates AI/random placement on
    // even turns
    const target=event.target

    if (target.className ==='boardSpace' && gameState.gameOver===false){
        const row=target.id.charAt(3)
        const col=target.id.charAt(7)
        console.log(row,col)
        
        if(gameState.turnCounter % 2 == 0){
            gameState.gameBoard[row][col]= 'x'
            target.classList.add('xMarker')

            // let idname = event.target.id
            // console.log(idname)
            // let row = idname.splice(3,4)
            // let column = idname.splice(10)
            // gamestate.gameBoard[row][column] = 'x'
            
            const check= didIWin('x')
            console.log(check)
            if (check) {
                gameState.gameOver = true;
                headerAnnounce.textContent = gameState.player1 + ' wins!'
            } else {
                gameState.turnCounter++
            }
        } else {
            gameState.gameBoard[row][col]= 'o'
            target.classList.add('oMarker')

            // let idname = event.target.id
            // console.log(idname)
            // let row = idname.splice(3,4)
            // let column = idname.splice(10)
            // gamestate.gameBoard[row][column] = 'o'
            const check = didIWin('o')
            if (check) {
                gameState.gameOver = true;
                headerAnnounce.textContent= gameState.player2 + ' wins!'
            } else {
                gameState.turnCounter++
            }
        }
    }
}
