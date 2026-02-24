class Animation {

  constructor(frames, speed){
    this.frames = frames;
    this.speed = speed;
    this.index = 0;
    this.timer = 0;
  }

  update(){
    this.timer++;

    if(this.timer > this.speed){
      this.index++;
      this.timer = 0;

      // loop
      if(this.index >= this.frames.length){
        this.index = 0;
      }
    }
  }

  display(x, y, w, h){
    image(this.frames[this.index], x, y, w, h);
  }

  reset(){
    this.index = 0;
    this.timer = 0;
  }
}