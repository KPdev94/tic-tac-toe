function game() {
    let gameBoard = [];
    function newGame() {
        gameBoard = [
        "", "", "",
        "", "", "",
        "", "", ""];

    console.log("Game started!");
    console.log(`
        ${gameBoard[0]}|${gameBoard[1]}|${gameBoard[2]}
        -----
        ${gameBoard[3]}|${gameBoard[4]}|${gameBoard[5]}
        -----
        ${gameBoard[6]}|${gameBoard[7]}|${gameBoard[8]}    
    `);

    return { newGame, gameBoard };
    };

    function createUser(name) {
        const user = name;
        console.log(`${user} has joined the game!`);
        
        function X(loc) {
        gameBoard[loc] = "X";
        console.log(`
            ${gameBoard[0]}|${gameBoard[1]}|${gameBoard[2]}
            -----
            ${gameBoard[3]}|${gameBoard[4]}|${gameBoard[5]}
            -----
            ${gameBoard[6]}|${gameBoard[7]}|${gameBoard[8]}    
        `);
        
        return { X };
        }
        function O(loc) { 
        gameBoard[loc] = "O";
        console.log(`
            ${gameBoard[0]}|${gameBoard[1]}|${gameBoard[2]}
            -----
            ${gameBoard[3]}|${gameBoard[4]}|${gameBoard[5]}
            -----
            ${gameBoard[6]}|${gameBoard[7]}|${gameBoard[8]}    
        `);
        
        return { O };
        }
        return {  user, createUser, X, O};
    }
    function renderPlayArea() {
        let playArea = document.querySelector("#play-area");
        let spaceNum = 0;
        playArea.innerHTML = "";
        playArea.style.backgroundColor = "gray";
        for(let i = 0; i<gameBoard.length;i++) {
            playArea.insertAdjacentHTML("beforeend", `
            <div class="playBox" data-num="${i}">
            <p>${gameBoard[i]}</p>
        </div>
        `);
            spaceNum++;
        }
        spaceNum = 0;
        return { renderPlayArea }
    };
    function playing() {
        let player1 = document.querySelector("#player-1");
        let player2 = document.querySelector("#player-2");
        let p1 = currentGame.createUser(player1.value);
        let p2 = currentGame.createUser(player2.value);
        let gameOver = false;
        let turn = "X";
        let playBoxes = document.querySelectorAll(".playBox");
        let moves = 0;
        
        userNames.innerHTML = `
        <p>Player 1(X's): ${p1.user}</p>
        <p>Player 2(O's): ${p2.user}</p>
        `;

        function play(e) {        
            if(gameOver) {
                return;
            }
            else if(e.classList.contains("played")) {
                alert("Already played, select another space");
            }
            else {
                if(turn == "X") { 
                    e.innerHTML = `<p>X</p>`
                    p1.X(e.getAttribute("data-num"));
                    e.classList.add("played");
                    moves++;
                    if((gameBoard[0] != "" && ((gameBoard[0] == gameBoard[1] && gameBoard[1] == gameBoard[2]) || 
                        (gameBoard[0] == gameBoard[3] && gameBoard[3] == gameBoard[6]) ||
                        (gameBoard[0] == gameBoard[4] && gameBoard[4] == gameBoard[8]))) || 
                        (gameBoard[1] != "" && (gameBoard[1] == gameBoard[4] && gameBoard[4] == gameBoard[7])) || 
                        (gameBoard[2] != "" && ((gameBoard[2] == gameBoard[4] && gameBoard[4] == gameBoard[6]) || 
                        (gameBoard[2] == gameBoard[5] && gameBoard[5] == gameBoard[8]))) || 
                        (gameBoard[3] != "" && (gameBoard[3] == gameBoard[4] && gameBoard[4] == gameBoard[5])) || 
                        (gameBoard[6] != "" && (gameBoard[6] == gameBoard[7] && gameBoard[7] == gameBoard[8]))) {
                            setTimeout(() => {
                                gameOver = true;
                                alert(`${p1.user} WINS!`);
                                userNames.innerHTML = `            
                                <label for="player-1" id="player-1-label">Player 1 (X's): </label>
                                <br>
                                <input type="text" id="player-1" placeholder="User" name="player-1">
                                <br>
                                <label for="player-2" id="player-2-label">Player 2 (O's): </label>
                                <br>
                                <input type="text" id="player-2" placeholder="Opponent" name="player-2">
                                <br>
                                <button id="play-button">Play!</button>
                                <p>${p1.user} was the last winner!</p>
                                `
                                let playButton = document.querySelector("#play-button");
                                playButton.addEventListener('click', (e) => {
                                    e.preventDefault();
                                    currentGame.newGame();
                                    currentGame.renderPlayArea();
                                    currentGame.playing();
                                });
                            }, 200);
                    }
                    else if(moves == 9 && !gameOver) {
                        setTimeout(() => {
                            alert("No winner!");
                            gameOver = true;
                            userNames.innerHTML = `            
                            <label for="player-1" id="player-1-label">Player 1 (X's): </label>
                            <br>
                            <input type="text" id="player-1" placeholder="User" name="player-1">
                            <br>
                            <label for="player-2" id="player-2-label">Player 2 (O's): </label>
                            <br>
                            <input type="text" id="player-2" placeholder="Opponent" name="player-2">
                            <br>
                            <button id="play-button">Play!</button>
                            <p>Last game was a tie!</p>
                            `
                        }, 200)
                    }
                    setTimeout(() => { turn == "X" ? turn = "O" : turn ="X" }, 201);
                }
                else if(turn == "O") { 
                    e.innerHTML = `<p>O</p>`
                    p2.O(e.getAttribute("data-num"));
                    e.classList.add("played");
                    moves++;
                    if((gameBoard[0] != "" && ((gameBoard[0] == gameBoard[1] && gameBoard[1] == gameBoard[2]) || 
                    (gameBoard[0] == gameBoard[3] && gameBoard[3] == gameBoard[6]) ||
                    (gameBoard[0] == gameBoard[4] && gameBoard[4] == gameBoard[8]))) || 
                    (gameBoard[1] != "" && (gameBoard[1] == gameBoard[4] && gameBoard[4] == gameBoard[7])) || 
                    (gameBoard[2] != "" && ((gameBoard[2] == gameBoard[4] && gameBoard[4] == gameBoard[6]) || 
                    (gameBoard[2] == gameBoard[5] && gameBoard[5] == gameBoard[8]))) || 
                    (gameBoard[3] != "" && (gameBoard[3] == gameBoard[4] && gameBoard[4] == gameBoard[5])) || 
                    (gameBoard[6] != "" && (gameBoard[6] == gameBoard[7] && gameBoard[7] == gameBoard[8]))) {
                            setTimeout(() => {
                                gameOver = true;
                                alert(`${p2.user} WINS!`);
                                userNames.innerHTML = `            
                                <label for="player-1" id="player-1-label">Player 1 (X's): </label>
                                <br>
                                <input type="text" id="player-1" placeholder="User" name="player-1">
                                <br>
                                <label for="player-2" id="player-2-label">Player 2 (O's): </label>
                                <br>
                                <input type="text" id="player-2" placeholder="Opponent" name="player-2">
                                <br>
                                <button id="play-button">Play!</button>
                                <br>
                                <p>${p2.user} was the last winner!</p>
                                `
                                let playButton = document.querySelector("#play-button");
                                playButton.addEventListener('click', (e) => {
                                    e.preventDefault();
                                    currentGame.newGame();
                                    currentGame.renderPlayArea();
                                    currentGame.playing();
                                });
                            }, 200);
                    }
                    else if(moves == 9 && !gameOver) {
                        setTimeout(() => {
                            alert("No winner!");
                            gameOver = true;
                            userNames.innerHTML = `            
                            <label for="player-1" id="player-1-label">Player 1 (X's): </label>
                            <br>
                            <input type="text" id="player-1" placeholder="User" name="player-1">
                            <br>
                            <label for="player-2" id="player-2-label">Player 2 (O's): </label>
                            <br>
                            <input type="text" id="player-2" placeholder="Opponent" name="player-2">
                            <br>
                            <button id="play-button">Play!</button>
                            <p>Last game was a tie!</p>
                            `
                        }, 200)
                    }
                    setTimeout(() => { turn == "X" ? turn = "O" : turn ="X" }, 201);
                }
            }
            }
        playBoxes.forEach((item) => {
            item.addEventListener('click', () => play(item));
        });
    };
    return { game, newGame, createUser, renderPlayArea, playing };
}




let player1 = document.querySelector("#player-1");
let player2 = document.querySelector("#player-2");
let currentGame = game();

let playButton = document.querySelector("#play-button");
playButton.addEventListener('click', (e) => {
    e.preventDefault();
    currentGame.newGame();
    currentGame.renderPlayArea();
    currentGame.playing();
});








