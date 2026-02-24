//character animation
var idleFrames = [];
var walkFrames = [];

var character;

var idleSpeed = 12;
var walkSpeed = 6;

//food
var foods = [];

// wrapper to use the Animation class
class AnimationImage {
  constructor(x, y, idleFrames, walkFrames){
    this.x = x;
    this.y = y;
    this.idle = new Animation(idleFrames, idleSpeed);
    this.walk = new Animation(walkFrames, walkSpeed);
    this.current = this.idle;
    this.facing = 1;
  }

     move(dx, dy){
     this.x += dx;
     this.y += dy;

     if(dx < 0) this.facing = -1;
     else if(dx > 0) this.facing = 1;

      if(dx !== 0 || dy !== 0) this.current = this.walk;
    }

  update(){
    this.current.update();
  }

  display(){
    push();
    // draw centered so flipping is easier
    translate(this.x, this.y);
    scale(this.facing, 1);
    imageMode(CENTER);
    let img = this.current.frames[this.current.index];
    image(img, 0, 0, 100, 100);
    pop();

    this.current = this.idle;
  }
}

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

  character = new AnimationImage(400, 300, idleFrames, walkFrames);

    foods.push(new Food(100, 100, 40, color(255,80,80), 0));
    foods.push(new Food(250, 200, 60, color(80,255,120), 1));
    foods.push(new Food(500, 120, 50, color(80,150,255), 0));
    foods.push(new Food(650, 300, 70, color(255,220,80), 1));
    foods.push(new Food(350, 450, 45, color(200,100,255), 0));

}

function draw() {
  background(220);

  // movement controls
  var left = keyIsDown(LEFT_ARROW) || keyIsDown(65); 
  var right = keyIsDown(RIGHT_ARROW) || keyIsDown(68);
  var up = keyIsDown(UP_ARROW) || keyIsDown(87);
  var down = keyIsDown(DOWN_ARROW) || keyIsDown(83);

  if (left) character.move(-3, 0);
  if (right) character.move(3, 0);
  if (up) character.move(0, -3);
  if (down) character.move(0, 3);

  character.update();
  character.display();

  for(let i = 0; i < foods.length; i++){
  foods[i].display();
}

}