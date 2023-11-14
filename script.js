function game() {
    let gameBoard = [
        "E", "E", "E",
        "E", "E", "E",
        "E", "E", "E"];

    console.log("Game started!");
    console.log(`
        ${gameBoard[0]}|${gameBoard[1]}|${gameBoard[2]}
        -----
        ${gameBoard[3]}|${gameBoard[4]}|${gameBoard[5]}
        -----
        ${gameBoard[6]}|${gameBoard[7]}|${gameBoard[8]}    
    `);

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
        return { createUser, X, O};
    }
    return { gameBoard, createUser };
}

let newGame = game();
let p1 = newGame.createUser("Kenny");
let p2 = newGame.createUser("Player2");


