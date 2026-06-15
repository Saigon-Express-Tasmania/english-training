import fs from "fs";
import path from "path";

import { randomInt } from "node:crypto";

import type { ListeningLessonMetadata } from "@/views/listening/types";

const listeningRoot = path.join(process.cwd(), "public", "listening");

export function listListeningLessonIds(): string[] {
  if (!fs.existsSync(listeningRoot)) {
    return [];
  }

  return fs
    .readdirSync(listeningRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((lessonId) =>
      fs.existsSync(path.join(listeningRoot, lessonId, "metadata.json")),
    )
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

export type ListeningLessonSummary = {
  id: string;
  title: string;
  segmentCount: number;
};

export function listListeningLessonsSummary(): ListeningLessonSummary[] {
  return listListeningLessonIds().map((id) => {
    const lesson = loadListeningLesson(id);

    return {
      id,
      title: lesson.title,
      segmentCount: lesson.segments.length,
    };
  });
}

export function getLessonAudioPath(lessonId: string): string {
  return `/listening/${lessonId}/${lessonId}.mp3`;
}

export function loadListeningLesson(lessonId: string): ListeningLessonMetadata {
  const filePath = path.join(listeningRoot, lessonId, "metadata.json");

  if (!fs.existsSync(filePath)) {
    throw new Error(`Listening lesson not found: ${lessonId}`);
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = JSON.parse(raw) as Omit<ListeningLessonMetadata, "audio"> & {
    audio?: string;
  };

  return {
    ...parsed,
    audio: parsed.audio ?? getLessonAudioPath(lessonId),
  };
}

export function createShuffleSeed(): number {
  return randomInt(1, 0xffffffff);
}
