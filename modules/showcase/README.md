# es6-module-boilerplate-browser
This Boilerplate helps to create bundled and tested, es6-transpiled front-end modules for the Browser.

## Features
- bundled using browserify
- es6 with babelify transform (includes sourcemaps for development)
- unit testing, using your browser, mocha & chai
- in-browser coverage information powered by Blanket.JS
- includes hbsfy transform to pre-compile Handlebars templates and allow just requiring them

## Batteries included
- sinon for API endpoint mocking etc.
- jQuery
- Underscore
- Backbone
- Marionette

## How to get started
```sh
$ git clone https://github.com/elgubenis/es6-module-boilerplate-browser
$ cd es6-module-boilerplate-browser/
$ npm install
$ gulp
```
To start developing, modify the source in src/ or modify the tests in test/spec/ and your browser should
reload automatically and run the tests and show coverage information. When the coverage is 90%, minified and
original distribution files are getting created in the dist/ folder.

## FAQ
How can I add more specs?
```sh
Create another .js file in the test/spec folder and require it on the
bottom of the server/index.html file.
```
How do distribution files getting created?
```sh
After every mocha run in your browser, the blanket.js coverage percentage is
being parsed and when the coverage is over 89%, only then the gulp build task
will get started. That task creates a minified and an original version
of the bundled src/index.js script and moves it to the the dist/ folder/.

Ready for publish!
```
Where can I configure the coverage and failure thresholds, so my module gets built even if it doesnt comply with the recommended settings? (90% coverage, 0 failures)
```sh
You can change these settings in the gulpfile.js (gulp restart required)
const LOWEST_BUILD_THRESHOLD = 90; // default, this is the % of coverage needed for building
const LOWEST_BUILD_FAILURES = 0; // default, this is the number of failures allowed for building
```

What are the benefits from running unit tests in a Browser?
```sh
Doing unit tests with JSDom or PhantomJS overcomplicates things alot, you'd
also have to take care of more files and code to get up and running.

By opening tests in a real Browser though, you can just pretend you are
someone who wants to use the module and implement it just like documented.

And finally, you can use the same Browser to evaluate your front-end
modules visual aspects directly while developing, without having an extra step for that.
```