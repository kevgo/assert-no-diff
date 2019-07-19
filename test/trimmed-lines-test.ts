import assert from "assert"
import chalk from "chalk"
import stripAnsi from "strip-ansi"
import * as assertNoDiff from "../src/index"

describe("assertNoDiff.trimmedLines", function() {
  it("returns normally for matching data", function() {
    const data = "Jean-Luc Picard"
    assertNoDiff.trimmedLines(data, data)
  })

  it("ignores additional whitespace", function() {
    const obj1 = "foo"
    const obj2 = "  foo  "
    assertNoDiff.trimmedLines(obj2, obj1)
  })

  it("throws an exception with a Bash-colored diff for mismatching data", function() {
    const obj1 = "Jean-Luc\nPicard"
    const obj2 = "Captain\nPicard"

    const expected = chalk`mismatching lines:

{red Jean-Luc\n}{green Captain\n}{grey Picard}`
    assert.throws(function() {
      assertNoDiff.trimmedLines(obj2, obj1)
    }, new Error(expected))
  })

  it("throws when forgetting the expected value", function() {
    assert.throws(function() {
      // @ts-ignore
      assertNoDiff.trimmedLines("foo")
    }, new Error("AssertNoDiff: expected value not provided"))
  })

  it("throws when forgetting the actual value", function() {
    assert.throws(function() {
      // @ts-ignore
      assertNoDiff.trimmedLines()
    }, new Error("AssertNoDiff: actual value not provided"))
  })

  it("allows providing a custom message", function() {
    try {
      assertNoDiff.trimmedLines("one", "two", "custom message")
    } catch (e) {
      const stripped = stripAnsi(e.message)
      assert.equal(stripped, "custom message:\n\ntwoone")
      return
    }
    throw new Error("assertNoDiff.trimmedLines didn't throw")
  })

  it("allows diffing against empty strings", function() {
    assertNoDiff.trimmedLines("", "")
  })
})
