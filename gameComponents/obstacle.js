class Obstacle extends GameComponent {
  constructor(x, y, width) {
    super(new Position(x, y), width, 100, "images/log.png");
  }

  update(gameSpeed) {
    let newY = (this.body.position.y += gameSpeed / 10);
    super.update(this.body.position.x, newY);
  }

  show(ctx) {
    ctx.fillStyle = "black";
    ctx.drawImage(this.sprite, this.body.position.x, this.body.position.y, this.body.width, this.body.height);
  }

  static newPairOfObstacles(gapSize, y, canvas_width) {
    var obstacle1 = new Obstacle(-10, y, parseInt(Math.random() * canvas_width/2));
    var obstacle2Pos = obstacle1.body.endPosition.x + gapSize;
    var obstacle2 = new Obstacle(obstacle2Pos, y, canvas_width - obstacle2Pos);
    return [obstacle1, obstacle2];
  }
}
