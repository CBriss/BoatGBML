describe("Obstacle", () => {

	beforeEach(() => {
		ctx = {canvas: {width: 1000, height: 1000 }};
		obstacle = new Obstacle(0, 0, 50, 50);
	});

	it("Initializes Correctly", () => {
		expect(obstacle.constructor.name).toBe("Obstacle");
		expect(obstacle.body.constructor.name).toBe("Body");
	});

	it("Generates Two Obstacles", () => {
		var obstacles = Obstacle.newPairOfObstacles(100, -10, 1000);
		var gapSize = obstacles[1].body.position.x - obstacles[0].body.endPosition.x;
		expect(gapSize).toBe(100);
	});

	if("Is Not Clamped to Screen", () => {
		obstacle.update(ctx.canvas.height * 100, ctx);
		expect(obstacle.body.position.y).toBeGreaterThan(ctx.canvas.height);
	});
});