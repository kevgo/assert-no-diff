/*

Feature: synchronous testing

  As a developer testing my code
  I want to be able to verify complex values synchronously
  So that I can keep my tests simple and synchronous if possible.

  - call "jsdiff-console actual, expected" to diff the given hash synchronously

*/


require! {
  '../src/jsdiff-console' : jsdiff-console
  'chai' : {expect}
  'chalk' : {green, grey, red}
}


describe 'synchronous testing of data', ->

  context 'matching data', (...) ->

    it 'does not throw an exception', ->
      data =
        first-name: 'Jean-Luc'
        last-name: 'Picard'
      jsdiff-console data, data


  context 'mismatching data', (...) ->

    before-each ->
      expected =
        first-name: 'Jean-Luc'
        last-name: 'Picard'
      actual =
        first-name: 'Captain'
        last-name: 'Picard'
      try
        jsdiff-console actual, expected
      catch
        @exception = e

    it 'throws an exception', ->
      expect(@exception).to.exist

    it 'provides the diff in the exception message', ->
      expect(@exception.message).to.eql "
        Error: mismatching records:\n\n
        #{grey  '{\n'}
        #{red   '  "firstName": "Jean-Luc",\n'}
        #{green '  "firstName": "Captain",\n'}
        #{grey  '  "lastName": "Picard"\n}'}
        "
