class EvolutionGame extends GameController {
  constructor(screen_width, screen_height, mode, seed_brain) {
    super(screen_width, screen_height, mode);
    this.genetic_algorithm = new GeneticAlgorithm(50, this.boat_spawner);
    this.generation_count = 1;
  }

  start() {
    this.game = new BoatGame(this.mode, this, LearningHud, this.screen, this.genetic_algorithm.firstGeneration(this.boat_spawner));
    initializeSpeedupListener();
  }
  
  onGameEnd() {
    this.game = new BoatGame(this.mode, this, LearningHud, this.screen, this.genetic_algorithm.newGeneration(this.boat_spawner,  this.game.dead_boats));
    this.game.hud.update(this.genetic_algorithm.best_individual.score, this.genetic_algorithm.best_individual_age, this.generation_count++);
  }

  quit(){
    removeSpeedupListener();
    super.quit();
  }

}