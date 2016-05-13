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
  'dim-console'
}


describe 'async testing of hashes', ->

  after-each ->
    dim-console.reset!


  context 'matching data', (...) ->

    before-each (done) ->
      data =
        first-name: 'Jean-Luc'
        last-name: 'Picard'
      jsdiff-console data, data, dim-console, (@err) ~>
        done!

    it 'calls the given callback with no error', ->
      expect(@err).to.be.undefined


    it 'prints no console output', ->
      expect(dim-console.output).to.equal ''



  context 'mismatching data', (...) ->

    before-each (done) ->
      expected =
        first-name: 'Jean-Luc'
        last-name: 'Picard'
      actual =
        first-name: 'Captain'
        last-name: 'Picard'
      jsdiff-console actual, expected, dim-console, (@err) ~>
        done!

    it 'calls the given callback with an error', ->
      expect(@err).to.equal 'mismatching records'


    it 'prints a diff on the console', ->
      expect(dim-console.output).to.contain 'Mismatching data!'
      expect(dim-console.output).to.contain '"firstName": "Jean-Luc"'
      expect(dim-console.output).to.contain '"firstName": "Captain"'
