// positions
  //head
var headX=400; 
var headY=250; 
var headSX=2; 
var headSY=2;

  //left eye
var eyeLX=340;
var eyeLY=250;
var eyeLSX=3; 
var eyeLSY=2;

  //righ eye
var eyeRX=460;
var eyeRY=250;
var eyeRSX=-2; 
var eyeRSY=3;

  //mouth
var mouthX=400;
var mouthY=300;
var mouthSX=2;
var mouthSY=-2;

  //blush
var blushLX=320;
var blushLY=280;
var blushLSX=2;
var blushLSY=2;
var blushRX=480;
var blushRY=280;
var blushRSX=-2;
var blushRSY=2;

var selected = "";

function setup() 
{
    createCanvas(800, 600);
}

function draw() 
{
    background(22, 117, 207);
    borderControl();
    movements();


//shapes that will move
    //head
    fill(255,219,182);
    ellipse(headX,headY,240,200);
    
    //eyes
    fill(0)
    ellipse(eyeLX,eyeLY,20,40);
    ellipse(eyeRX,eyeRY,20,40);
  
    //mouth
    fill(242, 170, 166)
    arc(mouthX,mouthY, 40, 40, 0, PI);
  
    //blush
    ellipse(blushRX,blushRY,30,15);
    ellipse(blushLX,blushLY,30,15);
  
//non-moving shapes
    //hair back
    fill(117, 219, 205);
    rect(220,160,80,350)
    rect(500,160,80,350)
    triangle(220,510,140,510,220,400)
    triangle(580,510,660,510,580,400)
  
    //hairband
    fill(225,40,133);
    rect(270,150,100,50);
    rect(430,150,100,50);
  
    //hair front
    fill(117, 219, 205);
    quad(400, 130, 460, 200, 400, 260,340,200);
    quad(400,130,340,200,260,290,300,160);
    quad(400,130,460,200,540,290,500,160);

    //text//
    fill(215, 238, 246);
    textSize(30);
    text("Jasmyn Johnston",550,560);
    text("Simple Shape Art",50,50);
    textSize(16);
    text("Click and drag shapes to move them",50,100);

}

function movements() {
    //movement 
    //moving shapes
if (selected != "head") {
    headX += headSX;
    headY += headSY;
}

if (selected != "eyeL") {
    eyeLX += eyeLSX;
    eyeLY += eyeLSY;
}

if (selected != "eyeR") {
    eyeRX += eyeRSX;
    eyeRY += eyeRSY;
}

if (selected != "mouth") {
    mouthX += mouthSX;
    mouthY += mouthSY;
}

if (selected != "blushL") {
    blushLX += blushLSX;
    blushLY += blushLSY;
}

if (selected != "blushR") {
    blushRX += blushRSX;
    blushRY += blushRSY;
 }

}

function borderControl() {
        //keep inside canvas
    if (headX<120 || headX>width-120) {
        headSX*=-1;
    }
    if (headY<100 || headY>height-100) {
        headSY*=-1;
    }   
    if (eyeLX<10 || eyeLX>width-10) {
        eyeLSX*=-1;
    }
    if (eyeLY<20 || eyeLY>height-20) {
        eyeLSY*=-1;
    }
    if (eyeRX<10 || eyeRX>width-10) {
        eyeRSX*=-1;
    }
    if (eyeRY<20 || eyeRY>height-20) {
        eyeRSY*=-1;
    }
    if (mouthX<20 || mouthX>width-20) {
        mouthSX*=-1;
    }
    if (mouthY<5 || mouthY>height-20) {
        mouthSY*=-1;
    }
    if (blushLX<15 || blushLX>width-15) {
        blushLSX*=-1;
    }
    if (blushLY<10 || blushLY>height-10) {
        blushLSY*=-1;
    }
    if (blushRX<15 || blushRX>width-15) {
        blushRSX*=-1;
    }
    if (blushRY<10 || blushRY>height-10) {
        blushRSY*=-1;
    }
}

function mousePressed() {
        //click to select shape
if(dist(mouseX, mouseY, headX, headY) < 120){
    selected = "head";
} else if (dist(mouseX, mouseY, eyeLX, eyeLY) < 20){
    selected = "eyeL";
} else if (dist(mouseX, mouseY, eyeRX, eyeRY) < 20){
    selected = "eyeR"; 
} else if (dist(mouseX, mouseY, mouthX, mouthY) < 20){
    selected = "mouth"; 
} else if (dist(mouseX, mouseY, blushLX, blushLY) < 15){
    selected = "blushL"; 
} else if (dist(mouseX, mouseY, blushRX, blushRY) < 15){
    selected = "blushR"; 
} else {
    selected = "";

 }

}

function mouseDragged() {
 if(selected == "head") {
    headX = mouseX;
    headY = mouseY;
 }
    if(selected == "eyeL") {
    eyeLX = mouseX;
    eyeLY = mouseY;
 }
    if(selected == "eyeR") {
    eyeRX = mouseX;
    eyeRY = mouseY;
 }
    if(selected == "mouth") {
    mouthX = mouseX;
    mouthY = mouseY;
 }
    if(selected == "blushL") {
    blushLX = mouseX;
    blushLY = mouseY;
 }
    if(selected == "blushR") {
    blushRX = mouseX;
    blushRY = mouseY;
 }

}

function mouseReleased() {
    if(selected == "head") {
        headSX=0;
        headSY=0;
    }
    if(selected == "eyeL") {
        eyeLSX=0;
        eyeLSY=0;
    }  
    if(selected == "eyeR") {
        eyeRSX=0;
        eyeRSY=0;
    }
    if(selected == "mouth") {
        mouthSX=0;
        mouthSY=0;
    }
    if(selected == "blushL") {
        blushLSX=0;
        blushLSY=0;
    }
    if(selected == "blushR") {
        blushRSX=0;
        blushRSY=0;
    }
}
