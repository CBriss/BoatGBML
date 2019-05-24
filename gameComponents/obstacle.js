class Obstacle extends GameComponent {
  constructor(canvas_width, type) {
    console.log("new obstacle");
    super();
    this.width = (Math.random() * canvas.width + 150) / 2;
    this.height = 50;
    this.setXValue(canvas_width);
    this.y = -100;
    this.sprite = new Image();
    if (type == "log") {
      this.sprite.src = "images/log.png";
    }
  }

  setXValue(canvas_width) {
    if (Math.random() < 0.5) {
      this.x = 0;
    } else {
      this.x = canvas_width - this.width;
    }
  }

  update(boatSpeed, boats) {
    this.y += boatSpeed / 10;
    let deadBoatIndices = [];

    boats.forEach(boat => {
      if (this.hasCollsion(boat) || this.hasCollsion(boat.person)) {
        deadBoatIndices.push(boats.indexOf(boat));
      }
    });
    return deadBoatIndices;
  }

  show(ctx) {
    ctx.fillStyle = "black";
    ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
  }
}
