import { gray, green, red } from "colorette"
import assert from "node:assert/strict"
import { suite, test } from "node:test"
import stripAnsi from "strip-ansi"
import * as assertNoDiff from "../src/index"

suite("assertNoDiff.wordsWithSpace", function () {
  test("matching data", function () {
    const data = "Jean-Luc Picard"
    assertNoDiff.wordsWithSpace(data, data)
  })

  test("mismatching data", function () {
    const obj1 = "Jean-Luc Picard"
    const obj2 = "Captain Picard"
    const expected = `mismatching words:

${red("Jean-Luc")}${green("Captain")}${gray(" Picard")}`
    assert.throws(function () {
      assertNoDiff.wordsWithSpace(obj2, obj1)
    }, new Error(expected))
  })

  test("extra whitespace", function () {
    const obj1 = "foo bar"
    const obj2 = " foo bar"
    const expected = `mismatching words:

${green(" ")}${gray("foo bar")}`
    assert.throws(
      function () {
        assertNoDiff.wordsWithSpace(obj2, obj1)
      },
      new Error(expected),
      "should not tolerate surrounding whitespace"
    )
  })

  test("no expected value", function () {
    assert.throws(function () {
      // @ts-ignore
      assertNoDiff.wordsWithSpace("foo")
    }, new Error("AssertNoDiff: expected value not provided"))
  })

  test("no actual value", function () {
    assert.throws(function () {
      // @ts-ignore
      assertNoDiff.wordsWithSpace()
    }, new Error("AssertNoDiff: actual value not provided"))
  })

  test("custom error message", function () {
    try {
      assertNoDiff.wordsWithSpace("one", "two", "custom message")
    } catch (e) {
      const stripped = stripAnsi(e.message)
      assert.equal(stripped, "custom message:\n\ntwoone")
      return
    }
    throw new Error("assertNoDiff.wordsWithSpace didn't throw")
  })

  test("empty strings", function () {
    assertNoDiff.wordsWithSpace("", "", "should allow diffing empty strings")
  })
})
