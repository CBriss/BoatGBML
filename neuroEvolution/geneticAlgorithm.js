class GeneticAlgorithm {
  constructor(population_size, mode) {
    this.best_boat;
    this.best_boat_age = 0;
    this.dead_population = [];
    this.population_size = population_size;
    this.mode = mode;
  }

  newGeneration(boats, screen, seed_weights=null) {
    if (this.dead_population.length == 0) {
      for (var i = 0; i < this.population_size; i++) {
        boats.push(new Boat(screen, this.population_size == 1, this.mode == 'hard', seed_weights));
      }
    } else {
      this.updateBestBoat();
      let parents = this.findSuitableParents();
      for (var i = 0; i < this.population_size; i++) {
        let child = this.combineParentGenes(
          this.best_boat || parents[0],
          parents[1],
          new Boat(screen, this.population_size == 1, this.mode == 'hard', seed_weights)
        );
        child.brain.mutate();
        boats.push(child);
      }
    }
    _.forEach(this.dead_population, deadBoat => {
      deadBoat.brain.dispose();
    });
    this.dead_population = [];
    return boats;
  }

  updateBestBoat() {
    let current_gen_best = this.currentGenerationBest();
    if (this.best_boat) {
      if (
        current_gen_best.score > this.best_boat.high_score ||
        this.best_boat_age >= 3
      ) {
        this.best_boat.brain.dispose();
        this.best_boat = current_gen_best;
        this.best_boat_age = 0;
        this.dead_population.splice(
          this.dead_population.indexOf(this.best_boat),
          1
        );
      } else {
        this.best_boat_age += 1;
      }
    } else {
      this.best_boat = current_gen_best;
      this.best_boat_age = 0;
      this.dead_population.splice(
        this.dead_population.indexOf(this.best_boat),
        1
      );
    }
  }

  currentGenerationBest() {
    let winner = this.dead_population[0];
    for (var i = 0, len = this.dead_population.length; i < len; i++) {
      let individual = this.dead_population[i];
      if (individual.score >= winner.score) {
        winner = individual;
      }
    }
    return winner;
  }

  findSuitableParents() {
    let generation_best_1 = this.findBestIndividual(
      this.dead_population.slice(0, this.dead_population.length / 2)
    );
    let generation_best_2 = this.findBestIndividual(
      this.dead_population.slice(
        this.dead_population.length / 2,
        this.dead_population.length
      )
    );
    return [generation_best_1, generation_best_2];
  }

  findBestIndividual(cluster) {
    var cluster_best = cluster[0];
    let high_score = cluster_best.score;
    for (var i = 1, len = cluster.length; i < len; i++) {
      let individual = cluster[i];
      if (individual.score >= high_score) {
        cluster_best = individual;
        high_score = individual.score;
      }
    }
    return cluster_best;
  }

  sumGenerationFitness() {
    for (var i = 0, len = this.dead_population.length; i < len; i++) {
      generation_fitness += this.dead_population[i].score / 2;
    }
  }

  combineParentGenes(parent_a, parent_b, child) {
    child.brain.dispose();
    child.brain.input_weights = tf.tensor(...this.combineLayerGenes(parent_a, parent_b, child, 'input'));
    child.brain.output_weights = tf.tensor(...this.combineLayerGenes(parent_a, parent_b, child, 'output'));
    return child;
  }

  combineLayerGenes(parent_a, parent_b, child, layer){
    let parent_a_weights = parent_a.brain[layer+"_weights"].dataSync();
    let parent_b_weights = parent_b.brain[layer+"_weights"].dataSync();
    let crossover_point = Math.floor(Math.random() * parent_a_weights.length);
    let child_dna = [
      ...parent_a_weights.slice(0, crossover_point),
      ...parent_b_weights.slice(crossover_point, parent_b_weights.length)
    ];
    return [child_dna, child.brain[layer+"_weights"].shape]
  }

}
