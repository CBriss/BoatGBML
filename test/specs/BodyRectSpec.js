describe("BodyRect", () => { 
  beforeEach(function() {
    screen = {};
    screen.width = () => 1000;
    screen.height = () => 1000;

    width = 100;
    height = 150;
    body = new BodyRect(new Position(0,0), width, height);
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

  it('Returns correct dimensions', () => {
    expect(body.dimensions()).toEqual([width, height]);
  });

  it('Detects overlapping bodies, vertically', () => {
    let other_body = new BodyRect(new Position(width/2,0), width, height);
    expect(body.isOverlappingVertical(other_body)).toBe(true);
  });
  
  it('Detects overlapping bodies, horizontally', () => {
    let other_body = new BodyRect(new Position(0, height/2), width, height);
    expect(body.isOverlappingVertical(other_body)).toBe(true);
  });
});

function expectPositionCoords(position, expected_x, expected_y){
  expect(position.x).toBe(expected_x);
  expect(position.y).toBe(expected_y);
}