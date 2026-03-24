class Enemy {
  constructor(x, y, animations, speed = 1.5) {
    this.sprite = createSprite(x, y);
    this.sprite.addAnimation("idle", animations.idle);
    this.sprite.addAnimation("walk", animations.walk);
    this.sprite.addAnimation("attack", animations.attack);
    this.sprite.changeAnimation("idle");
    this.speed = speed;
  }

  update(player) {
    var d = dist(this.sprite.position.x, this.sprite.position.y, player.sprite.position.x, player.sprite.position.y);

    if (d < 120) {
      //chase player
      this.sprite.changeAnimation("walk");

      if (player.sprite.position.x < this.sprite.position.x) {
        this.sprite.position.x -= this.speed;
        this.sprite.mirrorX(-1); //face left
      } else {
        this.sprite.position.x += this.speed;
        this.sprite.mirrorX(1); //face right
      }

      if (player.sprite.position.y < this.sprite.position.y) this.sprite.position.y -= this.speed;
      else this.sprite.position.y += this.speed;

      if (d < 50) this.sprite.changeAnimation("attack");
    } else {
      this.sprite.changeAnimation("idle");
    }
  }
}