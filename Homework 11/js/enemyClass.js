class Enemy {
  constructor(x, y, animations, speed = 1.5) {
    this.sprite = createSprite(x, y);

    //animations
    this.sprite.addAnimation("idle", animations.idle);
    this.sprite.addAnimation("walk", animations.walk);
    this.sprite.addAnimation("attack", animations.attack);

    this.sprite.changeAnimation("idle");

    this.speed = speed;
    this.health = 3;
  }

  update(player) {

    //distance to player
    var d = dist(
      this.sprite.position.x,
      this.sprite.position.y,
      player.sprite.position.x,
      player.sprite.position.y
    );

    if (d < 120) {

      this.sprite.changeAnimation("walk");

      //move toward player
      if (player.sprite.position.x < this.sprite.position.x) {
        this.sprite.position.x -= this.speed;
        this.sprite.mirrorX(-1);
      } else {
        this.sprite.position.x += this.speed;
        this.sprite.mirrorX(1);
      }

      if (player.sprite.position.y < this.sprite.position.y) {
        this.sprite.position.y -= this.speed;
      } else {
        this.sprite.position.y += this.speed;
      }

      if (d < 50) this.sprite.changeAnimation("attack");

    } else {
      this.sprite.changeAnimation("idle");
    }
  }

  takeDamage() {
    this.health--;

    //visual feedback for taking damage
    this.sprite.tint = color(255,0,0);

    var self = this;
    setTimeout(function(){
      self.sprite.tint = color(255);
    },100);
  }
}