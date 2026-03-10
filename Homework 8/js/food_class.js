class Food {
  constructor(x, y, size, colorValue, type){
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = colorValue;
    this.type = type;

    this.nextMoveTime = millis() + random(2000,5000);
  }

  moveRandomly(){
    if(millis() > this.nextMoveTime){
      this.x += random(-50,50);
      this.y += random(-50,50);

      this.x = constrain(this.x, this.size/2, width - this.size/2);
      this.y = constrain(this.y, this.size/2, height - this.size/2);

      this.nextMoveTime = millis() + random(2000,5000);
    }
  }

  foodEaten(px, py, playerSize){
    var d = dist(this.x,this.y,px,py);
    return d < (this.size/2 + playerSize/2);
  }

  moveToNewSpot(){
    this.x = random(this.size/2, width - this.size/2);
    this.y = random(this.size/2, height - this.size/2);
    this.nextMoveTime = millis() + random(2000,5000);
  }

  display(){
    this.moveRandomly();
    push();
    translate(this.x,this.y);
    fill(this.color);
    noStroke();

    if(this.type === 0){ // Good
      circle(0,0,this.size);
      fill(40,150,40);
      ellipse(0,-this.size/2,this.size/3,this.size/4);
    } else { // Bad (spiky)
      var spikes = 8;
      var innerR = this.size/3;
      var outerR = this.size/2;
      beginShape();
      for(var i=0;i<spikes*2;i++){
        var angle = i * PI / spikes;
        var r = (i%2===0)? outerR : innerR;
        vertex(cos(angle)*r, sin(angle)*r);
      }
      endShape(CLOSE);
    }
    pop();
  }
}