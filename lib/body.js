class Body {    
  constructor(position, width, height) {
    this.width = width;
    this.height = height;
    this.position = position;
    this.endPosition = new Position(
      position.x + width,
      position.y + height
    ); 
  }

  update_position(new_x, new_y) {
    this.position.update(new_x, new_y);
    this.endPosition.update(new_x + this.width, new_y + this.height);
  }
}
