# JsDiff with console output [![Dependency Status](https://david-dm.org/kevgo/jsdiff-console.svg)](https://david-dm.org/kevgo/jsdiff-console)

This is a very simple helper method for tests that require
diffing JSON data.
It uses the excellent [jsdiff](https://github.com/kpdecker/jsdiff) module.

Using it in your tests is super easy:

```livescript
require! 'diffjs-console'

diffjs-console actual-json, expected-json
```

You can provide an async return method as the third argument
to have your tests automatically fail if the data structures are different.

```livescript
diffjs-console actual-json, expected-json, done
```


## Development

* run tests: `spec` (you need to have `watch` running for this)

