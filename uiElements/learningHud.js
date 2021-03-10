class LearningHud {
  constructor(element) {
    this.element = element;

    this.generation_element = this.generateTextBlock();
    this.best_boat_element = this.generateTextBlock();
    this.best_generation_element = this.generateTextBlock();
  }

  show(generation_count, best_boat_score, best_boat_age) {
    this.generation_element.innerHTML = `Current Generation: ${generation_count}`;
    this.best_boat_element.innerHTML = `Current Best Boat Score: ${best_boat_score}`;
    this.best_generation_element.innerHTML = `Best Boat Age: ${best_boat_age}`;
  }


  generateTextBlock() {
    let newElement = document.createElement("p");
    newElement.classList.add('ui-text');
    this.element.appendChild(newElement);
    return newElement;
  }
}
