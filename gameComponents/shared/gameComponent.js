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
    if (this.isOverlappingVertical(otherBody) && this.isOverlappingHorizontal(otherBody)) {
      return true;
    }
    return false;
  }

  hasCollsionWith(sortedArray, canvasMidPoint) {
    let {i, increment} = GameComponent.setLoopVariables((this.body.top() < canvasMidPoint), sortedArray.length - 1)
    while(i >= 0 && i < sortedArray.length){
      if(sortedArray[i].body.top() <= this.body.bottom() && this.collidesWith(sortedArray[i]))
        return sortedArray[i];
      i += increment;
    }
    return false;
  }

  isOverlappingVertical(otherBody) {
    return (
      (this.body.top() >= otherBody.top() && this.body.top() <= otherBody.bottom()) ||
      (this.body.bottom() >= otherBody.top() && this.body.bottom() <= otherBody.bottom()) ||
      (this.body.top() <= otherBody.top() && this.body.bottom() >= otherBody.bottom())
    )
  }

  isOverlappingHorizontal(otherBody){
    return (
      (this.body.left() >= otherBody.left() && this.body.left() <= otherBody.right()) ||
      (this.body.right() >= otherBody.left() && this.body.right() <= otherBody.right())
    )
  }

  static setLoopVariables(isTopOfScreen, lastIndex){
    return isTopOfScreen ? { i: 0, increment: 1 } : { i: lastIndex, increment: -1 };
  }

}
