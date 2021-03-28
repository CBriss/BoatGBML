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
    this.activation_function = ActivationFunctions.get_function(activation_function);

    this.neurons = this.initNeurons(new Array(this.layerCount));
    this.biases = this.initBiases(new Array(this.layerCount));
    this.weights = this.initWeights([[[]]]);
  }


  initNeurons(neurons) {
    for(let layer = 0; layer < this.layerCount; layer++){
      let layer_size = this.network_shape[layer];
      neurons[layer] = new Array(layer_size);
    }
    return neurons;
  }

  initBiases(biases) {
    for(let layer = 0; layer < this.layerCount; layer++){
      let layer_size = this.network_shape[layer];
      biases[layer] = new Array(layer_size);
      for (let neuron = 0; neuron < layer_size; neuron++) {
        biases[layer][neuron] = Math.random() - 0.5;
      }
    }
    return biases;
  }

  // Weights will be [layer][fromNeuron][to next layer Neuron]
  initWeights(weights) {
    // For each non-input layer
    for(let layer = 0; layer < this.layerCount - 1; layer++){
      let layer_size = this.network_shape[layer];
      weights[layer] = new Array(layer_size);
      
      // For each neuron in layer
      for (let neuron = 0; neuron < layer_size; neuron++) {
        let next_layer_size = this.network_shape[layer+1];
        weights[layer][neuron] = new Array(next_layer_size);
        
        // For each neuron in next layer
        for (let next_neuron = 0; next_neuron < next_layer_size; next_neuron++) {
          weights[layer][neuron][next_neuron] = Math.random() - 0.5;
        }
      }
    }
    return weights;
  }

  static newBrainFromJson(json_input) {
    let new_brain = new NeuralNetwork(json_input['shape'], json_input['activation']);
    new_brain.biases = [...json_input['biases']];
    new_brain.weights = [...json_input['weights']];
    return new_brain;
  }

  outputAsJson() {
    return {
      shape: JSON.parse(JSON.stringify(this.network_shape)),
      weights: JSON.parse(JSON.stringify(this.weights)),
      biases: JSON.parse(JSON.stringify(this.biases)),
      activation: this.activation_function.name
    }
  }

  predict(user_input) {
    this.setInputNeurons(user_input);
    // For each non-input layer
    for (let layer = 1; layer < this.network_shape.length; layer++) {
      
      // for each neuron in layer
      for (let neuron = 0; neuron < this.neurons[layer].length; neuron++) {
        let neuron_input = 0.0;
        
        // For each neurin in previous layer
        for (let prev_neuron = 0; prev_neuron < this.neurons[layer - 1].length; prev_neuron++) {
          neuron_input += this.weights[layer - 1][prev_neuron][neuron] * this.neurons[layer - 1][prev_neuron];
        }
        neuron_input += this.biases[layer][neuron];
        this.neurons[layer][neuron] = this.activation_function(neuron_input);
      
      }
    
    }
    return this.neurons[this.network_shape.length -1];
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
    if (Math.random(1) < (0.01)) {
      let value = (gaussianRandom() - 0.5) * 2;
      return weight + value;
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
