let canvas = document.getElementById("canvas");

window.addEventListener("keypress", function (e) {

  let key = e.keyCode;

  //upArrow
  if (key == "119" && headYspeed != 1) {

    headXspeed = 0;
    headYspeed = -1;
  }
  //downArrow
  else if (key == "115" && headYspeed != -1) {

    headXspeed = 0;
    headYspeed = 1;
  }
  //leftArrow
  else if (key == "97" && headXspeed != 1) {

    headYspeed = 0;
    headXspeed = -1;
  }
  //rightArrow
  else if (key == "100" && headXspeed != -1) {

    headYspeed = 0;
    headXspeed = 1;

  }
});

canvas.width = 1530;
canvas.height = 660;

let c = canvas.getContext("2d");

let unit = 30;

let headX = 25 * unit;
let headY = 11 * unit;
let headXspeed = 0;
let headYspeed = 0;

let fruit = {

  fruitX: Math.trunc(Math.random() * canvas.width / unit) * unit,
  fruitY: Math.trunc(Math.random() * canvas.height / unit) * unit,
};
console.log(fruit);


let snakeX = [];
let snakeY = [];


let v;
let k = 1;


function update() {



  headX = headX + 1 * headXspeed * unit;
  headY = headY + 1 * headYspeed * unit;

  //margin collide
  if (headX > canvas.width - unit) {
    headX = 0;
  }
  else if (headX < 0) {
    headX = canvas.width - unit;
  }

  if (headY > canvas.height - unit) {
    headY = 0;
  }
  else if (headY < 0) {
    headY = canvas.height - unit;
  }


  for (i = k - 1; i > 0; i--) {
    snakeX[i] = snakeX[i - 1];
  }
  for (i = k - 1; i > 0; i--) {
    snakeY[i] = snakeY[i - 1];
  }
  snakeX[0] = headX;
  snakeY[0] = headY;


  for (let v = 1; v < k; v++) {
    if (snakeX[v] == headX && snakeY[v] == headY) {
      k = 1;
    }
  }

  //fruit spawn and tail++
  if (headX == fruit.fruitX && headY == fruit.fruitY) {
    fruit.fruitX = Math.trunc(Math.random() * canvas.width / unit) * unit;
    fruit.fruitY = Math.trunc(Math.random() * canvas.height / unit) * unit;
    snakeX[k] = headX;
    snakeY[k] = headY;
    k++;

  }

}
function draw() {

  c.clearRect(0, 0, innerWidth, innerHeight);

  c.fillStyle = "green";

  for (let i = 0; i < k; i++) {
    c.fillRect(snakeX[i], snakeY[i], unit, unit);
    c.strokeRect(snakeX[i], snakeY[i], unit, unit);

  }
  c.fillStyle = "red";

  c.beginPath();
  c.arc(fruit.fruitX + unit / 2, fruit.fruitY + unit / 2, unit / 2, 0, Math.PI * 2, false);
  c.fill();
  c.stroke();
  update();
}
setInterval(draw, 1000 / 10);










