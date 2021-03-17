class BodyRect {

  constructor(position, width, height) {
    this.width = width;
    this.height = height;
    this.position = new Position(...position.coordinates());
    this.end_position = new Position(position.x + this.width, position.y + this.height); 
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
      (this.top() >= other_body.top() && this.top() <= other_body.bottom()) ||
      (this.bottom() >= other_body.top() && this.bottom() <= other_body.bottom()) ||
      (this.top() <= other_body.top() && this.bottom() >= other_body.bottom())
    )
  }

  isOverlappingHorizontal(other_body){
    return (
      (this.left() >= other_body.left() && this.left() <= other_body.right()) ||
      (this.right() >= other_body.left() && this.right() <= other_body.right())
    )
  }

}
