describe("Boat", () => {

	beforeEach(function() {
        ctx = {canvas: {width: 1000, height: 1000 }};
		ctx.drawImage = () => 1;
		ctx.beginPath = () => 1;
		ctx.moveTo = () => 1;
		ctx.lineTo = () => 1;
		ctx.stroke = () => 1;
		boat = new Boat(ctx, true, true);
		boat.body.position.x = 0;
		boat.body.position.y = 0;
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
			closeObstacle = new Obstacle(boat.body.position.x, boat.body.position.y - 100, 50);
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
	
		it("Returns empty array if no obstacles", () => {
			expect(boat.find_nearest_obstacles([]).length).toBe(0);
		});

		it('Can Find the Obstacle Gap', () => {
			var obstacles = Obstacle.newPairOfObstacles(100, -10, ctx.canvas.width);
			let {gapLeft, gapRight, gapYPos} = boat.findObstacleGap(obstacles);
			expect(gapLeft).toBeGreaterThan(0);
			expect(gapRight).toBeGreaterThan(0);
			expect(gapYPos).toBeGreaterThan(0);
		});
	});

	it('Updates Its Score', () => {
		boat.updateScore(ctx.canvas.height, ctx.canvas.height * 3);
		expect(boat.score).toBeGreaterThan(0);
	});

	describe("Movement", () => {

		beforeEach(() => {
			input = new Input();
		});

        it("Sets Position in move function", () => {
            input.pressKey('right');
            input.pressKey('down');
            boat.move(input, ctx);
            expectPositionCoords(boat.body.position, 5, 5)
        });

        it("Stops Position From Going Off Screen", () => {
            input.pressKey('left');
            input.pressKey('up');
			boat.move(input, ctx);
            expectPositionCoords(boat.body.position, 0, 0)
        });

		
		it('Thinking Returns Input Object', () => {
			var obstacles = Obstacle.newPairOfObstacles(300, 10, ctx.canvas.width);
			console.log(boat.think(ctx, obstacles, input, true));
			expect(boat.think(ctx, obstacles, input, true).constructor.name).toBe("Input");
		});
    });
});

function expectPositionCoords(position, expected_x, expected_y){
    expect(position.x).toBe(expected_x);
    expect(position.y).toBe(expected_y);
}