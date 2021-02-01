class Obstacle extends GameComponent {
  constructor(canvas_width, side, leftObstacleEndX, gap) {
    if (side == "Left")
      super(0, -50, null, 50, "images/log.png", canvas_width);
    else {
      let startX = leftObstacleEndX + gap;
      super(
        startX,
        -50,
        canvas_width - startX,
        50,
        "images/log.png",
        canvas_width
      );
    }
  }

  update(gameSpeed) {
    let newY = (this.position.y += gameSpeed / 10);
    super.update(this.position.x, newY);
  }

  show(ctx) {
    ctx.fillStyle = "black";
    ctx.drawImage(this.sprite, this.position.x, this.position.y, this.width, this.height);
  }
}
