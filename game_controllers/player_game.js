class PlayerGame {
  constructor(screen_width, screen_height, mode) {
    this.game;
    this.mode = mode;
    this.screen = new GameScreen('game-canvas', screen_width, screen_height);
    this.boat_spawner = new BoatSpawner(this.screen, (this.mode == 'hard'));
  }

  start() {
    this.game = new BoatGame(this.mode, this, PlayerHud, this.screen, [this.boat_spawner.spawnBoat(true)]);
  }
  
  end() {
    exitGame();
  }

}