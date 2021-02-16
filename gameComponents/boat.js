class Boat extends GameComponent {
  constructor(ctx, playerFlag, yAxisMovement, seed_weights=null) {
    super(Boat.randomStartPosition(ctx), ...Boat.defaultBodyDimensions(), Boat.randomImage());
    this.score = 0;
    this.distanceTraveled = 0;
    this.person = new Person(ctx, this.body.position.x + this.body.width / 2, this.body.position.y);
    this.brain = Boat.newBrain(yAxisMovement, seed_weights);
    this.player = playerFlag;
    this.show(ctx);
  }

  ////
  // Static Methods

  static randomStartPosition(ctx){
    return new Position(
      Math.random() * (ctx.canvas.width - 25),
      Math.random() * (ctx.canvas.height - 125)
    );
  }

  static defaultBodyDimensions(){
    return [25, 100];
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

  show(ctx) {
    ctx.drawImage(this.sprite, this.body.position.x, this.body.position.y, this.body.width, this.height);
    this.person.show(ctx);
    if (this.hud) this.hud.show(ctx);
  }

  think(ctx, obstacles, yAxisMovement) {
    let nearestObstacles = this.find_nearest_obstacles(obstacles);
    let {gapLeft, gapRight, gapYPos} = findObstacleGap(nearestObstacles)
    var input = [
      this.body.position.x / ctx.canvas.width,
      this.body.position.endX / ctx.canvas.width,
      gapLeft / ctx.canvas.width,
      gapRight / ctx.canvas.width
    ];
    if(yAxisMovement) {
      input.push((this.body.position.y - gapYPos)/ctx.canvas.height);
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

  update(ctx, input, obstacles, newDistanceTraveled, yAxisMovement) {
    if (!this.player) input.keys = this.think(ctx, obstacles, yAxisMovement);
    this.body.move(input, ctx);
    this.person.update(ctx, this.body.position.x + this.body.width / 2, this.body.position.y + this.height);
    this.updateScore(ctx.canvas.height, newDistanceTraveled);
    this.show(ctx);
  }

  // This should probably be the game, not the boat
  updateScore(canvas_height, newDistanceTraveled) {
    let heightOnScreen = 1 - this.y / canvas_height;
    this.score += Math.ceil(
      (newDistanceTraveled - this.distanceTraveled) * (heightOnScreen * 1.5)
    );
    this.distanceTraveled = newDistanceTraveled;
  }

  find_nearest_obstacles(obstacles) {
    if (obstacles.length <= 0) return [];
    let nearestObstacle1 = null;
    let nearestObstacle2 = null;
    let nearestDistance = 10000000;
    for (let i = 0; i < obstacles.length; i++) {
      let obstacle = obstacles[i];
      let distance = this.body.position.endY - obstacle.position.y;
      if (distance >= 0 && distance < nearestDistance) {
        nearestObstacle2 = nearestObstacle1 || obstacles[i + 1];
        nearestObstacle1 = obstacle;
        i++;
      }
    }
    if (nearestObstacle2) return [nearestObstacle1, nearestObstacle2];
    else if (nearestObstacle1) return [nearestObstacle1];
    else return [];
  }

  mutate(goalPercentage) {
    function mutateWeight(weight) {
      // if (Math.random(1) < 0.05) {
      //   console.log("mutate");
      //   return weight + randn_bm() * 0.5;
      // }
      // return weight;
      if (Math.random(1) < (0.10 * (1-goalPercentage))) {
        return weight + randn_bm() * 0.5;
      }
      return weight;
    }

    let input_weights = this.brain.input_weights.dataSync().map(mutateWeight);
    let input_shape = this.brain.input_weights.shape;
    this.brain.input_weights.dispose();
    this.brain.input_weights = tf.tensor(input_weights, input_shape);

    let output_weights = this.brain.output_weights.dataSync().map(mutateWeight);
    let output_shape = this.brain.output_weights.shape;
    this.brain.output_weights.dispose();
    this.brain.output_weights = tf.tensor(output_weights, output_shape);
  }

  updateSpeed() {
    if (this.keys && this.keys[38]) {
      this.boatSpeed += 2;
      if (this.boatSpeed > 200) {
        this.boatSpeed = 200;
      }
    } else if (this.keys && this.keys[40]) {
      this.boatSpeed -= 2;
      if (this.boatSpeed < 0) {
        this.boatSpeed = 0;
      }
    }
  }
}
