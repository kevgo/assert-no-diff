import assert from "assert"
import chalk from "chalk"
import stripAnsi from "strip-ansi"
import * as jsdiff from "../src"

describe("jsdiff.json", function() {
  it("returns normally for matching data", function() {
    const data = { firstName: "Jean-Luc", lastName: "Picard" }
    jsdiff.json(data, data)
  })

  it("throws with the console-formatted diff for mismatching data", function() {
    const obj1 = { firstName: "Jean-Luc", lastName: "Picard" }
    const obj2 = { firstName: "Captain", lastName: "Picard" }

    // NOTE: the newlines are parts of the diff string,
    //       don't extract them into the string template
    const expected = chalk`mismatching objects:

{grey \{\n}{red   "firstName": "Jean-Luc",\n}{green   "firstName": "Captain",\n}{grey   "lastName": "Picard"\n\}}`
    assert.throws(function() {
      jsdiff.json(obj2, obj1)
    }, new Error(expected))
  })

  it("throws when forgetting the expected value", function() {
    assert.throws(function() {
      // @ts-ignore
      jsdiff.json("foo")
    }, new Error("JsDiffConsole: expected value not provided"))
  })

  it("throws when forgetting the actual value", function() {
    assert.throws(function() {
      // @ts-ignore
      jsdiff.json()
    }, new Error("JsDiffConsole: actual value not provided"))
  })

  it("allows providing a custom message", function() {
    try {
      jsdiff.json({ a: 1 }, { a: 2 }, "custom message")
    } catch (e) {
      const stripped = stripAnsi(e.message)
      assert.equal(stripped, 'custom message:\n\n{\n  "a": 2\n  "a": 1\n}')
      return
    }
    throw new Error("jsdiff.json didn't throw")
  })
})
