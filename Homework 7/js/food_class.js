class Food {
  constructor(x, y, size, colorValue, type){
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = colorValue;
    this.type = type;

    this.nextMoveTime = millis() + random(2000, 5000);
  }

  //food moves at random intervals
  moveRandomly() {
  
    if (millis() > this.nextMoveTime) {

      this.x += random(-50, 50);
      this.y += random(-50, 50);

      //food inside area
      this.x = constrain(this.x, this.size/2, width - this.size/2);
      this.y = constrain(this.y, this.size/2, height - this.size/2);

      this.nextMoveTime = millis() + random(2000, 5000);
    }
  }

  //check if food is eaten
  foodEaten(px, py, playerSize){
    let d = dist(this.x, this.y, px, py);
    return d < (this.size/2 + playerSize/2);
  }

  //move when eaten
  moveToNewSpot() {
    this.x = random(this.size/2, width - this.size/2);
    this.y = random(this.size/2, height - this.size/2);
    this.nextMoveTime = millis() + random(2000, 5000); // reset timer
  }

  display() {
    //random movement
    this.moveRandomly();

    push();
    translate(this.x, this.y);

    fill(this.color);
    noStroke();

    if(this.type === 0){
      circle(0, 0, this.size);
      fill(40,150,40);
      ellipse(0, -this.size/2, this.size/3, this.size/4);
    } else if(this.type === 1){
      rectMode(CENTER);
      rect(0, 0, this.size, this.size);
      fill(255,200,0);
      circle(-this.size/4, -this.size/4, this.size/6);
      circle(this.size/4, this.size/4, this.size/6);
    }

    pop();
  }
}