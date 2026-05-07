class Obstacle {

  constructor(x,y,group,existing=[]){

    var safe=false;
    var tries=0;

    while(!safe && tries<50){

      this.x=x+random(-50,50);
      this.y=y+random(-50,50);

      safe=true;

      for(var i=0;i<existing.length;i++){

        var o=existing[i];

        if(dist(this.x,this.y,o.sprite.position.x,o.sprite.position.y)<80){
          safe=false;
        }
      }

      tries++;
    }

    this.sprite=createSprite(this.x,this.y);

    this.width=random(40,70);
    this.height=random(40,70);

    this.sprite.setCollider(
      "rectangle",
      0,
      0,
      this.width,
      this.height
    );

    this.sprite.immovable=true;
    this.sprite.debug=false;

    //movement targets
    this.targetX=this.sprite.position.x;
    this.targetY=this.sprite.position.y;

    //change target timer
    this.moveTimer=int(random(120,300));

    group.add(this.sprite);
  }

  update(){

    this.moveTimer--;

    //pick new positioning
    if(this.moveTimer<=0){

      this.targetX=random(80,width-80);
      this.targetY=random(80,height-80);

      this.moveTimer=int(random(180,360));
    }

    //smooth movements
    this.sprite.position.x=lerp(
      this.sprite.position.x,
      this.targetX,
      0.01
    );

    this.sprite.position.y=lerp(
      this.sprite.position.y,
      this.targetY,
      0.01
    );
  }

  display(){

    //update movement
    this.update();

    rectMode(CENTER);

    fill(100);

    rect(
      this.sprite.position.x,
      this.sprite.position.y,
      this.width,
      this.height
    );
  }
}