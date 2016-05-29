/*

Feature: missing arguments

  As a developer calling jsdiff-console wrong
  I want to be notified with a meaningful error message
  So that I don't rely on broken tests.

  - calling jsdiff-console without values throws an exception

*/


require! {
  '../src/jsdiff-console' : jsdiff-console
  'chai' : {expect}
}


describe 'calling without arguments', ->


  context 'forgetting the expected value', (...) ->

    it 'throws an exception', ->
      expect(-> jsdiff-console 'foo').to.throw 'expected value not provided'


  context 'forgetting the actual value', (...) ->

    it 'throws an exception', ->
      expect(-> jsdiff-console!).to.throw 'actual value not provided'
