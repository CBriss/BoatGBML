class GeneticAlgorithm {
  constructor(population_size) {
    this.population_size = population_size;
    this.best_individual = null;
    this.best_individual_age = 0;
  }

  firstGeneration(spawner, seed_brain) {
    let individuals = [];
    for (let i = 0; i < this.population_size; i++) {
      individuals.push(spawner.spawnBoat(false));
    }
    if(seed_brain) individuals[0].brain = seed_brain;
    return individuals;
  }

  newGeneration(spawner, last_generation) {
    let individuals = [];
    this.updateBestindividual(last_generation);
    let parents = GeneticAlgorithm.suitableParents(last_generation);
    for (let i = 0; i < this.population_size; i++) {
      let second_parent = Math.random() < 0.8 ? parents[0] : parents[1];
      let child = NeuralNetwork.combineParentGenes(
        this.best_individual.brain,
        second_parent.brain,
        spawner.spawnBoat()
      );
      child.brain.mutate();
      individuals.push(child);
    }
    return individuals;
  }

  updateBestindividual(last_generation) {
    let last_gen_best = GeneticAlgorithm.generationBestIndividual(last_generation);
    this.best_individual_age += 1;
    if (!this.best_individual || last_gen_best.score >= this.best_individual.score || this.best_individual_age >= 3){
      this.setBestIndividual(last_gen_best);
      last_generation.splice(last_generation.indexOf(last_gen_best), 1);
    }
  }

  setBestIndividual(individual) {
    if(this.best_individual == individual) return;

    this.best_individual = individual;
    this.best_individual_age = 1;
  }

  static suitableParents(last_generation) {
    let deadPopSize = last_generation.length;
    return [
      GeneticAlgorithm.generationBestIndividual(
        last_generation.slice(0, deadPopSize / 2)
      ),
      GeneticAlgorithm.generationBestIndividual(
        last_generation.slice(deadPopSize / 2, deadPopSize)
      )
    ];
  }

  static generationBestIndividual(generation) {
    let best = generation[0];
    let high_score = best.score;
    let generationSize = generation.length;
    for (let i = 1; i < generationSize; i++) {
      let individual = generation[i];
      if (individual.score >= high_score) {
        best = individual;
        high_score = individual.score;
      }
    }
    return best;
  }

}
