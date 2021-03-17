class Position2D extends Position {    
  constructor(init_x = 0, init_y = 0) {
    super();
    this.x = init_x;
    this.y = init_y;
  }

  update(new_x, new_y) {
  	this.x = Math.floor(new_x);
    this.y = Math.floor(new_y);
  }

  coordinates() {
    return [this.x, this.y];
  }

}
