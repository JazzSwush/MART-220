class AnimationImage {
  constructor(x, y, idleFrames, walkFrames){
    this.x = x;
    this.y = y;

    this.idle = new Animation(idleFrames, 12);
    this.walk = new Animation(walkFrames, 6);

    this.current = this.idle;
    this.facing = 1;
    this.size = 100;
  }

  move(dx, dy){
    this.x += dx;
    this.y += dy;

    var half = this.size / 2;
    this.x = constrain(this.x, half, width - half);
    this.y = constrain(this.y, half, height - half);

    if(dx < 0) this.facing = -1;
    else if(dx > 0) this.facing = 1;

    if(dx !== 0 || dy !== 0){
      this.current = this.walk;
    }
  }

  update(){
    this.current.update();
  }

  display(){
    push();
    translate(this.x, this.y);
    scale(this.facing,1);
    imageMode(CENTER);
    var img = this.current.frames[this.current.index];
    image(img,0,0,this.size,this.size);
    pop();
  }
}