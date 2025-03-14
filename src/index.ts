import * as colorette from "colorette"
import * as diff from "diff"

/**
 * Checks the two given strings character-by-character for equality.
 * If there are any differences, it throws an exception with a Bash-colored diff as the error message.
 */
export function chars(
  actual: string,
  expected: string,
  message = "mismatching strings"
) {
  if (actual == null) {
    throw new Error("AssertNoDiff: actual value not provided")
  }
  if (expected == null) {
    throw new Error("AssertNoDiff: expected value not provided")
  }
  const differences = diff.diffChars(expected, actual)
  if (differences.length > 1) {
    throw new Error(`${message}:\n\n${renderDiff(differences)}`)
  }
}

/**
 * Checks the two given Objects for equality.
 * If there are any differences, it throws an exception with a Bash-colored diff as the error message.
 */
export function json(
  actual: Record<string, unknown> | string[],
  expected: Record<string, unknown> | string[],
  message = "mismatching objects"
) {
  if (!actual) {
    throw new Error("AssertNoDiff: actual value not provided")
  }
  if (!expected) {
    throw new Error("AssertNoDiff: expected value not provided")
  }
  const differences = diff.diffJson(expected, actual)
  if (differences.length > 1) {
    throw new Error(`${message}:\n\n${renderDiff(differences)}`)
  }
}

/**
 * Checks the two given strings line-by-line for equality.
 * Extra whitespace is ignored.
 * If there are any differences, it throws an exception with a Bash-colored diff as the error message.
 */
export function trimmedLines(
  actual: string,
  expected: string,
  message = "mismatching lines"
) {
  if (actual == null) {
    throw new Error("AssertNoDiff: actual value not provided")
  }
  if (expected == null) {
    throw new Error("AssertNoDiff: expected value not provided")
  }
  const differences = diff.diffTrimmedLines(expected, actual)
  if (differences.length > 1) {
    throw new Error(`${message}:\n\n${renderDiff(differences)}`)
  }
}

/**
 * Checks the two given strings word-by-word for equality treating whitespace as significant.
 * If there are any differences, it throws an exception with a Bash-colored diff as the error message.
 */
export function wordsWithSpace(
  actual: string,
  expected: string,
  message = "mismatching words"
) {
  if (actual == null) {
    throw new Error("AssertNoDiff: actual value not provided")
  }
  if (expected == null) {
    throw new Error("AssertNoDiff: expected value not provided")
  }
  const differences = diff.diffWordsWithSpace(expected, actual)
  if (differences.length > 1) {
    throw new Error(`${message}:\n\n${renderDiff(differences)}`)
  }
}

/** returns the color function to render the given diff part */
function getColor(part: diff.Change): colorette.Color {
  if (part.added) {
    return colorette.green
  }
  if (part.removed) {
    return colorette.red
  }
  return colorette.gray
}

/** renders the given diff into a string containing Bash colors */
function renderDiff(differences: diff.Change[]): string {
  let result = ""
  for (const part of differences) {
    const color = getColor(part)
    result += color(part.value)
  }
  return result
}
