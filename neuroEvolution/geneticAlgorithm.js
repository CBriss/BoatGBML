class GeneticAlgorithm {
  constructor(population_size, mode) {
    this.best_boat = null;
    this.best_boat_age = 0;
    this.best_boat_score = 0;
    this.dead_population = [];
    this.population_size = population_size;
    this.mode = mode;
  }

  firstGeneration(screen, seed_weights=null) {
    let boats = [];
    for (let i=0; i<this.population_size; i++) {
      boats.push(
        new Boat(screen, this.population_size == 1, this.mode == 'hard', seed_weights)
      );
    }
    return boats
  }

  newGeneration(screen, seed_weights=null) {
    let boats = [];
    this.updateBestBoat();
    this.dead_population.splice(this.dead_population.indexOf(this.best_boat), 1);
    let parents = this.suitableParents();
    boats.push(this.best_boat); // Always include the current best boat (for 3 gens)
    this.best_boat.score = 0;
    for (let i=1; i<this.population_size; i++) {
      let parent_2 = Math.random() < 0.9 ? parents[0] : parents[1];
      let child = NeuralNetwork.combineParentGenes(
        this.best_boat.brain,
        parent_2.brain,
        new Boat(screen, this.population_size == 1, this.mode == 'hard', seed_weights)
      );
      child.brain.mutate();
      boats.push(child);
    }
    this.clearDeadPopulation();
    return boats;
  }

  clearDeadPopulation() {
    this.dead_population = [];
  }

  updateBestBoat() {
    let current_gen_best = this.bestIndividual(this.dead_population);
    if (!this.best_boat || current_gen_best.score >= this.best_boat.score || this.best_boat_age >= 3)
      this.setBestBoat(current_gen_best);
    else
      this.best_boat_age += 1;
  }

  setBestBoat(boat) {
    if(this.best_boat == boat)
      return;

    this.best_boat = boat;
    this.best_boat_score = boat.score;
    this.best_boat_age = 0;
  }

  suitableParents() {
    let deadPopSize = this.dead_population.length;
    return [
      this.bestIndividual(
        this.dead_population.slice(0, deadPopSize / 2)
      ),
      this.bestIndividual(
        this.dead_population.slice(deadPopSize / 2, deadPopSize)
      )
    ];
  }

  bestIndividual(cluster) {
    let best = cluster[0];
    let high_score = best.score;
    let clusterSize = cluster.length;
    for (let i= 1; i<clusterSize; i++) {
      let individual = cluster[i];
      if (individual.score >= high_score) {
        best = individual;
        high_score = individual.score;
      }
    }
    return best;
  }

}
