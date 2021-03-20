describe("GapDetector Class", () => {

  beforeEach(() => {
    body = new BodyRect2D(new Position2D(0,0), 100, 100);
    detector = new GapDetector(body);
  });

  it("Finds Nearest Obstacles", () => {
    let close_obstacle = new Obstacle(body.position.x, body.position.y - 500, 50, 50);
    let far_obstacle = new Obstacle(body.position.x, body.position.y - 1000, 50, 50);
    let nearest_obstacles = detector.find_nearest_obstacles([far_obstacle, close_obstacle])
    expect(nearest_obstacles[0]).toEqual(close_obstacle);
    expect(nearest_obstacles[1]).toEqual(far_obstacle);
  });
  
  it("Ignores passed obstacles finding nearest obstacles", () => {
    let passed_obstacle = new Obstacle(body.position.x, body.end_position.y + body.height, 50, 50);
    let nearest_obstacle = new Obstacle(body.position.x, body.position.y - body.height * 2, 50, 50);
    let nearest_obstacles = detector.find_nearest_obstacles([passed_obstacle, nearest_obstacle])
    expect(nearest_obstacles.length).toBe(1);
    expect(nearest_obstacles[0]).toEqual(nearest_obstacle);
  });
  
  it("Returns empty array if no obstacles", () => {
    expect(detector.find_nearest_obstacles([]).length).toBe(0);
  });
  
  it('Can Find the Obstacle Gap', () => {
    let {gap_left, gap_right, gap_y_pos} = detector.findObstacleGap(generateObstacleGap(100));
    expect(gap_left).toBe(100);
    expect(gap_right).toBe(200);
    expect(gap_y_pos).toBeGreaterThan(0);
  });
});