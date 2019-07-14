import assert from "assert"
import chalk from "chalk"
import stripAnsi from "strip-ansi"
import * as assertNoDiff from "../src"

describe("assertNoDiff.chars", function() {
  it("returns normally for matching data", function() {
    const data = "Jean-Luc Picard"
    assertNoDiff.chars(data, data)
  })

  it("throws an exception with a Bash-colored diff for mismatching data", function() {
    const obj1 = "Jean-Luc Picard"
    const obj2 = "Captain Picard"
    const expected = chalk`mismatching strings:

{red Je}{green C}{grey a}{green ptai}{grey n}{red -Luc}{grey  Picard}`
    assert.throws(function() {
      assertNoDiff.chars(obj2, obj1)
    }, new Error(expected))
  })

  it("throws when forgetting the expected value", function() {
    assert.throws(function() {
      // @ts-ignore
      assertNoDiff.chars("foo")
    }, new Error("AssertNoDiff: expected value not provided"))
  })

  it("throws when forgetting the actual value", function() {
    assert.throws(function() {
      // @ts-ignore
      assertNoDiff.chars()
    }, new Error("AssertNoDiff: actual value not provided"))
  })

  it("allows providing a custom message", function() {
    try {
      assertNoDiff.chars("one", "two", "custom message")
    } catch (e) {
      const stripped = stripAnsi(e.message)
      assert.equal(stripped, "custom message:\n\ntwone")
      return
    }
    throw new Error("assertNoDiff.chars didn't throw")
  })
})
