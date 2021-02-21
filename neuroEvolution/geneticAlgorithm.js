class GeneticAlgorithm {
  constructor(populationSize, mode) {
    this.bestBoat;
    this.bestBoatAge = 0;
    this.deadPopulation = [];
    this.populationSize = populationSize;
    this.mode = mode;
    this.goalScore = 5000;
  }

  newGeneration(boats, context, seed_weights=null) {
    if (this.deadPopulation.length == 0) {
      for (var i = 0; i < this.populationSize; i++) {
        boats.push(new Boat(context, this.populationSize == 1, this.mode == 'hard', seed_weights));
      }
    } else {
      this.updateBestBoat();
      let parents = this.findSuitableParents();
      for (var i = 0; i < this.populationSize; i++) {
        let child = this.combineParentGenes(
          this.bestBoat || parents[0],
          parents[1],
          new Boat(context, this.populationSize == 1, this.mode == 'hard', seed_weights)
        );
        child.brain.mutate(this.bestBoat.score * 0.0/this.goalScore);
        boats.push(child);
      }
    }
    _.forEach(this.deadPopulation, deadBoat => {
      deadBoat.brain.dispose();
    });
    this.deadPopulation = [];
    return boats;
  }

  update() {
    this.find_high_score();
  }

  updateBestBoat() {
    let currentGenBest = this.currentGenerationBestBoat();
    if (this.bestBoat) {
      if (
        currentGenBest.score > this.bestBoat.highScore ||
        this.bestBoatAge >= 3
      ) {
        this.bestBoat.brain.dispose();
        this.bestBoat = currentGenBest;
        this.bestBoatAge = 0;
        this.deadPopulation.splice(
          this.deadPopulation.indexOf(this.bestBoat),
          1
        );
      } else {
        this.bestBoatAge += 1;
      }
    } else {
      this.bestBoat = currentGenBest;
      this.bestBoatAge = 0;
      this.deadPopulation.splice(
        this.deadPopulation.indexOf(this.bestBoat),
        1
      );
    }
  }

  currentGenerationBestBoat() {
    let winnerBoat = this.deadPopulation[0];
    for (var i = 0, len = this.deadPopulation.length; i < len; i++) {
      let boat = this.deadPopulation[i];
      if (boat.score >= winnerBoat.score) {
        winnerBoat = boat;
      }
    }
    return winnerBoat;
  }

  findSuitableParents() {
    // let generationFitness = sumGenerationFitness(this.deadPopulation);
    let generationBest1 = this.findBestIndividual(
      this.deadPopulation.slice(0, this.deadPopulation.length / 2)
    );
    let generationBest2 = this.findBestIndividual(
      this.deadPopulation.slice(
        this.deadPopulation.length / 2,
        this.deadPopulation.length
      )
    );
    return [generationBest1, generationBest2];
  }

  findBestIndividual(cluster) {
    var clusterBest = cluster[0];
    let clusterHighScore = clusterBest.score;
    for (var i = 1, len = cluster.length; i < len; i++) {
      let boat = cluster[i];
      if (boat.score >= clusterHighScore) {
        clusterBest = boat;
        clusterHighScore = boat.score;
      }
    }
    return clusterBest;
  }

  sumGenerationFitness() {
    // let generationFitness = 0;
    for (var i = 0, len = this.deadPopulation.length; i < len; i++) {
      generationFitness += this.deadPopulation[i].score / 2;
    }
  }

  combineParentGenes(parentA, parentB, child) {
    let parentA_input_layer = parentA.brain.input_weights.dataSync();
    let parentA_output_layer = parentA.brain.output_weights.dataSync();
    let parentB_input_layer = parentB.brain.input_weights.dataSync();
    let parentB_output_layer = parentB.brain.output_weights.dataSync();

    let crossoverPoint = Math.floor(
      Math.random() * parentA_input_layer.length -
        parentA_input_layer.length / 2
    );
    let child_in_dna = [
      ...parentA_input_layer.slice(0, crossoverPoint),
      ...parentB_input_layer.slice(crossoverPoint, parentB_input_layer.length)
    ];
    let child_out_dna = [
      ...parentA_output_layer.slice(0, crossoverPoint),
      ...parentB_output_layer.slice(crossoverPoint, parentB_output_layer.length)
    ];

    let input_shape = child.brain.input_weights.shape;
    let output_shape = child.brain.output_weights.shape;
    child.brain.dispose();
    child.brain.input_weights = tf.tensor(child_in_dna, input_shape);
    child.brain.output_weights = tf.tensor(child_out_dna, output_shape);
    return child;
  }
}
