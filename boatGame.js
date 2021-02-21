class BoatGame {
  constructor(playerFlag, mode, seed_input_weights=null, seed_output_weights=null) {
    
    /* Setup Variables */
    
    // Gameplay
    this.timeLeft = 1500;
    this.speedMode = 1;
    this.frameCount = 0;
    this.distanceTraveled = 0;
    this.gameSpeed = 50;
    this.playerFlag = playerFlag;
    this.mode = mode
    this.hud = this.playerFlag ? new PlayerHud() : new LearningHud();
    this.input = new Input();

    // Rendering
    this.screen = new GameScreen();
    this.interval = setInterval(this.update.bind(this), 16);
    this.backgroundSprite = new Image();
    this.backgroundSprite.src = "images/background.png";   

    // Game Pieces
    this.boatCount = playerFlag ? 1 : 10;
    this.geneticAlgorithm = new GeneticAlgorithm(this.boatCount, this.mode);
    this.boats = this.geneticAlgorithm.newGeneration([], this.screen.context, seed_input_weights);
    this.obstacles = [];
  }

  /* Base Functions */

  stop() {
    clearInterval(this.interval);
    showMenu();
  }

  update() {
    for (let i = 0; i < this.speedMode; i++) { this.processFrame(); }
    this.drawGameState();
  }


  /* Frame Processing */

  processFrame() {
    this.frameCount += 1;
    this.insertObstacles();
    this.updateObstacles();
    this.updateBoats();
    this.updateGameState();
  }

  insertObstacles() {
    if (this.frameCount % 100 == 0) {
      let gap = Math.max(Math.random() * 250, 125);
      this.obstacles.push(...Obstacle.newPairOfObstacles(gap, -10, this.screen.canvas.width));
    }
  }

  removeObstacle(obstacle){
    this.obstacles.splice(this.obstacles.indexOf(obstacle), 1)[0];
  }

  updateGameState() {
    if ((this.playerFlag && this.timeLeft <= 0) || this.input.isPressed("exit")) this.stop();
    this.timeLeft = 1500 - this.frameCount;
    this.distanceTraveled += Math.ceil(this.gameSpeed / 10);
    if (this.playerFlag)
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
        this.geneticAlgorithm.newGeneration(this.boats, this.screen.context);
        this.distanceTraveled = 0;
        this.hud.update(this.geneticAlgorithm.bestBoat);
      }
    }
  }

  updateBoats() {
    for (var i = 0; i < this.boats.length; i++) {
      let boat = this.boats[i];
      let yAxisMovement = (this.mode == 'hard')
      boat.update(
        this.screen.context,
        this.input,
        this.obstacles,
        this.distanceTraveled,
        yAxisMovement
      );

      if (boat.hasCollsionWith(this.obstacles, this.screen.canvasMidPoint)) {
        this.removeBoat(boat);
      }
    }
  }

  removeBoat(boat){
    let index = this.boats.indexOf(boat);
    this.boats.splice(index, 1)[0];
    this.geneticAlgorithm.deadPopulation.push(boat);
  }

  updateObstacles() {
    // Note: Cannot do a foreach here
    // Since I am splicing the array in the loop
    for (var i = 0; i < this.obstacles.length; i++) {
      let obstacle = this.obstacles[i];
      if(obstacle.update(this.gameSpeed, this.screen.context)){
        this.removeObstacle(obstacle);
        i--;
      }
    }
    this.obstacles.sort((a, b) => parseFloat(a.y) - parseFloat(b.y));
  }


  /* Drawing */

  drawGameState() {
    this.screen.clear();
    this.screen.context.drawImage(this.backgroundSprite, 0, 0, this.screen.canvas.width, this.screen.canvas.height);
    this.hud.show(this.screen.context)
    this.drawBoats();
    this.drawObstacles();
  }

  drawBoats() {
    _.forEach(this.boats, boat => { boat.show(this.screen.context); });
  }

  drawObstacles() {
    _.forEach(this.obstacles, obstacle => { obstacle.show(this.screen.context); });
  }


  /* Game Input */

  handlePausing() {
    if(this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    else {
      this.interval = setInterval(this.update.bind(this), 16);
    }
  }
}
