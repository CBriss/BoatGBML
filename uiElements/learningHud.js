class LearningHud {
  constructor() {
    this.generation_count_x = 50;
    this.generation_count_y = 25;
    this.generation_count = 1;

    this.highest_score_x = 50;
    this.highest_score_y = 50;
    this.best_boat;

    this.best_score_generation_x = 50;
    this.best_score_generation_y = 75;
    this.best_score_generation = 0;

    this.boat_age_x = 300;
    this.boat_age_y = 75;
    this.best_score_generation = 1;
  }

  show(ctx) {
    let best_boat_score = this.best_boat ? this.best_boat.score : 0;
    ctx.font = "20px Arial";
    
    ctx.fillText(
      "Generation " + this.generation_count,
      this.generation_count_x,
      this.generation_count_y
    );

    ctx.fillText(
      "Current Best Boat: " + best_boat_score,
      this.highest_score_x,
      this.highest_score_y
    );

    ctx.fillText(
      "From Generation " + this.best_score_generation,
      this.best_score_generation_x,
      this.best_score_generation_y
    );

    ctx.fillText(
      "Best Boat Age " +
        (this.generation_count - this.best_score_generation),
      this.boat_age_x,
      this.boat_age_y
    );
  }

  update(best_boat) {
    this.generation_count += 1;
    if (this.best_boat != best_boat) {
      this.best_score_generation = this.generation_count -1;
      this.best_boat = best_boat;
    }
  }
}
