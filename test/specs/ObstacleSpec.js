describe("Obstacle", () => {

	beforeEach(() => {
		screen = {};
		screen.width = () => 1000;
		screen.height = () => 1000;

		obstacle = new Obstacle(0, 0, 50, 50);
	});

	it("Initializes Correctly", () => {
		expect(obstacle.constructor.name).toBe("Obstacle");
		expect(obstacle.body.constructor.name).toBe("BodyRect");
	});

	it("Generates Two Obstacles", () => {
		var obstacles = Obstacle.newPairOfObstacles(100, -10, 1000);
		var gap_size = obstacles[1].body.position.x - obstacles[0].body.end_position.x;
		expect(gap_size).toBe(100);
	});

	it("Is Not Clamped to Screen", () => {
		obstacle.update(screen.height() * 100, screen);
		expect(obstacle.body.position.y).toBeGreaterThan(screen.height());
	});

	it("Destroys Itself When Off-Screen", () =>{
    expect(obstacle.update(screen.height() * 1000, screen)).toBe(true);
	});

});