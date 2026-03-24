class Obstacle {
  constructor(x, y, group, existingObstacles = []) {
    var safe = false;
    var tries = 0;

    while (!safe && tries < 50) {
      this.x = x + random(-50,50);
      this.y = y + random(-50,50);
      safe = true;

      for (var obs of existingObstacles) {
        if (dist(this.x, this.y, obs.sprite.position.x, obs.sprite.position.y) < 60) {
          safe = false;
        }
      }
      tries++;
    }

    this.sprite = createSprite(this.x, this.y);
    this.type = floor(random(3));
    this.width = random(40, 70);
    this.height = random(40, 70);
    this.sprite.setCollider("rectangle", 0, 0, this.width, this.height);
    this.sprite.immovable = true;
    group.add(this.sprite);
  }

  display() {
    push();
    rectMode(CENTER);
    noStroke();

    //trash
    if (this.type === 0) {
      fill(120);
      rect(this.sprite.position.x, this.sprite.position.y, this.width*0.6, this.height*0.8);
      fill(200);
      ellipse(this.sprite.position.x, this.sprite.position.y - this.height*0.4, this.width*0.8, this.height*0.2);
    } else if (this.type === 1) { //bush
      fill(34,139,34);
      ellipse(this.sprite.position.x, this.sprite.position.y, this.width, this.height);
    } else { //tree
      fill(139,69,19);
      rect(this.sprite.position.x, this.sprite.position.y + this.height*0.1, this.width*0.3, this.height*0.6);
      fill(34,139,34);
      ellipse(this.sprite.position.x, this.sprite.position.y - this.height*0.3, this.width, this.height*0.6);
    }

    pop();
  }
}