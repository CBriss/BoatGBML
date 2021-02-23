describe('GeneticAlgorithm', () => {

  beforeEach(function() {
    screen = {};
    screen.width = () => 1000;
    screen.height = () => 1000;
    population_size = 10;
    genetic_algorithm = new GeneticAlgorithm(population_size, 'hard');
    new_generation = genetic_algorithm.newGeneration([], screen);
    bestBoat = generateBoat(100);
  });

  it('Can Start a New Generation', () => {
    expect(new_generation.length).toBe(population_size);
    expect(new_generation[0].constructor.name).toEqual("Boat");
  });

  it('Finds Best Individual in Cluster', () => {
    let best_individual = genetic_algorithm.findBestIndividual(
        [generateBoat(5), bestBoat]
    );
    expect(best_individual).toEqual(bestBoat);
  });

  it('Finds Best Parents in Each Half Of Population', () => {
    let second_best_boat = generateBoat(50);
    genetic_algorithm.dead_population = [
      bestBoat,
      generateBoat(10),
      generateBoat(20),
      generateBoat(30),
      generateBoat(40),
      second_best_boat
    ];
    expect(genetic_algorithm.findSuitableParents()).toEqual(
      [bestBoat, second_best_boat]
    );
  });
});


function generateBoat(score){
  let boat = new Boat(screen, false, true);
  boat.score = score;
  return boat;
}