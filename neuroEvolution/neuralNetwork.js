const outputMap = {
  0: 'left',
  1: 'right',
  2: 'up',
  3: 'down'
};

class NeuralNetwork {
  constructor(network_shape, activation_function) {
    this.network_shape = network_shape;
    this.layerCount = network_shape.length;
    this.activation_function = activation_function;

    this.neurons = new Array(this.layerCount);
    this.initNeurons();
    this.biases = new Array(this.layerCount);
    this.initBiases();
    this.weights = [[[]]];
    this.initWeights();
  }


  initNeurons() {
    for(let layer = 0; layer < this.layerCount; layer++){
      let layer_size = this.network_shape[layer];
      this.neurons[layer] = new Array(layer_size);
    }
  }

  initBiases() {
    for(let layer = 0; layer < this.layerCount; layer++){
      let layer_size = this.network_shape[layer];
      this.biases[layer] = new Array(layer_size);
      for (let neuron = 0; neuron < layer_size; neuron++) {
        this.biases[layer][neuron] = Math.random() - 0.5;
      }
    }
  }

  // Weights will be [layer][fromNeuron][to next layer Neuron]
  initWeights() {
    // For each non-input layer
    for(let layer = 0; layer < this.layerCount - 1; layer++){
      let layer_size = this.network_shape[layer];
      this.weights[layer] = new Array(layer_size);
      
      // For each neuron in layer
      for (let neuron = 0; neuron < layer_size; neuron++) {
        let next_layer_size = this.network_shape[layer+1];
        this.weights[layer][neuron] = new Array(next_layer_size);
        
        // For each neuron in next layer
        for (let next_neuron = 0; next_neuron < next_layer_size; next_neuron++) {
          this.weights[layer][neuron][next_neuron] = Math.random() - 0.5;
        }
      }
    }
  }

  predict(user_input) {
    let output;
    this.setInputNeurons(user_input);
    // For each layer
    for (let layer = 1; layer < this.network_shape.length; layer++) {
      // for each neuron in layer
      for (let neuron = 0; neuron < this.neurons[layer].length; neuron++) {
        let neuron_input = 0.0;
        // For each neurin in previous layer
        for (let prev_neuron = 0; prev_neuron < this.neurons[layer - 1].length; prev_neuron++)
        {
          neuron_input += this.weights[layer - 1][prev_neuron][neuron] * this.neurons[layer - 1][prev_neuron];
        }
        neuron_input += this.biases[layer][neuron];
        this.neurons[layer][neuron] = this.activate(this.activation_function, neuron_input);
      } 
    }
    return this.neurons[this.network_shape.length -1];
  }

  activate(function_name, input){
    switch(function_name) {
      case "relu":
        return this.reLu(input);
      case "leakyrelu":
        return this.leakyReLu(input);
      case "sigmoid":
        return this.sigmoid(input);
      default:
        return this.sigmoid(input);
    }
  }

  relu(input) {
    Math.max(input, 0);
  }

  leakyRelu(input) {
    if(input <= 0)
      return 0.01 * input;
    else 
      return input;
  }

  sigmoid(input){
    return (1.0 / (1.0 + Math.exp(-input)));
  }

  setInputNeurons(user_input){
    let inputLength = user_input.length;
    for (let i = 0; i < inputLength; i++) {
      this.neurons[0][i] = user_input[i];
    }
  }
  
  clone() {
    let clonie = new NeuralNetwork(this.network_shape, this.activation_function);
    clonie.neurons = [...this.neurons];
    clonie.biases = [...this.biases];
    clonie.weights = [...this.weights];
    return clonie;
  }

  mutateValue(weight) {
    if (Math.random(1) < (0.05)) {
      return weight + randn_bm() * 0.5;
    }
    return weight;
  }

  mutate() {
    for (let layer = 0; layer < this.weights.length; layer++) {
      for (let neuron = 0; neuron < this.weights[layer].length; neuron++) {
        this.biases[layer][neuron] = this.mutateValue(this.biases[layer][neuron]);
        for (let dest_neuron = 0; dest_neuron < this.weights[layer][neuron].length; dest_neuron++) {
          this.weights[layer][neuron][dest_neuron] = this.mutateValue(this.weights[layer][neuron][dest_neuron]);
        }
      }
    }
  }

  static combineParentGenes(parent_a, parent_b, child) {
    child.brain.weights = NeuralNetwork.combineLayerWeights(parent_a, parent_b);
    child.brain.biases = NeuralNetwork.combineLayerBiases(parent_a, parent_b);
    return child;
  }

  static combineLayerWeights(parent_a, parent_b){
    let output_weights = new Array(parent_a.weights.length);
    for (let layer = 0; layer < parent_a.weights.length; layer++) {
      output_weights[layer] = new Array(parent_a.weights[layer].length);
      for (let neuron = 0; neuron < parent_a.weights[layer].length; neuron++) {
        output_weights[layer][neuron] = new Array(parent_a.weights[layer][neuron].length);
        let crossover_point = Math.floor(Math.random() * parent_a.weights[layer][neuron].length);
        output_weights[layer][neuron] = [
          ...parent_a.weights[layer][neuron].slice(0, crossover_point),
          ...parent_b.weights[layer][neuron].slice(crossover_point, parent_b.weights[layer][neuron].length)
        ];
      }
    }
    return output_weights;
  }

  static combineLayerBiases(parent_a, parent_b){
    let output_biases = new Array(parent_a.biases.length);
    for (let layer = 0; layer < parent_a.biases.length; layer++) {
      output_biases[layer] = new Array(parent_a.biases[layer].length);
      let crossover_point = Math.floor(Math.random() * parent_a.biases[layer].length);
        output_biases[layer] = [
          ...parent_a.biases[layer].slice(0, crossover_point),
          ...parent_b.biases[layer].slice(crossover_point, parent_b.biases[layer].length)
        ];
    }
    return output_biases;
  }
}
