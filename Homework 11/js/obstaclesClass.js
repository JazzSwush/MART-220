class Obstacle {
  constructor(x, y, group, existing=[]) {
    let safe=false, tries=0;

    while(!safe && tries<50){
      this.x = x + random(-50,50);
      this.y = y + random(-50,50);
      safe=true;

      for(let o of existing){
        if(dist(this.x,this.y,o.sprite.position.x,o.sprite.position.y)<60){
          safe=false;
        }
      }
      tries++;
    }

    this.sprite=createSprite(this.x,this.y);
    this.width=random(40,70);
    this.height=random(40,70);

    this.sprite.setCollider("rectangle",0,0,this.width,this.height);
    this.sprite.immovable=true;
    this.sprite.debug=false;

    group.add(this.sprite);
  }

  display(){
    fill(100);
    rect(this.sprite.position.x,this.sprite.position.y,this.width,this.height);
  }
}