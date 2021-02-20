class Boat extends GameComponent {
  constructor(screenContext, playerFlag, yAxisMovement, seed_weights=null) {
    super(Boat.randomStartPosition(screenContext), ...Boat.defaultBodyDimensions(), Boat.randomImage());
    this.score = 0;
    this.distanceTraveled = 0;
    this.person = new Person(screenContext, this.body.position.x + this.body.width / 2, this.body.position.y);
    this.brain = Boat.newBrain(yAxisMovement, seed_weights);
    this.player = playerFlag;
    this.speed = 5;
    this.show(screenContext);
  }

  ////
  // Static Methods

  static randomStartPosition(screenContext){
    return new Position(
      Math.random() * (screenContext.canvas.width - 25),
      Math.random() * (screenContext.canvas.height - 125)
    );
  }

  static defaultBodyDimensions(){
    return [25, 75];
  }

  static randomImage() {
    let possibleColors = ["Blue", "Green", "Pink", "Purple", "Red", "Yellow"];
    return "images/boats/boat" + possibleColors[Math.floor(Math.random() * possibleColors.length)] + ".png"
  }
  
  static newBrain(yAxisMovement, seed_weights = null) {
    let brain_dimensions = yAxisMovement ? [5, 50, 4] : [4, 5, 2];
    return new NeuralNetwork(...brain_dimensions, seed_weights);
  }


  ////
  // Instance Methods

  show(screenContext) {
    screenContext.drawImage(this.sprite, this.body.position.x, this.body.position.y, this.body.width, this.body.height);
    this.person.show(screenContext);
    if (this.hud) this.hud.show(screenContext);
  }

  think(screenContext, obstacles, yAxisMovement) {
    let nearestObstacles = this.find_nearest_obstacles(obstacles);
    let {gapLeft, gapRight, gapYPos} = this.findObstacleGap(nearestObstacles)
    var input = [
      this.body.position.x / screenContext.canvas.width,
      this.body.position.endX / screenContext.canvas.width,
      gapLeft / screenContext.canvas.width,
      gapRight / screenContext.canvas.width
    ];
    if(yAxisMovement) {
      input.push((this.body.position.y - gapYPos)/screenContext.canvas.height);
    }
    let result = this.brain.predict(input);
    let left = result[0];
    let right = result[1];
    if(yAxisMovement) {
      var up = result[2];
      var down = result[3];
    }
    var keys = [];
    let highestResult = Math.max.apply(null, result);
    switch (highestResult) {
      case left:
        keys[37] = true;
        break;
      case right:
        keys[39] = true;
        break;
      case up:
        keys[38] = true;
        break;
      case down:
        keys[40] = true;
        break;
      default:
        break;
    }
    return keys;
  }

  update(screenContext, input, obstacles, newDistanceTraveled, yAxisMovement) {
    if (!this.player) input.keys = this.think(screenContext, obstacles, yAxisMovement);
    this.move(input, screenContext);
    this.person.update(screenContext, this.body.position.x + this.body.width / 2, this.body.position.y + this.body.height);
    this.updateScore(screenContext.canvas.height, newDistanceTraveled);
    this.show(screenContext);
  }

  move(input, screenContext) {
    var new_x = this.body.position.x + ((0 + input.isPressed("right") - input.isPressed("left")) * this.speed);
    var new_y = this.body.position.y + ((0 + input.isPressed("down") - input.isPressed("up")) * this.speed);
    super.moveTo(
      new_x,
      new_y,
      screenContext
    );
  }

  // This should probably be the game, not the boat
  updateScore(canvas_height, newDistanceTraveled) {
    let heightOnScreen = 1 - this.body.position.y / canvas_height;
    this.score += Math.ceil(
      (newDistanceTraveled - this.distanceTraveled) * (heightOnScreen * 1.5)
    );
    this.distanceTraveled = newDistanceTraveled;
  }

  find_nearest_obstacles(obstacles) {
    if (obstacles.length <= 0) return [];
    let nearestObstacles = new Array(2);
    let nearestDistance = null;
    for (let i = 0; i < obstacles.length; i++) {
      let obstacle = obstacles[i];
      let distance = this.body.endPosition.y - obstacle.body.position.y;
      if (distance >= 0 && distance < (nearestDistance || distance + 1)) {
        nearestObstacles[1] = nearestObstacles[0] || obstacles[i + 1];
        nearestObstacles[0] = obstacle;
      }
    }
    if (nearestObstacles[1]) return [nearestObstacles[0], nearestObstacles[1]];
    else if (nearestObstacles[0]) return [nearestObstacles[0]];
    else return [];
  }

  findObstacleGap(nearestObstacles) {
    if (nearestObstacles.length > 1) {
      if (nearestObstacles[0].x < nearestObstacles[1].x) {
        var nearestObstacle1 = nearestObstacles[0];
        var nearestObstacle2 = nearestObstacles[1];
      } else {
        var nearestObstacle2 = nearestObstacles[0];
        var nearestObstacle1 = nearestObstacles[1];
      }
      var gapLeft = nearestObstacle1.endX;
      var gapRight = nearestObstacle2.x;
      var gapYPos = nearestObstacle1.endY;
    } else if (nearestObstacles.length > 0) {
      let nearestObstacle1 = nearestObstacles[0];
      var gapLeft = nearestObstacle1.endX;
      var gapRight = 0;
      var gapYPos = nearestObstacle1.endY;
    } else {
      var gapLeft = 0;
      var gapRight = 0;
      var gapYPos = 0;
    }
  
    return {
      gapLeft,
      gapRight,
      gapYPos
    }
  }
  

  // This doesn't belong here?
  // this.keys doesn't exist in the current scope.
  // updateSpeed() {
  //   if (this.keys && this.keys[38]) {
  //     this.boatSpeed += 2;
  //     if (this.boatSpeed > 200) {
  //       this.boatSpeed = 200;
  //     }
  //   } else if (this.keys && this.keys[40]) {
  //     this.boatSpeed -= 2;
  //     if (this.boatSpeed < 0) {
  //       this.boatSpeed = 0;
  //     }
  //   }
  // }
}
