describe("Body Class", function() {
    var width = 100;
    var height = 150;
    var body;

    
    beforeEach(function() {
        body = new Body(new Position(), width, height);
    });

    it("Sets endPosition Correctly", function() {
        expect(body.endPosition.x).toBe(width);
        expect(body.endPosition.y).toBe(height);
    });

    it("Updates position Correcly", function() {
        body.update_position(50,50);

        expect(body.position.x).toBe(50);
        expect(body.position.y).toBe(50);
    });

    it("Updates endPosition Correcly", function() {
        body.update_position(50,50);

        expect(body.endPosition.x).toBe(50 + width);
        expect(body.endPosition.y).toBe(50 + height);
    });

    // Tests for moving
    

});