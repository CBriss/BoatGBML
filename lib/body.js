class Body {    
  constructor(position, width, height) {
    this.position = position;
    this.width = width;
    this.height = height;
    
    this.endPosition = new Position(
      position.x + width,
      position.y + height
    ); 
  }

  update_position(new_x, new_y) {
    this.position.update(new_x, new_y);
    this.endPosition.update(new_x + this.width, new_y + this.height);
  }

  move(keys, ctx) {
    if (keys && keys[37]) {
      if (this.position.x > 5) this.position.x -= 5;
    }
    if (keys && keys[39]) {
      if (this.position.x + width + 5 < ctx.canvas.width)  this.position.x += 5;
    }
    if (keys && keys[38]) {
      if (this.position.y > 5)  this.position.y -= 5;
    }
    if (keys && keys[40]) {
      if (this.position.y + this.height + 5 < ctx.canvas.height)  this.position.y += 5;
    }
    this.endPosition.update(this.position.x + this.width, this.position.y + this.height);
  }
}
