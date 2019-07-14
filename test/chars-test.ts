import * as jsdiff from "../src"
import assert from "assert"
import chalk from "chalk"
import stripAnsi from "strip-ansi"

describe("jsdiff.chars", function() {
  it("returns normally for matching data", function() {
    const data = "Jean-Luc Picard"
    jsdiff.chars(data, data)
  })

  it("throws with the console-formatted diff for mismatching data", function() {
    const obj1 = "Jean-Luc Picard"
    const obj2 = "Captain Picard"
    const expected = chalk`mismatching strings:

{red Je}{green C}{grey a}{green ptai}{grey n}{red -Luc}{grey  Picard}`
    assert.throws(function() {
      jsdiff.chars(obj2, obj1)
    }, new Error(expected))
  })

  it("throws when forgetting the expected value", function() {
    assert.throws(function() {
      // @ts-ignore
      jsdiff.chars("foo")
    }, new Error("JsDiffConsole: expected value not provided"))
  })

  it("throws when forgetting the actual value", function() {
    assert.throws(function() {
      // @ts-ignore
      jsdiff.chars()
    }, new Error("JsDiffConsole: actual value not provided"))
  })

  it("allows providing a custom message", function() {
    try {
      jsdiff.chars("one", "two", "custom message")
    } catch (e) {
      const stripped = stripAnsi(e.message)
      assert.equal(stripped, "custom message:\n\ntwone")
      return
    }
    throw new Error("jsdiff.chars didn't throw")
  })
})
