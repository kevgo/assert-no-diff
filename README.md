# AssertNoDiff

> Asserts the equality of JavaScript strings and objects with human-friendly,
> Bash-colored diffs as error messages.

![test status](https://github.com/kevgo/assert-no-diff/actions/workflows/tests.yml/badge.svg)
[![Code Coverage](https://coveralls.io/repos/github/kevgo/assert-no-diff/badge.svg?branch=main)](https://coveralls.io/github/kevgo/assert-no-diff?branch=main)
[![install size](https://packagephobia.now.sh/badge?p=assert-no-diff)](https://packagephobia.now.sh/result?assert-no-diff)

This library provides the JavaScript string and object diff methods of the
popular [diff](https://github.com/kpdecker/jsdiff) library as assertions. The
exceptions thrown by the assertions highlight the differences of the actual and
expected values with human-friendly Bash-colored messages. This is useful for
verifying the equality of larger strings or data structures in tests.

```javascript
import * as assertNoDiff from "assert-no-diff"

// Diffs two JSON objects, comparing the fields defined on each.
// The order of fields does not matter.
assertNoDiff.json(actualJson, expectedJson)

// Asserts that two blocks of text are equal, comparing character by character.
assertNoDiff.chars(actualString, expectedString)

// Diffs two blocks of text, comparing word by word.
// Whitespace is significant.
assertNoDiff.wordsWithSpace(actualString, expectedString)

// Diffs two blocks of text, comparing line by line.
// Ignores leading and trailing whitespace.
assertNoDiff.trimmedLines(actualString, expectedString)
```

You can provide a custom error message as an optional third parameter.
