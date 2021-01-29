class GameComponent {
  constructor(init_x, init_y, width, height, imageUrl, canvas_width) {
    this.width = width ? width : this.randomWidth(canvas_width);
    this.height = height;
    this.position = new Position(init_x >= 0 ? x : this.randomXValue(canvas_width), init_y);
    this.endPosition = new Position(this.position.x + this.width, this.y + this.position.height);
    this.sprite = new Image();
    this.sprite.src = imageUrl;
  }

  update(x, y) {
    this.position.x = x;
    this.position.y = y;
    this.endPosition.y = this.position.y + this.height;
    this.endPosition.x = this.position.x + this.width;
  }

  collidesWith(otherobj) {
    let left = otherobj.position.x;
    let right = otherobj.endPosition.x;
    let top = otherobj.position.y;
    let bottom = otherobj.endPosition.y;

    if (
      (this.position.y >= top && this.position.y <= bottom) ||
      (this.endPosition.y >= top && this.endPosition.y <= bottom) ||
      (this.position.y <= top && this.endPosition.y >= bottom)
    ) {
      if (
        (this.position.x >= left && this.position.x <= right) ||
        (this.endPosition.x >= left && this.endPosition.x <= right)
      ) {
        return true;
      }
    }
    return false;
  }

  // Slight Optimization on collision detection
  // Stops looking for collisions with objects far away on vertical plane
  hasCollsionWith(sortedArray, canvasMidPoint) {
    let verticalState = this.y < canvasMidPoint ? "Top" : "Bottom";
    if (verticalState == "Top") {
      var i = 0;
      while (
        i < sortedArray.length &&
        sortedArray[i].y <= canvasMidPoint &&
        sortedArray[i].y <= this.endY
      ) {
        if (this.collidesWith(sortedArray[i])) return sortedArray[i];
        i++;
      }
    } else if (verticalState == "Bottom") {
      var i = sortedArray.length - 1;
      while (
        i >= 0 &&
        sortedArray[i].endY >= canvasMidPoint &&
        sortedArray[i].y <= this.endY
      ) {
        if (this.collidesWith(sortedArray[i])) return sortedArray[i];
        i--;
      }
    }
    return false;
  }
}
