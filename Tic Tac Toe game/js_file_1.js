let buttonArray = document.getElementsByClassName("tableButton");
let playButton = document.getElementById("actionsButton");
let messageBox = document.getElementById("messageBox");
let name1 = document.getElementById("player1");
let name2 = document.getElementById("player2");

let Player = 1 // 1 is for player1, 2 for player2, -1 for game end



playButton.addEventListener("click", Start);

function playerChoose(n){
    if(n==1)    return name1.value;
    else    return name2.value;
}

function Start(){
    if(name1.value!='' && name2.value!=''){
        name1.setAttribute("readonly",true);
        name2.setAttribute("readonly",true);
        if(Player==1)   messageBox.innerHTML = `${name1.value}'s turn`;
        else    messageBox.innerHTML = `${name2.value}'s turn`;
        start();  
             
    }
    else{
        messageBox.innerHTML = "Complete the players names";
        alert("Complete the player names");
    }
}

function start() {
    playButton.removeEventListener("click", Start);
    
    let buttonMatrix = new Array(3);
    let buttonValueMatrix = new Array(3);
    for (let i = 0; i < 3; i++) {
        buttonMatrix[i] = new Array(3);
        buttonValueMatrix[i] = new Array(3).fill(0);
    }
    
    let l = 0;
    for (let i = 0; i < 3; i++) {
        for (let k = 0; k < 3; k++) {
            
            buttonMatrix[i][k] = buttonArray[l];
            l++;
        }
    }
    grayFill();

    let ticks = 0;
    let gameEnd = 0;

    function grayFill() {
        for (let i = 0; i < buttonMatrix.length; i++) {
            buttonMatrix[i].forEach(element => {
                element.style.background = "grey";
            });
            buttonValueMatrix[i].forEach(e=>{
                e = 0;
            });
        }
    }

    function printMessage(message) {
        if (typeof (message) == "string") messageBox.innerHTML = message;
        else throw "Parameter is not a string";
    }

    function gameEndVerification(x, y) {
        let lineVerif = true;
        let collumVerif = true;
        let diagonalVerif = true;
        let ticksVerif = true;
        for (let i = 0; i < 3; i++) {
            if (buttonValueMatrix[x][i] != buttonValueMatrix[x][y]) {
                lineVerif = false;
            }
        }
        for (let i = 0; i < 3; i++) {
            if (buttonValueMatrix[i][y] != buttonValueMatrix[x][y]) {
                collumVerif = false;
            }
        }
        if (buttonValueMatrix[0][0] == buttonValueMatrix[1][1] && buttonValueMatrix[1][1] == buttonValueMatrix[2][2] && 0 != buttonValueMatrix[0][0]) diagonalVerif = true;
        else if (buttonValueMatrix[0][2] == buttonValueMatrix[1][1] && buttonValueMatrix[1][1] == buttonValueMatrix[2][0] && 0 != buttonValueMatrix[0][2]) diagonalVerif = true;
        else diagonalVerif = false;

        if (ticks >= 8) {
            ticksVerif = true;
            x = -1;
            y = -1;
            player = -1;
        } else {
            ticksVerif = false;
            player = buttonValueMatrix[x][y];
        }
        obj = {
            finished: (lineVerif || collumVerif || diagonalVerif || ticksVerif),
            winner: {
                x,
                y,
                player
            }
        }
        return obj;
    }

    function colorChange(Player, changedObj) {
        if (Player == 1) {
            changedObj.style.background = "white";
            messageBox.innerHTML = `${name2.value}'s turn`;
        } else {
            changedObj.style.background = "black";
            messageBox.innerHTML = `${name1.value}'s turn`;
        }
    }
    for (let i = 0; i < buttonMatrix.length; i++) {
        for (let j = 0; j < 3; j++) {
            buttonMatrix[i][j].addEventListener("click", function (e) {
                if(buttonValueMatrix[i][j]==0)
                if (!gameEnd) {
                    colorChange(Player, buttonMatrix[i][j]);
                    buttonValueMatrix[i][j] = Player
                    verification = gameEndVerification(i, j);
                    
                    if (verification.finished) {
                        name1.removeAttribute("readonly");
                        name2.removeAttribute("readonly");
                        if (verification.winner.player == -1) {
                            printMessage("Draw. Click the button to start Again")
                        } else {
                            printMessage(`${playerChoose(verification.winner.player)} won. Click the button to start Again`);
                        }
                        playButton.addEventListener("click", Start);
                        
                        gameEnd = 1;
                    }
                    
                    if (Player == 1) {
                        Player = 2;
                    } else {
                        Player = 1;
                    }
                    ticks++;
                }
            });
        }
    }

}

