require! {
  \gulp
  \gulp-mocha
}
{instrument, hook-require, write-reports} = (require \gulp-livescript-istanbul)!


gulp.task \coverage, ->
  gulp.src 'src/*.ls'
      .pipe instrument!    # transform livescript code into instrumented javascript code
      .pipe hook-require!  # hook require and return the instrumented code instead of the original livescript code
  gulp.src './spec/*.ls'
      .pipe gulp-mocha!     # with the require hook in place we can now run any unit test suite
      .pipe write-reports!  # write the lcov coverage report to ./coverage directory
      .on \finish, -> process.exit!


