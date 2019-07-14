import chalk from "chalk"
import * as diff from "diff"

function renderDifferences(differences: diff.Change[]): string {
  let result = ""
  for (const part of differences) {
    result += getColor(part)(part.value)
  }
  return result
}

function getColor(part: diff.Change) {
  if (part.added) {
    return chalk.green
  }
  if (part.removed) {
    return chalk.red
  }
  return chalk.grey
}

/**
 * Explode checks the two given Objects or strings for equality
 * and throws with the console formatted diff if there are any differences.
 */
export function sync(actual: string | object, expected: string | object) {
  if (!actual) {
    throw new Error("JsDiffConsole: actual value not provided")
  }
  if (!expected) {
    throw new Error("JsDiffConsole: expected value not provided")
  }

  const differences = diff.diffJson(expected, actual)
  if (differences.length > 1) {
    throw new Error(`mismatching records:\n\n${renderDifferences(differences)}`)
  }
}
