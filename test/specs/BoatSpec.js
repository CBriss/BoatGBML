describe("Boat", () => {

	beforeEach(function() {
        ctx = {canvas: {width: 1000, height: 1000 }};
		ctx.drawImage = () => 1;
		ctx.beginPath = () => 1;
		ctx.moveTo = () => 1;
		ctx.lineTo = () => 1;
		ctx.stroke = () => 1;
		boat = new Boat(ctx, true, true);
    });

	describe("Static Methods", () => {
		it("randomStartPosition() Generates a Position Object", () => {
			expect(Boat.randomStartPosition({canvas: {width: 1000, height: 1000 }}).constructor.name).toBe('Position');
		});

		it("defaultBodyDimensions() Generates an array with two numbers", () => {
			var returnedValue = Boat.defaultBodyDimensions();
			expect(returnedValue.constructor.name).toBe("Array");
			expect(returnedValue.length).toBe(2);
		});

		it("newBrain() Generates Bigger Brain if yAxisMovement is true", () => {
			var brain1 = Boat.newBrain(false);
			var brain2 = Boat.newBrain(true);
			expect(brain1.hidden_nodes).toBeLessThan(brain2.hidden_nodes);
		});
	});

	describe("Obstacle Finding", () => {

		it("Finds nearest obstacles", () => {
			farObstacle = new Obstacle(boat.body.position.x, boat.body.position.y - 1000, 50);
			closeObstacle = new Obstacle(boat.body.position.x, boat.body.position.y, 50);
			var nearestObstacles = boat.find_nearest_obstacles([farObstacle, closeObstacle])
			expect(nearestObstacles[0]).toBe(closeObstacle);
			expect(nearestObstacles[1]).toBe(farObstacle);
		});
	
		it("Ignores passed obstacles finding nearest obstacles", () => {
			passedObstacle = new Obstacle(boat.body.position.x, boat.body.endPosition.y + boat.body.height, 50);
			nearestObstacle = new Obstacle(boat.body.position.x, boat.body.position.y - boat.body.height * 2, 50);
			var nearestObstacles = boat.find_nearest_obstacles([passedObstacle, nearestObstacle])
			expect(nearestObstacles.length).toBe(1);
			expect(nearestObstacles[0]).toBe(nearestObstacle);
		});
	
		it("find_nearest_obstacles returns empty array if no obstacles", () => {
			var nearestObstacles = boat.find_nearest_obstacles([])
			expect(nearestObstacles.length).toBe(0);
		});
	});

	it('Updates Its Score', () => {
		boat.updateScore(ctx.canvas.height, ctx.canvas.height * 3);
		expect(boat.score).toBeGreaterThan(0);
	});

	it('Returns Keys When Thinking', () => {
		expect(boat.think(ctx, [new Obstacle(0, 0, 50)], true).length).toBe(0);
	});
});