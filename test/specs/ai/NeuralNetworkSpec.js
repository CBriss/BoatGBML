describe('Neural Network', () => {

    beforeEach(() => {
        shape = [4,3,2]
        brain = new NeuralNetwork(shape, 'sigmoid');
        test_input = [10,10,10,10];
    });

    describe('Initialization', () => {
        it('Initializes correct shape', () => {    
            expect(brain.network_shape).toBe(shape);  
        });

        it('Initializes correct neurons', () => {
            expect(brain.neurons.length).toBe(3);
            expect(brain.neurons[0].length).toBe(4);
        });

        it('Initializes correct biases', () => {
            expect(brain.biases.length).toBe(3);
            expect(brain.biases[0].length).toBe(4);
        });

        it('Initializes correct weights', () => {
            expect(brain.weights[0][0].length).toBe(3);
            expect(brain.weights[0][0][0]).toBeGreaterThan(-0.5);
            expect(brain.weights[0][0][0]).toBeLessThan(0.5);
        });
    });

    describe('Handles JSON I/O', () => {
        beforeEach(() => {
            json_input = brain.outputAsJson();
            new_brain = NeuralNetwork.newBrainFromJson(json_input);
        });

        it('Can recreate itself by outputting then inputting itself through JSON', () => {
            expect(new_brain).toEqual(brain);
        }); 

        it('Perfroms deep copies when generating output JSON', () => {
            brain.weights[0][1][1] = 100000000;
            expect(new_brain).not.toEqual(brain);
        });       
    });

    it('Predicts', () => {
        let output = brain.predict(test_input);
        expect(output.length).toBe(2);
        expect(output.constructor.name).toBe("Array");
        expect(isNaN(output[0])).toBe(false);
        expect(isNaN(output[1])).toBe(false);
    });

    it('Predicts deterministically', () => {
        let output = brain.predict(test_input);
        expect(output).toEqual(brain.predict(test_input));
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
        for(let i=0;i<200;i++)
            brain.mutate();
        expect(old_weights).not.toEqual(brain.weights[0][0]);
    });


    
});