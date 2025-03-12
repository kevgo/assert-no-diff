import assert from "node:assert/strict"
import { suite, test } from "node:test"
import chalk from "chalk"
import stripAnsi from "strip-ansi"
import * as assertNoDiff from "../src/index"

suite("assertNoDiff.json", function () {

  test("matching data", function () {
    const data = { firstName: "Jean-Luc", lastName: "Picard" }
    assertNoDiff.json(data, data)
  })

  test("mismatching data", function () {
    const obj1 = { firstName: "Jean-Luc", lastName: "Picard" }
    const obj2 = { firstName: "Captain", lastName: "Picard" }
    const expected = chalk`mismatching objects:

{grey \{\n}{red   "firstName": "Jean-Luc",\n}{green   "firstName": "Captain",\n}{grey   "lastName": "Picard"\n\}}`
    assert.throws(function () {
      assertNoDiff.json(obj2, obj1)
    }, new Error(expected))
  })

  test("no expected value", function () {
    assert.throws(function () {
      // @ts-ignore
      assertNoDiff.json("foo")
    }, new Error("AssertNoDiff: expected value not provided"))
  })

  test("no actual value", function () {
    assert.throws(function () {
      // @ts-ignore
      assertNoDiff.json()
    }, new Error("AssertNoDiff: actual value not provided"))
  })

  test("custom error message", function () {
    try {
      assertNoDiff.json({ a: 1 }, { a: 2 }, "custom message")
    } catch (e) {
      const stripped = stripAnsi(e.message)
      assert.equal(stripped, 'custom message:\n\n{\n  "a": 2\n  "a": 1\n}')
      return
    }
    throw new Error("assertNoDiff.json didn't throw")
  })

  test("diffing empty objects", function () {
    assertNoDiff.json({}, {})
  })
})
