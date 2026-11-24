// One Word, One Username, One Reward — make.fun entry.
//
// The entry is a single word: the entrant's own make.fun username.
// This program writes exactly that username to <outputDir>/entry.txt
// and nothing else — no newline, no explanation, no extra text.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const USERNAME = "witty-wren-74";
const MAX_LENGTH = 30;

function main(): void {
  // The gate requires 1-30 characters and not whitespace only.
  if (USERNAME.length < 1 || USERNAME.length > MAX_LENGTH) {
    console.error(`username must be 1-${MAX_LENGTH} characters, got ${USERNAME.length}`);
    process.exit(1);
  }
  if (USERNAME.trim().length === 0) {
    console.error("username must not be whitespace only");
    process.exit(1);
  }
  // One word only: the judge compares single-word handles, so any
  // space inside the name would break the entry's own premise.
  if (/\s/.test(USERNAME)) {
    console.error("username must be a single word with no spaces");
    process.exit(1);
  }

  const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), USERNAME, "utf8");
}

main();
