var shapes = [];
var angle = 0;

var nameInput = ""; //user typing
var finalName = ""; //display of name user typed

var ui;

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

  //draw shapes
  for (var s of shapes) {
    push();
    translate(s.x, s.y, s.z);

    rotateX(angle * s.rx);
    rotateY(angle * s.ry);
    rotateZ(angle * s.rz);

    applyMaterial(s);
    drawShape(s.type);

    pop();
  }

  //shape at mouse position
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

//click to place shapes
function mousePressed() {
  var mx = mouseX - width / 2;
  var my = mouseY - height / 2;

  shapes.push({
    x: mx,
    y: my,
    z: random(-200, 200),
    type: random(["box", "sphere", "cone", "cylinder", "torus"]),
    rx: random(0.5, 2),
    ry: random(0.5, 2),
    rz: random(0.5, 2),
    material: random(["normal", "ambient", "specular"]),
    color: [random(255), random(255), random(255)]
  });
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

//materials
function applyMaterial(s) {
  if (s.material === "normal") {
    normalMaterial();
  } else if (s.material === "ambient") {
    ambientMaterial(...s.color);
  } else if (s.material === "specular") {
    specularMaterial(...s.color);
    shininess(50);
  }
}
