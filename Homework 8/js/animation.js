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
      if(this.index >= this.frames.length){
        this.index = 0;
      }
    }
  }
}