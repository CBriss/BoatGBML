class Person extends GameComponent {
  constructor(rope_start_x, rope_start_y) {
    super(
      new Position(rope_start_x, rope_start_y + 150),
      20,
      20,
      "images/person.png"
    );
    this.rope_start_x = rope_start_x;
    this.rope_start_y = rope_start_y;
    this.speed_x = 0;
    this.speed_y = 0;
  }

  update(rope_start_x, rope_start_y) {
    this.rope_start_x = rope_start_x;
    this.rope_start_y = rope_start_y;

    this.changePos(rope_start_x, rope_start_y);
  }

  show(screen_context) {
    screen_context.drawImage(this.sprite, ...this.body.coordinates(), ...this.body.dimensions());

    screen_context.beginPath();
    screen_context.moveTo(this.rope_start_x, this.rope_start_y);
    screen_context.lineTo(this.body.position.x + this.body.width / 2, this.body.position.y);
    screen_context.stroke();
  }

  changePos(rope_start_x, rope_start_y) {
    if (this.ropeLength(rope_start_x, rope_start_y) > 70)
      this.adjustVertical(rope_start_x);
      this.adjustHorizontal(rope_start_y);
    
    this.body.position.x += this.speed_x;
    this.body.position.y += this.speed_y;
  }

  adjustHorizontal(rope_start_y) {
    if (this.body.left() < rope_start_y) {
      if (this.speed_y != 0) {
        this.speed_y *= -1;
        this.body.position.y += 5;
      } else this.speed_y += 2;
    } else if (this.body.left() > rope_start_y) {
      if (this.speed_y != 0) {
        this.speed_y *= -1;
        this.body.position.y -= 5;
      } else this.speed_y -= 2;
    }
  }

  adjustVertical(rope_start_x) {
    if (this.body.top() < rope_start_x) {
      if (this.speed_x != 0) {
        this.speed_x *= -1;
        this.body.position.x += 5;
      } else this.speed_x += 2;
    } else if (this.body.top() > rope_start_x) {
      if (this.speed_x != 0) {
        this.speed_x *= -1;
        this.body.position.x -= 5;
      } else this.speed_x -= 2;
    }
  }

  ropeLength(rope_start_x, rope_start_y) {
    var a = Math.abs(rope_start_x - this.body.position.x);
    var b = Math.abs(rope_start_y - this.body.position.y);
    return Math.sqrt(a * a + b * b);
  }
}
