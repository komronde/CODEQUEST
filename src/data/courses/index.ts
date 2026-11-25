import type { Course, Lesson } from "@/types";
import { htmlCourse } from "./html";
import { cssCourse } from "./css";
import { jsCourse } from "./javascript";
import { pythonCourse } from "./python";
import { reactCourse } from "./react";
import { tsCourse } from "./typescript";

export const COURSES: Course[] = [htmlCourse, cssCourse, jsCourse, pythonCourse, reactCourse, tsCourse];

export const getCourse = (id: string | undefined): Course | undefined => COURSES.find((c) => c.id === id);

export const getLesson = (courseId: string | undefined, lessonId: string | undefined): Lesson | undefined =>
  getCourse(courseId)?.lessons.find((l) => l.id === lessonId);

export const TOTAL_LESSONS = COURSES.reduce((n, c) => n + c.lessons.length, 0);
export const TOTAL_EXERCISES = COURSES.reduce((n, c) => n + c.lessons.reduce((m, l) => m + l.exercises.length, 0), 0);
