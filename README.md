# JsDiff with console output

> Compares JS hashes using JsDiff and outputs the result on the console

[![CircleCI](https://circleci.com/gh/kevgo/jsdiff-console.svg?style=shield)](https://circleci.com/gh/kevgo/jsdiff-console)
[![Coverage Status](https://coveralls.io/repos/github/kevgo/jsdiff-console/badge.svg?branch=master)](https://coveralls.io/github/kevgo/jsdiff-console?branch=master)
[![Dependency Status](https://david-dm.org/kevgo/jsdiff-console.svg)](https://david-dm.org/kevgo/jsdiff-console)
[![devDependency Status](https://david-dm.org/kevgo/jsdiff-console/dev-status.svg)](https://david-dm.org/kevgo/jsdiff-console#info=devDependencies)

This is a very simple helper method for printing the differences between two
JSON or string variables to the console, for example in unit tests. It wraps the
excellent [diff](https://github.com/kpdecker/jsdiff) module.

```javascript
jsdiff = require("jsdiff-console")

// compare objects
jsdiff.json(actualJson, expectedJson)

// compare strings and highlight the differences character-by-character
jsdiff.chars(actualString, expectedString)

// compare strings and highlight the mismatching words, whitespace-sensitive
jsdiff.wordsWithSpace(actualString, expectedString)

// compare strings and highlight the mismatching lines, ignoring whitespace around them
jsdiff.trimmedLines(actualString, expectedString)
```

If the two given values are different, the `jsdiff` methods throw an error with
a console-formatted message. This will cause your test runtime to fail the
current unit test and print a nicely readable diff of your objects.

You can provide a custom error message as an optional third parameter.

## Development

- run all tests: `make test`
- update dependencies: `make update`
- see all available make commands: `make help`
- deploy a new version:
  - commit an update with new version in `package.json` on master
  - run `npm publish`
