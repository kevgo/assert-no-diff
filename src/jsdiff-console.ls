require! {
  'chalk' : {green, grey, red, reset}
  'diff'
}

render-differences = (differences) ->
  [get-color(part)(part.value) for part in differences].join ''


get-color = (part) ->
  | part.added    =>  green
  | part.removed  =>  red
  | otherwise     =>  grey


module.exports = (actual, expected, done) ->
  | !actual    =>  throw new Error "JsDiffConsole: actual value not provided"
  | !expected  =>  throw new Error "JsDiffConsole: expected value not provided"
  differences = diff.diffJson expected, actual
  if differences.length is 1
    # actual == expected
    if done
      done!
    else
      Promise.resolve!
  else
    # actual != expected
    error = "mismatching records:\n\n#{render-differences differences}"
    if done
      done error
    else
      Promise.reject error
