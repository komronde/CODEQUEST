import type { Exercise } from "@/types";

/** Answer shape depends on exercise type:
 *  mcq/bug → index, tf → boolean, fill → string[], arrange → number[] (indices into shuffled blocks), write → string */
export type Answer = null | number | boolean | string | string[] | number[];

export const BLANK = "___";
export const blankCount = (code: string): number => code.split(BLANK).length - 1;

const norm = (s: string) => s.replace(/\s+/g, "").toLowerCase();

/** Deterministic shuffle so the same exercise always shows the same block order. */
export function shuffledOrder(blocks: string[]): number[] {
  const idx = blocks.map((_, i) => i);
  let seed = 0;
  for (const ch of blocks.join("|")) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const shuffle = () => {
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
  };
  shuffle();
  // make sure it is not already solved
  let guard = 0;
  while (idx.every((v, i) => blocks[v] === blocks[i]) && guard++ < 10) shuffle();
  return idx;
}

export function initialAnswer(ex: Exercise): Answer {
  switch (ex.type) {
    case "fill":
      return Array.from({ length: blankCount(ex.code) }, () => "");
    case "arrange":
      return [];
    case "write":
      return ex.starter;
    default:
      return null;
  }
}

export function isAnswered(ex: Exercise, a: Answer): boolean {
  switch (ex.type) {
    case "mcq":
    case "bug":
      return typeof a === "number";
    case "tf":
      return typeof a === "boolean";
    case "fill":
      return Array.isArray(a) && (a as string[]).every((v) => v.trim().length > 0);
    case "arrange":
      return Array.isArray(a) && (a as number[]).length === ex.blocks.length;
    case "write":
      return typeof a === "string" && a.trim().length > 0 && a.trim() !== ex.starter.trim();
  }
}

export function grade(ex: Exercise, a: Answer): boolean {
  switch (ex.type) {
    case "mcq":
    case "bug":
      return a === ex.answer;
    case "tf":
      return a === ex.answer;
    case "fill":
      return (
        Array.isArray(a) &&
        ex.answers.every((ans, i) => {
          const alts = ans === "|" ? ["|"] : ans.split("|");
          return alts.map(norm).includes(norm(String((a as string[])[i] ?? "")));
        })
      );
    case "arrange": {
      if (!Array.isArray(a)) return false;
      const order = shuffledOrder(ex.blocks);
      return (a as number[]).map((i) => ex.blocks[order[i]]).join("\n") === ex.blocks.join("\n");
    }
    case "write":
      return (
        typeof a === "string" &&
        ex.patterns.every((p) => {
          try {
            return new RegExp(p, "is").test(a);
          } catch {
            return false;
          }
        })
      );
  }
}

/** Plain-text solution shown after a wrong answer (null when the UI highlights the answer itself). */
export function solutionText(ex: Exercise): string | null {
  switch (ex.type) {
    case "fill": {
      let i = 0;
      return ex.code.split(BLANK).reduce((acc, part, n) => (n === 0 ? part : acc + (ex.answers[i++]?.split("|")[0] ?? "") + part), "");
    }
    case "arrange":
      return ex.blocks.join("\n");
    case "bug":
      return ex.lines[ex.answer].trim();
    case "write":
      return ex.solution;
    default:
      return null;
  }
}
