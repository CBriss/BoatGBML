const boat_colors = ["Blue", "Green", "Pink", "Purple", "Red", "Yellow"];

class Boat extends GameComponent {
  constructor(screen, player_flag, y_axis_movement) {
    super(...Boat.defaultValues(screen, y_axis_movement), BodyRect2D);
    this.score = 0;
    this.distance_traveled = 0;
    this.player_controlled = player_flag;
    this.speed = 5;
    this.brain = player_flag ? null : Boat.newBrain(y_axis_movement);
  }

  ////
  // Static Methods

  static defaultValues(screen, y_axis_movement){
    return [
      Boat.randomStartPosition(screen, y_axis_movement),
      ...Boat.defaultBodyDimensions(screen),
      Boat.randomImage()
    ]
  }

  static randomStartPosition(screen, y_axis_movement){
    return new Position2D(
      Math.random() * (screen.width() / 2) + screen.width() / 5,
      (y_axis_movement ? Math.random() * (screen.height() / 2) + screen.height() / 5 : screen.height() * 0.6)
    );
  }

  static defaultBodyDimensions(screen){
    return [screen.width()/9*0.45, screen.width()/9];
  }

  static randomImage() {
    return "images/boats/boat" + boat_colors[Math.floor(Math.random() * boat_colors.length)] + ".png"
  }
  
  static newBrain(y_axis_movement) {
    let brain_dimensions = y_axis_movement ? [5, 10, 4] : [4, 5, 2];
    return new NeuralNetwork(brain_dimensions, 'sigmoid');
  }

  ////
  // Instance Methods

  show(screen) {
    screen.drawComponent(this.sprite, ...this.body.position.coordinates(), ...this.body.dimensions());
  }

  update(screen, input, obstacles, new_distance_traveled, y_axis_movement) {
    this.move(
      this.player_controlled ? input : this.think(screen, obstacles, input, y_axis_movement)
    );
    this.updateScore(screen.height(), new_distance_traveled);
  }

  move(input) {
    super.moveTo(
      this.body.position.x + ((0 + input.isPressed("right") - input.isPressed("left")) * this.speed),
      this.body.position.y + ((0 + input.isPressed("down") - input.isPressed("up")) * this.speed)
    );
  }

  think(screen, obstacles, input, y_axis_movement) {
    let result = this.brain.predict(this.generateBrainInput(obstacles, screen, y_axis_movement));
    input.clearKeys();
    input.pressKey(outputMap[result.indexOf(Math.max.apply(null, result))]);
    return input;
  }

  ////
  // Helper Functions

  generateBrainInput(obstacles, screen, y_axis_movement){
    let {gap_left, gap_right, gap_y_pos} = this.findObstacleGap(this.find_nearest_obstacles(obstacles));
    var brain_input = [
      this.body.left() / screen.width(),
      this.body.right() / screen.width(),
      gap_left / screen.width(),
      gap_right / screen.width()
    ];
    if(y_axis_movement) {
      brain_input.push((this.body.top() - gap_y_pos)/screen.height());
    }
    return brain_input;
  }

  // This should probably be the game, not the boat
  updateScore(canvas_height, new_distance_traveled) {
    let height_on_screen = 1 - this.body.position.y / canvas_height;
    this.score += Math.ceil(
      (new_distance_traveled - this.distance_traveled) * (height_on_screen * 1.5)
    );
    this.distance_traveled = new_distance_traveled;
  }

  find_nearest_obstacles(obstacles) {
    if (obstacles.length <= 0) return [];
    let nearest_obstacles = new Array(2);
    let nearest_distance = null;
    for (let i = 0; i < obstacles.length; i++) {
      let obstacle = obstacles[i];
      let distance = this.body.top() - obstacle.body.bottom();
      if (obstacle.body.top() <= this.body.bottom() && distance < (nearest_distance || distance + 1)) {
        nearest_obstacles[1] = nearest_obstacles[0] || obstacles[i + 1];
        nearest_obstacles[0] = obstacle;
        nearest_distance = distance;
      }
    }

    if (nearest_obstacles[1]) return [nearest_obstacles[0], nearest_obstacles[1]];
    else if (nearest_obstacles[0]) return [nearest_obstacles[0]];
    else return [];
  }

  findObstacleGap(nearest_obstacles) {
    if (nearest_obstacles <= 1)
      return { gap_left: 0, gap_right:  0, gap_y_pos: 0 };

    if (nearest_obstacles[0].body.left() < nearest_obstacles[1].body.left()) {
      var left_obstacle = nearest_obstacles[0];
      var right_obstacle = nearest_obstacles[1];
    } else {
      var right_obstacle = nearest_obstacles[0];
      var left_obstacle = nearest_obstacles[1];
    }
    return {
      gap_left: left_obstacle.body.right(),
      gap_right: right_obstacle.body.left(),
      gap_y_pos: left_obstacle.body.bottom()
    }
  }
}
