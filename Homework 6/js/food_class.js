class Food {
  constructor(x, y, size, colorValue, type){
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = colorValue;
    this.type = type;
  }

  display(){
    push();
    translate(this.x, this.y);

    fill(this.color);
    noStroke();

    //shape type 0
    if(this.type === 0){
      circle(0, 0, this.size);

      // little leaf
      fill(40,150,40);
      ellipse(0, -this.size/2, this.size/3, this.size/4);
    }

    //shape type 1
    else if(this.type === 1){
      rectMode(CENTER);
      rect(0, 0, this.size, this.size);

      //dots
      fill(255,200,0);
      circle(-this.size/4, -this.size/4, this.size/6);
      circle(this.size/4, this.size/4, this.size/6);
    }

    pop();
  }
}