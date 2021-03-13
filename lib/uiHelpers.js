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