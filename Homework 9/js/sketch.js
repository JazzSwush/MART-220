var player, obstacleList=[], foodList=[], dogsList=[];

//groups
var obstaclesGroup, foodsGroup, dogsGroup;

//game status
var score=0, gameState="start"; //start screen

//animations
var catIdleAnim, catWalkAnim, catHurtAnim, catDeathAnim;
var dogIdleAnim, dogWalkAnim, dogAttackAnim;
var dog2IdleAnim, dog2WalkAnim, dog2AttackAnim;
var ratIdleAnim, ratWalkAnim;
var birdIdleAnim, birdWalkAnim;

//play buttons
var playBtnX, playBtnY, playBtnW=200, playBtnH=60;

function preload() {

  //PLAYER
  //cat
  catIdleAnim = loadAnimation(loadSpriteSheet("assets/images/3 Cat/Idle.png",48,48,4));
  catWalkAnim = loadAnimation(loadSpriteSheet("assets/images/3 Cat/Walk.png",48,48,6));
  catHurtAnim = loadAnimation(loadSpriteSheet("assets/images/3 Cat/Hurt.png",48,48,2));
  catDeathAnim = loadAnimation(loadSpriteSheet("assets/images/3 Cat/Death.png",48,48,4));


  //ENEMIES
  //dog 1
  dogIdleAnim = loadAnimation(loadSpriteSheet("assets/images/1 Dog/Idle.png",48,48,4));
  dogWalkAnim = loadAnimation(loadSpriteSheet("assets/images/1 Dog/Walk.png",48,48,6));
  dogAttackAnim = loadAnimation(loadSpriteSheet("assets/images/1 Dog/Attack.png",48,48,4));

  //dog 2
  dog2IdleAnim = loadAnimation(loadSpriteSheet("assets/images/2 Dog 2/Idle.png",48,48,4));
  dog2WalkAnim = loadAnimation(loadSpriteSheet("assets/images/2 Dog 2/Walk.png",48,48,6));
  dog2AttackAnim = loadAnimation(loadSpriteSheet("assets/images/2 Dog 2/Attack.png",48,48,4));

  //FOOD
  //rat
  ratIdleAnim = loadAnimation(loadSpriteSheet("assets/images/6 Rat 2/Idle.png",32,32,4));
  ratWalkAnim = loadAnimation(loadSpriteSheet("assets/images/6 Rat 2/Walk.png",32,32,4));

  //bird
  birdIdleAnim = loadAnimation(loadSpriteSheet("assets/images/8 Bird 2/Idle.png",32,32,4));
  birdWalkAnim = loadAnimation(loadSpriteSheet("assets/images/8 Bird 2/Walk.png",32,32,6));
}

function setup() {
  createCanvas(800,600);

  //button position
  playBtnX = width/2 - playBtnW/2;
  playBtnY = height/2 - playBtnH/2;

  //creating groups
  obstaclesGroup=new Group();
  foodsGroup=new Group();
  dogsGroup=new Group();
}

function draw(){
  background(30,30,40);


//game states
  if(gameState==="start")
    {
    drawStartScreen();
  } else if(gameState==="play")
    {
    playGame();
  } else if(gameState==="win" || gameState==="lose")
    {
    drawEndScreen();
  }
}

function mousePressed(){
  if(gameState==="start" || gameState==="win" || gameState==="lose")
    {
    //check if button clicked
    if(mouseX>playBtnX && mouseX<playBtnX+playBtnW && mouseY>playBtnY && mouseY<playBtnY+playBtnH){
      startNewGame();
    }
  }
}

//start screen
function drawStartScreen(){
  fill(255);
  textAlign(CENTER,CENTER);
  textSize(50);
  text("The Streets", width/2, height/2 - 100);

  drawButton("PLAY");
}

//end screen
function drawEndScreen(){
  fill(255);
  textAlign(CENTER,CENTER);
  textSize(50);
  if(gameState==="win") text("YOU WIN!", width/2, height/2 - 100);
  else 
  text("GAME OVER", width/2, height/2 - 100);

  drawButton("PLAY AGAIN");
}

function drawButton(txt){
  fill(70,130,180);
  rect(playBtnX, playBtnY, playBtnW, playBtnH, 10);
  fill(255);
  textSize(32);
  textAlign(CENTER,CENTER);
  text(txt, width/2, height/2);
}

//play game
function playGame(){
  player.move(obstaclesGroup);
  foodList.forEach(f=>f.update());
  dogsList.forEach(d=>d.update(player));
  handleCollisions();
  checkGameState();

  drawSprites();
  obstacleList.forEach(o=>o.display());
  drawUI();
}

//collisions
function handleCollisions(){
  player.sprite.overlap(foodsGroup,(p,f)=>{
    score++;
    foodList = foodList.filter(item=>item.sprite!==f);
    f.remove();
    spawnFood();
  });

  player.sprite.overlap(dogsGroup, ()=>player.takeDamage());
}

//check win/lose conditions
function checkGameState(){
  if(score>=10){gameState="win";}
  if(player.health<=0){player.die(); 
  gameState="lose";}
}

//ui display
function drawUI(){
  fill(255); textSize(18); textAlign(LEFT,TOP);
  text("Food: "+score+"/10",20,20);
  text("Health: "+player.health,20,40);
}

//spawn food
function spawnFood(){
  var type=random()<0.5 ? {idle:ratIdleAnim, move:ratWalkAnim} : {idle:birdIdleAnim, move:birdWalkAnim};
  var f = new Food(random(50,750), random(50,550), type, foodsGroup);
  f.sprite.scale=2;
  foodList.push(f);
}

//start new game
function startNewGame(){
  //remove old sprites 
  obstaclesGroup.removeSprites();
  foodsGroup.removeSprites();
  dogsGroup.removeSprites();

  //remove old player
  if(player && player.sprite) {
    player.sprite.remove();
  }

  obstacleList = [];
  foodList = [];
  dogsList = [];
  score = 0;

  //creates new player
  player = new Player(100,300,{idle:catIdleAnim, walk:catWalkAnim, hurt:catHurtAnim, death:catDeathAnim});
  player.sprite.scale = 2;

  //new obstacles
  for(var i=0;i<4;i++)
    {
    var o = new Obstacle(random(100,700), random(100,500), obstaclesGroup, obstacleList);
    obstacleList.push(o);
    }

  //new foods
  for(var i=0;i<5;i++) 
  {
    spawnFood();
  }

  //new dogs
  for(var i=0;i<3;i++){
    var dogType=random()<0.5 ? 
      {idle:dogIdleAnim, walk:dogWalkAnim, attack:dogAttackAnim} :
      {idle:dog2IdleAnim, walk:dog2WalkAnim, attack:dog2AttackAnim};

    var d = new Enemy(random(200,700), random(100,500), dogType);
    d.sprite.scale=2;
    dogsList.push(d);
    dogsGroup.add(d.sprite);
  }

  gameState="play";
}