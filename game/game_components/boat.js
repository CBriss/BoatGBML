const boat_colors = ["Blue", "Green", "Pink", "Purple", "Red", "Yellow"];
const small_brain = [4, 5, 2];
const big_brain = [5, 10, 4];

class Boat extends GameComponent {
  constructor(position, width, height, imageUrl, bodyType, player_flag, y_axis_movement) {
    super(position, width, height, imageUrl, bodyType);
    this.score = 0;
    this.distance_traveled = 0;
    this.player_controlled = player_flag;
    this.speed = 5;
    this.y_axis_movement = y_axis_movement;
    this.brain = player_flag ? null : this.newBrain(y_axis_movement);
    this.detector = new GapDetector(this.body);
  }


  newBrain() {
    if(this.player_controlled)
      return null;

    return new NeuralNetwork(this.y_axis_movement ? big_brain : small_brain,'sigmoid');
  }

  ////
  // Instance Methods

  show(screen) {
    screen.drawComponent(this.sprite, ...this.body.position.coordinates(), ...this.body.dimensions());
  }

  update(screen, input, obstacles, new_distance_traveled) {
    this.move(
      this.player_controlled ? input : this.think(screen, obstacles, input, this.y_axis_movement)
    );
    this.updateScore(screen.height(), new_distance_traveled);
  }

  move(input) {
    super.moveTo(
      this.body.position.x + ((0 + input.isPressed("right") - input.isPressed("left")) * this.speed),
      this.body.position.y + ((0 + input.isPressed("down") - input.isPressed("up")) * this.speed)
    );
  }

  think(screen, obstacles, input) {
    let result = this.brain.predict(this.generateBrainInput(obstacles, screen, this.y_axis_movement));
    input.clearKeys();
    input.pressKey(outputMap[result.indexOf(Math.max.apply(null, result))]);
    return input;
  }

  ////
  // Helper Functions

  generateBrainInput(obstacles, screen){
    // let {gap_left, gap_right, gap_y_pos} = this.findObstacleGap(this.find_nearest_obstacles(obstacles));
    let {gap_left, gap_right, gap_y_pos} = this.detector.findObstacleGap(obstacles);
    var brain_input = [
      this.body.left() / screen.width(),
      this.body.right() / screen.width(),
      gap_left / screen.width(),
      gap_right / screen.width()
    ];
    if(this.y_axis_movement) {
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

}
