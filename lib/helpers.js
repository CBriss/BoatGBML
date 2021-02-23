var boat_game;
updateSpeedupValue();

function download(content, file_name, content_type) {
  var a = document.createElement("a");
  var file = new Blob([content], { type: content_type });
  a.href = URL.createObjectURL(file);
  a.download = file_name;
  a.click();
}

function outputBestBoat() {
  let input_weights = boat_game.genetic_algorithm.best_boat.brain.input_weights;
  let output_weights = boat_game.genetic_algorithm.best_boat.brain.output_weights;
  let jsonData = JSON.stringify({
    mode: boat_game.mode,
    input_weights: input_weights.arraySync(),
    output_weights: output_weights.arraySync()
  });
  
  download(jsonData, "current_best_boat_brain.txt", "text/plain");
}

function randn_bm() {
  var u = 0,
    v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  return Math.sqrt(-1.2 * Math.log(u)) * Math.cos(1.2 * Math.PI * v);
}

function showMenu() {
  // Kill the canvas
  var canvas = document.getElementById("game-canvas");
  document.getElementById("game-container").removeChild(canvas);

  // Show the menu
  var menu = document.getElementById("menu-container");
  menu.style.display = "block";
}

function startGame(player_flag, mode, seed_input_weights=null, seed_output_weights=null) {
  // Hide the menu
  var menu = document.getElementById("menu-container");
  menu.style.display = "none";

  // Start the boat game
  boat_game = new BoatGame(player_flag, mode, seed_input_weights, seed_output_weights);
}

function updateSpeedupValue() {
  var slider = document.getElementById("speedup-slider");
  var output = document.getElementById("speedup-value");
  slider.oninput = function() {
    output.innerHTML = this.value;
    if (boat_game) {
      boat_game.speed_mode = this.value;
    }
  };
}

function uploadBoat(files) {
  let file = files[0];
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function(event) {
    let json_string = JSON.parse(event.target.result);
    let mode = json_string['mode'];
    let input_weights = json_string['input_weights'];
    let output_weights = json_string['output_weights'];
    console.log(input_weights);
    console.log(output_weights);
    startGame(false, mode, [input_weights, output_weights]);
  };
}


function randomXValue(canvas_width) {
  var newX = 0;
  if (Math.random() > 0.5) {
    newX = canvas_width - this.width;
  }
  return newX;
}

function randomWidth(canvas_width) {
  return (Math.random() * canvas_width + 100) / 2;
}
