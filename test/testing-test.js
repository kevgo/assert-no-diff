// Note: this test needs to be a JS file
//       so that we can call jsdiff.sync with the wrong number of arguments

const jsdiff = require("../src/jsdiff-console")
const { expect } = require("chai")
const chalk = require("chalk")

describe("jsdiff.sync", function() {
  it("returns normally for matching data", function() {
    const data = {
      firstName: "Jean-Luc",
      lastName: "Picard"
    }
    jsdiff.sync(data, data)
  })

  it("throws with the console-formatted diff for mismatching data", function() {
    const expected = {
      firstName: "Jean-Luc",
      lastName: "Picard"
    }
    const actual = {
      firstName: "Captain",
      lastName: "Picard"
    }
    try {
      jsdiff.sync(actual, expected)
    } catch (e) {
      // NOTE: the newlines are parts of the diff string,
      //       don't extract them into the string template
      expect(e.message).to.eql(`mismatching records:\n
${chalk.grey("{\n")}\
${chalk.red('  "firstName": "Jean-Luc",\n')}\
${chalk.green('  "firstName": "Captain",\n')}\
${chalk.grey('  "lastName": "Picard"\n}')}`)
    }
  })

  it("throws with an error message when forgetting the expected value", function() {
    expect(function() {
      jsdiff.sync("foo")
    }).to.throw("expected value not provided")
  })

  it("throws with an error message when forgetting the actual value", function() {
    expect(function() {
      jsdiff.sync()
    }).to.throw("actual value not provided")
  })
})
