import assert from "assert"
import chalk from "chalk"
import stripAnsi from "strip-ansi"
import * as assertNoDiff from "../src/index"

describe("assertNoDiff.wordsWithSpace", function() {
  it("returns normally for matching data", function() {
    const data = "Jean-Luc Picard"
    assertNoDiff.wordsWithSpace(data, data)
  })

  it("throws an exception with a Bash-colored diff for mismatching data", function() {
    const obj1 = "Jean-Luc Picard"
    const obj2 = "Captain Picard"

    const expected = chalk`mismatching words:

{red Jean-Luc}{green Captain}{grey  Picard}`
    assert.throws(function() {
      assertNoDiff.wordsWithSpace(obj2, obj1)
    }, new Error(expected))
  })

  it("considers whitespace significant", function() {
    const obj1 = "foo bar"
    const obj2 = " foo bar"
    const expected = chalk`mismatching words:

{green  }{grey foo bar}`
    assert.throws(function() {
      assertNoDiff.wordsWithSpace(obj2, obj1)
    }, new Error(expected))
  })

  it("throws when forgetting the expected value", function() {
    assert.throws(function() {
      // @ts-ignore
      assertNoDiff.wordsWithSpace("foo")
    }, new Error("AssertNoDiff: expected value not provided"))
  })

  it("throws when forgetting the actual value", function() {
    assert.throws(function() {
      // @ts-ignore
      assertNoDiff.wordsWithSpace()
    }, new Error("AssertNoDiff: actual value not provided"))
  })

  it("allows providing a custom message", function() {
    try {
      assertNoDiff.wordsWithSpace("one", "two", "custom message")
    } catch (e) {
      const stripped = stripAnsi(e.message)
      assert.equal(stripped, "custom message:\n\ntwoone")
      return
    }
    throw new Error("assertNoDiff.wordsWithSpace didn't throw")
  })

  it("allows diffing against empty strings", function() {
    assertNoDiff.wordsWithSpace("", "")
  })
})
