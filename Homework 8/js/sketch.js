//character animations
var idleFrames = [];
var walkFrames = [];
var character;

//food
var foods = [];

//game state
var score = 0;
var health = 3;
var gameStarted = false;
var gameOver = false;

//sounds
var bgSound;
var goodSound;
var badSound;

function preload() {
  //load sounds
  bgSound = loadSound("assets/sound/background.mp3");
  goodSound = loadSound("assets/sound/eatingFood.wav");
  badSound  = loadSound("assets/sound/loseHealth.wav");

  //idle frames
  idleFrames[0] = loadImage("assets/images/Idle0.png");
  idleFrames[1] = loadImage("assets/images/Idle1.png");
  idleFrames[2] = loadImage("assets/images/Idle2.png");
  idleFrames[3] = loadImage("assets/images/Idle3.png");

  //walking frames
  walkFrames[0] = loadImage("assets/images/Walk (1).png");
  walkFrames[1] = loadImage("assets/images/Walk (2).png");
  walkFrames[2] = loadImage("assets/images/Walk (3).png");
  walkFrames[3] = loadImage("assets/images/Walk (4).png");
}

function setup() {
  createCanvas(800, 600);
  imageMode(CENTER);

  character = new AnimationImage(400, 300, idleFrames, walkFrames);

  // Create food objects
  foods.push(new Food(100,100,40,color(255,80,80),0));
  foods.push(new Food(250,200,60,color(80,255,120),1));
  foods.push(new Food(500,120,50,color(80,150,255),0));
  foods.push(new Food(650,300,70,color(255,220,80),1));
  foods.push(new Food(350,450,45,color(200,100,255),0));
}

function draw() {
  background(220);

  if(!gameStarted){
    drawStartScreen();
    return;
  }

  if(gameOver){
    drawGameOver();
    return;
  }

  drawHUD();
  handleMovement();

  character.update();
  character.display();

  checkFoodCollision();
}

//start screen
function drawStartScreen(){
  textAlign(CENTER,CENTER);
  textSize(60);
  fill(0);
  text("Food Game", width/2, 200);

  fill(0,200,0);
  rect(width/2-100,300,200,70,15);

  fill(255);
  textSize(30);
  text("PLAY", width/2, 335); // centered vertically
}

//game over screen
function drawGameOver(){
  textAlign(CENTER,CENTER);
  textSize(50);
  fill(255,0,0);
  text("Game Over", width/2, 250);

  fill(0);
  textSize(30);
  text("Score: " + score, width/2, 300);

  fill(0,200,0);
  rect(width/2-100,350,200,60,10);

  fill(255);
  textSize(25);
  text("Restart", width/2, 380); // centered vertically

  // Stop background music when game over
  if(bgSound && bgSound.isPlaying()){
    bgSound.stop();
  }
}

//score and health display
function drawHUD(){
  fill(0);
  textSize(20);
  textAlign(LEFT,TOP);
  text("Score: "+score, 40, 30);
  text("Health: "+health, 40, 60);
}

//movement controls
function handleMovement(){
  var moving = false;

  if(keyIsDown(LEFT_ARROW) || keyIsDown(65)){
    character.move(-3,0);
    moving = true;
  }

  if(keyIsDown(RIGHT_ARROW) || keyIsDown(68)){
    character.move(3,0);
    moving = true;
  }

  if(keyIsDown(UP_ARROW) || keyIsDown(87)){
    character.move(0,-3);
    moving = true;
  }

  if(keyIsDown(DOWN_ARROW) || keyIsDown(83)){
    character.move(0,3);
    moving = true;
  }

  if(!moving){
    character.current = character.idle;
  }
}

//food collision
function checkFoodCollision(){
  for(var i=0;i<foods.length;i++){
    foods[i].display();

    if(foods[i].foodEaten(character.x, character.y, character.size)){
      if(foods[i].type === 0){
        score++;
        if(goodSound) goodSound.play();
      } else {
        health--;
        if(badSound) badSound.play();

        if(health <= 0){
          gameOver = true;
        }
      }
      foods[i].moveToNewSpot();
    }
  }
}

function mousePressed() {
  // PLAY button
  if(!gameStarted){
    var btnX = width/2-100;
    var btnY = 300;
    var btnWidth = 200;
    var btnHeight = 70;

    if(mouseX > btnX && mouseX < btnX+btnWidth &&
       mouseY > btnY && mouseY < btnY+btnHeight){

      gameStarted = true;

      getAudioContext();

        if(bgSound && !bgSound.isPlaying()){
          bgSound.play();
          bgSound.setVolume(0.1);
        }
      }
    }

  // RESTART button
  if(gameOver){
    var btnX = width/2-100;
    var btnY = 350;
    var btnWidth = 200;
    var btnHeight = 60;

    if(mouseX > btnX && mouseX < btnX+btnWidth &&
       mouseY > btnY && mouseY < btnY+btnHeight){

      restartGame();
        getAudioContext();

        if(bgSound && !bgSound.isPlaying()){
          bgSound.play();
          bgSound.setVolume(0.1);
        
      
    }
  }
}
}

//reset game
function restartGame(){
  score = 0;
  health = 3;
  gameOver = false;
  gameStarted = true;

  character.x = width/2;
  character.y = height/2;

  //reset animations
  character.current = character.idle;
  character.idle.index = 0;
  character.walk.index = 0;

  //reset foods
  for(var i=0;i<foods.length;i++){
    foods[i].moveToNewSpot();
  }
}
