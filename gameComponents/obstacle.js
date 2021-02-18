class Obstacle extends GameComponent {
  constructor(canvas_width, side, leftObstacleEndX, gap) {
    this.width = 100;
    this.height = 50;

    if (side == "Left")
      super(new Position(0, -50), this.width, this.height, "images/log.png");
    else {
      let startX = leftObstacleEndX + gap;
      super(
        new Position(startX, -50),
        canvas_width - startX,
        this.height,
        "images/log.png",
      );
    }
  }

  update(gameSpeed) {
    let newY = (this.body.position.y += gameSpeed / 10);
    super.update(this.body.position.x, newY);
  }

  show(ctx) {
    ctx.fillStyle = "black";
    ctx.drawImage(this.sprite, this.body.position.x, this.body.position.y, this.body.width, this.body.height);
  }

  static newPairOfObstacles(){

  }
}
