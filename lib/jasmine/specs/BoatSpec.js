describe("Boat Class", function(){

	beforeEach(function() {
        ctx = {canvas: {width: 1000, height: 1000 }};
        boat = new Boat(ctx, true, true);
    });

	describe("Static Methods", function() {
		it("randomStartPosition() Generates a Position Object", function() {
			expect(Boat.randomStartPosition({canvas: {width: 1000, height: 1000 }}).constructor.name).toBe('Position');
		});

		it("defaultBodyDimensions() Generates an array with two numbers", function() {
			var returnedValue = Boat.defaultBodyDimensions();
			expect(returnedValue.constructor.name).toBe("Array");
			expect(returnedValue.length).toBe(2);
		});

		it("newBrain() Generates Bigger Brain if yAxisMovement is true", function() {
			var brain1 = Boat.newBrain(false);
			var brain2 = Boat.newBrain(true);
			expect(brain1.hidden_nodes).toBeLessThan(brain2.hidden_nodes);
		});
	});

	it("Finds nearest obstacles", function() {
		var farPosition = new Position(boat.body.position.x, boat.body.position.y - 1000);
		farObstacle = new GameComponent(
			farPosition,
			50,
			50,
			'test.png'
		);
		closeObstacle = new GameComponent(
			boat.body.position,
			50,
			50,
			'test.png'
		);
		var nearestObstacles = boat.find_nearest_obstacles([farObstacle, closeObstacle])
		expect(nearestObstacles[0]).toBe(closeObstacle);
		expect(nearestObstacles[1]).toBe(farObstacle);
	});

	it("Ignores passed obstacles finding nearest obstacles", function() {
		var passedPosition = new Position(boat.body.position.x, boat.body.endPosition.y + boat.body.height);
		var nearestObstaclePosition = new Position(boat.body.position.x, boat.body.position.y - boat.body.height * 2);
		passedObstacle = new GameComponent(
			passedPosition,
			50,
			50,
			'test.png'
		);
		nearestObstacle = new GameComponent(
			nearestObstaclePosition,
			50,
			50,
			'test.png'
		);
		var nearestObstacles = boat.find_nearest_obstacles([passedObstacle, nearestObstacle])
		expect(nearestObstacles.length).toBe(1);
		expect(nearestObstacles[0]).toBe(nearestObstacle);
	});

	it("find_nearest_obstacles returns empty array if no obstacles", function() {
		var nearestObstacles = boat.find_nearest_obstacles([])
		expect(nearestObstacles.length).toBe(0);
	});
});