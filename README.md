# JsDiff with console output
> Compares JS hashes using JsDiff and outputs the result on the console

[![CircleCI](https://circleci.com/gh/kevgo/jsdiff-console.svg?style=shield)](https://circleci.com/gh/kevgo/jsdiff-console)
[![Dependency Status](https://david-dm.org/kevgo/jsdiff-console.svg)](https://david-dm.org/kevgo/jsdiff-console)
[![devDependency Status](https://david-dm.org/kevgo/jsdiff-console/dev-status.svg)](https://david-dm.org/kevgo/jsdiff-console#info=devDependencies)

This is a very simple helper method for tests that require
diffing JSON data.
It uses the excellent [jsdiff](https://github.com/kpdecker/jsdiff) module.
Using it in your tests is super easy:

```javascript
diffjsConsole(actual-json, expected-json, done);
```

The third argument is the asynchronous return method for your tests.
JsDiff-Console will call it with the error message,
formatted with console colors.
Your test runner must print it to the user.


## Development

* __run tests:__ `spec` (you need to have `watch` running for this)
* __update dependencies:__ `update`
* __deploy a new version:__ `publish <patch|minor|major>` (deployment happens via CI and might take a few minutes)
