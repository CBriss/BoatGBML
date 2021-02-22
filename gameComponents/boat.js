class Boat extends GameComponent {
  constructor(screenContext, playerFlag, yAxisMovement, seed_weights=null) {
    super(...Boat.defaultValues(screenContext));
    this.score = 0;
    this.distanceTraveled = 0;
    this.player = playerFlag;
    this.speed = 5;

    this.person = new Person(screenContext, this.body.left() + this.body.width / 2, this.body.bottom());
    this.brain = playerFlag ? null : Boat.newBrain(yAxisMovement, seed_weights);
    
    this.show(screenContext);
  }

  ////
  // Static Methods

  static defaultValues(screenContext){
    return [
      Boat.randomStartPosition(screenContext),
      ...Boat.defaultBodyDimensions(),
      Boat.randomImage()
    ]
  }

  static randomStartPosition(screenContext){
    return new Position(
      Math.random() * (screenContext.canvas.width - 25),
      Math.random() * (screenContext.canvas.height - 125) + screenContext.canvas.height/3
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

  think(screenContext, obstacles, input, yAxisMovement) {
    let nearestObstacles = this.find_nearest_obstacles(obstacles);
    let {gapLeft, gapRight, gapYPos} = this.findObstacleGap(nearestObstacles)
    var brainInput = [
      this.body.left() / screenContext.canvas.width,
      this.body.right() / screenContext.canvas.width,
      gapLeft / screenContext.canvas.width,
      gapRight / screenContext.canvas.width
    ];
    if(yAxisMovement) {
      brainInput.push((this.body.top() - gapYPos)/screenContext.canvas.height);
    }
    let result = this.brain.predict(brainInput);
    input.clearKeys();
    input.pressKey(outputMap[result.indexOf(Math.max.apply(null, result))]);
    return input;
  }

  update(screenContext, input, obstacles, newDistanceTraveled, yAxisMovement) {
    this.move(
      this.player ? input : this.think(screenContext, obstacles, input, yAxisMovement),
      screenContext
    );
    this.person.update(screenContext, this.body.left() + this.body.width / 2, this.body.bottom());
    this.updateScore(screenContext.canvas.height, newDistanceTraveled);
    this.show(screenContext);
  }

  move(input, screenContext) {
    super.moveTo(
      this.body.position.x + ((0 + input.isPressed("right") - input.isPressed("left")) * this.speed),
      this.body.position.y + ((0 + input.isPressed("down") - input.isPressed("up")) * this.speed),
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
      let distance = this.body.position.y - obstacle.body.endPosition.y;
      if (distance >= 0 && distance < (nearestDistance || distance + 1)) {
        nearestObstacles[1] = nearestObstacles[0] || obstacles[i + 1];
        nearestObstacles[0] = obstacle;
        nearestDistance = distance;
      }
    }
    if (nearestObstacles[1]) return [nearestObstacles[0], nearestObstacles[1]];
    else if (nearestObstacles[0]) return [nearestObstacles[0]];
    else return [];
  }

  findObstacleGap(nearestObstacles) {
    if (nearestObstacles <= 1){
      return { gapLeft: 0, gapRight:  0, gapYPos: 0 };
    }

    if (nearestObstacles[0].body.left() < nearestObstacles[1].body.left()) {
      var leftObstacle = nearestObstacles[0];
      var rightObstacle = nearestObstacles[1];
    } else {
      var rightObstacle = nearestObstacles[0];
      var leftObstacle = nearestObstacles[1];
    }
    return {
      gapLeft: leftObstacle.body.right(),
      gapRight: rightObstacle.body.left(),
      gapYPos: leftObstacle.body.bottom()
    }
  }
}
