let shapes = [];

function setup() {
    createCanvas(800, 600);
    
    // Define draggable shapes (example: head, eyes, mouth, blush)
    shapes.push(new DraggableEllipse(400, 250, 240, 200, color(255,219,182))); // head
    shapes.push(new DraggableEllipse(340, 250, 20, 40, color(0))); // left eye
    shapes.push(new DraggableEllipse(460, 250, 20, 40, color(0))); // right eye
    shapes.push(new DraggableArc(400, 300, 40, 40, 0, PI, color(242,170,166))); // mouth
    shapes.push(new DraggableEllipse(480, 280, 30, 15, color(255, 182, 193))); // right blush
    shapes.push(new DraggableEllipse(320, 280, 30, 15, color(255, 182, 193))); // left blush
}

function draw() {
    background(22, 117, 207);

    // Move shapes randomly a little each frame
    for (let shape of shapes) {
        shape.randomMove();
        shape.show();
    }

    // Hair (static for simplicity)
    fill(117, 219, 205);
    rect(220,160,80,350)
    rect(500,160,80,350)
    triangle(220,510,140,510,220,400)
    triangle(580,510,660,510,580,400)

    // Hairband
    fill(225,40,133);
    rect(270,150,100,50);
    rect(430,150,100,50);

    // Hair front
    fill(117, 219, 205);
    quad(400, 130, 460, 200, 400, 260,340,200);
    quad(400,130,340,200,260,290,300,160);
    quad(400,130,460,200,540,290,500,160);

    // Text
    fill(215, 238, 246);
    textSize(25);
    text("Jasmyn Johnston",550,560);
    text("Simple Shape Art",50,50);
}

// Event handlers
function mousePressed() {
    for (let shape of shapes) {
        shape.pressed();
    }
}

function mouseDragged() {
    for (let shape of shapes) {
        shape.dragged();
    }
}

function mouseReleased() {
    for (let shape of shapes) {
        shape.released();
    }
}

// Draggable Ellipse class
class DraggableEllipse {
    constructor(x, y, w, h, col) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.col = col;
        this.dragging = false;
        this.offsetX = 0;
        this.offsetY = 0;
    }

    show() {
        fill(this.col);
        ellipse(this.x, this.y, this.w, this.h);
    }

    pressed() {
        // check if mouse is inside ellipse
        if (dist(mouseX, mouseY, this.x, this.y) < this.w / 2) {
            this.dragging = true;
            this.offsetX = this.x - mouseX;
            this.offsetY = this.y - mouseY;
        }
    }

    dragged() {
        if (this.dragging) {
            this.x = mouseX + this.offsetX;
            this.y = mouseY + this.offsetY;
        }
    }

    released() {
        this.dragging = false;
    }

    randomMove() {
        // move slightly randomly when not dragging
        if (!this.dragging) {
            this.x += random(-1,1);
            this.y += random(-1,1);
        }
    }
}

// Draggable Arc class
class DraggableArc extends DraggableEllipse {
    constructor(x, y, w, h, start, stop, col) {
        super(x, y, w, h, col);
        this.start = start;
        this.stop = stop;
    }

    show() {
        fill(this.col);
        arc(this.x, this.y, this.w, this.h, this.start, this.stop);
    }
}
