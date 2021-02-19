describe("Obstacle", () => {

	it("Initializes Correctly", () => {
		var obstacle = new Obstacle(0, 0, 50, 50);
		expect(obstacle.constructor.name).toBe("Obstacle");
		expect(obstacle.body.constructor.name).toBe("Body");
	});

	describe("Obstacle Pair Generation", () => {
		it("Generates Two Obstacles", () => {
			var obstacles = Obstacle.newPairOfObstacles(100, -10, 1000);
			var gapSize = obstacles[1].body.position.x - obstacles[0].body.endPosition.x;
			expect(gapSize).toBe(100);
		});
	});
});