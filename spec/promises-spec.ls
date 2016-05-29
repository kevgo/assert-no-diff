/*

Feature: testing with promises

  As a developer having a lot of synchronous test code
  I want to be able to utilize my test framework's ability to handle promises
  So that I don't have to deal with async callbacks unnecessarily.

  - call "jsdiff-console actual, expected" without a callback
    to receive a promise with the test result

*/


require! {
  '..' : jsdiff-console
  'chai' : {expect}
  'chalk' : {green, grey, red}
}


describe 'returning promises', ->


  context 'matching data', (...) ->

    before-each ->
      data =
        first-name: 'Jean-Luc'
        last-name: 'Picard'
      @result = jsdiff-console data, data

    it 'returns a promise', ->
      expect(@result).to.be.a 'Promise'

    it 'the promise fulfills', (done) ->
      @result.then done


  context 'mismatching data', (...) ->

    before-each !->
      expected =
        first-name: 'Jean-Luc'
        last-name: 'Picard'
      actual =
        first-name: 'Captain'
        last-name: 'Picard'
      @result = jsdiff-console actual, expected

    it 'returns a promise', ->
      expect(@result).to.be.a 'Promise'


    it 'the promise rejects', (done) ->
      @result.catch (err) ->
        expect(err).to.equal "
          mismatching records:\n\n
          #{grey  '{\n'}
          #{red   '  "firstName": "Jean-Luc",\n'}
          #{green '  "firstName": "Captain",\n'}
          #{grey  '  "lastName": "Picard"\n}'}
          "
        done!
