class BoatGame {
  constructor(mode, controller, hud_class, screen, boats, seed_brain=null, ) {
    
    /* Setup Variables */

    // General
    this.controller = controller;
    this.hud = this.initializeHud(hud_class);
    this.mode = mode
    this.input = new Input();
    this.screen = screen;
    this.active = true;
    
    // Gameplay
    this.time_left = 1500;
    this.frame_count = 0;
    this.distance_traveled = 0;
    this.game_speed = 50;
    this.obstacle_frequency = 100;
    
    // Rendering
    this.interval = setInterval(this.update.bind(this), 16);
    this.backgroundSprite = new Image();
    this.backgroundSprite.src = "images/background.png";   

    // Game Pieces
    this.obstacles = [];
    this.boats = boats;
    this.dead_boats = [];
  }

  /* Base Functions */

  update() {
    for (let i = 0; i < this.controller.speedup_value; i++) { this.processFrame(); }
    this.drawFrame();
  }
  
  stop() {
    this.hud.clear();
    clearInterval(this.interval);
    this.controller.end();
    this.active = false;
  }

  /* Frame Processing */

  processFrame() {
    if(this.active === false)
      return;

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
    if (this.time_left <= 0 || this.input.isPressed("exit")) this.stop();
    this.time_left = 1500 - this.frame_count;
    this.distance_traveled += Math.ceil(this.game_speed / 10);
    if (this.boats.length <= 0) {
      this.obstacles = [];
      this.distance_traveled = 0;
      this.stop();
    }
    this.hud.show(this);
  }

  removeObstacle(obstacle) {
    this.obstacles.splice(this.obstacles.indexOf(obstacle), 1)[0];
  }

  removeBoat(boat){
    this.dead_boats.push(boat);
    this.boats.splice(this.boats.indexOf(boat), 1)[0];
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

  /* UI */

  initializeHud(hud_class) {
    let hud_element = document.getElementById('game-ui');
    return new hud_class(hud_element);
  }
}
