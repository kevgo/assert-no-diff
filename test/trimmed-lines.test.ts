import chalk from "chalk"
import assert from "node:assert/strict"
import { suite, test } from "node:test"
import stripAnsi from "strip-ansi"
import * as assertNoDiff from "../src/index"

suite("assertNoDiff.trimmedLines", function() {
  test("matching data", function() {
    const data = "Jean-Luc Picard"
    assertNoDiff.trimmedLines(data, data)
  })

  test("matching data with surrounding whitespace", function() {
    const obj1 = "foo"
    const obj2 = "  foo  "
    assertNoDiff.trimmedLines(
      obj2,
      obj1,
      "should ignore surrounding whitespace",
    )
  })

  test("mismatching data", function() {
    const obj1 = "Jean-Luc\nPicard"
    const obj2 = "Captain\nPicard"

    const expected = chalk`mismatching lines:

{red Jean-Luc\n}{green Captain\n}{grey Picard}`
    assert.throws(function() {
      assertNoDiff.trimmedLines(obj2, obj1)
    }, new Error(expected))
  })

  test("no expected value", function() {
    assert.throws(function() {
      // @ts-ignore
      assertNoDiff.trimmedLines("foo")
    }, new Error("AssertNoDiff: expected value not provided"))
  })

  test("no actual value", function() {
    assert.throws(function() {
      // @ts-ignore
      assertNoDiff.trimmedLines()
    }, new Error("AssertNoDiff: actual value not provided"))
  })

  test("custom error message", function() {
    try {
      assertNoDiff.trimmedLines("one", "two", "custom message")
    } catch (e) {
      const stripped = stripAnsi(e.message)
      assert.equal(stripped, "custom message:\n\ntwoone")
      return
    }
    throw new Error("assertNoDiff.trimmedLines didn't throw")
  })

  test("diffing empty strings", function() {
    assertNoDiff.trimmedLines("", "", "should allow diffing empty strings")
  })
})
