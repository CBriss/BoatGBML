class LearningHud {
  constructor() {
    this.generationCountX = 50;
    this.generationCountY = 25;
    this.generationCount = 1;

    this.highestScoreX = 50;
    this.highestScoreY = 50;
    this.bestBoat;

    this.bestScoreGenerationX = 50;
    this.bestScoreGenerationY = 75;
    this.bestScoreGeneration = 0;

    this.boatAgeX = 300;
    this.boatAgeY = 75;
    this.bestScoreGeneration = 1;
  }

  show(ctx) {
    ctx.font = "20px Arial";
    ctx.fillText(
      "Generation " + this.generationCount,
      this.generationCountX,
      this.generationCountY
    );

    let bestBoatScore = this.bestBoat ? this.bestBoat.score : 0;
    ctx.font = "20px Arial";
    ctx.fillText(
      "Current Best Boat: " + bestBoatScore,
      this.highestScoreX,
      this.highestScoreY
    );

    ctx.font = "20px Arial";
    ctx.fillText(
      "From Generation " + this.bestScoreGeneration,
      this.bestScoreGenerationX,
      this.bestScoreGenerationY
    );

    ctx.font = "20px Arial";
    ctx.fillText(
      "Best Boat Age " +
        (this.generationCount - this.bestScoreGeneration),
      this.boatAgeX,
      this.boatAgeY
    );
  }

  update(bestBoat) {
    this.generationCount += 1;
    if (this.bestBoat != bestBoat) {
      this.bestScoreGeneration = this.generationCount -1;
      this.bestBoat = bestBoat;
    }
  }
}
