import type { ListeningLessonMetadata } from "@/views/listening/types";

export const HIGH_DIFFICULTY_THRESHOLD = 3;

export type VocabularyItem = {
  word: string;
  translation: string;
  difficulty: number;
  type: string;
};

type RandomFn = () => number;

function createSeededRandom(seed: number): RandomFn {
  let state = seed >>> 0;

  return () => {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function shuffleInPlace<T>(items: T[], random: RandomFn): void {
  for (let index = items.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [items[index], items[swapIndex]] = [items[swapIndex], items[index]];
  }
}

export function collectHighDifficultyWords(
  segments: ListeningLessonMetadata["segments"],
  minDifficulty = HIGH_DIFFICULTY_THRESHOLD,
): VocabularyItem[] {
  const byWord = new Map<string, VocabularyItem>();

  for (const segment of segments) {
    for (const token of segment.tokens) {
      if (token.difficulty < minDifficulty || !token.translation) {
        continue;
      }

      const key = token.word.toLowerCase();
      const existing = byWord.get(key);

      if (!existing || token.difficulty > existing.difficulty) {
        byWord.set(key, {
          word: token.word,
          translation: token.translation,
          difficulty: token.difficulty,
          type: token.type,
        });
      }
    }
  }

  return [...byWord.values()].sort((a, b) => {
    if (b.difficulty !== a.difficulty) {
      return b.difficulty - a.difficulty;
    }

    return a.word.localeCompare(b.word);
  });
}

export function shuffleVocabulary(
  words: VocabularyItem[],
  shuffleSeed: number,
): VocabularyItem[] {
  const shuffled = [...words];
  shuffleInPlace(shuffled, createSeededRandom(shuffleSeed ^ 0x9e3779b9));
  return shuffled;
}
