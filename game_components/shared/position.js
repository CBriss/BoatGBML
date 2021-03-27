class Position {    
    constructor() {}
  
    isBetweenValues(min, max, axis) {
      let value = this[axis];
      return (value >= min && value <= max);
    }
  }
  