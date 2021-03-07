const outputMap = {
  0: 'left',
  1: 'right',
  2: 'up',
  3: 'down'
};

class NeuralNetwork {
  constructor(input_nodes, hidden_nodes, output_nodes, preset_weights) {
    this.input_nodes = input_nodes;
    this.hidden_nodes = hidden_nodes;
    this.output_nodes = output_nodes;
    this.initializeWeights(preset_weights);
  }


  initializeWeights(preset_weights) {
    if(preset_weights){
      this.input_weights = tf.tensor(preset_weights[0]);
      this.output_weights = tf.tensor(preset_weights[1]);
    }
    else{
      this.input_weights = tf.randomNormal([this.input_nodes, this.hidden_nodes]);
      this.output_weights = tf.randomNormal([
        this.hidden_nodes,
        this.output_nodes
      ]);
    }
  }

  predict(user_input) {
    let output;
    tf.tidy(() => {
      let input_layer = tf.tensor(user_input, [1, this.input_nodes]);
      let hidden_layer = input_layer.matMul(this.input_weights).logSigmoid();
      let output_layer = hidden_layer.matMul(this.output_weights).logSigmoid();
      output = output_layer.softmax().dataSync();
    });
    return output;
  }

  clone() {
    let clonie = new NeuralNetwork(
      this.input_nodes,
      this.hidden_nodes,
      this.output_nodes
    );
    clonie.dispose();
    clonie.input_weights = tf.clone(this.input_weights);
    clonie.output_weights = tf.clone(this.output_weights);
    return clonie;
  }

  dispose() {
    this.input_weights.dispose();
    this.output_weights.dispose();
  }

  mutate() {
    function mutateWeight(weight) {
      if (Math.random(1) < (0.03)) {
        return weight + randn_bm() * 0.2;
      }
      return weight;
    }

    let input_weights = this.input_weights.dataSync().map(mutateWeight);
    let input_shape = this.input_weights.shape;
    this.input_weights.dispose();
    this.input_weights = tf.tensor(input_weights, input_shape);

    let output_weights = this.output_weights.dataSync().map(mutateWeight);
    let output_shape = this.output_weights.shape;
    this.output_weights.dispose();
    this.output_weights = tf.tensor(output_weights, output_shape);
  }

  static combineParentGenes(parent_a, parent_b, child) {
    child.brain.dispose();
    child.brain.input_weights = tf.tensor(...NeuralNetwork.combineLayerGenes(parent_a, parent_b, child, 'input'));
    child.brain.output_weights = tf.tensor(...NeuralNetwork.combineLayerGenes(parent_a, parent_b, child, 'output'));
    return child;
  }

  static combineLayerGenes(parent_a, parent_b, child, layer){
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
