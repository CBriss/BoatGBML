var boat_game;

function download(content, file_name, content_type) {
  var a = document.createElement("a");
  var file = new Blob([content], { type: content_type });
  a.href = URL.createObjectURL(file);
  a.download = file_name;
  a.click();
}

function outputBestBoat() {
  let jsonData = JSON.stringify({
    mode: boat_game.mode,
    shape: boat_game.genetic_algorithm.best_individual.brain.network_shape,
    weights: boat_game.genetic_algorithm.best_individual.brain.weights,
    biases: boat_game.genetic_algorithm.best_individual.brain.biases,
    activation: boat_game.genetic_algorithm.best_individual.brain.activation_function,
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
  boat_game = new BoatGame(player_flag, mode, seed_brain);
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
