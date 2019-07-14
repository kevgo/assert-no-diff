import diff from "diff"
import chalk from "chalk"

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
