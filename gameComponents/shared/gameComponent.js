class GameComponent {
  constructor(position, width, height, imageUrl, clamp_to_screen = true) {
    this.body = new Body(position, width, height, clamp_to_screen);
    this.sprite = new Image();
    this.sprite.src = imageUrl;
  }

  moveTo(x, y, ctx) {
    this.body.update_position(x, y, ctx);
  }

  collidesWith(otherobj) {
    let otherBody = otherobj.body;
    if (
      (this.body.top() >= otherBody.top() && this.body.top() <= otherBody.bottom()) ||
      (this.body.bottom() >= otherBody.top() && this.body.bottom() <= otherBody.bottom()) ||
      (this.body.top() <= otherBody.top() && this.body.bottom() >= otherBody.bottom())
    ) {
      if (
        (this.body.left() >= otherBody.left() && this.body.left() <= otherBody.right()) ||
        (this.body.right() >= otherBody.left() && this.body.right() <= otherBody.right())
      ) {
        return true;
      }
    }
    return false;
  }

  // Slight Optimization on collision detection
  // Stops looking for collisions with objects far away on vertical plane
  hasCollsionWith(sortedArray, canvasMidPoint) {
    let verticalState = this.body.position.y < canvasMidPoint ? "Top" : "Bottom";
    if (verticalState == "Top") {
      var i = 0;
      while (
        i < sortedArray.length &&
        sortedArray[i].body.position.y <= canvasMidPoint &&
        sortedArray[i].body.position.y <= this.body.endPosition.y
      ) {
        if (this.collidesWith(sortedArray[i])) return sortedArray[i];
        i++;
      }
    } else if (verticalState == "Bottom") {
      var i = sortedArray.length - 1;
      while (
        i >= 0 &&
        sortedArray[i].body.endPosition.y >= canvasMidPoint &&
        sortedArray[i].body.position.y <= this.body.endPosition.y
      ) {
        if (this.collidesWith(sortedArray[i])) return sortedArray[i];
        i--;
      }
    }
    return false;
  }

  hasCollsionWith(sortedArray, canvasMidPoint) {
    let verticalState = this.body.position.y < canvasMidPoint ? "Top" : "Bottom";
    if (verticalState == "Top"){
      var i = 0;
      var increment = 1;
    }
    else {
      var i = sortedArray.length - 1;
      var increment = -1;
    }

    while(i >= 0 && i < sortedArray.length){
      if(sortedArray[i].body.position.y <= this.body.endPosition.y &&
        this.collidesWith(sortedArray[i]))
        return sortedArray[i];
      i += increment;
    }
    return false;
  }

}
