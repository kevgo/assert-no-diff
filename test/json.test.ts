import { gray, green, red } from "colorette"
import assert from "node:assert/strict"
import { suite, test } from "node:test"
import stripAnsi from "strip-ansi"
import * as assertNoDiff from "../src/index"

suite("assertNoDiff.json", () => {
  test("matching data", () => {
    const data = { firstName: "Jean-Luc", lastName: "Picard" }
    assertNoDiff.json(data, data)
  })

  test("mismatching data", () => {
    const obj1 = { firstName: "Jean-Luc", lastName: "Picard" }
    const obj2 = { firstName: "Captain", lastName: "Picard" }
    const expected = `mismatching objects:

${gray("{\n")}${red('  "firstName": "Jean-Luc",\n')}${green('  "firstName": "Captain",\n')}${
      gray('  "lastName": "Picard"\n}')
    }`
    assert.throws(
      () => {
        assertNoDiff.json(obj2, obj1)
      },
      new Error(expected)
    )
  })

  test("no expected value", () => {
    assert.throws(() => {
      // @ts-ignore
      assertNoDiff.json("foo")
    }, new Error("AssertNoDiff: expected value not provided"))
  })

  test("no actual value", () => {
    assert.throws(() => {
      // @ts-ignore
      assertNoDiff.json()
    }, new Error("AssertNoDiff: actual value not provided"))
  })

  test("custom error message", () => {
    try {
      assertNoDiff.json({ a: 1 }, { a: 2 }, "custom message")
    } catch (e) {
      const stripped = stripAnsi(e.message)
      assert.equal(stripped, 'custom message:\n\n{\n  "a": 2\n  "a": 1\n}')
      return
    }
    throw new Error("assertNoDiff.json didn't throw")
  })

  test("diffing empty objects", () => {
    assertNoDiff.json({}, {})
  })
})
