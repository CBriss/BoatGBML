function newGeneration(
  populationSize,
  boats,
  oldGeneration,
  context,
  bestBoat
) {
  if (oldGeneration.length == 0) {
    for (var i = 0; i < populationSize; i++) {
      boats.push(new Boat(context, populationSize == 1));
    }
  } else {
    let parents = findSuitableParents(oldGeneration);
    for (var i = 0; i < populationSize; i++) {
      let child = combineParentGenes(
        parents[0],
        bestBoat || parents[1],
        new Boat(context, populationSize == 1)
      );
      child.mutate();
      boats.push(child);
    }
  }
  return boats;
}

function find_high_score(oldGeneration, oldHighScore) {
  let winnerBoat;
  for (var i = 0, len = oldGeneration.length; i < len; i++) {
    let boat = oldGeneration[i];
    if (boat.score >= oldHighScore) {
      winnerBoat = boat;
    }
  }
  return winnerBoat;
}

function findSuitableParents(oldGeneration) {
  let generationFitness = sumGenerationFitness(oldGeneration);
  generationBest1 = findBestIndividual(
    oldGeneration.slice(0, oldGeneration.length / 2)
  );
  generationBest2 = findBestIndividual(
    oldGeneration.slice(oldGeneration.length / 2, oldGeneration.length)
  );

  return [generationBest1, generationBest2];
}

function findBestIndividual(cluster) {
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

function sumGenerationFitness(oldGeneration) {
  let generationFitness = 0;
  for (var i = 0, len = oldGeneration.length; i < len; i++) {
    generationFitness += oldGeneration[i].score / 2;
  }
}

function combineParentGenes(parentA, parentB, child) {
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
