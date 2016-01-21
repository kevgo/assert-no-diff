# JsDiff with console output

This is a very simple helper method for tests that involve
diffing JSON data.

Using it in your tests is super easy:

```livescript
diff-json actual-json, expected-json
```

You can provide an async return method as the third argument
to have your tests automatically fail if the data structures are different.

```livescript
diff-json actual-json, expected-json, done
```
