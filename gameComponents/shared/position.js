class Position {    
  constructor(init_x = 0, init_y = 0) {
    this.x = init_x;
    this.y = init_y;
  }

  update(new_x, new_y) {
  	this.x = new_x;
    this.y = new_y;
  }
}
