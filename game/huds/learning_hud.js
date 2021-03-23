class LearningHud extends Hud {
  constructor(element) {
    super(element);

    this.best_boat_score = 0;
    this.best_boat_age = 0;
    this.generation_count = 1;

    this.generation_element = this.generateTextBlock();
    this.best_boat_element = this.generateTextBlock();
    this.best_generation_element = this.generateTextBlock();

    this.display();
  }

  show() {}

  updateValues(boats) {
    let boatsLength = boats.length;
    this.best_boat_age++;
    for(let i = 0;i<boatsLength;i++){
      if(boats[i].score > this.best_boat_score){
        this.best_boat_score = boats[i].score;
        this.best_boat_age = 1;
      }
    }
    this.display();
  }


  display() {
    this.generation_element.innerHTML = `Current Generation: ${this.generation_count}`;
    this.best_boat_element.innerHTML = `Current Best Boat Score: ${this.best_boat_score}`;
    this.best_generation_element.innerHTML = `Best Boat Age: ${this.best_boat_age}`;
  }
}
