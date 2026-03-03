//character animation
var idleFrames = [];
var walkFrames = [];

var character;
var characterSize = 100;

var idleSpeed = 12;
var walkSpeed = 6;

//food
var foods = [];

var score = 0;
var gameTime = 30; // seconds
var startTime;
var gameOver = false;


function preload() {

  //idle frames
  idleFrames[0] = loadImage("images/Idle0.png");
  idleFrames[1] = loadImage("images/Idle1.png");
  idleFrames[2] = loadImage("images/Idle2.png");
  idleFrames[3] = loadImage("images/Idle3.png");

  //walk frames
  walkFrames[0] = loadImage("images/Walk (1).png");
  walkFrames[1] = loadImage("images/Walk (2).png");
  walkFrames[2] = loadImage("images/Walk (3).png");
  walkFrames[3] = loadImage("images/Walk (4).png");
}

function setup() {
  createCanvas(800, 600);
  imageMode(CENTER);


  startTime = millis();
  character = new AnimationImage(400, 300, idleFrames, walkFrames);

    foods.push(new Food(100, 100, 40, color(255,80,80), 0));
    foods.push(new Food(250, 200, 60, color(80,255,120), 1));
    foods.push(new Food(500, 120, 50, color(80,150,255), 0));
    foods.push(new Food(650, 300, 70, color(255,220,80), 1));
    foods.push(new Food(350, 450, 45, color(200,100,255), 0));

}

function draw() {
  background(220);

//timer
  var elapsed = (millis() - startTime) / 1000;
  var remaining = gameTime - elapsed;

  if (remaining <= 0) {
    remaining = 0;
    gameOver = true;
  }

//display score and timer
  fill(0);
  textSize(20);

  textAlign(LEFT, TOP);
  text("Score: " + score, 10, 10);

  textAlign(RIGHT, TOP);
  text("Time: " + remaining.toFixed(1), width - 10, 10);

  if (!gameOver) {

//movement 
    var moving = false;

if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
  character.move(-3, 0);
  moving = true;
}

if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
  character.move(3, 0);
  moving = true;
}

if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
  character.move(0, -3);
  moving = true;
}

if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
  character.move(0, 3);
  moving = true;
}

if(!moving){
  character.current = character.idle;
}
    character.update();
    character.display();

//food collision
    for (var i = 0; i < foods.length; i++) {
      foods[i].display();
      if (foods[i].foodEaten(character.x, character.y, character.size)) {
        score++;
        foods[i].moveToNewSpot();
      }
    }

  } else {
//game over display
    textAlign(CENTER, CENTER);
    textSize(50);
    fill(255, 0, 0);
    text("Game Over!", width / 2, height / 2 - 50);

    textSize(30);
    fill(0);
    text("Final Score: " + score, width / 2, height / 2);

//restart button 
    var btnWidth = 200;
    var btnHeight = 50;
    var btnX = width / 2 - btnWidth / 2;
    var btnY = height / 2 + 50;

    fill(0, 200, 0);
    rect(btnX, btnY, btnWidth, btnHeight, 10);

    fill(255);
    textSize(25);
    text("Restart", width / 2, btnY + btnHeight / 2);
  }

  character.display();
}

function mousePressed() {
  if (gameOver) {
    var btnWidth = 200;
    var btnHeight = 50;
    var btnX = width / 2 - btnWidth / 2;
    var btnY = height / 2 + 50;

    if (mouseX > btnX && mouseX < btnX + btnWidth &&
        mouseY > btnY && mouseY < btnY + btnHeight) {
      restartGame();
    }
  }
}

//restart game
function restartGame() {
  score = 0;
  startTime = millis();
  gameOver = false;

  //reset character
  character.x = width / 2;
  character.y = height / 2;

  //reset food positions
  for (var i = 0; i < foods.length; i++) {
    foods[i].moveToNewSpot();
  }

}
