class EvolutionGame {
  constructor(screen_width, screen_height, mode, seed_brain) {
    this.game;
    this.mode = mode;
    this.screen = new GameScreen('game-canvas', screen_width, screen_height);
    this.boat_spawner = new BoatSpawner(this.screen, (this.mode == 'hard'));
    this.genetic_algorithm = new GeneticAlgorithm(50, this.boat_spawner);
  }

  start() {
    this.game = new BoatGame(this.mode, this, LearningHud, this.screen, this.genetic_algorithm.firstGeneration(this.boat_spawner));
  }
  
  end() {
    this.game = new BoatGame(this.mode, this, LearningHud, this.screen, this.genetic_algorithm.newGeneration(this.boat_spawner, this.game.dead_boats));
  }

}