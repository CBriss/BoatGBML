# smart-boats
Smart Boats is a pure Javascript (aside from Lodash and Jasmine) canvas game built by Chris Brisson in an attemp to explore the world of Javascript, HTML Canvas, and Genetic Algorithms. Some of the coding methodologies explored are:

Demo: http://smart-boats.herokuapp.com/

![BoatGame1]([![Image from Gyazo](https://i.gyazo.com/b3f97965b13c29f2833a525a237d5b94.gif)](https://gyazo.com/b3f97965b13c29f2833a525a237d5b94))
* Unit Testing: Jasmine was used to build unit tests around the game "engine" as well as the AI components. This allows the developer to explore improvements, refactors, and even completely new features while ensuring that each unit being tested will remain intact and functional.
* Simple Neural Network: Though the project initially used TensorFlow.js, the library proved to be overkill and affect performance. As such, a simple fully connected neural network class was built to replace tensorflow. Performance was magnitudes better after the implementation.
* Game "engine": Without the use of external tools, a framework needed to be set up to allow an HTML canvas to behave like a game. So a very simply engine was built with classes such as `Input`, `GameComponent`, and `Position`. The system also handles collision detection.
* Genetic Algorithm: Though the end goal is to eventually build a more robust strategy such as NEAT, the current technique is use to teach the boats is a genetic algorithm with simple crossover and parent selection.
* SOLID Principles: This project served as a use case for applying the SOLID principles of Clean Code's Uncle Bob. Though some of the extractions might seem like overkill for such a simple project, this methodology allows many (ideally all) of the classes to be modified by swapping their components for others to provide additional behavior. For example, the boat and obstacle components use the BodyRect2D class, but swapping those for a 3D class should provide the same functionality without having to alter the classes themselves. This essentially represents the Open/Closed principle, but also serves as a good example of the benifits probivided by following the SOLID principles.

