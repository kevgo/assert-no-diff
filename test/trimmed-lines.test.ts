import { gray, green, red } from "colorette"
import assert from "node:assert/strict"
import { suite, test } from "node:test"
import stripAnsi from "strip-ansi"
import * as assertNoDiff from "../src/index"

suite("assertNoDiff.trimmedLines", () => {
  test("matching data", () => {
    const data = "Jean-Luc Picard"
    assertNoDiff.trimmedLines(data, data)
  })

  test("matching data with surrounding whitespace", () => {
    const obj1 = "foo"
    const obj2 = "  foo  "
    assertNoDiff.trimmedLines(
      obj2,
      obj1,
      "should ignore surrounding whitespace"
    )
  })

  test("mismatching data", () => {
    const obj1 = "Jean-Luc\nPicard"
    const obj2 = "Captain\nPicard"

    const expected = `mismatching lines:

${red("Jean-Luc\n")}${green("Captain\n")}${gray("Picard")}`
    assert.throws(() => {
      assertNoDiff.trimmedLines(obj2, obj1)
    }, new Error(expected))
  })

  test("no expected value", () => {
    assert.throws(() => {
      // @ts-ignore
      assertNoDiff.trimmedLines("foo")
    }, new Error("AssertNoDiff: expected value not provided"))
  })

  test("no actual value", () => {
    assert.throws(() => {
      // @ts-ignore
      assertNoDiff.trimmedLines()
    }, new Error("AssertNoDiff: actual value not provided"))
  })

  test("custom error message", () => {
    try {
      assertNoDiff.trimmedLines("one", "two", "custom message")
    } catch (e) {
      const stripped = stripAnsi(e.message)
      assert.equal(stripped, "custom message:\n\ntwoone")
      return
    }
    throw new Error("assertNoDiff.trimmedLines didn't throw")
  })

  test("diffing empty strings", () => {
    assertNoDiff.trimmedLines("", "", "should allow diffing empty strings")
  })

  test("options", () => {
    assertNoDiff.trimmedLines("aaa", "AAA", "should be similar", { ignoreCase: true })
  })
})
