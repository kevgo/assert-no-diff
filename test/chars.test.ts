import { gray, green, red } from "colorette"
import assert from "node:assert/strict"
import { suite, test } from "node:test"
import stripAnsi from "strip-ansi"
import * as assertNoDiff from "../src/index"

suite("assertNoDiff.chars()", () => {
  test("matching data", () => {
    const data = "Jean-Luc Picard"
    assertNoDiff.chars(data, data)
  })

  test("mismatching data", () => {
    const obj1 = "Jean-Luc Picard"
    const obj2 = "Captain Picard"
    const expected = `mismatching strings:

${red("Je")}${green("C")}${gray("a")}${green("ptai")}${gray("n")}${red("-Luc")}${gray(" Picard")}`
    assert.throws(
      () => {
        assertNoDiff.chars(obj2, obj1)
      },
      new Error(expected)
    )
  })

  test("no expected value", () => {
    assert.throws(() => {
      // @ts-ignore: intentional call without second argument
      assertNoDiff.chars("foo")
    }, new Error("AssertNoDiff: expected value not provided"))
  })

  test("no actual value", () => {
    assert.throws(() => {
      // @ts-ignore: intentional call without arguments
      assertNoDiff.chars()
    }, new Error("AssertNoDiff: actual value not provided"))
  })

  test("providing a custom message", () => {
    try {
      assertNoDiff.chars("one", "two", "custom message")
    } catch (e) {
      const stripped = stripAnsi(e.message)
      assert.equal(stripped, "custom message:\n\ntwone")
      return
    }
    throw new Error("assertNoDiff.chars didn't throw")
  })

  test("diffing against empty strings", () => {
    assertNoDiff.chars("", "")
  })
})
