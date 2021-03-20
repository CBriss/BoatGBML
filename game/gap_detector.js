class GapDetector {
  constructor(body) {
    this.body = body;
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
  
  findObstacleGap(obstacles) {
    let nearest_obstacles = this.find_nearest_obstacles(obstacles);
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