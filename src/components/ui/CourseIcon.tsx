import { Atom, Braces, Code2, FileCode2, Palette, Terminal, type LucideIcon } from "lucide-react";
import type { Course } from "@/types";
import { cn } from "@/utils/cn";

const ICONS: Record<string, LucideIcon> = {
  html: Code2,
  css: Palette,
  javascript: Braces,
  python: Terminal,
  react: Atom,
  typescript: FileCode2,
};

const sizes = { sm: "size-10 [&>svg]:size-5 rounded-xl", md: "size-14 [&>svg]:size-7 rounded-2xl", lg: "size-20 [&>svg]:size-10 rounded-3xl" };

export function CourseIcon({ course, size = "md", className }: { course: Pick<Course, "id" | "from" | "to">; size?: keyof typeof sizes; className?: string }) {
  const Icon = ICONS[course.id] ?? Code2;
  return (
    <span
      aria-hidden
      className={cn("grid shrink-0 place-items-center text-white shadow-lg", sizes[size], className)}
      style={{
        backgroundImage: `linear-gradient(135deg, ${course.from}, ${course.to})`,
        boxShadow: `0 10px 24px -10px ${course.to}`,
      }}
    >
      <Icon strokeWidth={2.2} />
    </span>
  );
}
