# smart-boats
Smart Boats is a pure Javascript (aside from Lodash and Jasmine) canvas game built by Chris Brisson in an attemp to explore the world of Javascript, HTML Canvas, and Genetic Algorithms. Some of the coding methodologies explored are:

* Unit Testing: Jasmine was used to build unit tests around the game "engine" as well as the AI components. This allows the developer to explore improvements, refactors, and even completely new features while ensuring that each unit being tested will remain intact and functional.
* Simple Neural Network: Though the project initially used TensorFlow.js, the library proved to be overkill and affect performance. As such, a simple fully connected neural network class was built to replace tensorflow. Performance was magnitudes better after the implementation.
* Game "engine": Without the use of external tools, a framework needed to be set up to allow an HTML canvas to behave like a game. So a very simply engine was built with classes such as `Input`, `GameComponent`, and `Position`. The system also handles collision detection.
* Genetic Algorithm: Though the end goal is to eventually build a more robust strategy such as NEAT, the current technique is use to teach the boats is a genetic algorithm with simple crossover and parent selection.

## Title/Line Break
