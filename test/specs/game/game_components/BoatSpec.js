describe("Boat Class", () => {

	beforeEach(function() {
    boat = new Boat(
			new Position2D(0,0),
			50,
			100,
			'test.png',
			BodyRect2D,
			false,
			false
		);
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