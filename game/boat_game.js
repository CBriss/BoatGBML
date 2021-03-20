class BoatGame {
  constructor(screen_width, screen_height, player_flag, mode, seed_brain=null, callOnGameOver) {
    
    /* Setup Variables */
    
    // Gameplay
    this.time_left = 1500;
    this.speedup_value = 1;
    this.frame_count = 0;
    this.distance_traveled = 0;
    this.game_speed = 50;
    this.obstacle_frequency = 100;
    this.player_flag = player_flag;
    this.mode = mode
    this.input = new Input();

    this.callOnGameOver = callOnGameOver;

    // Rendering
    this.screen = new GameScreen('game-canvas', screen_width, screen_height);
    this.interval = setInterval(this.update.bind(this), 16);
    this.backgroundSprite = new Image();
    this.backgroundSprite.src = "images/background.png";   

    // Game Pieces
    this.obstacles = [];
    this.boat_spawner = new BoatSpawner(this.screen, (this.mode == 'hard'));
    
    //this.genetic_algorithm = new GeneticAlgorithm(player_flag ? 1 : 50, this.boat_spawner);
    //this.boats = (this.genetic_algorithm.firstGeneration(this.screen, seed_brain));
    this.boats = [this.boat_spawner.spawnBoat(true)];
  }

  /* Base Functions */

  update() {
    for (let i = 0; i < this.speedup_value; i++) { this.processFrame(); }
    this.drawFrame();
  }
  
  stop() {
    clearInterval(this.interval);
    this.callOnGameOver();
  }

  /* Frame Processing */

  processFrame() {
    this.frame_count += 1;
    if (this.frame_count % this.obstacle_frequency == 0)
      this.insertObstacles();
    this.updateObstacles();
    this.updateBoats();
    this.updateGameState();
  }

  insertObstacles() {
    // Between
    let gap = randBetweenTwoValues(this.screen.width() / 7, this.screen.width() / 3);
    this.obstacles.push(...Obstacle.newPairOfObstacles(gap, -10, this.screen.width()));
  }

  updateObstacles() {
    for (var i = 0; i < this.obstacles.length; i++) {
      let obstacle = this.obstacles[i];
      obstacle.update(this.game_speed);
      if(obstacle.y > this.screen.height()){
        this.removeObstacle(obstacle);
        i--;
      }
    }
    this.obstacles.sort((a, b) => parseFloat(a.y) - parseFloat(b.y));
  }

  updateBoats() {
    for (var i = 0; i < this.boats.length; i++) {
      let boat = this.boats[i];
      boat.update(this.screen, this.input, this.obstacles, this.distance_traveled);
      if (boat.hasCollsionWith(this.obstacles, this.screen.canvas_mid_point) || this.screen.offScreen(boat)) {
        this.removeBoat(boat);
        i--;
      }
    }
  }

  updateGameState() {
    if ((this.player_flag && this.time_left <= 0) || this.input.isPressed("exit")) this.stop();
    this.time_left = 1500 - this.frame_count;
    this.distance_traveled += Math.ceil(this.game_speed / 10);
    if (this.boats.length <= 0) {
      this.stop();
    //   this.obstacles = [];
    //   this.boats = this.genetic_algorithm.newGeneration(this.screen);
    //   this.distance_traveled = 0;
    //   this.hud.show(
    //     this.genetic_algorithm.generation_count,
    //     this.genetic_algorithm.best_individual_score,
    //     this.genetic_algorithm.best_individual_age);
    }
  }

  removeObstacle(obstacle) {
    this.obstacles.splice(this.obstacles.indexOf(obstacle), 1)[0];
  }

  removeBoat(boat){
    this.boats.splice(this.boats.indexOf(boat), 1)[0];
    //this.genetic_algorithm.dead_population.push(boat);
  }


  /* Drawing */

  drawFrame() {
    this.screen.clear();
    this.screen.context.drawImage(this.backgroundSprite, 0, 0, this.screen.width(), this.screen.height());
    this.drawComponents(this.boats);
    this.drawComponents(this.obstacles);
  }

  drawComponents(component_list) {
    let listLength = component_list.length;
    for(let i = 0; i < listLength; i++){
      component_list[i].show(this.screen);
    }
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
