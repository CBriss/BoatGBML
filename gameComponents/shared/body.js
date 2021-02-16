class Body {

  constructor(x, y, width, height, clamp_to_screen = true) {
    this.position =  new Position(x, y);
    this.width = width;
    this.height = height;
    this.clamp_to_screen = clamp_to_screen;
    this.speed = 5;
    this.endPosition = new Position(x + width, y + height); 
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

  move(input, ctx) {
    this.update_position(
      (0 + input.isPressed("right") - input.isPressed("left")) * this.speed,
      (0 + input.isPressed("down") - input.isPressed("up")) * this.speed,
      ctx
    );
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
