class GameController {
  constructor(screen_width, screen_height, mode) {
    this.game;
    this.mode = mode;
    this.screen = new GameScreen('game-canvas', "game-container", screen_width, screen_height);
    this.boat_spawner = new BoatSpawner(this.screen, (this.mode == 'hard'));
    this.speedup_value = 1;
  }

  start() {}

  onGameEnd() {}

  quit() {
    if(this.game.active)
      this.game.stop();
    quitGame();
    delete this.game;
  }
}