var game_controller;

function download(content, file_name, content_type) {
  var a = document.createElement("a");
  var file = new Blob([content], { type: content_type });
  a.href = URL.createObjectURL(file);
  a.download = file_name;
  a.click();
}

function outputBestBoat() {
  let best_boat = game_controller.genetic_algorithm.best_individual;
  let jsonData = best_boat.brain.outputAsJson();
  jsonData['mode'] = game_controller.mode;
  download(JSON.stringify(jsonData), "current_best_boat_brain.txt", "text/plain");
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
