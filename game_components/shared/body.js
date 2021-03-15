import { BodyDimension2D } from "body_dimension_2d.js";

class Body {

  constructor(position, dimensions) {
    this.position = new Position(...position.coordinates());
    this.dimensions = new BodyDimension2D(dimensions);
    this.end_position = new Position(position.x + this.dimensions.width, position.y + height); 
  }

  update_position(new_x, new_y) {
    this.position.update(new_x, new_y);
    this.end_position.update(this.position.x + this.dimensions.width, this.position.y + this.dimensions.height);
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
