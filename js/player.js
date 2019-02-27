function Player(color, x, y) {
  this.drawCollisionBox = false;
  this.width = 64;
  this.height = 64;
  this.collisionWidth = 40;
  this.collisionHeight = 29;

  this.x = x;
  this.y = y;
  this.collisionX = this.x + 10;
  this.collisionY = this.y + 10;
  this.flapping = true;
  this.vSpeed = 0;
  this.flapHeight = 8;
  this.maxVSpeed = 3;
  this.gravity = 0.5;
  this.image = new Image();
  this.image.src = "img/bird.png";
  this.update = function() {
    this.y = this.y + this.vSpeed;
    this.collisionY = this.y;
    this.collisionX = this.x;
    this.vSpeed += this.gravity;
    if (this.vSpeed > this.maxVSpeed) {
      this.vSpeed = this.maxVSpeed;
    }
    if (this.y < 0) {
      gameOver();
    }
    if (this.y > flappy.canvas.height) {
      gameOver();
    }

    this.collision();
  };
  this.collision = function() {
    var pp = flappy.player;
    flappy.walls.forEach(function(wall) {
      if (
        pp.collisionX + pp.collisionWidth > wall.x &&
        pp.collisionX < wall.x + wall.width
      ) {
        if (
          pp.collisionY + pp.collisionHeight > wall.y &&
          pp.collisionY < wall.y + wall.height
        ) {
          gameOver();
        }
      }
    });
  };
  this.draw = function() {
    ctx = flappy.context;
    if (this.drawCollisionBox) {
      ctx.fillStyle = color;
      ctx.fillRect(
        this.collisionX,
        this.collisionY,
        this.collisionWidth,
        this.collisionHeight
      );
    }

    ctx.drawImage(
      this.image,
      0,
      0,
      32,
      32,
      this.x,
      this.y,
      this.width,
      this.height
    );
  };
  this.flap = function() {
    if (flappy.playing) {
      flappy.player.vSpeed -= flappy.player.flapHeight;
      if (flappy.player.vSpeed < flappy.player.flapHeight) {
        flappy.player.vSpeed = -flappy.player.flapHeight;
      }
    }

    if (canRestart) {
      flappy.start();
    }
  };
}
