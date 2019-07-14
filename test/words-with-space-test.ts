import * as jsdiff from "../src"
import assert from "assert"
import chalk from "chalk"
import stripAnsi from "strip-ansi"

describe("jsdiff.wordsWithSpace", function() {
  it("returns normally for matching data", function() {
    const data = "Jean-Luc Picard"
    jsdiff.wordsWithSpace(data, data)
  })

  it("throws with the console-formatted diff for mismatching data", function() {
    const obj1 = "Jean-Luc Picard"
    const obj2 = "Captain Picard"

    const expected = chalk`mismatching words:

{red Jean-Luc}{green Captain}{grey  Picard}`
    // jsdiff.wordsWithSpace(obj2, obj1)
    assert.throws(function() {
      jsdiff.wordsWithSpace(obj2, obj1)
    }, new Error(expected))
  })

  it("considers whitespace significant", function() {
    const obj1 = "foo bar"
    const obj2 = " foo bar"
    const expected = chalk`mismatching words:

{green  }{grey foo bar}`
    // jsdiff.wordsWithSpace(obj2, obj1)
    assert.throws(function() {
      jsdiff.wordsWithSpace(obj2, obj1)
    }, new Error(expected))
  })

  it("throws when forgetting the expected value", function() {
    assert.throws(function() {
      // @ts-ignore
      jsdiff.wordsWithSpace("foo")
    }, new Error("JsDiffConsole: expected value not provided"))
  })

  it("throws when forgetting the actual value", function() {
    assert.throws(function() {
      // @ts-ignore
      jsdiff.wordsWithSpace()
    }, new Error("JsDiffConsole: actual value not provided"))
  })

  it("allows providing a custom message", function() {
    try {
      jsdiff.wordsWithSpace("one", "two", "custom message")
    } catch (e) {
      const stripped = stripAnsi(e.message)
      assert.equal(stripped, "custom message:\n\ntwoone")
      return
    }
    throw new Error("jsdiff.wordsWithSpace didn't throw")
  })
})
