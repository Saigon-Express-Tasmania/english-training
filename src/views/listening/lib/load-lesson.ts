import fs from "fs";
import path from "path";

import { randomInt } from "node:crypto";

import type { ListeningLessonMetadata } from "@/views/listening/types";

export function loadListeningLesson(lessonId: string): ListeningLessonMetadata {
  const filePath = path.join(
    process.cwd(),
    "public",
    "listening",
    lessonId,
    "metadata.json",
  );

  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as ListeningLessonMetadata;
}

export function createShuffleSeed(): number {
  return randomInt(1, 0xffffffff);
}
