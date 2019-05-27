class GeneticAlgorithm {
  constructor(populationSize) {
    this.highScore = 0;
    this.bestBoat;
    this.currentGenerationDead = [];
    this.populationSize = populationSize;
  }

  newGeneration(boats, context) {
    if (this.currentGenerationDead.length == 0) {
      for (var i = 0; i < this.populationSize; i++) {
        boats.push(new Boat(context, this.populationSize == 1));
      }
    } else {
      let parents = this.findSuitableParents(this.currentGenerationDead);
      for (var i = 0; i < this.populationSize; i++) {
        let child = this.combineParentGenes(
          parents[0],
          this.bestBoat || parents[1],
          new Boat(context, this.populationSize == 1)
        );
        child.mutate();
        boats.push(child);
      }
    }
    return boats;
  }

  update() {
    this.find_high_score();
  }

  find_high_score() {
    let winnerBoat;
    for (var i = 0, len = this.currentGenerationDead.length; i < len; i++) {
      let boat = this.currentGenerationDead[i];
      if (boat.score >= oldHighScore) {
        winnerBoat = boat;
      }
    }
    return winnerBoat;
  }

  findSuitableParents() {
    // let generationFitness = sumGenerationFitness(this.currentGenerationDead);
    let generationBest1 = this.findBestIndividual(
      this.currentGenerationDead.slice(0, this.currentGenerationDead.length / 2)
    );
    let generationBest2 = this.findBestIndividual(
      this.currentGenerationDead.slice(
        this.currentGenerationDead.length / 2,
        this.currentGenerationDead.length
      )
    );

    return [generationBest1, generationBest2];
  }

  findBestIndividual(cluster) {
    let highScore = 0;
    var generationBest = cluster[0];
    for (var i = 1, len = cluster.length; i < len; i++) {
      let boat = cluster[i];
      if (boat.score >= highScore) {
        generationBest = boat;
        highScore = boat.score;
      }
    }
    return generationBest;
  }

  sumGenerationFitness() {
    // let generationFitness = 0;
    for (var i = 0, len = this.currentGenerationDead.length; i < len; i++) {
      generationFitness += this.currentGenerationDead[i].score / 2;
    }
  }

  combineParentGenes(parentA, parentB, child) {
    let parentA_input_layer = parentA.brain.input_weights.dataSync();
    let parentA_output_layer = parentA.brain.output_weights.dataSync();
    let parentB_input_layer = parentB.brain.input_weights.dataSync();
    let parentB_output_layer = parentB.brain.output_weights.dataSync();

    let middle_point = Math.floor(Math.random() * parentA_input_layer.length);
    let child_in_dna = [
      ...parentA_input_layer.slice(0, middle_point),
      ...parentB_input_layer.slice(middle_point, parentB_input_layer.length)
    ];
    let child_out_dna = [
      ...parentA_output_layer.slice(0, middle_point),
      ...parentB_output_layer.slice(middle_point, parentB_output_layer.length)
    ];

    let input_shape = child.brain.input_weights.shape;
    let output_shape = child.brain.output_weights.shape;
    child.brain.dispose();
    child.brain.input_weights = tf.tensor(child_in_dna, input_shape);
    child.brain.output_weights = tf.tensor(child_out_dna, output_shape);
    return child;
  }
}
