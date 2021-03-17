describe("Game Component", () => {

	describe("Collisions", () => {
		var default_width = 50;
		var default_height = 100;
		var default_image = 'test.png';
		var component1;
		var component2;
		screen = {};
		screen.width = () => 1000;
		screen.height = () => 1000;
		var starting_position = new Position(500, 500);

		beforeEach(function() {
			component1 = new GameComponent(starting_position, default_width, default_height, default_image, BodyRect);
			component2 = new GameComponent(starting_position, default_width, default_height, default_image, BodyRect);
		});

		it("Collides When fully overlapped", () => {
			expect(component1.collidesWith(component2)).toBe(true);
		});

		it("Collides when rear ended", () => {
			component2.moveTo(500, 500 + component2.body.height - 1, screen);
			expect(component1.collidesWith(component2)).toBe(true);
		});

		it("Collides when runs into another", () => {
			component1.moveTo(500, 500 + component1.body.height - 1, screen);
			expect(component1.collidesWith(component2)).toBe(true);
		});

		it("Collides when hits another from the left", () => {
			component1.moveTo(500 - component1.body.width + 1 , 500, screen);
			expect(component1.collidesWith(component2)).toBe(true);
		});

		it("Collides when hits another from the right", () => {
			component1.moveTo(500 + component1.body.width - 1 , 500, screen);
			expect(component1.collidesWith(component2)).toBe(true);
		});

		it('Can detect collisions', () => {
			expect(component1.hasCollsionWith([component2], screen.height()/ 2)).toEqual(component2);
		});
	});

});