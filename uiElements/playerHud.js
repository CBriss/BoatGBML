class PlayerHud {
  constructor(element) {
    this.score = 0;
    this.distance = 0;
    this.last_distance = 0;
    this.time_left = 1500;

    this.element = element;

    this.score_element = document.createElement("p");
    this.element.appendChild(this.score_element);
    this.distance_element = document.createElement("p");
    this.element.appendChild(this.distance_element);
    this.time_element = document.createElement("p");
    this.element.appendChild(this.time_element);
  }

  show() {
    this.score_element.innerHTML = "Score: " + this.score;
    this.distance_element.innerHTML = "Distance Traveled: " + this.distance;
    this.time_element.innerHTML = "Time Left: " + Math.ceil(this.time_left / 60);
  }

  update(time_left, distance_traveled, score) {
    this.last_distance = this.distance;
    this.distance = distance_traveled;
    this.time_left = time_left;
    this.score = score;
    this.show();
  }

  clear(){
    while (this.element.firstChild) {
      this.element.removeChild(this.element.lastChild);
    }
  }
}
