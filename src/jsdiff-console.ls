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
  | !actual    =>  throw new Error "JsDiffConsole: parameter 2 is falsy"
  | !expected  =>  throw new Error "JsDiffConsole: parameter 1 is falsy"
  | !done      =>  done = output ; output = undefined
  differences = diff.diffJson expected, actual
  if differences.length is 1
   done!
  else
    done "mismatching records:\n\n#{render-differences differences}"
