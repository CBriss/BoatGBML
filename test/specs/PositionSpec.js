describe("Position", () => {

    beforeEach(() => {
        position = new Position();
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
    
});

function expectPositionCoords(position, expected_x, expected_y){
    expect(position.x).toBe(expected_x);
    expect(position.y).toBe(expected_y);
}