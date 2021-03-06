describe('GeneticAlgorithm', () => {

  beforeEach(function() {
    screen = {};
    screen.width = () => 1000;
    screen.height = () => 1000;
    population_size = 10;
    genetic_algorithm = new GeneticAlgorithm(population_size, 'hard');
    new_generation = genetic_algorithm.firstGeneration(screen);
    best_boat = newBoatWithScore(100);
  });

  it('Can Start a New Generation', () => {
    expect(new_generation.length).toBe(population_size);
    expect(new_generation[0].constructor.name).toEqual("Boat");
  });

  it('Finds Best Individual in Cluster', () => {
    let best_individual = genetic_algorithm.bestIndividual(
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

  it('Finds Best Parents in Each Half Of Population', () => {
    let second_best_boat = newBoatWithScore(50);
    genetic_algorithm.dead_population = [
      best_boat,
      newBoatWithScore(10),
      newBoatWithScore(20),
      newBoatWithScore(30),
      newBoatWithScore(40),
      second_best_boat
    ];
    expect(genetic_algorithm.suitableParents()).toEqual(
      [best_boat, second_best_boat]
    );
  });


});


function newBoatWithScore(score){
  let boat = new Boat(screen, false, true);
  boat.score = score;
  return boat;
}