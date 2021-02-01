class Position {    
  constructor(init_x, init_y, width, height) {
    this.x = init_x;
    this.y = init_y;

    this.width = width;
    this.height = height;

    this.endX = init_x + width;
    this.endY = init_x + height;
  }

  update(new_x, new_y) {
  	this.x = new_x;
    this.y = new_y;
    this.endX = new_x + this.width;
    this.endY = new_x + this.height;
  }
}
