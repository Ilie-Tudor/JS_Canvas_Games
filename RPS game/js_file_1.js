let ButtonArray = document.getElementsByClassName("buttonTrio");
let RoundMessage = document.getElementById("RoundMessage");
let ScoreValueBox = document.getElementById("ScoreValue");
let ScoreValueC = 0;
let ScoreValueH = 0;

function Round() {
    let ComputerPick = parseInt((Math.random() * 3) + 1);

    if (ComputerPick != 1 || ComputerPick != 2 || ComputerPick != 3) {
        ComputerPick = parseInt((Math.random() * 3) + 1);
    }

    let HumanPick;
    for (let i = 0; i < 3; i++) {
        if (this == ButtonArray[i]) {
            HumanPick = i;
        }
    }
    HumanPick++;

    console.log(ComputerPick);
    console.log(HumanPick);
    if (ComputerPick == HumanPick) {
        RoundMessage.innerHTML = "Draw";
    }
    else if (Math.max(ComputerPick - HumanPick, HumanPick - ComputerPick) == 1) {
        if (ComputerPick > HumanPick) {
            RoundMessage.innerHTML = "Computer Wins!";
            ScoreValueC++;
            ScoreValueBox.innerHTML = ScoreValueC + " to " + ScoreValueH;
        }
        else {
            RoundMessage.innerHTML = "You Win!";
            ScoreValueH++;
            ScoreValueBox.innerHTML = ScoreValueC + " to " + ScoreValueH;
        }
    }
    else {
        if (ComputerPick < HumanPick) {
            RoundMessage.innerHTML = "Computer Wins!";
            ScoreValueC++;
            ScoreValueBox.innerHTML = ScoreValueC + " to " + ScoreValueH;
        }
        else {
            RoundMessage.innerHTML = "You Win!";
            ScoreValueH++;
            ScoreValueBox.innerHTML = ScoreValueC + " to " + ScoreValueH;
        }

    }
    HumanPick = null;
}
for (let i = 0; i < 3; i++) {
    ButtonArray[i].addEventListener("click", Round);
}