class EvolutionGame extends GameController {
  constructor(screen_width, screen_height, mode, seed_brain) {
    super(screen_width, screen_height, mode);
    this.genetic_algorithm = new GeneticAlgorithm(50, this.boat_spawner);
  }

  start() {
    this.game = new BoatGame(this.mode, this, LearningHud, this.screen, this.genetic_algorithm.firstGeneration(this.boat_spawner));
  }
  
  end() {
    let last_generation = [...this.game.dead_boats];
    this.game = new BoatGame(this.mode, this, LearningHud, this.screen, this.genetic_algorithm.newGeneration(this.boat_spawner, last_generation));
    this.game.hud.updateValues(this.genetic_algorithm.last_generation);
  }

}