/*

Feature: asynchronous testing

  As a developer testing my code
  I want to be able to verify complex values in async tests asynchronously
  So that jsdiff-console calls the "done" method for me automatically.

  - call "jsdiff-console actual, expected, done" to diff the given hash asynchronously

*/


require! {
  '../src/jsdiff-console' : jsdiff-console
  'chai' : {expect}
  'chalk' : {green, grey, red}
}


describe 'asynchronous testing of data', ->


  context 'matching data', (...) ->

    before-each (done) ->
      data =
        first-name: 'Jean-Luc'
        last-name: 'Picard'
      jsdiff-console data, data, (@err) ~>
        done!

    it 'calls the given callback with no error', ->
      expect(@err).to.be.undefined



  context 'mismatching data', (...) ->

    before-each (done) ->
      expected =
        first-name: 'Jean-Luc'
        last-name: 'Picard'
      actual =
        first-name: 'Captain'
        last-name: 'Picard'
      jsdiff-console actual, expected, (@err) ~>
        done!

    it 'calls the given callback with an error that includes the diff', ->
      expect(@err).to.eql "
        mismatching records:\n\n
        #{grey  '{\n'}
        #{red   '  "firstName": "Jean-Luc",\n'}
        #{green '  "firstName": "Captain",\n'}
        #{grey  '  "lastName": "Picard"\n}'}
        "
