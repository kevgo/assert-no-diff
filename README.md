# JsDiff with console output

> Compares JS hashes using JsDiff and outputs the result on the console

[![CircleCI](https://circleci.com/gh/kevgo/jsdiff-console.svg?style=shield)](https://circleci.com/gh/kevgo/jsdiff-console)
[![Coverage Status](https://coveralls.io/repos/github/kevgo/jsdiff-console/badge.svg?branch=master)](https://coveralls.io/github/kevgo/jsdiff-console?branch=master)
[![Dependency Status](https://david-dm.org/kevgo/jsdiff-console.svg)](https://david-dm.org/kevgo/jsdiff-console)
[![devDependency Status](https://david-dm.org/kevgo/jsdiff-console/dev-status.svg)](https://david-dm.org/kevgo/jsdiff-console#info=devDependencies)

This is a very simple helper method for tests that require
diffing JSON data.
It uses the excellent [jsdiff](https://github.com/kpdecker/jsdiff) module.
Using it in your tests is super easy:

```javascript
diff = require("jsdiff-console")

diff(actualJson, expectedJson) // throws on mismatch
diff(actualJson, expectedJson, done) // calls done when done comparing, with error
```

## Development

- run tests: `spec` (you need to have `watch` running for this)
- update dependencies: `update`
- deploy a new version: `publish <patch|minor|major>` (deployment happens via CI and might take a few minutes)
