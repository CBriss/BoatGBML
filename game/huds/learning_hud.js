class LearningHud extends Hud {
  constructor(element) {
    super(element);

    this.best_boat_score;
    this.best_boat_age;
    this.generation_count = 1;

    this.generation_element = this.generateTextBlock();
    this.best_boat_element = this.generateTextBlock();
    this.best_generation_element = this.generateTextBlock();
  }

  show() {
    this.generation_element.innerHTML = `Current Generation: ${this.generation_count}`;
    this.best_boat_element.innerHTML = `Current Best Boat Score: ${this.best_boat_score}`;
    this.best_generation_element.innerHTML = `Best Boat Age: ${this.best_boat_age}`;
  }

  updateValues(boats) {
    let boatsLength = boats.length;
    for(let i = 0;i<boatsLength;i++){
      if(boats[i].score > best_boat_score){
        this.best_boat_score = boats[i].score;
        this.best_boat_age = 1;
      }
    }

  }
}
