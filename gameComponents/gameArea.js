class GameArea {
  constructor(selectedPlayerFlag) {
    // Game Setup
    this.context = drawCanvas();
    this.canvas = this.context.canvas;
    this.interval = setInterval(this.update.bind(this), 20);
    this.backgroundSprite = new Image();
    this.backgroundSprite.src = "images/background.png";
    this.keys = [];
    this.setUpKeyTracking();
    this.timeLeft = 1500;
    this.playerFlag = selectedPlayerFlag;
    this.speedMode = 1;

    // Game Data
    this.boatSpeed = 50;
    this.frameCount = 0;
    this.distanceTraveled = 0;
    this.highScore = 0;
    this.bestBoat;

    // Game Pieces
    this.currentGenerationDead = [];
    this.boats = [];
    let boatCount = this.playerFlag ? 1 : 30;
    this.boats = newGeneration(
      boatCount,
      this.boats,
      this.currentGenerationDead,
      this.context,
      null
    );
    if (!this.playerFlag) this.learningHud = new LearningHud(this.context);
    this.obstacles = [];
  }

  update() {
    this.updateSpeedMode();
    for (let i = 0; i < this.speedMode; i++) {
      this.updateGameData();
      this.updateObstacles();
      this.boats.forEach(boat => {
        boat.update(
          this.context,
          this.keys,
          this.obstacles,
          this.playerFlag,
          this.distanceTraveled,
          this.timeLeft
        );
      });
      if (this.boats.length <= 0) {
        this.playerFlag ? this.stop() : this.newLearningGeneration();
      }
    }
    this.drawGameState();
  }

  clear() {
    this.context.clearRect(0, 0, canvas.width, canvas.height);
  }

  stop() {
    clearInterval(this.interval);
    showMenu();
  }

  updateGameData() {
    if (this.playerFlag && this.timeLeft <= 0) this.stop();
    if (this.keys[27]) {
      this.stop();
      return;
    }
    this.frameCount += 1;
    this.timeLeft = 1500 - this.frameCount;
    this.distanceTraveled += Math.ceil(this.boatSpeed / 10);
  }

  updateObstacles() {
    // Lower number equals more obstacles
    // if (this.boatSpeed > 0 && Math.random() * 200 < 10) {
    //   this.obstacles.push(new Obstacle(this.canvas.width, "log"));
    // }

    if (this.frameCount % 100 == 0) {
      this.obstacles.push(new Obstacle(this.canvas.width, "log"));
    }

    this.obstacles.forEach(obstacle => {
      let deadBoatIndices = obstacle.update(this.boatSpeed, this.boats);
      deadBoatIndices.forEach(index => {
        let deadBoat = this.boats.splice(index, 1)[0];
        if (deadBoat) this.currentGenerationDead.push(deadBoat);
      });
      if (obstacle.y > this.canvas.height)
        this.obstacles.splice(this.obstacles.indexOf(obstacle), 1)[0];
    });
  }

  drawGameState() {
    this.clear();
    this.context.drawImage(this.backgroundSprite, 0, 0, 540, 1800);
    if (!this.playerFlag) this.learningHud.show(this.context);
    this.boats.forEach(boat => {
      boat.show(this.context);
    });
    this.obstacles.forEach(obstacle => {
      obstacle.show(this.context);
    });
  }

  newLearningGeneration() {
    let highScoreBoat = find_high_score(
      this.currentGenerationDead,
      this.highScore
    );
    // Note: we do not get rid of past bestBoat brains!!
    // Small memeroy leak!
    if (highScoreBoat) {
      this.highScore = highScoreBoat.score;
      if (this.bestBoat && this.bestBoat !== highScoreBoat) {
        this.bestBoat.brain.dispose();
        this.bestBoat.dispose();
        this.bestBoat = highScoreBoat;
      }
      this.currentGenerationDead = this.currentGenerationDead.splice(
        this.currentGenerationDead.indexOf(this.bestBoat, 1)[0]
      );
    }
    this.boats = newGeneration(
      30,
      this.boats,
      this.currentGenerationDead,
      this.context,
      this.bestBoat
    );
    this.learningHud.update(this.context, this.highScore);

    this.currentGenerationDead.forEach(deadBoat => {
      deadBoat.brain.dispose();
    });
    this.currentGenerationDead = [];
    this.obstacles = [];
    this.distanceTraveled = 0;
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

  updateSpeed() {
    if (this.keys && this.keys[38]) {
      this.boatSpeed += 2;
      if (this.boatSpeed > 200) {
        this.boatSpeed = 200;
      }
    } else if (this.keys && this.keys[40]) {
      this.boatSpeed -= 2;
      if (this.boatSpeed < 0) {
        this.boatSpeed = 0;
      }
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
