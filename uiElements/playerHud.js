class PlayerHud {
  constructor() {
    this.score_x = 50;
    this.score_y = 25;
    this.score_value = 0;

    this.distance_x = 50;
    this.distance_y = 50;
    this.distance_value = 0;
    this.last_distance_value = 0;

    this.boat_speed_x = 50;
    this.boat_speed_y = 75;
    this.boat_speed_value = 0;

    this.time_left_x = 50;
    this.time_left_y = 100;
    this.time_left = 1500;
  }

  show(ctx) {
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + this.score_value, this.score_x, this.score_y);

    ctx.fillText(
      "Distance Traveled: " + this.distance_value,
      this.distance_x,
      this.distance_y
    );

    ctx.fillText(
      "Boat Speed: " + this.boat_speed_value,
      this.boat_speed_x,
      this.boat_speed_y
    );

    ctx.fillText(
      "Time Left: " + Math.ceil(this.time_left / 60),
      this.time_left_x,
      this.time_left_y
    );
  }

  update(time_left, distance_traveled, score, boat_speed) {
    this.last_distance_value = this.distance_value;
    this.distance_value = distance_traveled;
    this.boat_speed_value = boat_speed;
    this.time_left = time_left;
    this.score_value = score;
  }
}
