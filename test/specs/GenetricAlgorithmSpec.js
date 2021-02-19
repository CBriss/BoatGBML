describe('GeneticAlgorithm', () => {

    beforeEach(function() {
        ctx = {canvas: {width: 1000, height: 1000 }};
        populationSize = 10;
        geneticAlgorithm = new GeneticAlgorithm(populationSize, 'hard');
        newGeneration = geneticAlgorithm.newGeneration([], ctx);
    });

    it('Can Start a New Generation', () => {
        expect(newGeneration.length).toBe(populationSize);
        expect(newGeneration[0].constructor.name).toEqual("Boat");
    });

    // it('Finds the Best Boat in the Generation', () => {
    //     var expectedBestBoat = newGeneration[populationSize-1];
    //     expectedBestBoat.score = 100;


    //     geneticAlgorithm.updateBestBoat();
    //     expect(geneticAlgorithm.bestBoat).toEqual(expectedBestBoat);
    // });
});