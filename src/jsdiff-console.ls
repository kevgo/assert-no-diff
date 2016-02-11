require! {
  'chalk' : {red, green, grey}
  'diff'
}


module.exports = (expected, actual, done) ->
  | !expected  =>  throw new Error "JsDiffConsole: parameter 1 is falsy"
  | !actual    =>  throw new Error "JsDiffConsole: parameter 2 is falsy"
  changes = diff.diffJson expected, actual

  return done! if changes.length is 1

  console.log red '\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
  console.log red 'Mismatching call records!\n'
  for part in changes
    color = switch
    | part.added    =>  green
    | part.removed  =>  red
    | _             =>  grey
    process.stdout.write color part.value
  console.log red '\n\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n'
  done 'Mismatching recorded calls, see above'
