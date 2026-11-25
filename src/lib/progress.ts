import type { Course, Lesson, UserState } from "@/types";
import { COURSES } from "@/data/courses";

export interface CourseProgress {
  done: number;
  total: number;
  pct: number;
  complete: boolean;
  started: boolean;
  /** next lesson to take (first not completed), or undefined if complete */
  next?: Lesson;
}

export function courseProgress(s: UserState, course: Course): CourseProgress {
  const total = course.lessons.length;
  const done = course.lessons.filter((l) => s.completedLessons[l.id]).length;
  const next = course.lessons.find((l) => !s.completedLessons[l.id]);
  return { done, total, pct: Math.round((done / total) * 100), complete: done === total, started: done > 0, next };
}

/** A lesson is unlocked if it is the first one or the previous one is completed. */
export function isLessonUnlocked(s: UserState, course: Course, lesson: Lesson): boolean {
  if (lesson.index === 0) return true;
  const prev = course.lessons[lesson.index - 1];
  return Boolean(s.completedLessons[prev.id]);
}

/** Suggest what to continue with: last visited course if unfinished, otherwise first unfinished course. */
export function suggestNext(s: UserState): { course: Course; lesson: Lesson } | null {
  if (s.lastLesson) {
    const c = COURSES.find((x) => x.id === s.lastLesson?.courseId);
    const p = c && courseProgress(s, c);
    if (c && p?.next) return { course: c, lesson: p.next };
  }
  const started = COURSES.find((c) => courseProgress(s, c).started && !courseProgress(s, c).complete);
  const target = started ?? COURSES.find((c) => !courseProgress(s, c).complete);
  const next = target && courseProgress(s, target).next;
  return target && next ? { course: target, lesson: next } : null;
}
