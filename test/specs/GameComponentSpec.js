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
		var starting_position = new Position2D(500, 500);

		beforeEach(function() {
      let default_args = [starting_position, default_width, default_height, default_image, BodyRect2D];
			component1 = new GameComponent(...default_args);
			component2 = new GameComponent(...default_args);
		});

		it("Collides When fully overlapped", () => {
			expect(component1.collidesWith(component2)).toBe(true);
		});

		it("Collides when rear ended", () => {
			component2.moveTo(500, component2.body.top() - 1, screen);
			expect(component1.collidesWith(component2)).toBe(true);
		});

		it("Collides when runs into another", () => {
      expectCollisionWhenHittingAnother(500, component1.body.top() - 1);
		});

		it("Collides when hits another from the left", () => {
      expectCollisionWhenHittingAnother(component1.body.left() + 1 , 500);
		});

		it("Collides when hits another from the right", () => {
      expectCollisionWhenHittingAnother(component1.body.right() - 1 , 500);
		});

		it('Can detect collisions in list of components', () => {
      let component3 = new GameComponent(new Position2D(screen.width+100, screen.height+100), default_width, default_height, default_image, BodyRect2D);
			expect(component1.hasCollsionWith([component2, component3], screen.height()/ 2)).toEqual(component2);
		});

    function expectCollisionWhenHittingAnother(comp2_x, comp2_y) {
      component1.moveTo(comp2_x, comp2_y, screen);
      expect(component1.collidesWith(component2)).toBe(true);
    }
	});

});