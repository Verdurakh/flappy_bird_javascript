function Wall(width, height, color, x, y, score, img, down) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.score = score;
  this.image = new Image();
  this.image.src = img;
  this.update = function() {
    this.x = this.x - (2 + flappy.score / 10);
    if (this.x < -this.width) {
      flappy.walls = flappy.walls.filter(item => item !== this);
    }
    if (this.x + this.width < flappy.player.x && this.score > 0) {
      this.score = 0;
      flappy.score += 1;
    }
  };
  this.draw = function() {
    ctx = flappy.context;

    if (down) {
      ctx.drawImage(
        this.image,
        0,
        0,
        100,
        600,
        this.x,
        this.height - 600,
        this.width,
        600
      );
    } else {
      ctx.drawImage(
        this.image,
        0,
        0,
        100,
        600,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  };
}
