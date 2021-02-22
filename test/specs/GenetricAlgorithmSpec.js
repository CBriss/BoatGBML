describe('GeneticAlgorithm', () => {

  beforeEach(function() {
    ctx = {canvas: {width: 1000, height: 1000 }};
    ctx.drawImage = () => 1;
    ctx.beginPath = () => 1;
    ctx.moveTo = () => 1;
    ctx.lineTo = () => 1;
    ctx.stroke = () => 1;
    populationSize = 10;
    geneticAlgorithm = new GeneticAlgorithm(populationSize, 'hard');
    newGeneration = geneticAlgorithm.newGeneration([], ctx);
    bestBoat = generateBoat(100);
  });

  it('Can Start a New Generation', () => {
    expect(newGeneration.length).toBe(populationSize);
    expect(newGeneration[0].constructor.name).toEqual("Boat");
  });

  it('Finds Best Individual in Cluster', () => {
    let bestIndividual = geneticAlgorithm.findBestIndividual(
        [generateBoat(5), bestBoat]
    );
    expect(bestIndividual).toEqual(bestBoat);
  });

  it('Finds Best Parents in Each Half Of Population', () => {
    let secondBestBoat = generateBoat(50);
    geneticAlgorithm.deadPopulation = [
      bestBoat,
      generateBoat(10),
      generateBoat(20),
      generateBoat(30),
      generateBoat(40),
      secondBestBoat
    ];
    expect(geneticAlgorithm.findSuitableParents()).toEqual(
      [bestBoat, secondBestBoat]
    );
  });
});


function generateBoat(score){
  let boat = new Boat(ctx, false, true);
  boat.score = score;
  return boat;
}