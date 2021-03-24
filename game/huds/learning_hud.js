class LearningHud extends Hud {
  constructor(element) {
    super(element);

    this.generation_element = this.generateTextBlock();
    this.best_individual_score_element = this.generateTextBlock();
    this.best_individual_age_element = this.generateTextBlock();

    this.update(0,0,1);
  }

  show() {}

  update(best_individual_score, best_individual_age, generation_count) {
    this.generation_element.innerHTML = `Current Generation: ${generation_count}`;
    this.best_individual_score_element.innerHTML = `Current Best Boat Score: ${best_individual_score}`;
    this.best_individual_age_element.innerHTML = `Current Best Boat Age: ${best_individual_age}`;
  }
}
