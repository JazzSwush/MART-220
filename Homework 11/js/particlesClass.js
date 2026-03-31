class Particle {
  constructor(x, y, type = "damage") {
    this.x = x;
    this.y = y;

    this.vx = random(-2, 2);
    this.vy = random(-2, 2);

    this.life = 60;

    this.type = type; //"negative" or "positive"
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life--;
  }

  display() {
    noStroke();

    if(this.type === "damage"){
      fill(255, 100, 0, this.life * 4); //orange
    }
    else if(this.type === "heal"){
      fill(100, 255, 100, this.life * 4); //green
    }

    ellipse(this.x, this.y, random(4,8));
  }

  isDead() {
    return this.life <= 0;
  }
}