class Boat extends GameComponent {
  constructor(ctx, playerFlag) {
    super();

    let possibleColors = ["Blue", "Green", "Pink", "Purple", "Red", "Yellow"];
    let randomColor =
      possibleColors[Math.floor(Math.random() * possibleColors.length)];
    this.setComponentValues(
      100,
      ctx.canvas.height - 150,
      25,
      100,
      "images/boat" + randomColor + ".png"
    );

    this.person = new Person(ctx, this.x + this.width / 2, this.y);
    this.brain = new NeuralNetwork(4, 20, 2);

    this.score = 0;
    this.distanceTraveled = 0;

    this.player = playerFlag;

    this.show(ctx);
  }

  show(ctx) {
    ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    this.person.show(ctx);
    if (this.hud) this.hud.show(ctx);
  }

  think(ctx, obstacles) {
    // | Inputs |
    let buffer = 10;
    let nearestObstacles = this.find_nearest_obstacles(obstacles);
    if (nearestObstacles.length > 1) {
      let nearestObstacle1 = nearestObstacles[0];
      let nearestObstacle2 = nearestObstacles[1];

      var obstacle1StartX = nearestObstacle1 ? nearestObstacle1.x + buffer : 0;
      var nearestObstacle1EndX = nearestObstacle1
        ? nearestObstacle1.endX - buffer
        : 0;

      var obstacle2StartX = nearestObstacle2 ? nearestObstacle2.x + buffer : 0;
      var nearestObstacle2EndX = nearestObstacle2
        ? nearestObstacle2.endX - buffer
        : 0;
    } else if (nearestObstacles.length > 0) {
      let nearestObstacle1 = nearestObstacles[0];

      var obstacle1StartX = nearestObstacle1 ? nearestObstacle1.x + buffer : 0;
      var nearestObstacle1EndX = nearestObstacle1
        ? nearestObstacle1.endX - buffer
        : 0;

      var obstacle2StartX = 0;
      var nearestObstacle2EndX = 0;
    } else {
      var obstacle1StartX = 0;
      var nearestObstacle1EndX = 0;

      var obstacle2StartX = 0;
      var nearestObstacle2EndX = 0;
    }

    // var input = [
    //   this.x / ctx.canvas.width,
    //   this.endX / ctx.canvas.width,
    //   obstacle1StartX / ctx.canvas.width,
    //   nearestObstacle1EndX / ctx.canvas.width,
    //   obstacle2StartX / ctx.canvas.width,
    //   nearestObstacle2EndX / ctx.canvas.width
    // ];

    var input = [
      this.x / ctx.canvas.width,
      this.endX / ctx.canvas.width,
      nearestObstacle1EndX / ctx.canvas.width,
      obstacle2StartX / ctx.canvas.width
    ];

    let result = this.brain.predict(input);
    let left = result[0];
    let right = result[1];
    // let up = result[2];
    // let down = result[3];

    var keys = [];
    if (left > 0.5) keys[37] = true;
    if (right > 0.5) keys[39] = true;

    // if (up > 0.5) keys[38] = true;
    // if (down > 0.5) keys[40] = true;

    return keys;
  }

  update(ctx, keys, obstacles, newDistanceTraveled, timeLeft, boatSpeed) {
    if (!this.player) keys = this.think(ctx, obstacles);
    let newX = this.moveToNewX(keys, ctx);
    let newY = this.moveToNewY(keys, ctx);
    super.update(newX, newY);
    this.person.update(ctx, this.x + this.width / 2, this.y + this.height);
    this.updateScore(ctx.canvas.height, newDistanceTraveled);
    this.show(ctx);
  }

  moveToNewX(keys, ctx) {
    let newX = this.x;
    if (keys && keys[37]) {
      if (this.x > 5) newX -= 5;
    }
    if (keys && keys[39]) {
      if (this.x + this.width + 5 < ctx.canvas.width) newX += 5;
    }
    return newX;
  }

  moveToNewY(keys, ctx) {
    let newY = this.y;
    if (keys && keys[38]) {
      if (this.y > 5) newY -= 5;
    }
    if (keys && keys[40]) {
      if (this.y + this.height + 5 < ctx.canvas.height) newY += 5;
    }
    return newY;
  }

  updateScore(canvas_height, newDistanceTraveled) {
    let heightOnScreen = 1 - this.y / canvas_height;
    this.score += Math.ceil(
      (newDistanceTraveled - this.distanceTraveled) * (heightOnScreen * 1.5)
    );
    this.distanceTraveled = newDistanceTraveled;
  }

  find_nearest_obstacles(obstacles) {
    if (obstacles.length <= 0) return [];
    let nearestObstacle1;
    let nearestObstacle2;
    let nearestDistance = 10000000;
    for (let i = 0; i < obstacles.length; i++) {
      let obstacle = obstacles[i];
      let distance = this.y - obstacle.y;
      if (distance > -80 && distance < nearestDistance) {
        nearestObstacle1 = obstacle;
        nearestObstacle2 = obstacles[i + 1];
        i++;
      }
    }
    return [nearestObstacle1, nearestObstacle2];
  }

  mutate() {
    function mutateWeight(weight) {
      if (Math.random(1) < 0.05) {
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
