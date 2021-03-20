class PlayerGame {
  constructor(...game_params) {
    this.hud = this.initializeHud();
    this.game;
    this.game_params = game_params;
  }

  start() {
    this.game = new BoatGame(...this.game_params, this.end);
    this.initializeHud();
  }

  initializeHud() {
    let hud_element = document.getElementById('game-ui');
    return (this.player_flag ? new PlayerHud(hud_element) : new LearningHud(hud_element));
  }
  
  
  end() {
    exitGame();
  }

}


// Sets the HUD
// Sets the method used to spawn boats, just calls boatSpawner.spawnBoat (genetic algo will use a diff one)
// Controls the start/end conditions


  // In update game state
  
  // if (this.player_flag)
  //     this.hud.show(
  //       this.time_left,
  //       this.distance_traveled,
  //       this.boats[0] ? this.boats[0].score : 0
  //     );
  // if (this.boats.length <= 0) {
  //   if (this.player_flag) this.stop();
