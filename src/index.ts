import chalk from "chalk"
import * as diff from "diff"

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

/**
 * Json checks the two given Objects for equality.
 * If there are any differences, it throws a console-colored diff message.
 */
export function json(
  actual: object,
  expected: object,
  message = "mismatching objects"
) {
  if (!actual) {
    throw new Error("JsDiffConsole: actual value not provided")
  }
  if (!expected) {
    throw new Error("JsDiffConsole: expected value not provided")
  }
  const differences = diff.diffJson(expected, actual)
  if (differences.length > 1) {
    throw new Error(`${message}:\n\n${renderDiff(differences)}`)
  }
}

/**
 * Chars checks the two given strings line-by-line for equality.
 * Extra whitespace is ignored.
 * If there are any differences, it throws a console-colored diff message.
 */
export function trimmedLines(
  actual: string,
  expected: string,
  message = "mismatching lines"
) {
  if (!actual) {
    throw new Error("JsDiffConsole: actual value not provided")
  }
  if (!expected) {
    throw new Error("JsDiffConsole: expected value not provided")
  }
  const differences = diff.diffTrimmedLines(expected, actual)
  if (differences.length > 1) {
    throw new Error(`${message}:\n\n${renderDiff(differences)}`)
  }
}

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

/**
 * Chars checks the two given strings line-by-line for equality.
 * Extra whitespace is ignored.
 * If there are any differences, it throws a console-colored diff message.
 */
// export function arrays(
//   actual: Array<Object>,
//   expected: Array<Object>,
//   message = "mismatching arrays"
// ) {
//   checkArgsExist(actual, expected)
//   const differences = diff.diffArrays(expected, actual)
//   if (differences.length > 1) {
//     throw new Error(`${message}:\n\n${renderDiff(differences)}`)
//   }
// }

/** GetColor returns the chalk function to render the given diff part. */
export function getColor(part: diff.Change) {
  if (part.added) {
    return chalk.green
  }
  if (part.removed) {
    return chalk.red
  }
  return chalk.grey
}

// renderDiff renders the given diff into a string containing Bash colors.
export function renderDiff(differences: diff.Change[]): string {
  let result = ""
  for (const part of differences) {
    result += getColor(part)(part.value)
  }
  return result
}
