class Player {
  constructor(x, y, animations) {

  //create sprite
    this.sprite = createSprite(x, y);

    //animations
    this.sprite.addAnimation("idle", animations.idle);
    this.sprite.addAnimation("walk", animations.walk);
    this.sprite.addAnimation("hurt", animations.hurt);
    this.sprite.addAnimation("death", animations.death);

    this.sprite.changeAnimation("idle");

  //player properties
    this.health = 5;
    this.damageCooldown = 0;

  //collider properties
    this.colliderW = 30;
    this.colliderH = 30;

    this.sprite.setCollider("rectangle", 0, 0, this.colliderW, this.colliderH);

    //top offset
    this.topOffset = 10;
  }
    //movement and collision
  move(obstaclesGroup) {

    var moving = false;

    //LEFT
    if (keyDown("A") || keyDown(LEFT_ARROW)) {
      this.sprite.position.x -= 3;
      this.sprite.mirrorX(-1);
      moving = true;
    }

    //RIGHT
    if (keyDown("D") || keyDown(RIGHT_ARROW)) {
      this.sprite.position.x += 3;
      this.sprite.mirrorX(1);
      moving = true;
    }

    //UP
    if (keyDown("W") || keyDown(UP_ARROW)) {
      this.sprite.position.y -= 3;
      moving = true;
    }

    //DOWN
    if (keyDown("S") || keyDown(DOWN_ARROW)) {
      this.sprite.position.y += 3;
      moving = true;
    }

    //collide with obstacles
    this.sprite.collide(obstaclesGroup);

    //left/right boundaries
    var halfW = this.colliderW / 2;

    //top boundary
    var topLimit = this.topOffset;

    //bottome boundary
    var halfVisualHeight = this.sprite.height * this.sprite.scale / 2;
    var bottomLimit = height - halfVisualHeight;

    // constrain within boundaries
    this.sprite.position.x = constrain(
      this.sprite.position.x,
      halfW,
      width - halfW
    );

    this.sprite.position.y = constrain(
      this.sprite.position.y,
      topLimit,
      bottomLimit
    );

    //animtions
    if (moving) {
      this.sprite.changeAnimation("walk");
    } else {
      this.sprite.changeAnimation("idle");
    }

   //damage cooldown
    if (this.damageCooldown > 0) {
      this.damageCooldown--;
    }
  }

//take ddamage
  takeDamage() {

    if (this.damageCooldown <= 0) {

      this.health--;

      this.sprite.changeAnimation("hurt");

      this.damageCooldown = 120;

      var self = this;

      setTimeout(function () {
        if (self.health > 0) {
          self.sprite.changeAnimation("idle");
        }
      }, 400);
    }
  }

//death
  die() {
    this.sprite.changeAnimation("death");
  }
}