// Make the Judge Smile — entry program.
//
// Writes one line (at most 200 characters) about a small good thing
// that happened today to /output/entry.txt.
// Node 22+, stdlib only, no network, deterministic.
//
// Chosen line (132 chars):
//   "After three years of pretending I don't exist, my neighbour's cat
//    headbutted my hand this morning — all it took was one tin of tuna."
//
// Candidate lines considered, and why this one was chosen:
//   1. "The bus driver waited while I ran for the bus, then waved me
//      on with a smile." — warm and concrete, but the surprise is thin:
//      a driver waiting is kind, not unexpected, and "waved me on with
//      a smile" is greeting-card phrasing.
//   2. "My grandmother rang to say the roses I planted for her in 2019
//      bloomed again this spring." — warm, but it happened this spring,
//      not today, and the turn is gentle rather than surprising.
//   3. "After three years of pretending I don't exist, my neighbour's
//      cat headbutted my hand this morning — all it took was one tin of
//      tuna." — CHOSEN. It wins against the judge brief:
//        Warmth: a small, genuinely felt kindness — a stray cat finally
//          trusting a person, bought with nothing but patience and tuna.
//        Surprise: the turn lands twice — three years of being ignored,
//          then a headbutt, then the reveal that the whole siege cost
//          one tin of tuna.
//        Concreteness: one real detail after another — three years, a
//          headbutt, this morning, one tin of tuna.
//        Fresh wording: no greeting-card phrasing, no borrowed
//          sentiment; "pretending I don't exist" and "headbutted my
//          hand" are its own words and rhythm, and it reads cleanly aloud.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "After three years of pretending I don't exist, my neighbour's cat headbutted my hand this morning \u2014 all it took was one tin of tuna.";

// Count characters as Unicode code points, not UTF-16 code units, so
// any astral-plane character in a future line is counted once.
const charCount = [...LINE].length;

if (charCount < 1 || charCount > 200) {
  throw new Error(`line must be 1-200 characters, got ${charCount}`);
}
if (LINE.length !== charCount) {
  throw new Error("line must not contain characters outside the BMP");
}
if (LINE.trim() !== LINE) {
  throw new Error("line must not start or end with white space");
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only white space");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
// Control characters and other non-printables would break the gate's
// UTF-8 text check and the judge's reading of the line.
if (/[\u0000-\u001F\u007F]/.test(LINE)) {
  throw new Error("line must not contain control characters");
}
// The brief demands a small good thing that happened today: the line
// must carry at least one concrete detail (a number, a time of day, or
// a specific object) rather than a bare sentiment.
if (!/\d|morning|afternoon|evening|today/.test(LINE)) {
  throw new Error("line must contain at least one concrete detail");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
console.log(LINE);
