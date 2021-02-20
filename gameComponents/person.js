class Person extends GameComponent {
  constructor(screenContext, ropeStartX, ropeStartY) {
    super(
      new Position(ropeStartX, ropeStartY + 150),
      20,
      20,
      "images/person.png"
    );
    this.ropeStartX = ropeStartX;
    this.ropeStartY = ropeStartY;
    this.speedX = 0;
    this.speedY = 0;

    this.show(screenContext);
  }

  update(screenContext, ropeStartX, ropeStartY) {
    this.ropeStartX = ropeStartX;
    this.ropeStartY = ropeStartY;

    this.changePos(ropeStartX, ropeStartY);
    this.show(screenContext);
  }

  show(screenContext) {
    screenContext.fillStyle = "green";
    screenContext.drawImage(this.sprite, this.body.position.x, this.body.position.y, this.body.width, this.body.height);

    screenContext.beginPath();
    screenContext.moveTo(this.ropeStartX, this.ropeStartY);
    screenContext.lineTo(this.body.position.x + this.body.width / 2, this.body.position.y);
    screenContext.stroke();
  }

  changePos(ropeStartX, ropeStartY) {
    if (this.ropeLength(ropeStartX, ropeStartY) > 70)
      this.adjustVertical(ropeStartX);
    this.body.position.x += this.speedX;
    if (this.ropeLength(ropeStartX, ropeStartY) > 70)
      this.adjustHorizontal(ropeStartY);
    this.body.position.y += this.speedY;
  }

  adjustHorizontal(ropeStartY) {
    if (this.body.position.y < ropeStartY) {
      if (this.speedY != 0) {
        this.speedY *= -1;
        this.body.position.y += 5;
      } else this.speedY += 2;
    } else if (this.body.position.y > ropeStartY) {
      if (this.speedY != 0) {
        this.speedY *= -1;
        this.body.position.y -= 5;
      } else this.speedY -= 2;
    }
  }

  adjustVertical(ropeStartX) {
    if (this.body.position.x < ropeStartX) {
      if (this.speedX != 0) {
        this.speedX *= -1;
        this.body.position.x += 5;
      } else this.speedX += 2;
    } else if (this.body.position.x > ropeStartX) {
      if (this.speedX != 0) {
        this.speedX *= -1;
        this.body.position.x -= 5;
      } else this.speedX -= 2;
    }
  }

  ropeLength(ropeStartX, ropeStartY) {
    var a = Math.abs(ropeStartX - this.body.position.x);
    var b = Math.abs(ropeStartY - this.body.position.y);
    return Math.sqrt(a * a + b * b);
  }
}
