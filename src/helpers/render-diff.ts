import * as diff from "diff"
import { getColor } from "./get-color"

// renderDiff renders the given diff into a string containing Bash colors.
export function renderDiff(differences: diff.Change[]): string {
  let result = ""
  for (const part of differences) {
    result += getColor(part)(part.value)
  }
  return result
}
