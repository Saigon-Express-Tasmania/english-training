import type { BlankTokenRef, ListeningLessonMetadata } from "@/views/listening/types";

export const BLANK_DIFFICULTY_THRESHOLD = 3;

export function normalizeAnswer(value: string): string {
  return value.trim().toLowerCase().replace(/[.,!?;:"]+$/g, "");
}

export function isAnswerCorrect(studentAnswer: string, expectedWord: string): boolean {
  return normalizeAnswer(studentAnswer) === normalizeAnswer(expectedWord);
}

export function collectBlankTokens(
  segments: ListeningLessonMetadata["segments"],
): BlankTokenRef[] {
  const blanks: BlankTokenRef[] = [];

  for (const segment of segments) {
    segment.tokens.forEach((token, tokenIndex) => {
      if (token.difficulty >= BLANK_DIFFICULTY_THRESHOLD) {
        blanks.push({
          key: `${segment.segment_id}-${tokenIndex}`,
          segmentId: segment.segment_id,
          tokenIndex,
          word: token.word,
        });
      }
    });
  }

  return blanks;
}

export function assessAnswers(
  blanks: BlankTokenRef[],
  answers: Record<string, string>,
): { correct: number; total: number; results: Record<string, boolean> } {
  const results: Record<string, boolean> = {};
  let correct = 0;

  for (const blank of blanks) {
    const isCorrect = isAnswerCorrect(answers[blank.key] ?? "", blank.word);
    results[blank.key] = isCorrect;
    if (isCorrect) correct += 1;
  }

  return { correct, total: blanks.length, results };
}
