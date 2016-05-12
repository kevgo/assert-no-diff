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
}


describe 'async testing of hashes', ->


  context 'matching data', (...) ->

    it 'calls the given callback with no error', (done) ->
      data =
        first-name: 'Jean-Luc'
        last-name: 'Picard'
      jsdiff-console data, data, (err) ->
        expect(err).to.be.undefined
        done!
