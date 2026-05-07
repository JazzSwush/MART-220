class Food {
  constructor(x, y, animations, group) {
    this.sprite = createSprite(x, y);

    this.sprite.addAnimation("idle", animations.idle);
    this.sprite.addAnimation("move", animations.move);

    this.sprite.changeAnimation("idle");

    group.add(this.sprite);

    this.vx = random([-1, 1]) * random(0.5, 1.5);
    this.vy = random([-1, 1]) * random(0.5, 1.5);
  }

  update() {
    this.sprite.position.x += this.vx;
    this.sprite.position.y += this.vy;

    this.sprite.changeAnimation("move");

    if (this.vx < 0) this.sprite.mirrorX(-1);
    else this.sprite.mirrorX(1);

    if (this.sprite.position.x < 0 || this.sprite.position.x > width) this.vx *= -1;
    if (this.sprite.position.y < 0 || this.sprite.position.y > height) this.vy *= -1;
  }
}