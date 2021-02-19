describe("Position", () => {
    
    it("Defaults to 0,0", () => {
        var position = new Position();

        expect(position.x).toBe(0);
        expect(position.y).toBe(0);
    });

    it("Updates x and y values correctly", () => {
        var position = new Position(100,100);
        position.update(50,50);
    
        expect(position.x).toBe(50);
        expect(position.y).toBe(50);
    });
    
});