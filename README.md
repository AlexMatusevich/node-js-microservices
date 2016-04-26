# Micro-Services Architecture using Node JS and Seneca

## Setup Guide
- Install Node JS
- Install Git
- Install NPM packages: ````npm install````
- Install TypeScript: ````npm install typescript -g````
- Install TSD: ````npm install tsd -g````
- Install TSD packages: ````tsd install````
- Compile TypeScript files: ````tsc````
- Run the Application: ````node app.js````

## [Seneca](http://senecajs.org/) Description
Seneca is a microservices toolkit for Node.js. It provides plugins that look after the foundations of your app.
This leaves you free to focus on the real, business code. No need to worry about which database to use,
how to structure your components, or how to manage dependencies. Just start coding.

## Notes
- [TSD](https://github.com/DefinitelyTyped/tsd) is deprecated, [Typings](https://github.com/typings/typings) should've been used instead.
- [Public](https://github.com/AlexMatusevich/node-js-microservices/tree/master/public) folder is UI representation code that was written quickly and looks ugly.
- [Seneca](http://senecajs.org/) has no TypeScript definition, but it's supposed to be done soon. [See for more details](https://github.com/senecajs/seneca/issues/159).

## Things to be Implemented or Improved:
- Error Handling
- Logging
- Validation
- Data Models
- Promises. Seneca is a callback-based toolkit, but it's pretty easy to use it with promises. [See for more details](http://senecajs.org/tutorials/seneca-with-promises.html).
- Tests: Mocha. It's pretty easy to implement a few test using Mocha.