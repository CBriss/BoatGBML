class Obstacle extends GameComponent {
  constructor(x, y, width) {
    super(new Position(x, y), width, width/8, "images/log.png", false);
    this.move_speed = 0.1;
  }

  update(game_speed, screen) {
    super.moveTo(
      this.body.position.x,
      this.body.position.y += game_speed * this.move_speed,
      screen
    );
    if(this.body.top() > screen.height())
      return true
  }

  show(screen) {
    screen.drawComponent(this.sprite, this.body.position.x, this.body.position.y, this.body.width, this.body.height);
  }

  static newPairOfObstacles(gap_size, y, canvas_width) {
    var obstacle1 = new Obstacle(-10, y, parseInt(Math.random() * canvas_width/2));
    var obstacle2_pos = obstacle1.body.end_position.x + gap_size;
    var obstacle2 = new Obstacle(obstacle2_pos, y, canvas_width - obstacle2_pos);
    return [obstacle1, obstacle2];
  }
}
