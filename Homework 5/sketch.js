var foodX = [];
var foodY = [];
var foodType = [];

var totalFood = 6;

var hoverFrames = [];
var totalFrames = 60;
var currentFrame = 0;


function setup() {

  createCanvas(800, 500);

  //create food
  for (var i = 0; i < totalFood; i++) {

    foodX[i] = random(100, width - 100);
    foodY[i] = random(100, height - 100);
    foodType[i] = i;

  }


 //create hover animation
  for (var i = 0; i < totalFrames; i++) {

    hoverFrames[i] = sin(i * 0.1) * 15;

  }

}


function draw() {

  background(30, 30, 50);


  //animate first fruit
var drawY = foodY[0] + hoverFrames[currentFrame];
drawFruit(foodX[0], drawY, 50, foodType[0]);

// draw remaining fruit
for (var i = 1; i < totalFood; i++) {
  drawFruit(foodX[i], foodY[i], 50, foodType[i]);
}

  for (var i = 1; i < totalFood; i++) {

    drawFruit(foodX[i], foodY[i], 50, foodType[i]);

  }

  currentFrame++;

  if (currentFrame >= totalFrames) {
    currentFrame = 0;
  }

}

//fruit drawing 
function drawFruit(x, y, size, type) {

  noStroke();

  //apple
  if (type == 0) {

    fill(255, 50, 50);
    circle(x, y, size);

    stroke(80, 40, 0);
    strokeWeight(4);
    line(x, y - size/2, x, y - size/2 - 15);

    noStroke();
    fill(50, 200, 50);
    ellipse(x + 8, y - size/2 - 10, 15, 8);

  }

  //orange
  else if (type == 1) {

    fill(255, 150, 0);
    circle(x, y, size);

    fill(50, 200, 50);
    ellipse(x, y - size/2, 12, 6);

  }

  //watermelon
  else if (type == 2) {

    fill(50, 200, 70);
    arc(x, y, size, size, 0, PI);

    fill(255, 80, 80);
    arc(x, y, size - 10, size - 10, 0, PI);

    fill(0);
    ellipse(x - 10, y, 4, 6);
    ellipse(x, y + 5, 4, 6);
    ellipse(x + 10, y, 4, 6);

  }

  //banana
  else if (type == 3) {

    fill(255, 230, 50);
    arc(x, y, size, size/2, PI, TWO_PI);

  }

  //blueberry
  else if (type == 4) {

    fill(50, 100, 255);
    circle(x, y, size * 0.6);

  }

    //grape
    else if (type == 5) {

      fill(100, 50, 200);
      circle(x, y, size * 0.7);


    }

}
