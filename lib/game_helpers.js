function startGame(player_flag, mode, seed_brain=null) {
 setDisplayValue('menu', 'none');
 setDisplayValue('game', 'flex');
 game_controller = startGameController((player_flag ? PlayerGame : EvolutionGame), mode, seed_brain);
}

function quitGame() {
  // game_controller.quit();

  setDisplayValue('menu', 'table');
  setDisplayValue('game', 'none');
  document.getElementById("game-container").removeChild(document.getElementById("game-canvas"));
}

function setDisplayValue(element_name, new_value) {
  var menu = document.getElementById(element_name);
  menu.style.display = new_value;
}

function startGameController(game, mode, seed_brain) {
  let game_controller = new game(400, 500, mode, seed_brain);
  game_controller.start();
  return game_controller;
}

function initializeSpeedupListener() {
  var slider = document.getElementById("speedup-slider");
  var output = document.getElementById("speedup-value");
  slider.oninput = function() {
    output.innerHTML = this.value;
    game_controller.speedup_value = this.value;
  };
  document.getElementById('speedup-container').style.display = "block";
}

function removeSpeedupListener() {
  document.getElementById("speedup-slider").removeAttribute('oninput');
  document.getElementById('speedup-container').style.display = "none";
  document.getElementById("speedup-slider").value = 0;
}