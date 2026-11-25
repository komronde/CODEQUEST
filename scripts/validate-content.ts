/* Dev-time sanity checks: run with
 *   npx esbuild scripts/validate-content.ts --bundle --platform=node --alias:@=./src --outfile=/tmp/validate.cjs && node /tmp/validate.cjs
 */
import fs from "node:fs";
import path from "node:path";
import { COURSES } from "../src/data/courses";
import { ACHIEVEMENTS } from "../src/data/achievements";
import { QUESTS } from "../src/data/quests";
import { PLAYGROUND_TASKS } from "../src/data/playgroundTasks";
import { grade, isAnswered, shuffledOrder, type Answer } from "../src/lib/exercises";
import { en } from "../src/i18n/locales/en";
import { uz } from "../src/i18n/locales/uz";
import { ru } from "../src/i18n/locales/ru";
import type { Exercise } from "../src/types";

let errors = 0;
const fail = (msg: string) => {
  errors++;
  console.error("✗", msg);
};

function correctAnswer(ex: Exercise): Answer {
  switch (ex.type) {
    case "mcq":
    case "bug":
    case "tf":
      return ex.answer;
    case "fill":
      return ex.answers.map((a) => (a === "|" ? "|" : a.split("|")[0]));
    case "arrange": {
      const order = shuffledOrder(ex.blocks);
      const used = new Set<number>();
      return ex.blocks.map((b) => {
        const p = order.findIndex((o, i) => !used.has(i) && ex.blocks[o] === b);
        used.add(p);
        return p;
      });
    }
    case "write":
      return ex.solution;
  }
}

let exCount = 0;
const types = new Set<string>();
for (const c of COURSES) {
  c.lessons.forEach((l) => {
    l.exercises.forEach((ex, i) => {
      exCount++;
      types.add(ex.type);
      const id = `${l.id}#${i} (${ex.type})`;
      const a = correctAnswer(ex);
      if (!isAnswered(ex, a)) fail(`${id}: correct answer not 'answered'`);
      if (!grade(ex, a)) fail(`${id}: correct answer graded wrong`);
      if (ex.type === "mcq" && (ex.answer < 0 || ex.answer >= ex.options.length)) fail(`${id}: bad answer index`);
      if (ex.type === "bug" && (ex.answer < 0 || ex.answer >= ex.lines.length)) fail(`${id}: bad bug index`);
      if (ex.type === "mcq" && grade(ex, (ex.answer + 1) % ex.options.length)) fail(`${id}: wrong option graded correct`);
      if (ex.type === "write" && grade(ex, ex.starter)) fail(`${id}: starter code passes`);
      if (ex.type === "fill" && (ex.code.split("___").length - 1 !== ex.answers.length)) fail(`${id}: blank/answer count mismatch`);
      const q = ex.q;
      if (q.some((s) => !s.trim())) fail(`${id}: empty translation in q`);
      if (ex.why.some((s) => !s.trim())) fail(`${id}: empty translation in why`);
    });
    if (l.title.some((s) => !s) || l.intro.some((s) => !s)) fail(`${l.id}: missing lesson translation`);
  });
}
console.log(`Checked ${exCount} exercises, types: ${[...types].join(", ")}`);

// ---- locales
const flatten = (o: unknown, prefix = ""): Record<string, string> =>
  Object.entries(o as Record<string, unknown>).reduce<Record<string, string>>((acc, [k, v]) => {
    const key = prefix ? `${prefix}.${k}` : k;
    return typeof v === "string" ? { ...acc, [key]: v } : { ...acc, ...flatten(v, key) };
  }, {});
const fe = flatten(en), fu = flatten(uz), fr = flatten(ru);
const ph = (s: string) => (s.match(/\{\{\w+\}\}/g) ?? []).sort().join(",");
for (const k of Object.keys(fe)) {
  if (!(k in fu)) fail(`uz missing ${k}`);
  if (!(k in fr)) fail(`ru missing ${k}`);
  if (fu[k] !== undefined && ph(fu[k]) !== ph(fe[k])) fail(`uz placeholder mismatch ${k}`);
  if (fr[k] !== undefined && ph(fr[k]) !== ph(fe[k])) fail(`ru placeholder mismatch ${k}`);
}
for (const k of Object.keys(fu)) if (!(k in fe)) fail(`uz extra ${k}`);
for (const k of Object.keys(fr)) if (!(k in fe)) fail(`ru extra ${k}`);

// ---- keys used in source
const used = new Set<string>();
const walk = (dir: string) => {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) walk(p);
    else if (/\.tsx?$/.test(f.name)) {
      const src = fs.readFileSync(p, "utf8");
      for (const m of src.matchAll(/\b(?:t|tt)\(\s*[`"']([\w.\-${}\[\]]+)[`"']/g)) used.add(m[1]);
    }
  }
};
walk("src");
const dyn: Record<string, string[]> = {
  "nav.${key}": ["dashboard", "paths", "playground", "quests", "leaderboard", "achievements", "profile", "settings"],
  "achievements.filter.${f}": ["all", "unlocked", "locked"],
  "paths.filter.${f}": ["all", "progress", "done", "new"],
  "leaderboard.${p}": ["weekly", "allTime"],
  "lesson.types.${ex.type}": ["mcq", "tf", "fill", "arrange", "bug", "write"],
  "landing.features.${f.key}.title": ["interactive", "xp", "streak", "quests", "playground", "languages"].map((x) => x),
  "settings.goal.${g.key}": ["casual", "regular", "serious", "intense"],
};
for (const k of used) {
  if (!k.includes("${")) {
    if (!(k in fe)) fail(`key used but missing in en: ${k}`);
    continue;
  }
  if (k.startsWith("achievements.items.")) {
    for (const a of ACHIEVEMENTS) for (const s of ["title", "desc"]) if (!(`achievements.items.${a.id}.${s}` in fe)) fail(`missing achievement text ${a.id}.${s}`);
  } else if (k.startsWith("quests.items.")) {
    for (const q of QUESTS) if (!(`quests.items.${q.id}` in fe)) fail(`missing quest text ${q.id}`);
  } else if (k.startsWith("landing.features.")) {
    for (const f of dyn["landing.features.${f.key}.title"]) for (const s of ["title", "desc"]) if (!(`landing.features.${f}.${s}` in fe)) fail(`missing feature ${f}.${s}`);
  } else if (k.startsWith("landing.steps.")) {
    for (const n of [1, 2, 3]) for (const s of ["title", "desc"]) if (!(`landing.steps.s${n}.${s}` in fe)) fail(`missing step ${n}.${s}`);
  } else if (dyn[k]) {
    for (const v of dyn[k]) if (!(k.replace(/\$\{[^}]+\}/, v) in fe)) fail(`missing dynamic ${k} → ${v}`);
  } else {
    fail(`unhandled dynamic key ${k}`);
  }
}
if (PLAYGROUND_TASKS.some((t) => t.title.some((s) => !s) || t.desc.some((s) => !s))) fail("playground translation missing");

console.log(`Locale keys: ${Object.keys(fe).length}; used keys scanned: ${used.size}`);
console.log(errors ? `\n${errors} problem(s) found` : "\nAll content checks passed ✓");
process.exit(errors ? 1 : 0);
