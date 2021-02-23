describe("Boat Class", () => {

	beforeEach(function() {
    screen = {};
    screen.width = () => 1000;
    screen.height = () => 1000;

		boat = new Boat(screen, true, true);
		boat.body.position.x = 0;
		boat.body.position.y = 0;
  });

	describe("Static Methods", () => {
		it("Generates a Position Object", () => {
			expect(Boat.randomStartPosition(screen).constructor.name).toBe('Position');
		});

		it("Generates an Array of 2 Numbers", () => {
			var returned_value = Boat.defaultBodyDimensions();
			expect(returned_value.constructor.name).toBe("Array");
			expect(returned_value.length).toBe(2);
		});

		it("Generates Bigger Brain if Moves on y Axis", () => {
			var brain1 = Boat.newBrain(false);
			var brain2 = Boat.newBrain(true);
			expect(brain1.hidden_nodes).toBeLessThan(brain2.hidden_nodes);
		});
	});

	describe("Obstacle Finding", () => {

		it("Finds Nearest Obstacles", () => {
			far_obstacle = new Obstacle(boat.body.position.x, boat.body.position.y - 1000, 50);
			close_obstacle = new Obstacle(boat.body.position.x, boat.body.position.y - 100, 50);
			var nearest_obstacles = boat.find_nearest_obstacles([far_obstacle, close_obstacle])
			expect(nearest_obstacles[0]).toBe(close_obstacle);
			expect(nearest_obstacles[1]).toBe(far_obstacle);
		});
	
		it("Ignores passed obstacles finding nearest obstacles", () => {
			passed_obstacle = new Obstacle(boat.body.position.x, boat.body.end_position.y + boat.body.height, 50);
			nearest_obstacle = new Obstacle(boat.body.position.x, boat.body.position.y - boat.body.height * 2, 50);
			var nearest_obstacles = boat.find_nearest_obstacles([passed_obstacle, nearest_obstacle])
			expect(nearest_obstacles.length).toBe(1);
			expect(nearest_obstacles[0]).toBe(nearest_obstacle);
		});
	
		it("Returns empty array if no obstacles", () => {
			expect(boat.find_nearest_obstacles([]).length).toBe(0);
		});

		it('Can Find the Obstacle Gap', () => {
			var obstacles = Obstacle.newPairOfObstacles(100, -10, screen.width());
			let {gap_left, gap_right, gap_y_pos} = boat.findObstacleGap(obstacles);
			expect(gap_left).toBeGreaterThan(0);
			expect(gap_right).toBeGreaterThan(0);
			expect(gap_y_pos).toBeGreaterThan(0);
		});
	});

	it('Updates Its Score', () => {
		boat.updateScore(screen.height(), screen.height() * 3);
		expect(boat.score).toBeGreaterThan(0);
	});

	describe("Movement", () => {

		beforeEach(() => {
			input = new Input();
		});

        it("Sets Position in move function", () => {
            input.pressKey('right');
            input.pressKey('down');
            boat.move(input, screen);
            expectPositionCoords(boat.body.position, 5, 5)
        });

        it("Stops Position From Going Off Screen", () => {
            input.pressKey('left');
            input.pressKey('up');
			      boat.move(input, screen);
            expectPositionCoords(boat.body.position, 0, 0)
        });

		
		it('Thinking Returns Input Object', () => {
			boat = new Boat(screen, false, true);
			var obstacles = Obstacle.newPairOfObstacles(300, 10, screen.width());
			expect(boat.think(screen, obstacles, input, true).constructor.name).toBe("Input");
		});
    });
});

function expectPositionCoords(position, expected_x, expected_y){
    expect(position.x).toBe(expected_x);
    expect(position.y).toBe(expected_y);
}