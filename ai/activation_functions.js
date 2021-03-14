class ActivationFunctions {

  static get_function(desired_function) {
    if(desired_function.name)
      return desired_function;

    switch(desired_function) {
      case "relu":
        return this.reLu;
      case "leakyrelu":
        return this.leakyReLu;
      case "sigmoid":
        return this.sigmoid;
      default:
        return this.sigmoid;
    }
  }
  
  static relu(input) {
    Math.max(input, 0);
  }
  
  static leakyRelu(input) {
    if(input <= 0)
      return 0.01 * input;
    else 
      return input;
  }
  
  static sigmoid(input){
    return (1.0 / (1.0 + Math.exp(-input)));
  }
}