function showMenu() {
  var gameCanvas = document.getElementById("gameCanvas");
  gameCanvas.style.display = "none";

  var menu = document.getElementById("menu-container");
  menu.style.display = "block";
}

function startGame(playerFlag) {
  var menu = document.getElementById("menu-container");
  menu.style.display = "none";
  new GameArea(playerFlag);
}
