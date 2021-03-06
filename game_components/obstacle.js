class Obstacle extends GameComponent {
  constructor(x, y, width, height) {
    super(new Position2D(x, y), width, height, "images/log.png", BodyRect2D);
    this.move_speed = 0.1;
  }

  update(game_speed) {
    super.moveTo(
      this.body.position.x,
      this.body.position.y += game_speed * this.move_speed
    );
  }

  show(screen) {
    screen.drawComponent(this.sprite, this.body.position.x, this.body.position.y, this.body.width, this.body.height);
  }

  static newPairOfObstacles(gap_size, y, canvas_width) {
    let height = canvas_width / 10;
    var obstacle1 = new Obstacle(-10, -height, parseInt(Math.random() * canvas_width/2), height);
    var obstacle2_pos = obstacle1.body.end_position.x + gap_size;
    var obstacle2 = new Obstacle(obstacle2_pos, -height, canvas_width - obstacle2_pos, height);
    return [obstacle1, obstacle2];
  }
}
