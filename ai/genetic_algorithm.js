class GeneticAlgorithm {
  constructor(population_size, spawner) {
    this.best_individual = null;
    this.best_individual_age = 0;
    this.best_individual_score = 0;
    this.dead_population = [];
    this.population_size = population_size;
    this.spawner = spawner;
    this.generation_count = 0;
  }

  firstGeneration(seed_brain) {
    let individuals = [];
    for (let i=0; i<this.population_size; i++) {
      individuals.push(this.spawner.spawnBoat(false));
    }

    if(seed_brain)
      individuals[0].brain = seed_brain;

    this.generation_count++;
    return individuals
  }

  newGeneration() {
    let individuals = [];
    this.updateBestindividual();
    this.dead_population.splice(this.dead_population.indexOf(this.best_individual), 1);
    let parents = this.suitableParents();
    individuals.push(this.best_individual);
    this.best_individual.score = 0;
    for (let i=1; i<this.population_size; i++) {
      let second_parent = Math.random() < 0.8 ? parents[0] : parents[1];
      let child = NeuralNetwork.combineParentGenes(
        this.best_individual.brain,
        second_parent.brain,
        this.spawner.spawnBoat(false)
      );
      child.brain.mutate();
      individuals.push(child);
    }
    this.clearDeadPopulation();
    this.generation_count++;
    return individuals;
  }

  clearDeadPopulation() {
    this.dead_population = [];
  }

  updateBestindividual() {
    let current_gen_best = this.bestIndividual(this.dead_population);
    if (!this.best_individual || current_gen_best.score >= this.best_individual.score || this.best_individual_age >= 3)
      this.setBestindividual(current_gen_best);
    else
      this.best_individual_age += 1;
  }

  setBestindividual(individual) {
    if(this.best_individual == individual)
      return;

    this.best_individual = individual;
    this.best_individual_score = individual.score;
    this.best_individual_age = 0;
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
