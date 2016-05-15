require! {
  'chalk' : {red, green, grey}
  'diff'
}


log-differences = (differences, {console, process} = {console, process}) ->
  console.log red '\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
  console.log red 'Mismatching data!\n'
  for part in differences
    process.stdout.write get-color(part)(part.value)
  console.log red '\n\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n'


get-color = (part) ->
  | part.added    =>  green
  | part.removed  =>  red
  | otherwise     =>  grey


module.exports = (actual, expected, output, done) ->
  | !actual    =>  throw new Error "JsDiffConsole: parameter 2 is falsy"
  | !expected  =>  throw new Error "JsDiffConsole: parameter 1 is falsy"
  | !done      =>  done = output ; output = undefined
  differences = diff.diffJson expected, actual
  if differences.length is 1
   done!
  else
    log-differences differences, output
    done 'mismatching records'
