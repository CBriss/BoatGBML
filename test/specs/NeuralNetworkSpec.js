describe('Neural Network', () => {

    beforeEach(() => {
        input_nodes = 2;
        output_nodes = 2;
        brain = new NeuralNetwork(input_nodes, 3, output_nodes);
    });
    
    it('Initializes Correctly', () => {    
        expect(brain.input_nodes.constructor.name).toBe("Number");
        expect(brain.input_weights.shape[0]).toBe(input_nodes);
    });

    it('Predicts', () => {
        expect(brain.predict([10,10]).length).toBe(output_nodes);
    });

    it('Clones Correctly', () => {
        var clonedNetwork = brain.clone();
        expect(clonedNetwork.constructor.name).toBe("NeuralNetwork");
        expect(clonedNetwork.predict([10,10])).toEqual(brain.predict([10,10]));
    });
});