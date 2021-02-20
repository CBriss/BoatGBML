class Body {

  constructor(position, width, height, clamp_to_screen = true) {
    this.position = new Position(position.x, position.y);
    this.width = width;
    this.height = height;
    this.clamp_to_screen = clamp_to_screen;
    this.endPosition = new Position(position.x + width, position.y + height); 
  }

  update_position(new_x, new_y, ctx) {
    if (this.clamp_to_screen){
      let newPosition = this.clampPosition(new_x, new_y, ctx);
      this.position.update(newPosition.x, newPosition.y);
    }
    else
      this.position.update(new_x, new_y);
    this.endPosition.update(this.position.x + this.width, this.position.y + this.height);
  }

  clampPosition(x, y, ctx){
    return {
      x: Math.min(Math.max(x, 0), ctx.canvas.width - this.width),
      y: Math.min(Math.max(y, 0), ctx.canvas.height - this.height)
    }
  }

  top(){
    return this.position.y;
  }

  bottom(){
    return this.endPosition.y;
  }

  left(){
    return this.position.x;
  }

  right(){
    return this.endPosition.x;
  }

}
