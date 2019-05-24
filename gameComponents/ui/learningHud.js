class LearningHud {
  constructor(ctx) {
    this.generationCountX = 50;
    this.generationCountY = 25;
    this.generationCount = 1;

    this.highestScoreX = 50;
    this.highestScoreY = 50;
    this.highestScore = 0;

    this.bestScoreGenerationX = 50;
    this.bestScoreGenerationY = 75;
    this.bestScoreGeneration = 0;

    this.show(ctx);
  }

  show(ctx) {
    ctx.font = "20px Arial";
    ctx.fillText(
      "Generation " + this.generationCount,
      this.generationCountX,
      this.generationCountY
    );

    ctx.font = "20px Arial";
    ctx.fillText(
      "All time high score: " + this.highestScore,
      this.highestScoreX,
      this.highestScoreY
    );

    ctx.font = "20px Arial";
    ctx.fillText(
      "From Generation " + this.bestScoreGeneration,
      this.bestScoreGenerationX,
      this.bestScoreGenerationY
    );
  }

  update(ctx, highScore) {
    this.generationCount += 1;
    if (this.highestScore < highScore) {
      this.highestScore = highScore;
      this.bestScoreGeneration = this.generationCount;
    }
  }
}
