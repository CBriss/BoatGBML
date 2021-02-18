describe("Game Component Class", function() {

	describe("Collisions", function() {
		var defaultWidth = 50;
		var defaultHeight = 100;
		var defaultImage = 'test.png';
		var component1;
		var component2;
		var ctx = {canvas: {width: 1000, height: 1000 }};
		var startingPosition = new Position(500, 500);

		beforeEach(function() {
			component1 = new GameComponent(startingPosition, defaultWidth, defaultHeight, defaultImage);
			component2 = new GameComponent(startingPosition, defaultWidth, defaultHeight, defaultImage);
		});

		it("Collides When fully overlapped", function() {
			expect(component1.collidesWith(component2)).toBe(true);
		});

		it("Collides when rear ended", function() {
			component2.moveTo(500, 500 + component2.body.height - 1, ctx);
			expect(component1.collidesWith(component2)).toBe(true);
		});

		it("Collides when runs into another", function() {
			component1.moveTo(500, 500 + component1.body.height - 1, ctx);
			expect(component1.collidesWith(component2)).toBe(true);
		});

		it("Collides when hits another from the left", function() {
			component1.moveTo(500 - component1.body.width + 1 , 500, ctx);
			expect(component1.collidesWith(component2)).toBe(true);
		});

		it("Collides when hits another from the right", function() {
			component1.moveTo(500 + component1.body.width - 1 , 500, ctx);
			expect(component1.collidesWith(component2)).toBe(true);
		});
	});

});