var game_controller;

function download(content, file_name, content_type) {
  var a = document.createElement("a");
  var file = new Blob([content], { type: content_type });
  a.href = URL.createObjectURL(file);
  a.download = file_name;
  a.click();
}

function outputBestBoat() {
  let jsonData = JSON.stringify({
    mode: game_controller.mode,
    shape: game_controller.genetic_algorithm.best_individual.brain.network_shape,
    weights: game_controller.genetic_algorithm.best_individual.brain.weights,
    biases: game_controller.genetic_algorithm.best_individual.brain.biases,
    activation: game_controller.genetic_algorithm.best_individual.brain.activation_function,
  });
  download(jsonData, "current_best_boat_brain.txt", "text/plain");
}

function startGame(player_flag, mode, seed_brain=null) {
  // Hide the menu
  var menu = document.getElementById("menu");
  menu.style.display = "none";


  var menu = document.getElementById("game");
  menu.style.display = "flex";

  // Start the boat game
  if(player_flag)
    game_controller = new PlayerGame(400, 500, mode, null);
  else {
    initializeSpeedupListener();
    game_controller = new EvolutionGame(400, 500, mode, seed_brain);
  }
  game_controller.start();
}

function uploadBoat(files) {
  let file = files[0];
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function(event) {
    let json_input = JSON.parse(event.target.result);
    startGame(false, json_input['mode'], NeuralNetwork.newBrainFromJson(json_input));
  };
}

function exitGame() {
  // Hide the Game UI
  var ui = document.getElementById("game");
  ui.style.display = "none";
  
  // Kill the canvas
  document.getElementById("game-container").removeChild(document.getElementById("game-canvas"));

  // Show the menu
  var menu = document.getElementById("menu");
  menu.style.display = "table";

  // Reset the slider
  document.getElementById("speedup-slider").value = 0;
  removeSpeedupListener();
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
}

