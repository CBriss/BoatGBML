describe('Neural Network', () => {

    beforeEach(() => {
        shape = [4,3,2]
        brain = new NeuralNetwork(shape, 'sigmoid');
    });

    describe('Initialization', () => {
        it('Initializes Correct Shape', () => {    
            expect(brain.network_shape).toBe(shape);  
        });

        it('Inits Correct Neurons', () => {
            expect(brain.neurons.length).toBe(3);
            expect(brain.neurons[0].length).toBe(4);
        });

        it('Inits Correct Biases', () => {
            expect(brain.biases.length).toBe(3);
            expect(brain.biases[0].length).toBe(4);
        });

        it('Inits Correct Weights', () => {
            expect(brain.weights[0][0].length).toBe(3);
            expect(brain.weights[0][0][0].constructor.name).toBe("Number");
        });
    });

    it('Predicts', () => {
        let output = brain.predict([10,10,10,10]);
        expect(output.length).toBe(2);
        expect(output.constructor.name).toBe("Array");
        expect(isNaN(output[0])).toBe(false);
        expect(isNaN(output[1])).toBe(false);
    });

    it('Clones Correctly', () => {
        var cloned_network = brain.clone();
        expect(cloned_network.constructor.name).toBe("NeuralNetwork");
        expect(cloned_network.predict([10,10])).toEqual(brain.predict([10,10]));
    });

    describe('Gene Combination', () => {
        beforeEach(() => {
            screen = {};
            screen.width = () => 1000;
            screen.height = () => 1000;
            boat = new Boat(
                new Position2D(0,0),
                50,
                100,
                'test.png',
                BodyRect2D,
                false,
                true
            );
            boat.brain = new NeuralNetwork(shape, 'sigmoid');
        });

        it('Child with same boat as both parents the same without mutation', () => {
            let child = NeuralNetwork.combineParentGenes(brain, brain, boat);
            expect(child.brain.predict([10,10,10,10])).toEqual(brain.predict([10,10,10,10]));
        });
    
    
        it('Child with 2 different boats as parents different without mutation', () => {
            let child = NeuralNetwork.combineParentGenes(brain, new NeuralNetwork(shape, 'sigmoid'), boat);
            expect(child.brain.predict([10,10,10,10])).not.toEqual(brain.predict([10,10,10,10]));
        });
    });

    it('Has a chance to mutate genes', () => {
        let old_weights = [...brain.weights[0][0]];
        for(let i=0;i<20;i++)
            brain.mutate();
        expect(old_weights).not.toEqual(brain.weights[0][0]);
    });


    
});