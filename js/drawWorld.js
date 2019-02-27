function draw() {
  flappy.clear();
  flappy.drawBackground();

  if (flappy.playing) {
    flappy.walls.forEach(function(wall) {
      wall.draw();
    });
    flappy.drawText();
    flappy.player.draw();
  }

  window.requestAnimationFrame(draw);
}
