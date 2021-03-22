class PlayerHud extends Hud{
  constructor(element) {
    super(element);
    this.score_element = this.generateTextBlock();
    this.distance_element = this.generateTextBlock();
    this.time_element = this.generateTextBlock();
  }

  show( {time_left, distance_traveled, boats} ) {
    this.score_element.innerHTML = `Score: ${boats[0]?.score || 0}`;
    this.distance_element.innerHTML = `Distance Traveled: ${distance_traveled}`;
    this.time_element.innerHTML = `Time Left: ${Math.ceil(time_left / 60)}`;
  }
}
