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
		it("Generates a Position2D Object", () => {
			expect(Boat.randomStartPosition(screen).constructor.name).toBe('Position2D');
		});

		it("Generates an Array of 2 Numbers", () => {
			var returned_value = Boat.defaultBodyDimensions(screen);
			expect(returned_value.constructor.name).toBe("Array");
			expect(returned_value.length).toBe(2);
		});

		it("Generates Bigger Brain if Moves on y Axis", () => {
			var brain1 = Boat.newBrain(false);
			var brain2 = Boat.newBrain(true);
			expect(brain1.neurons[1].length).toBeLessThan(brain2.neurons[1].length);
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
		
		it('Thinking Returns Input Object', () => {
			boat = new Boat(screen, false, true);
			var obstacles = Obstacle.newPairOfObstacles(300, 10, screen.width());
			expect(boat.think(screen, obstacles, input, true).constructor.name).toBe("Input");
		});
  });

	it('Generates the Correct Brain Input', () => {
    boat.body.position.y = screen.height() - 200;

    let brain_input = boat.generateBrainInput(generateObstacleGap(100), screen, false);
		
    expect(brain_input.length).toBe(4);
    expect(brain_input[0]).toBe(0);
    expect(brain_input[1]).toBe(boat.body.right() / screen.width());
    expect(brain_input[2]).toBe(0.1);
    expect(brain_input[3]).toBe(0.2);
	});

});

function generateObstacleGap(gap_size) {
	let obstacle1 = new Obstacle(0, -10, 100, 50);
	let obstacle2_pos = obstacle1.body.end_position.x + gap_size;
	let obstacle2 = new Obstacle(obstacle2_pos, 10, screen.width() - obstacle2_pos, 50);
	return [obstacle1, obstacle2];
}