import * as diff from "diff"
import { renderDiff } from "./helpers/render-diff"

/**
 * WordsWithSpace checks the two given strings word-by-word for equality
 * treating whitespace as significant.
 * If there are any differences, it throws a console-colored diff message.
 */
export function wordsWithSpace(
  actual: string,
  expected: string,
  message = "mismatching words"
) {
  if (!actual) {
    throw new Error("JsDiffConsole: actual value not provided")
  }
  if (!expected) {
    throw new Error("JsDiffConsole: expected value not provided")
  }
  const differences = diff.diffWordsWithSpace(expected, actual)
  if (differences.length > 1) {
    throw new Error(`${message}:\n\n${renderDiff(differences)}`)
  }
}
