updateSpeedupValue();

function updateSpeedupValue() {
  var slider = document.getElementById("speedup-slider");
  var output = document.getElementById("speedup-value");
  slider.oninput = function() {
    output.innerHTML = this.value;
    if (boat_game)
    boat_game.speed_mode = this.value;
    };
}

function exitGame() {
  // Hide the Game UI
  var menu = document.getElementById("game");
  menu.style.display = "none";
  
  // Kill the canvas
  var canvas = document.getElementById("game-canvas");
  document.getElementById("game-container").removeChild(canvas);

  // Show the menu
  var menu = document.getElementById("menu");
  menu.style.display = "table";
}