var player;
var obstacleList = [];
var foodList = [];
var dogsList = [];

var obstaclesGroup, foodsGroup, dogsGroup;

var particles = [];

var score = 0;
var gameState = "start";

var attackHintTimer = 240;

//game timer
var gameTimer = 60;
var lastSecond = 0;

//dog spawn timer
var dogSpawnTimer = 0;
var dogSpawnRate = 300;

//obstacle spawn timer
var obstacleSpawnTimer = 0;
var obstacleSpawnRate = 600;

//animations
var catIdleAnim, catWalkAnim, catHurtAnim, catDeathAnim;
var dogIdleAnim, dogWalkAnim, dogAttackAnim;
var dog2IdleAnim, dog2WalkAnim, dog2AttackAnim;
var ratIdleAnim, ratWalkAnim;
var birdIdleAnim, birdWalkAnim;

//sounds
var hitSound;
var collectSound;
var loseSound;
var winSound;
var bgMusic;

//buttons
var playBtnX, playBtnY, playBtnW = 200, playBtnH = 60;

function preload(){

    //animations
  catIdleAnim = loadAnimation(loadSpriteSheet("assets/images/3 Cat/Idle.png",48,48,4));
  catWalkAnim = loadAnimation(loadSpriteSheet("assets/images/3 Cat/Walk.png",48,48,6));
  catHurtAnim = loadAnimation(loadSpriteSheet("assets/images/3 Cat/Hurt.png",48,48,2));
  catDeathAnim = loadAnimation(loadSpriteSheet("assets/images/3 Cat/Death.png",48,48,4));

  dogIdleAnim = loadAnimation(loadSpriteSheet("assets/images/1 Dog/Idle.png",48,48,4));
  dogWalkAnim = loadAnimation(loadSpriteSheet("assets/images/1 Dog/Walk.png",48,48,6));
  dogAttackAnim = loadAnimation(loadSpriteSheet("assets/images/1 Dog/Attack.png",48,48,4));

  dog2IdleAnim = loadAnimation(loadSpriteSheet("assets/images/2 Dog 2/Idle.png",48,48,4));
  dog2WalkAnim = loadAnimation(loadSpriteSheet("assets/images/2 Dog 2/Walk.png",48,48,6));
  dog2AttackAnim = loadAnimation(loadSpriteSheet("assets/images/2 Dog 2/Attack.png",48,48,4));

  ratIdleAnim = loadAnimation(loadSpriteSheet("assets/images/6 Rat 2/Idle.png",32,32,4));
  ratWalkAnim = loadAnimation(loadSpriteSheet("assets/images/6 Rat 2/Walk.png",32,32,4));

  birdIdleAnim = loadAnimation(loadSpriteSheet("assets/images/8 Bird 2/Idle.png",32,32,4));
  birdWalkAnim = loadAnimation(loadSpriteSheet("assets/images/8 Bird 2/Walk.png",32,32,6));

  //sounds
  soundFormats("mp3","wav");

  hitSound = loadSound("assets/sounds/hitSound.mp3");
  collectSound = loadSound("assets/sounds/collectSound.mp3");
  loseSound = loadSound("assets/sounds/loseSound.mp3");
  winSound = loadSound("assets/sounds/winSound.mp3");
  bgMusic = loadSound("assets/sounds/bgMusic.mp3");
}

function setup(){

  createCanvas(800,600);

  playBtnX = width/2 - playBtnW/2;
  playBtnY = height/2 - playBtnH/2;

  obstaclesGroup = new Group();
  foodsGroup = new Group();
  dogsGroup = new Group();
}

function draw(){

  background(30);

  if(gameState === "start"){
    drawStartScreen();
  }
  else if(gameState === "play"){
    playGame();
  }
  else if(gameState === "win"){
    drawEndScreen(true);
  }
  else if(gameState === "lose"){
    drawEndScreen(false);
  }
}

function playGame(){

  //game timer
  if(frameCount - lastSecond >= 60){
    gameTimer--;
    lastSecond = frameCount;
  }

  //dog spawn timer
  dogSpawnTimer++;

  if(dogSpawnTimer >= dogSpawnRate){

    spawnEnemy();

    dogSpawnTimer = 0;

    if(dogSpawnRate > 120){
      dogSpawnRate -= 15;
    }
  }

  //obstacle spawn timer
  obstacleSpawnTimer++;

  if(obstacleSpawnTimer >= obstacleSpawnRate){

    spawnObstacle();

    obstacleSpawnTimer = 0;
  }

  player.move(obstaclesGroup);

  //attacks
  if(keyWentDown("SPACE")){
    attackEnemies();
  }

  //update foods
  for(var i=0;i<foodList.length;i++){
    foodList[i].update();
  }

  //update dogs
  for(var i=0;i<dogsList.length;i++){
    dogsList[i].update(player);
  }

  handleCollisions();
  checkGameState();

  drawSprites();

  //draw obstacles
  for(var i=0;i<obstacleList.length;i++){
    obstacleList[i].display();
  }

  //particles
  for(var i=particles.length-1;i>=0;i--){

    particles[i].update();
    particles[i].display();

    if(particles[i].isDead()){
      particles.splice(i,1);
    }
  }

  drawUI();
}

function attackEnemies(){

  for(var i=dogsList.length-1;i>=0;i--){

    var enemy = dogsList[i];

    var dx = enemy.sprite.position.x - player.sprite.position.x;
    var dy = enemy.sprite.position.y - player.sprite.position.y;

    var d = dist(
      player.sprite.position.x,
      player.sprite.position.y,
      enemy.sprite.position.x,
      enemy.sprite.position.y
    );

    if(d < 60){

      if(hitSound){
        hitSound.play();
      }

      enemy.takeDamage();

      var mag = sqrt(dx*dx + dy*dy);

      var nx = dx / mag;
      var ny = dy / mag;

      enemy.sprite.position.x += nx * 40;
      enemy.sprite.position.y += ny * 40;

      player.sprite.position.x -= nx * 10;
      player.sprite.position.y -= ny * 10;

      for(var j=0;j<12;j++){

        particles.push(
          new Particle(
            enemy.sprite.position.x,
            enemy.sprite.position.y,
            "damage"
          )
        );
      }

      if(enemy.health <= 0){

        enemy.sprite.remove();
        dogsList.splice(i,1);
      }
    }
  }
}

function handleCollisions(){

  //food collection
  player.sprite.overlap(foodsGroup,function(p,f){

    score++;

    if(collectSound){
      collectSound.play();
    }

    for(var i=0;i<12;i++){

      particles.push(
        new Particle(
          f.position.x,
          f.position.y,
          "heal"
        )
      );
    }

    foodList = foodList.filter(function(x){
      return x.sprite !== f;
    });

    f.remove();

    spawnFood();
  });

  //dog damage
  player.sprite.overlap(dogsGroup,function(){

    player.takeDamage();
  });
}

function checkGameState(){

  //win state
  if(score >= 20){

    if(gameState !== "win"){

      if(winSound){
        winSound.play();
      }

      gameState = "win";
    }
  }

  //lose state
  if(player.health <= 0 || gameTimer <= 0){

    if(gameState !== "lose"){

      player.die();

      if(loseSound){
        loseSound.play();
      }

      gameState = "lose";
    }
  }
}

function spawnFood(){

  var type = random() < 0.5 ?
  {idle:ratIdleAnim, move:ratWalkAnim} :
  {idle:birdIdleAnim, move:birdWalkAnim};

  var f = new Food(
    random(50,750),
    random(50,550),
    type,
    foodsGroup
  );

  f.sprite.scale = 2;

  foodList.push(f);
}

function spawnEnemy(){

  var type = random() < 0.5 ?
  {idle:dogIdleAnim,walk:dogWalkAnim,attack:dogAttackAnim} :
  {idle:dog2IdleAnim,walk:dog2WalkAnim,attack:dog2AttackAnim};

  var d = new Enemy(
    random(200,700),
    random(100,500),
    type
  );

  d.sprite.scale = 2;

  dogsList.push(d);
  dogsGroup.add(d.sprite);
}

function spawnObstacle(){

  var o = new Obstacle(
    random(100,700),
    random(100,500),
    obstaclesGroup,
    obstacleList
  );

  obstacleList.push(o);
}

function startNewGame(){

  userStartAudio();

  //music
  if(bgMusic && !bgMusic.isPlaying()){

    bgMusic.setVolume(0.3);
    bgMusic.loop();
  }

  obstaclesGroup.removeSprites();
  foodsGroup.removeSprites();
  dogsGroup.removeSprites();

  if(player && player.sprite){
    player.sprite.remove();
  }

  obstacleList = [];
  foodList = [];
  dogsList = [];
  particles = [];

  score = 0;

  gameTimer = 60;

  dogSpawnTimer = 0;
  dogSpawnRate = 300;

  obstacleSpawnTimer = 0;

  lastSecond = frameCount;

  attackHintTimer = 240;

  player = new Player(100,300,{
    idle:catIdleAnim,
    walk:catWalkAnim,
    hurt:catHurtAnim,
    death:catDeathAnim
  });

  player.sprite.scale = 2;

  //starting obstacles
  for(var i=0;i<4;i++){

    var o = new Obstacle(
      random(100,700),
      random(100,500),
      obstaclesGroup,
      obstacleList
    );

    obstacleList.push(o);
  }

  //starting food
  for(var i=0;i<5;i++){
    spawnFood();
  }

  //starting dogs
  for(var i=0;i<2;i++){
    spawnEnemy();
  }

  gameState = "play";
}

function drawUI(){

  fill(255);

  textSize(18);

  text("Food: " + score + " / 20",20,20);
  text("Health: " + player.health,20,45);
  text("Time: " + gameTimer,20,70);
  text("Dogs: " + dogsList.length,20,95);

  //attack hint
  if(attackHintTimer > 0){

    textAlign(CENTER);

    textSize(22);

    text(
      "Press SPACE to attack dogs",
      width/2,
      height - 30
    );

    attackHintTimer--;
  }
}

function drawStartScreen(){

  fill(255);

  textAlign(CENTER);

  textSize(50);

  text(
    "THE STREETS",
    width/2,
    height/2 - 100
  );

  textSize(24);

  text(
    "Collect 20 food before time runs out!",
    width/2,
    height/2 - 40
  );

  drawButton("PLAY");
}

function drawEndScreen(){

  background(30);

  fill(255);

  textAlign(CENTER);

  textSize(50);

  text(
    gameState === "win" ? "YOU WIN!" : "GAME OVER",
    width/2,
    height/2 - 100
  );

  textSize(28);

  text(
    "Food Collected: " + score,
    width/2,
    height/2 - 40
  );

  drawButton("PLAY AGAIN");
}

function drawButton(txt){

  fill(70,130,180);

  rect(
    playBtnX,
    playBtnY,
    playBtnW,
    playBtnH,
    10
  );

  fill(255);

  textSize(30);

  textAlign(CENTER,CENTER);

  text(
    txt,
    playBtnX + playBtnW/2,
    playBtnY + playBtnH/2
  );
}

function mousePressed(){

  if(
    gameState !== "start" &&
    gameState !== "win" &&
    gameState !== "lose"
  ){
    return;
  }

  if(
    mouseX > playBtnX &&
    mouseX < playBtnX + playBtnW &&
    mouseY > playBtnY &&
    mouseY < playBtnY + playBtnH
  ){

    startNewGame();
  }
}