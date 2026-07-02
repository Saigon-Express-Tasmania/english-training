import fs from "fs";
import path from "path";

import { randomInt } from "node:crypto";

import type { ListeningLessonMetadata } from "@/views/listening/types";

const listeningRoot = path.join(process.cwd(), "public", "listening");
const manifestPath = path.join(listeningRoot, "manifest.json");

export type ListeningLessonStatus = "new" | "old";

export type ListeningManifestEntry = {
  name: string;
  status: ListeningLessonStatus;
};

function stripBom(text: string): string {
  return text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
}

function parseListeningLessonMetadata(
  raw: string,
  lessonId: string,
): ListeningLessonMetadata | null {
  try {
    const parsed = JSON.parse(stripBom(raw)) as Omit<ListeningLessonMetadata, "audio"> & {
      audio?: string;
    };

    if (
      typeof parsed.title !== "string" ||
      !parsed.title.trim() ||
      !Array.isArray(parsed.segments) ||
      parsed.segments.length === 0
    ) {
      return null;
    }

    return {
      ...parsed,
      audio: parsed.audio ?? getLessonAudioPath(lessonId),
    };
  } catch {
    return null;
  }
}

export function tryLoadListeningLesson(lessonId: string): ListeningLessonMetadata | null {
  const filePath = path.join(listeningRoot, lessonId, "metadata.json");

  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return parseListeningLessonMetadata(raw, lessonId);
  } catch {
    return null;
  }
}

export function loadListeningManifest(): ListeningManifestEntry[] {
  if (!fs.existsSync(manifestPath)) {
    return [];
  }

  try {
    const parsed = JSON.parse(stripBom(fs.readFileSync(manifestPath, "utf-8")));

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((item) => typeof item?.name === "string")
      .map((item) => ({
        name: item.name,
        status: item.status === "new" ? "new" : "old",
      }));
  } catch {
    return [];
  }
}

export function getListeningLessonStatus(lessonId: string): ListeningLessonStatus | null {
  const entry = loadListeningManifest().find((item) => item.name === lessonId);
  return entry?.status ?? null;
}

export function listListeningLessonIds(): string[] {
  const manifest = loadListeningManifest();

  if (manifest.length > 0) {
    return manifest
      .map((entry) => entry.name)
      .filter((lessonId) => tryLoadListeningLesson(lessonId) !== null);
  }

  if (!fs.existsSync(listeningRoot)) {
    return [];
  }

  return fs
    .readdirSync(listeningRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((lessonId) => tryLoadListeningLesson(lessonId) !== null)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

export type ListeningLessonSummary = {
  id: string;
  title: string;
  segmentCount: number;
  status: ListeningLessonStatus;
};

function compareLessonSummaries(a: ListeningLessonSummary, b: ListeningLessonSummary) {
  if (a.status !== b.status) {
    return a.status === "new" ? -1 : 1;
  }

  return a.id.localeCompare(b.id, undefined, { numeric: true });
}

export function listListeningLessonsSummary(): ListeningLessonSummary[] {
  const manifest = loadListeningManifest();
  const manifestEntries =
    manifest.length > 0
      ? manifest
      : listListeningLessonIds().map((name) => ({ name, status: "old" as const }));

  return manifestEntries
    .map((entry) => {
      const lesson = tryLoadListeningLesson(entry.name);
      if (!lesson) {
        return null;
      }

      return {
        id: entry.name,
        title: lesson.title,
        segmentCount: lesson.segments.length,
        status: entry.status,
      };
    })
    .filter((lesson): lesson is ListeningLessonSummary => lesson !== null)
    .sort(compareLessonSummaries);
}

export function getLessonAudioPath(lessonId: string): string {
  return `/listening/${lessonId}/${lessonId}.mp3`;
}

export function loadListeningLesson(lessonId: string): ListeningLessonMetadata {
  const lesson = tryLoadListeningLesson(lessonId);

  if (!lesson) {
    throw new Error(`Listening lesson not found: ${lessonId}`);
  }

  return lesson;
}

export function createShuffleSeed(): number {
  return randomInt(1, 0xffffffff);
}
