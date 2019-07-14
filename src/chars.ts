import * as diff from "diff"
import { renderDiff } from "./helpers/render-diff"

/**
 * Chars checks the two given strings character-by-character for equality.
 * If there are any differences, it throws a console-colored diff message.
 */
export function chars(
  actual: string,
  expected: string,
  message = "mismatching strings"
) {
  if (!actual) {
    throw new Error("JsDiffConsole: actual value not provided")
  }
  if (!expected) {
    throw new Error("JsDiffConsole: expected value not provided")
  }
  const differences = diff.diffChars(expected, actual)
  if (differences.length > 1) {
    throw new Error(`${message}:\n\n${renderDiff(differences)}`)
  }
}
