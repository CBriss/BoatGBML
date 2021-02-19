describe('Person', () => {

    beforeEach(() => {
        ctx = {canvas: {width: 1000, height: 1000 }};
        person = new Person(ctx, 0, 0);
    });

    it('Initializes Correctly', () => {
        expect(person.constructor.name).toBe("Person");
		expect(person.body.constructor.name).toBe("Body");
    });

    it('Calculates Rope Length', () => {
        expect(person.ropeLength(0, 10)).toBe(140);
        expect(person.ropeLength(100, 100)).toBeLessThan(120);
    });

    it('Updates Position Correctly', () => {
        person.changePos(10000, 1000);
        expect(person.speedY).toBeGreaterThan(0);
        expect(person.speedX).toBeGreaterThan(0);
    });
    
});