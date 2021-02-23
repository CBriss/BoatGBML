class Body {

  constructor(position, width, height, clamp_to_screen = true) {
    this.position = new Position(...position.coordinates());
    this.width = width;
    this.height = height;
    this.clamp_to_screen = clamp_to_screen;
    this.end_position = new Position(position.x + width, position.y + height); 
  }

  update_position(new_x, new_y, screen) {
    if (this.clamp_to_screen)
      this.position.update(...this.clampPosition(new_x, new_y, screen));
    else
      this.position.update(new_x, new_y);
    this.end_position.update(this.position.x + this.width, this.position.y + this.height);
  }

  clampPosition(x, y, screen){
    return [
      Math.min(Math.max(x, 0), screen.width() - this.width),
      Math.min(Math.max(y, 0), screen.height() - this.height)
    ]
  }

  top(){
    return this.position.y;
  }

  bottom(){
    return this.end_position.y;
  }

  left(){
    return this.position.x;
  }

  right(){
    return this.end_position.x;
  }

  coordinates(){
    return this.position.coordinates();
  }

  dimensions(){
    return [this.width, this.height];
  }

}
