require! {
  'chalk' : {red, green, grey}
  'diff'
}


log-differences = (differences) ->
  console.log red '\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
  console.log red 'Mismatching data!\n'
  for part in differences
    color = switch
    | part.added    =>  green
    | part.removed  =>  red
    | otherwise     =>  grey
    process.stdout.write color part.value
  console.log red '\n\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n'



module.exports = (actual, expected, done) ->
  | !actual    =>  throw new Error "JsDiffConsole: parameter 2 is falsy"
  | !expected  =>  throw new Error "JsDiffConsole: parameter 1 is falsy"
  differences = diff.diffJson expected, actual
  if differences.length is 1
   done!
  else
    log-differences differences
    done 'mismatching records'
