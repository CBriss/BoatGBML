class Boat extends GameComponent {
  constructor(ctx, playerFlag) {
    super();
    // this.x = Math.random() * ctx.canvas.width;
    this.x = 100;
    //this.y = Math.random() * ctx.canvas.height;
    this.y = ctx.canvas.height - 150;
    this.width = 25;
    this.height = 100;

    this.sprite = new Image();
    this.sprite.src = "images/boat.png";

    this.person = new Person(ctx, this.x + this.width / 2, this.y);
    this.brain = new NeuralNetwork(3, 8, 2);

    this.score = 0;
    this.distanceTraveled = 0;
    if (playerFlag) this.hud = new PlayerHud();

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
    let nearest_obstacle = this.find_nearest_obstacle(obstacles);
    let obstacle_startX = nearest_obstacle ? nearest_obstacle.x + buffer : 0;
    let nearest_obstacle_endX = nearest_obstacle
      ? nearest_obstacle.x + nearest_obstacle.width - buffer
      : 0;
    var input = [
      this.x / ctx.canvas.width,
      obstacle_startX / ctx.canvas.width,
      nearest_obstacle_endX / ctx.canvas.width
    ];

    // console.log(input);

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

  update(
    ctx,
    keys,
    obstacles,
    playerFlag,
    newDistanceTraveled,
    timeLeft,
    boatSpeed
  ) {
    this.updateScore(ctx.canvas.height, newDistanceTraveled);
    if (!playerFlag) keys = this.think(ctx, obstacles);
    this.horizontalMove(keys, ctx);
    this.verticalMove(keys, ctx);
    this.person.update(ctx, this.x + this.width / 2, this.y + this.height);
    this.show(ctx);
    if (playerFlag)
      this.hud.update(
        ctx,
        timeLeft,
        newDistanceTraveled,
        this.score,
        boatSpeed
      );
  }

  horizontalMove(keys, ctx) {
    if (keys && keys[37]) {
      if (this.x > 5) this.x -= 5;
    }
    if (keys && keys[39]) {
      if (this.x + this.width + 5 < ctx.canvas.width) this.x += 5;
    }
  }

  verticalMove(keys, ctx) {
    if (keys && keys[38]) {
      if (this.y > 5) this.y -= 5;
    }
    if (keys && keys[40]) {
      if (this.y + this.height + 5 < ctx.canvas.height) this.y += 5;
    }
  }

  updateScore(canvas_height, newDistanceTraveled) {
    let heightOnScreen = 1 - this.y / canvas_height;
    this.score += Math.ceil(
      (newDistanceTraveled - this.distanceTraveled) * (heightOnScreen * 1.5)
    );
    this.distanceTraveled = newDistanceTraveled;
  }

  find_nearest_obstacle(obstacles) {
    if (obstacles.length <= 0) return null;
    let nearest_obstacle;
    let nearestDistance = 10000000;
    obstacles.forEach(obstacle => {
      let distance = this.y - obstacle.y;
      if (distance > -80 && distance < nearestDistance)
        nearest_obstacle = obstacle;
    });
    return nearest_obstacle;
  }

  mutate() {
    function fn(x) {
      if (Math.random(1) < 0.05) {
        let offset = randn_bm() * 0.5;
        let newx = x + offset;
        return newx;
      }
      return x;
    }

    let ih = this.brain.input_weights.dataSync().map(fn);
    let ih_shape = this.brain.input_weights.shape;
    this.brain.input_weights.dispose();
    this.brain.input_weights = tf.tensor(ih, ih_shape);

    let ho = this.brain.output_weights.dataSync().map(fn);
    let ho_shape = this.brain.output_weights.shape;
    this.brain.output_weights.dispose();
    this.brain.output_weights = tf.tensor(ho, ho_shape);
  }
}
