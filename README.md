# JsDiff with console output

> Compares JS hashes using JsDiff and outputs the result on the console

[![CircleCI](https://circleci.com/gh/kevgo/jsdiff-console.svg?style=shield)](https://circleci.com/gh/kevgo/jsdiff-console)
[![Coverage Status](https://coveralls.io/repos/github/kevgo/jsdiff-console/badge.svg?branch=master)](https://coveralls.io/github/kevgo/jsdiff-console?branch=master)
[![Dependency Status](https://david-dm.org/kevgo/jsdiff-console.svg)](https://david-dm.org/kevgo/jsdiff-console)
[![devDependency Status](https://david-dm.org/kevgo/jsdiff-console/dev-status.svg)](https://david-dm.org/kevgo/jsdiff-console#info=devDependencies)

This is a very simple helper method for printing the differences
between two JSON or string variables to the console,
for example in unit tests.
It wraps the excellent [diff](https://github.com/kpdecker/jsdiff) module.

```javascript
jsdiff = require("jsdiff-console")
jsdiff.sync(actualJson, expectedJson)
```

If the two given values are different, `jsdiff.sync` throws an error
with a console-formatted message.
Your unit tests will fail with this error,
causing your test runtime to fail the test and print the nicely readable diff of your objects.

## Development

- run all tests: `make test`
- update dependencies: `make update`
- see all available make commands: `make help`
- deploy a new version:
  - commit an update with new version in `package.json` on master
  - run `npm publish`
