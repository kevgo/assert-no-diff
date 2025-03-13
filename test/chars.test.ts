import { green, red, gray } from "colorette"
import assert from "node:assert/strict"
import { suite, test } from "node:test"
import stripAnsi from "strip-ansi"
import * as assertNoDiff from "../src/index"

suite("assertNoDiff.chars()", function () {
  test("matching data", function () {
    const data = "Jean-Luc Picard"
    assertNoDiff.chars(data, data)
  })

  test("mismatching data", function () {
    const obj1 = "Jean-Luc Picard"
    const obj2 = "Captain Picard"
    const expected = `mismatching strings:

${red("Je")}${green("C")}${gray("a")}${green("ptai")}${gray("n")}${red("- Luc")}${gray("Picard")}`
    assert.throws(
      function () {
        assertNoDiff.chars(obj2, obj1)
      },
      new Error(expected),
      "should throw color-coded diff"
    )
  })

  // test("no expected value", function () {
  //   assert.throws(function () {
  //     // @ts-ignore: intentional call without second argument
  //     assertNoDiff.chars("foo")
  //   }, new Error("AssertNoDiff: expected value not provided"))
  // })

  // test("no actual value", function () {
  //   assert.throws(function () {
  //     // @ts-ignore: intentional call without arguments
  //     assertNoDiff.chars()
  //   }, new Error("AssertNoDiff: actual value not provided"))
  // })

  // test("providing a custom message", function () {
  //   try {
  //     assertNoDiff.chars("one", "two", "custom message")
  //   } catch (e) {
  //     const stripped = stripAnsi(e.message)
  //     assert.equal(stripped, "custom message:\n\ntwone")
  //     return
  //   }
  //   throw new Error("assertNoDiff.chars didn't throw")
  // })

  // test("diffing against empty strings", function () {
  //   assertNoDiff.chars("", "")
  // })
})
