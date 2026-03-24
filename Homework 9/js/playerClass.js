class Player {
  constructor(x, y, animations) {
    this.sprite = createSprite(x, y);
    this.sprite.addAnimation("idle", animations.idle);
    this.sprite.addAnimation("walk", animations.walk);
    this.sprite.addAnimation("hurt", animations.hurt);
    this.sprite.addAnimation("death", animations.death);
    this.sprite.changeAnimation("idle");

    this.health = 5;
    this.damageCooldown = 0;
  }

  move(obstacles) {
  var moving = false;

  if (keyDown("A") || keyDown(LEFT_ARROW)) {
    this.sprite.position.x -= 3;
    this.sprite.mirrorX(-1); //flip left
    moving = true;
  }
  if (keyDown("D") || keyDown(RIGHT_ARROW)) {
    this.sprite.position.x += 3;
    this.sprite.mirrorX(1); //flip right
    moving = true;
  }
  if (keyDown("W") || keyDown(UP_ARROW)) {
    this.sprite.position.y -= 3;
    moving = true;
  }
  if (keyDown("S") || keyDown(DOWN_ARROW)) {
    this.sprite.position.y += 3;
    moving = true;
  }

  //collide with obstacles
  this.sprite.collide(obstacles);

  //stay inside canvas
  this.sprite.position.x = constrain(this.sprite.position.x, 0 + this.sprite.width/2, width - this.sprite.width/2);
  this.sprite.position.y = constrain(this.sprite.position.y, 0 + this.sprite.height/2, height - this.sprite.height/2);

  //animation sequence
  if (moving) this.sprite.changeAnimation("walk");
  else this.sprite.changeAnimation("idle");

  //damage cooldown
  if (this.damageCooldown > 0) this.damageCooldown--;
}

  takeDamage() {
    if (this.damageCooldown <= 0) {
      this.health--;
      this.sprite.changeAnimation("hurt");
      this.damageCooldown = 120; // cooldown frames
    }
  }

  die() {
    this.sprite.changeAnimation("death");
  }
}