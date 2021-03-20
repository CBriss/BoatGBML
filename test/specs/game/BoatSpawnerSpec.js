describe('Boat Spawner Class', () => {
  beforeEach(() => {
    screen = {};
    screen.width = () => 1000;
    screen.height = () => 1000;

    spawner = new BoatSpawner(screen,false);
  });

  it('spawnBoat returns a boat', () => {
    expect(Boat.prototype.isPrototypeOf(spawner.spawnBoat(false))).toBe(true);
  });

  it('spawnBoat sets position if requested', () => {
    let boat_position = new Position2D(100,100);
    let new_boat = spawner.spawnBoat(false, boat_position);
    
    expect(new_boat.body.position).toEqual(boat_position);
  });

});