/*

Feature: asynchronous testing of hashes

  As a developer dealing with hashes produced by my code
  I want to be able to diff them against expected values asynchronously in my tests
  So that verifying them in my asynchronous tests is easy and natural.

  - call "jsdiff-console actual, expected, done" to diff the given hash asynchronously

*/


require! {
  '..' : jsdiff-console
  'chai' : {expect}
  'chalk' : {green, grey, red}
}


describe 'async testing of hashes', ->


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
