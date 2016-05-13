# JsDiff with console output
> Compares JS hashes using JsDiff and outputs the result on the console

[![CircleCI](https://circleci.com/gh/kevgo/jsdiff-console.svg?style=shield)](https://circleci.com/gh/kevgo/jsdiff-console)
[![Dependency Status](https://david-dm.org/kevgo/jsdiff-console.svg)](https://david-dm.org/kevgo/jsdiff-console)
[![devDependency Status](https://david-dm.org/kevgo/jsdiff-console/dev-status.svg)](https://david-dm.org/kevgo/jsdiff-console#info=devDependencies)

This is a very simple helper method for tests that require
diffing JSON data.
It uses the excellent [jsdiff](https://github.com/kpdecker/jsdiff) module.
Using it in your tests is super easy:

```livescript
require! 'jsdiff-console'

jsdiff-console actual-json, expected-json
```

You can provide an async return method as the third argument
to have your tests automatically fail if the data structures are different.

```livescript
diffjs-console actual-json, expected-json, done
```


## Development

* __run tests:__ `spec` (you need to have `watch` running for this)
* __update dependencies:__ `update`
* __deploy a new version:__ `publish <patch|minor|major>` (deployment happens via CI and might take a few minutes)
