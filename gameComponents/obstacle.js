class Obstacle extends GameComponent {
  constructor(canvas_width, side, leftObstacleEndX, gap) {
    super();
    if (side == "Left")
      this.setComponentValues(
        0,
        -100,
        null,
        50,
        "images/log.png",
        canvas_width
      );
    else {
      let startX = leftObstacleEndX + gap;
      this.setComponentValues(
        startX,
        -100,
        canvas_width - startX,
        50,
        "images/log.png",
        canvas_width
      );
    }
  }

  update(gameSpeed) {
    let newY = (this.y += gameSpeed / 10);
    super.update(this.x, newY);
  }

  show(ctx) {
    ctx.fillStyle = "black";
    ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
  }
}
