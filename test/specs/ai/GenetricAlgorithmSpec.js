describe('GeneticAlgorithm', () => {

  beforeEach(function() {
    screen = {width: () => 1000, height: () => 1000};
    population_size = 10;
    spawner = new BoatSpawner(screen, false);
    genetic_algorithm = new GeneticAlgorithm(population_size);
    new_generation = genetic_algorithm.firstGeneration(spawner);
    best_boat = newBoatWithScore(100);
  });

  it('Can Start a New Generation', () => {
    expect(new_generation.length).toBe(population_size);
    expect(new_generation[0].constructor.name).toEqual("Boat");
  });

  it('Sets the best individual', () => {
    genetic_algorithm.setBestIndividual(best_boat);
    expect(genetic_algorithm.best_individual).toEqual(best_boat);
  });

  it('Finds the best parents in each half of the generation', () => {
    let second_best_boat = newBoatWithScore(50);
    let last_generation = [
      best_boat,
      newBoatWithScore(10),
      newBoatWithScore(20),
      newBoatWithScore(30),
      newBoatWithScore(40),
      second_best_boat
    ];
    expect(GeneticAlgorithm.suitableParents(last_generation)).toEqual(
      [best_boat, second_best_boat]
    );
  });

  it('Finds best individual in a generation', () => {
    let best_individual = GeneticAlgorithm.generationBestIndividual(
      [
        newBoatWithScore(5),
        newBoatWithScore(10),
        newBoatWithScore(50),
        newBoatWithScore(90),
        newBoatWithScore(99),
        best_boat
      ]
    );
    expect(best_individual).toEqual(best_boat);
  });
});


function newBoatWithScore(score){
  let boat = new Boat(
    new Position2D(0,0),
    50,
    100,
    'test.png',
    BodyRect2D,
    false,
    false
  );
  boat.score = score;
  return boat;
}