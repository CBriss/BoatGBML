class BodyRect2D {

  constructor(position, width, height) {
    this.width = width;
    this.height = height;
    this.position = new Position2D(...position.coordinates());
    this.end_position = new Position2D(position.x + this.width, position.y + this.height); 
  }

  update_position(new_x, new_y) {
    this.position.update(new_x, new_y);
    this.end_position.update(this.position.x + this.width, this.position.y + this.height);
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

  dimensions(){
    return [this.width, this.height];
  }

  isOverlappingVertical(other_body) {
    return (
      this.position.isBetweenValues(other_body.top(), other_body.bottom(), 'y') ||
      this.end_position.isBetweenValues(other_body.top(), other_body.bottom(), 'y')
    );
  }

  isOverlappingHorizontal(other_body) {
    return (
      this.position.isBetweenValues(other_body.left(), other_body.right(), 'x') ||
      this.end_position.isBetweenValues(other_body.left(), other_body.right(), 'x')
    );
  }

}
