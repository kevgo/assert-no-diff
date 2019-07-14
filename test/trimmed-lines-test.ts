import * as jsdiff from "../src"
import assert from "assert"
import chalk from "chalk"
import stripAnsi from "strip-ansi"

describe("jsdiff.trimmedLines", function() {
  it("returns normally for matching data", function() {
    const data = "Jean-Luc Picard"
    jsdiff.trimmedLines(data, data)
  })

  it("ignores additional whitespace", function() {
    const obj1 = "foo"
    const obj2 = "  foo  "
    jsdiff.trimmedLines(obj2, obj1)
  })

  it("throws with the console-formatted diff for mismatching data", function() {
    const obj1 = "Jean-Luc\nPicard"
    const obj2 = "Captain\nPicard"

    const expected = chalk`mismatching lines:

{red Jean-Luc\n}{green Captain\n}{grey Picard}`
    assert.throws(function() {
      jsdiff.trimmedLines(obj2, obj1)
    }, new Error(expected))
  })

  it("throws when forgetting the expected value", function() {
    assert.throws(function() {
      // @ts-ignore
      jsdiff.trimmedLines("foo")
    }, new Error("JsDiffConsole: expected value not provided"))
  })

  it("throws when forgetting the actual value", function() {
    assert.throws(function() {
      // @ts-ignore
      jsdiff.trimmedLines()
    }, new Error("JsDiffConsole: actual value not provided"))
  })

  it("allows providing a custom message", function() {
    try {
      jsdiff.trimmedLines("one", "two", "custom message")
    } catch (e) {
      const stripped = stripAnsi(e.message)
      assert.equal(stripped, "custom message:\n\ntwoone")
      return
    }
    throw new Error("jsdiff.trimmedLines didn't throw")
  })
})
