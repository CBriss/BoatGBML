class BoatGame {
  constructor(playerFlag) {
    // Game Setup
    this.context = drawCanvas();
    this.canvas = this.context.canvas;
    this.canvasHeight = this.canvas.height;
    this.canvasMidPoint = this.canvasHeight / 2;
    this.interval = setInterval(this.update.bind(this), 16);
    this.backgroundSprite = new Image();
    this.backgroundSprite.src = "images/background.png";
    this.keys = [];
    this.setUpKeyTracking();
    this.timeLeft = 1500;
    this.playerFlag = playerFlag;
    this.speedMode = 1;
    this.frameCount = 0;
    this.distanceTraveled = 0;
    this.gameSpeed = 50;

    // Game Pieces
    this.boatCount = this.playerFlag ? 1 : 30;
    this.geneticAlgorithm = new GeneticAlgorithm(this.boatCount);
    this.boats = this.geneticAlgorithm.newGeneration([], this.context);
    this.hud = this.playerFlag ? new PlayerHud() : new LearningHud();
    this.obstacles = [];
  }

  clear() {
    this.context.clearRect(0, 0, canvas.width, canvas.height);
  }

  drawGameState() {
    this.clear();
    this.context.drawImage(this.backgroundSprite, 0, 0, 540, 1800);
    this.hud.show(this.context);
    _.forEach(this.boats, boat => {
      boat.show(this.context);
    });
    _.forEach(this.obstacles, obstacle => {
      obstacle.show(this.context);
    });
  }

  insertObstacles() {
    if (this.frameCount % 100 == 0) {
      let gap = Math.max(Math.random() * 250, 125);
      let leftObstacle = new Obstacle(this.canvas.width, "Left");
      this.obstacles.push(leftObstacle);
      this.obstacles.push(
        new Obstacle(this.canvas.width, "Right", leftObstacle.endX, gap)
      );
    }
  }

  setUpKeyTracking() {
    window.addEventListener("keydown", e => {
      this.keys = this.keys || [];
      this.keys[e.keyCode] = true;
    });
    window.addEventListener("keyup", e => {
      this.keys[e.keyCode] = false;
    });
  }

  stop() {
    clearInterval(this.interval);
    showMenu();
  }

  update() {
    console.log("new frame");
    this.updateSpeedMode();
    for (let i = 0; i < this.speedMode; i++) {
      this.insertObstacles();
      this.updateObstacles();
      this.updateBoats();
      if (this.hud.valueOf().timeLeft)
        this.hud.update(
          this.timeLeft,
          this.distanceTraveled,
          this.boats[0] ? this.boats[0].score : 0,
          this.gameSpeed
        );
      if (this.boats.length <= 0) {
        if (this.playerFlag) this.stop();
        else {
          this.obstacles = [];
          this.geneticAlgorithm.newGeneration(this.boats, this.context);
          this.distanceTraveled = 0;
          this.hud.update(this.geneticAlgorithm.highScore);
        }
      }
      this.updateGameState();
    }
    this.drawGameState();
  }

  updateGameState() {
    if ((this.playerFlag && this.timeLeft <= 0) || this.keys[27]) this.stop();
    this.frameCount += 1;
    this.timeLeft = 1500 - this.frameCount;
    this.distanceTraveled += Math.ceil(this.gameSpeed / 10);
  }

  updateBoats() {
    for (var i = 0; i < this.boats.length; i++) {
      let boat = this.boats[i];
      boat.update(
        this.context,
        this.keys,
        this.obstacles,
        this.distanceTraveled,
        this.timeLeft
      );

      if (boat.hasCollsionStortedArray(this.obstacles, this.canvasMidPoint)) {
        let index = this.boats.indexOf(boat);
        this.boats.splice(index, 1)[0];
        this.geneticAlgorithm.currentGenerationDead.push(boat);
      }
    }
  }

  updateObstacles() {
    for (var i = 0; i < this.obstacles.length; i++) {
      var obstacle = this.obstacles[i];
      obstacle.update(this.gameSpeed);
      if (obstacle.y > this.canvas.height) {
        this.obstacles.splice(this.obstacles.indexOf(obstacle), 1)[0];
        i--;
      }
      this.obstacles.sort((a, b) => parseFloat(a.y) - parseFloat(b.y));
    }
  }

  updateSpeedMode() {
    if (this.keys && this.keys[187]) {
      this.speedMode += 2;
      if (this.speedMode > 200) {
        this.speedMode = 200;
      }
    } else if (this.keys && this.keys[189]) {
      this.speedMode -= 2;
      if (this.speedMode < 1) {
        this.speedMode = 1;
      }
    }
  }
}
