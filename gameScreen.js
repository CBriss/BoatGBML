class GameScreen{

  constructor() {
    // Canvas Rendering
    this.context = GameScreen.drawCanvas();
    this.canvas = this.context.canvas;
    this.canvasHeight = this.canvas.height;
    this.canvasMidPoint = this.canvasHeight / 2;
}

  static drawCanvas() {
    let canvas = document.createElement("canvas");
    canvas.id = "game-canvas";
    canvas.width = 500;
    canvas.height = 600;
    let context = canvas.getContext("2d");
    document.getElementById("game-container").appendChild(canvas);
    return context;
    }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}