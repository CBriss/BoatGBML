class BoatSpawner {

  constructor(screen, y_axis_movement) {
    this.screen = screen;
    this.y_axis_movement = y_axis_movement;
  }

  spawnBoat(player_flag, position=null) {
    return new Boat(
      position || this.randomStartPosition(),
      ...this.defaultBodyDimensions(),
      BoatSpawner.randomImage(),
      BodyRect2D,
      player_flag,
      this.y_axis_movement
    );
  }

  randomStartPosition(){
    return new Position2D(
      randBetweenTwoValues(this.screen.width() / 5, this.screen.width() / 2),
      (this.y_axis_movement ? randBetweenTwoValues(this.screen.height() / 5, this.screen.height() / 2) : this.screen.height() * 0.6)
    );
  }

  defaultBodyDimensions(){
    return [Math.floor(this.screen.width()/9*0.45), Math.floor(this.screen.width()/9)];
  }

  static randomImage() {
    return "images/boats/boat" + boat_colors[Math.floor(Math.random() * boat_colors.length)] + ".png"
  }
}