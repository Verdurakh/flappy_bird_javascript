var highScore = 0;
var canRestart = false;
var distanceSinceLastWall = 0;
var gameDiv;
var gameOverDiv;
var pipeUp = "/img/pipeUp.png";
var pipeDown = "/img/pipeDown.png";

function startGame() {
  var cookie = getCookie("fgdfgdf");
  if (cookie > 0) {
    highScore = cookie;
  }
  var canvas = document.createElement("canvas");
  gameDiv = document.getElementById("game");
  gameDiv.appendChild(canvas);
  gameOverDiv = document.getElementById("gameOver");
  flappy.canvas = canvas;
  flappy.context = canvas.getContext("2d");
  flappy.start();
}

var flappy = {
  canvas: {},
  player: {},
  context: {},
  start: function() {
    gameOverDiv.style.display = "none";
    canRestart = false;
    this.player = new Player("red", 32, 120);
    this.playing = true;
    this.score = 0;
    this.canvas.width = gameDiv.clientWidth;
    this.canvas.height = gameDiv.clientHeight;
    this.totalWalls = 0;
    this.canCreateWall = true;
    this.image = new Image();
    this.image.src = "/img/bg.png";

    this.canvas.addEventListener("click", flappy.player.flap);

    this.walls = [];
    if (!this.interval) {
      this.interval = setInterval(update, 20);
    }
    window.requestAnimationFrame(draw);

    addWalls();
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  drawBackground: function() {
    this.context.fillStyle = "#99d9ea";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(this.image, 0, 0, 800, 194, 0, 406, 800, 194);
  },
  drawText: function() {
    this.context.fillStyle = "red";
    this.context.font = "20px Impact, Charcoal, sans-serif";
    this.context.fillText("Score  : " + this.score, 10, 40);
    if (highScore > 0) {
      this.context.fillText("High score : " + highScore, 10, 75);
    }
  }
};

function gameOver() {
  console.log("game over");
  flappy.player.y = 0;
  return;
  gameOverDiv.style.display = "block";
  var span = document.getElementById("points");

  while (span.firstChild) {
    span.removeChild(span.firstChild);
  }
  span.appendChild(document.createTextNode(flappy.score));
  flappy.playing = false;
  if (flappy.score > highScore) {
    highScore = flappy.score;
    setCookie("fgdfgdf", highScore);
  }
  setTimeout(function() {
    canRestart = true;
  }, 2000);
}

function addWalls() {
  if (flappy.canCreateWall) {
    setTimeout(function() {
      flappy.canCreateWall = true;
    }, 1000);
    flappy.canCreateWall = false;
    var min = -200;
    var max = 200;
    var wallWidth = 100;
    var wallStartX = flappy.canvas.width + 10;
    var topY = 0;
    var startY = 400;
    distanceSinceLastWall = 0;

    var random = Math.floor(Math.random() * (max - min + 1) + min);
    var wall = new Wall(
      wallWidth,
      200 + random,
      "green",
      wallStartX,
      topY,
      1,
      pipeDown,
      true
    );
    flappy.walls.push(wall);
    flappy.totalWalls++;
    wall = new Wall(
      wallWidth,
      500,
      "green",
      wallStartX,
      startY + random,
      0,
      pipeUp,
      false
    );
    flappy.walls.push(wall);
  }
}

function update() {
  if (flappy.playing) {
    flappy.player.update();
    flappy.walls.forEach(function(wall) {
      wall.update();
    });

    distanceSinceLastWall += 1;
    if (shouldAddWall()) {
      addWalls();
    }

    if (flappy.score > flappy.totalWalls) {
      flappy.score = flappy.totalWalls - 4;
    }

    flappy.player.flapHeight = 8;
    flappy.player.maxVSpeed = 8;
    flappy.player.gravity = 0.6;
  }
}

function shouldAddWall() {
  if (
    (flappy.walls.length < 8 &&
      Math.random() < 0.1 &&
      distanceSinceLastWall > 100 - flappy.score / 2) ||
    flappy.walls <= 0
  ) {
    return true;
  }

  return false;
}
