const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("reset");
const clickSound = new Audio("game.mp3"); 

// 讀取玩家選擇的食物
const playerX = localStorage.getItem("playerX") || "sushi";
const playerO = localStorage.getItem("playerO") || "burger";

// 更新上方玩家選擇區的圖片
document.getElementById("playerX-img").src = `${playerX}.png`;
document.getElementById("playerO-img").src = `${playerO}.png`;
document.querySelectorAll(".cell").forEach(cell => {
    cell.addEventListener("click", () => {
        clickSound.play(); // 播放音效
    });
});

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

let playerMoves = { "X": [], "0": [] };

const winConditions =[
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6] // diagonals
];

cells.forEach((cell, index)=>{
    cell.addEventListener("click", ()=>{
        if(board[index] === "" && gameActive){
            board[index] = currentPlayer;
            
            // add food image
                let foodImage = document.createElement("img");
                foodImage.src = currentPlayer === "X" ? `${playerX}_1.png` : `${playerO}_1.png`;
                foodImage.style.width = "65px";
                cell.appendChild(foodImage);




            // record player moves
            playerMoves[currentPlayer].push(index); 


            // remove oldest move
            if (playerMoves[currentPlayer].length > 3){
                let oldestMove = playerMoves[currentPlayer].shift();
                board[oldestMove] = "";
                cells[oldestMove].textContent = "";
            }

            checkWinner();

            currentPlayer = currentPlayer === "X" ? "0" : "X";
            console.log(`X= ${playerMoves["X"]} Y= ${playerMoves["0"]}`);
        }
    });
});

function checkWinner() {
    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            // winnerfood
            const winnerFood = board[a] === "X" ? localStorage.getItem("playerX") : localStorage.getItem("playerO");
            localStorage.setItem("winnerFood", winnerFood) ;

            setTimeout(() => {
                window.location.href = "winner.html";
            },500);
            return;
        }
    }

}

// resetButton.addEventListener("click", ()=>{
//     board.fill("");
//     playerMoves["X"] = [];
//     playerMoves["0"] = [];
//     cells.forEach(cell => (cell.textContent = ""));
//     currentPlayer = "X";
//     gameActive = true;
// })

