import * as diff from "diff"
import { renderDiff } from "./helpers/render-diff"

/**
 * Json checks the two given Objects for equality.
 * If there are any differences, it throws a console-colored diff message.
 */
export function json(
  actual: object,
  expected: object,
  message = "mismatching objects"
) {
  if (!actual) throw new Error("JsDiffConsole: actual value not provided")
  if (!expected) throw new Error("JsDiffConsole: expected value not provided")
  const differences = diff.diffJson(expected, actual)
  if (differences.length > 1) {
    throw new Error(`${message}:\n\n${renderDiff(differences)}`)
  }
}
