require! {
  'chalk' : {red, green, grey}
  'diff'
}


diff-json = (expected, actual, done) ->
  changes = diff.diffJson expected, actual
  if changes.length is 1
    done!
  else
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



module.export = diff-json
