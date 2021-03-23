class PlayerGame extends GameController {
  constructor(screen_width, screen_height, mode) {
    super(screen_width, screen_height, mode);
  }

  start() {
    this.game = new BoatGame(this.mode, this, PlayerHud, this.screen, [this.boat_spawner.spawnBoat(true)]);
  }
  
  end() {
    exitGame();
  }

}