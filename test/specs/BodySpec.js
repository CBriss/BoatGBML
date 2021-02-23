describe("Body", () => {
  var width = 100;
  var height = 150;
  var body;
  starting_position = new Position(0,0);
  
  beforeEach(function() {
    body = new Body(starting_position, width, height);
      
    screen = {};
    screen.width = () => 1000;
    screen.height = () => 1000;
  });


  it("Initializes end_position Correctly", () => {
    expectPositionCoords(body.end_position, width, height);
  });

  it("Updates position Correcly", () => {
    body.update_position(50, 50, screen);
    expectPositionCoords(body.position, 50, 50);
  });

  it("Updates end_position Correcly", () => {
    body.update_position(50, 50, screen);
    expectPositionCoords(body.end_position, 50 + width, 50 + height);
  });

  describe("Body Boundries", () => {
    it("Returns correct top() value", () => {
      body.update_position(50, 100, screen);
      expect(body.top()).toBe(100);
    });

    it("Returns correct bottom() value", () => {
      body.update_position(50, 100, screen);
      expect(body.bottom()).toBe(100 + height);
    });

    it("Returns correct left() value", () => {
      body.update_position(50, 100, screen);
      expect(body.left()).toBe(50);
    });

    it("Returns correct right() value", () => {
      body.update_position(50, 100, screen);
      expect(body.right()).toBe(50 + width);
    });
  }); 
});


function expectPositionCoords(position, expected_x, expected_y){
    expect(position.x).toBe(expected_x);
    expect(position.y).toBe(expected_y);
}