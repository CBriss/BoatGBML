class LearningHud {
  constructor(element) {
    this.generation_count = 1;
    this.best_boat;
    this.best_boat_score = 0;
    this.best_score_generation = 0;

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

  show() {
    this.generation_element.innerHTML = "Generation " + this.generation_count;
    this.best_boat_element.innerHTML = "Current Best Boat: " + this.best_boat_score;
    this.best_generation_element.innerHTML = "From Generation " + this.best_score_generation;
    this.boat_age_element.innerHTML = "Best Boat Age " +
    (this.generation_count - this.best_score_generation);
  }

  update(best_boat) {
    this.generation_count += 1;
    if (this.best_boat != best_boat) {
      this.best_score_generation = this.generation_count -1;
      this.best_boat = best_boat;
      this.best_boat_score = best_boat.score;
    }
    this.show();
  }
}
