describe('Person', () => {

    beforeEach(() => {
        ctx = {canvas: {width: 1000, height: 1000 }};
        ctx.drawImage = () => 1;
		ctx.beginPath = () => 1;
		ctx.moveTo = () => 1;
		ctx.lineTo = () => 1;
		ctx.stroke = () => 1;

        person = new Person(0, 0);
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
        expect(person.speed_y).toBeGreaterThan(0);
        expect(person.speed_x).toBeGreaterThan(0);
    });
    
});