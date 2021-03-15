class ObstaclePair {
  constructor(gap_size, y, canvas_width) {
    let height = canvas_width / 5;
    this.left_obstacle = new Obstacle(-10, y, parseInt(Math.random() * canvas_width / 2), height);
    var gap_end = this.left_obstacle.body.end_position.x + gap_size;
    this.right_obstacle = new Obstacle(gap_end, y, canvas_width - gap_end, height);

    this.move_speed = 0.1;
    this.y = y;
  }

  update(game_speed, screen) {
    y += game_speed * this.move_speed;
    this.left_obstacle.update(game_speed, screen);
    this.right_obstacle.update(game_speed, screen);
  }

  show(screen) {
    this.left_obstacle.show(screen);
    this.right_obstacle.show(screen);
  }
}
