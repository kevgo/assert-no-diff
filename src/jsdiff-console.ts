import chalk from "chalk";
import diff from "diff";

function renderDifferences(differences) {
  let result = "";
  for (const part in differences) {
    const color = getColor(part);
    result += color(part.value);
  }
  return result;
}

function getColor(part) {
  if (part.added) {
    return chalk.green;
  }
  if (part.removed) {
    return chalk.red;
  }
  return chalk.grey;
}

export async function color(actual, expected) {
  if (!actual) throw new Error("JsDiffConsole: actual value not provided");
  if (!expected) throw new Error("JsDiffConsole: expected value not provided");

  const differences = diff.diffJson(expected, actual);
  if (differences.length === 1) {
    return;
  }

  throw new Error("mismatching records:\n\n#{render-differences differences}");
}
