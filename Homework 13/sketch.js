var shapes = [];
var catModel;
var angle = 0;
var textures = [];

var nameInput = ""; //user typing
var finalName = ""; //display of name user typed

var ui;

function preload() {
  //load model
  catModel = loadModel("assets/johnston_jasmyn_catPlat.obj", true);

  //load textures
  textures[0] = loadImage("assets/textures/crackle.jpg");
  textures[1] = loadImage("assets/textures/fabric.jpg");
  textures[2] = loadImage("assets/textures/paperbag.jpg");
  textures[3] = loadImage("assets/textures/pattern.jpg");
  textures[4] = loadImage("assets/textures/swirl.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  ui = createGraphics(windowWidth, windowHeight);
}

function draw() {
  background(15);

  orbitControl();

  //lighting
  ambientLight(100);
  pointLight(255, 255, 255, 0, 0, 300);

  angle += 0.01;

  //center model
  push();
  rotateY(angle * 0.5);
  rotateX (PI);
  scale(2);
  model(catModel);
  pop();

  //orbiting shapes
  for (var s of shapes) {
    push();

    //update orbit angle
    s.angle += s.speed;

    //orbit position
    var x = cos(s.angle) * s.radius;
    var z = sin(s.angle) * s.radius;

    translate(x, s.y, z);

    rotateX(angle * s.rx);
    rotateY(angle * s.ry);
    rotateZ(angle * s.rz);

    //apply texture
    texture(textures[s.tex]);

    drawShape(s.type);

    pop();
  }

  //preview shape at mouse position
  var mx = mouseX - width / 2;
  var my = mouseY - height / 2;

  push();
  translate(mx, my, 0);
  rotateX(angle);
  rotateY(angle);

  normalMaterial();
  drawShape("preview");
  pop();

  drawUI();
}


//keyboard controls
function keyPressed() {
  if (keyCode === ENTER) {
    finalName = nameInput;
  } else if (keyCode === BACKSPACE) {
    nameInput = nameInput.substring(0, nameInput.length - 1);
  }
}

function keyTyped() {
  //only normal characters
  if (key.length === 1) {
    nameInput += key;
  }
}

//UI
function drawUI() {
  ui.clear();

  ui.fill(255);
  ui.noStroke();

  //title
  ui.textAlign(CENTER, TOP);
  ui.textSize(30);
  ui.text("Create by clicking", ui.width / 2, 20);

  //instructions
  ui.textSize(18);
  ui.fill(180);
  ui.text("Type your name, press ENTER", ui.width / 2, 60);

  //live typing preview (center)
  ui.fill(255);
  ui.textSize(20);
  ui.text(nameInput, ui.width / 2, 90);

  //final name (bottom right)
  ui.textAlign(RIGHT, BOTTOM);
  ui.textSize(30);
  ui.fill(200);
  ui.text(finalName, ui.width - 20, ui.height - 20);

  //draw overlay
  push();
  resetMatrix();
  image(ui, -width / 2, -height / 2);
  pop();
}

//click to place 2 shapes
function mousePressed() {
  for (let i = 0; i < 2; i++) {
    shapes.push({
      radius: random(100, 300),
      angle: random(TWO_PI),
      speed: random(0.01, 0.03),

      y: random(-100, 100),

      type: random(["box", "sphere", "cone", "cylinder", "torus"]),

      rx: random(0.5, 2),
      ry: random(0.5, 2),
      rz: random(0.5, 2),

      tex: floor(random(5))
    });
  }
}

//draw shapes
function drawShape(type) {
  switch(type) {
    case "box":
      box(50);
      break;
    case "sphere":
      sphere(30);
      break;
    case "cone":
      cone(25, 60);
      break;
    case "cylinder":
      cylinder(25, 60);
      break;
    case "torus":
      torus(30, 10);
      break;
    default:
      box(40);
  }
}
