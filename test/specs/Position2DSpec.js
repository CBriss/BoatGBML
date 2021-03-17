describe("Position2D", () => {

    beforeEach(() => {
        position = new Position2D();
    });
    
    it("Defaults to 0,0", () => {
        expectPositionCoords(position, 0, 0);
    });

    it("Updates x and y values correctly", () => {
        position.update(50,50);
        expectPositionCoords(position, 50, 50);
    });

    it('Returns coordinates', () => {
        position.update(525,50);
        expect(position.coordinates()).toEqual([525,50]);
    });

    it('Knows when it is in between two points on the x axis', () => {
        expect(position.isBetweenValues(0, 10, 'x')).toBe(true);
        expect(position.isBetweenValues(-10, -1, 'x')).toBe(false);
    });

    it('Knows when it is in between two points on the y axis', () => {
        expect(position.isBetweenValues(0, 10, 'y')).toBe(true);
        expect(position.isBetweenValues(-10, -1, 'y')).toBe(false);
    });
 
});

function expectPositionCoords(position, expected_x, expected_y){
    expect(position.x).toBe(expected_x);
    expect(position.y).toBe(expected_y);
}