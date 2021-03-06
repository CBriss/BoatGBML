class LearningHud {
  constructor(element) {
    this.element = element;

    this.generation_element = document.createElement("p");
    this.element.appendChild(this.generation_element);
    this.best_boat_element = document.createElement("p");
    this.element.appendChild(this.best_boat_element);
    this.best_generation_element = document.createElement("p");
    this.element.appendChild(this.best_generation_element);
    this.boat_age_element = document.createElement("p");
    this.element.appendChild(this.boat_age_element);
  }

  show(best_boat_score, best_boat_age) {
    this.best_boat_element.innerHTML = `Current Best Boat Score: ${best_boat_score}`;
    this.best_generation_element.innerHTML = `Best Boat Age: ${best_boat_age}`;
  }
}
