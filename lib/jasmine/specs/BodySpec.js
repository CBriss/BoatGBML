describe("Body Class", function() {
    var width = 100;
    var height = 150;
    var body;
    startingPosition = new Position(0,0);
    
    beforeEach(function() {
        body = new Body(startingPosition, width, height);
        ctx = {canvas: {width: 1000, height: 1000 }};
    });


    it("Initializes endPosition Correctly", function() {
        expectPositionCoords(body.endPosition, width, height);
    });

    it("Updates position Correcly", function() {
        body.update_position(50,50,ctx);
        expectPositionCoords(body.position, 50, 50);
    });

    it("Updates endPosition Correcly", function() {
        body.update_position(50,50,ctx);
        expectPositionCoords(body.endPosition, 50 + width, 50 + height);
    });

    describe("Body Boundries", function() {
        it("Returns correct top() value", function() {
            body.update_position(50,100,ctx);
            expect(body.top()).toBe(100);
        });

        it("Returns correct bottom() value", function() {
            body.update_position(50,100,ctx);
            expect(body.bottom()).toBe(100 + height);
        });

        it("Returns correct left() value", function() {
            body.update_position(50,100,ctx);
            expect(body.left()).toBe(50);
        });

        it("Returns correct right() value", function() {
            body.update_position(50,100,ctx);
            expect(body.right()).toBe(50 + width);
        });
    });

    describe("Movement", function() {
        it("Sets Position in move function", function() {
            input = new Input();
            input.pressKey('right');
            input.pressKey('down');
            body.move(input, ctx);
            expectPositionCoords(body.position, 5, 5)
        });

        it("Stops Position From Going Off Screen", function() {
            input = new Input();
            input.pressKey('left');
            input.pressKey('up');
            body.move(input, ctx);
            expectPositionCoords(body.position, 0, 0)
        });
    });    
});


function expectPositionCoords(position, expected_x, expected_y){
    expect(position.x).toBe(expected_x);
    expect(position.y).toBe(expected_y);
}