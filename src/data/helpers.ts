import type { Course, Exercise, L, Lesson, Opt } from "@/types";

/** Compact builders for exercise content. */
export const mcq = (q: L, options: Opt[], answer: number, why: L, code?: string): Exercise => ({
  type: "mcq",
  q,
  options,
  answer,
  why,
  code,
});

export const tf = (q: L, answer: boolean, why: L, code?: string): Exercise => ({ type: "tf", q, answer, why, code });

/** `code` contains `___` markers; `answers[i]` accepts alternatives separated by `|`. */
export const fill = (q: L, code: string, answers: string[], why: L): Exercise => ({
  type: "fill",
  q,
  code,
  answers,
  why,
});

/** `blocks` are given in the CORRECT order; they are shuffled at render time. */
export const arrange = (q: L, blocks: string[], why: L): Exercise => ({ type: "arrange", q, blocks, why });

export const bug = (q: L, lines: string[], answer: number, why: L): Exercise => ({
  type: "bug",
  q,
  lines,
  answer,
  why,
});

/** `patterns` are regex sources (case-insensitive, dot-all) that must ALL match the learner's code. */
export const write = (
  q: L,
  starter: string,
  patterns: string[],
  solution: string,
  why: L,
  hint?: L,
): Exercise => ({ type: "write", q, starter, patterns, solution, why, hint });

type LessonInput = Omit<Lesson, "id" | "courseId" | "index">;

export const lesson = (title: L, intro: L, code: string, exercises: Exercise[]): LessonInput => ({
  title,
  intro,
  code,
  exercises,
});

export const course = (
  id: string,
  from: string,
  to: string,
  title: L,
  desc: L,
  lessons: LessonInput[],
): Course => ({
  id,
  from,
  to,
  title,
  desc,
  lessons: lessons.map((l, i) => ({ ...l, id: `${id}-${i + 1}`, courseId: id, index: i })),
});
