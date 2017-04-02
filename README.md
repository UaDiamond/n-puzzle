# [N Puzzle][n-puzzle]


### About game

The N-puzzle (also known as Gem Puzzle, Boss Puzzle, Game of Fifteen, Mystic Square and many others) is a sliding puzzle that consists of a frame of numbered square tiles in random order with one tile missing.

> **The object** of the puzzle is to place the tiles in order by making sliding moves that use the empty space.


### Installation

N Puzzle requires [Node.js][node-js] and [npm] to run.

Go to app folder, install the dependencies and start the server:

```sh
$ cd n-puzzle
$ npm install
$ npm start
```

That's it! Now you can open your favourite browser, go to the http://localhost:3000 and try the app.


#### Development

Want to play around with the app? Great!

N Puzzle uses [Webpack] for fast developing. Make a change in any file and immediately see your updates!

Open your Terminal and run these commands (go to app folder and run webpack in development mode):

```sh
$ cd n-puzzle
$ npm run dev
```

From this point Webpack will keep track of all changes and automatically rebuild sources when it's needed, so all that you need just to reload page in browser. Incredible, isn't it?


#### Testing

You might also run the tests to see if everything is working as expected: simply execute the following command in Terminal:

```sh
$ npm test
```

#### Deployment

Current version of app (content of "/public" folder) already built for using in production, but if you for some reason want to rebuild it, go ahead and just run following line in Terminal, so you will have your own production version of N Puzzle:

```sh
$ npm run build
```


#### N Puzzle built using a number of awesome open source libraries and tools:

* [Foundation] - The most advanced responsive front-end framework in the world
* [React] - A JavaScript library for building user interfaces
* [Redux] - Predictable state container for JavaScript apps
* [Webpack] - JavaScript module bundler
* [jQuery] - JavaScript library for simplifying the client-side scripting of HTML
* [Karma] - Spectacular Test Runner for JavaScript
* [Mocha] - Simple, flexible, fun JavaScript test framework for node.js and the browser
* [Expect] - JavaScript assertion library
* [Express] - Fast node.js network app framework


### Author

**Oleksandr Baletskyi** - *Initial work* - [GitHub][github-acc] | [Personal website][website]


### License

This project is licensed under the MIT License


[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen.)

[react]: <https://facebook.github.io/react>
[redux]: <http://redux.js.org>
[foundation]: <http://foundation.zurb.com>
[jquery]: <http://jquery.com>
[node-js]: <https://nodejs.org>
[npm]: <https://www.npmjs.com>
[karma]: <https://karma-runner.github.io>
[mocha]: <https://mochajs.org>
[expect]: <https://github.com/mjackson/expect>
[express]: <http://expressjs.com>
[webpack]: <https://webpack.js.org>
[n-puzzle]: <https://n-puzzle.baletskyi.me>
[github-acc]: <https://github.com/UaDiamond>
[website]: <https://baletskyi.me>