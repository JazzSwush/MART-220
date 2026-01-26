function setup() 
{
    createCanvas(800, 600);
}

function draw() 
{
    background(22, 117, 207);
    
    //head
      fill(255,219,182);
      ellipse(400,250,240,200);
    
    //eyes
    fill(0)
    ellipse(340,250,20,40);
    ellipse(460,250,20,40);
  
    //mouth
    fill(242, 170, 166)
    arc(400,300, 40, 40, 0, PI);
  
    //blush
    ellipse(480,280,30,15);
    ellipse(320,280,30,15);
  
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
    textSize(25);
    text("Jasmyn Johnston",550,560);
    text("Simple Shape Art",50,50);
  

}
