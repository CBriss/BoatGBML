class PlayerHud {
  constructor() {
    this.scoreX = 50;
    this.scoreY = 25;
    this.scoreValue = 0;

    this.distanceX = 50;
    this.distanceY = 50;
    this.distanceValue = 0;
    this.lastDistanceValue = 0;

    this.boatSpeedX = 50;
    this.boatSpeedY = 75;
    this.boatSpeedValue = 0;

    this.timeLeftX = 50;
    this.timeLeftY = 100;
    this.timeLeft = 1500;
  }

  show(ctx) {
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + this.scoreValue, this.scoreX, this.scoreY);

    ctx.fillText(
      "Distance Traveled: " + this.distanceValue,
      this.distanceX,
      this.distanceY
    );

    ctx.fillText(
      "Boat Speed: " + this.boatSpeedValue,
      this.boatSpeedX,
      this.boatSpeedY
    );

    ctx.fillText(
      "Time Left: " + Math.ceil(this.timeLeft / 60),
      this.timeLeftX,
      this.timeLeftY
    );
  }

  update(timeLeft, distanceTraveled, score, boatSpeed) {
    this.lastDistanceValue = this.distanceValue;
    this.distanceValue = distanceTraveled;
    this.boatSpeedValue = boatSpeed;
    this.timeLeft = timeLeft;
    this.scoreValue = score;
  }
}
