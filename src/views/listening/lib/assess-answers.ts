import type { BlankTokenRef, ListeningLessonMetadata } from "@/views/listening/types";

export const DEFAULT_BLANK_PERCENTAGE_LIMIT = 40;

export function normalizeAnswer(value: string): string {
  return value.trim().toLowerCase().replace(/[.,!?;:"]+$/g, "");
}

export function isAnswerCorrect(studentAnswer: string, expectedWord: string): boolean {
  return normalizeAnswer(studentAnswer) === normalizeAnswer(expectedWord);
}

type BlankCandidate = BlankTokenRef & { difficulty: number };
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

function sortByDifficultyWithRandomTies(
  candidates: BlankCandidate[],
  random: RandomFn,
): BlankCandidate[] {
  const groupedByDifficulty = new Map<number, BlankCandidate[]>();

  for (const candidate of candidates) {
    const group = groupedByDifficulty.get(candidate.difficulty) ?? [];
    group.push(candidate);
    groupedByDifficulty.set(candidate.difficulty, group);
  }

  const sorted: BlankCandidate[] = [];
  const difficulties = [...groupedByDifficulty.keys()].sort((a, b) => b - a);

  for (const difficulty of difficulties) {
    const group = groupedByDifficulty.get(difficulty) ?? [];
    shuffleInPlace(group, random);
    sorted.push(...group);
  }

  return sorted;
}

function collectBlankCandidates(
  segments: ListeningLessonMetadata["segments"],
): BlankCandidate[] {
  const candidates: BlankCandidate[] = [];

  for (const segment of segments) {
    segment.tokens.forEach((token, tokenIndex) => {
      candidates.push({
        key: `${segment.segment_id}-${tokenIndex}`,
        segmentId: segment.segment_id,
        tokenIndex,
        word: token.word,
        difficulty: token.difficulty,
      });
    });
  }

  return candidates;
}

function buildEvenSegmentQuotas(
  segmentIds: number[],
  maxBlanks: number,
  random: RandomFn,
): Map<number, number> {
  const quotas = new Map<number, number>();
  const baseQuota = Math.floor(maxBlanks / segmentIds.length);
  const extraQuotaCount = maxBlanks % segmentIds.length;
  const shuffledSegmentIds = [...segmentIds];

  shuffleInPlace(shuffledSegmentIds, random);

  for (const segmentId of segmentIds) {
    quotas.set(segmentId, baseQuota);
  }

  for (let index = 0; index < extraQuotaCount; index += 1) {
    const segmentId = shuffledSegmentIds[index];
    quotas.set(segmentId, (quotas.get(segmentId) ?? 0) + 1);
  }

  return quotas;
}

function toBlankTokenRef(candidate: BlankCandidate): BlankTokenRef {
  return {
    key: candidate.key,
    segmentId: candidate.segmentId,
    tokenIndex: candidate.tokenIndex,
    word: candidate.word,
  };
}

export function selectBlankTokens(
  segments: ListeningLessonMetadata["segments"],
  blankPercentageLimit: number,
  shuffleSeed: number,
): BlankTokenRef[] {
  const random = createSeededRandom(shuffleSeed >>> 0);
  const candidates = collectBlankCandidates(segments);
  const maxBlanks = Math.floor((candidates.length * blankPercentageLimit) / 100);

  if (maxBlanks === 0 || segments.length === 0) {
    return [];
  }

  const eligibleBySegment = new Map<number, BlankCandidate[]>();

  for (const segment of segments) {
    const eligible = candidates.filter(
      (candidate) =>
        candidate.segmentId === segment.segment_id && candidate.tokenIndex !== 0,
    );
    eligibleBySegment.set(segment.segment_id, eligible);
  }

  const segmentIds = segments.map((segment) => segment.segment_id);
  const quotas = buildEvenSegmentQuotas(segmentIds, maxBlanks, random);
  const selectedKeys = new Set<string>();
  const selected: BlankCandidate[] = [];

  for (const segmentId of segmentIds) {
    const quota = quotas.get(segmentId) ?? 0;
    const eligible = sortByDifficultyWithRandomTies(
      eligibleBySegment.get(segmentId) ?? [],
      random,
    );
    const picks = eligible.slice(0, quota);

    for (const pick of picks) {
      selected.push(pick);
      selectedKeys.add(pick.key);
    }
  }

  const shortfall = maxBlanks - selected.length;

  if (shortfall > 0) {
    const remaining = sortByDifficultyWithRandomTies(
      candidates.filter(
        (candidate) => candidate.tokenIndex !== 0 && !selectedKeys.has(candidate.key),
      ),
      random,
    );

    for (const candidate of remaining.slice(0, shortfall)) {
      selected.push(candidate);
      selectedKeys.add(candidate.key);
    }
  }

  return selected
    .sort((a, b) => {
      if (a.segmentId !== b.segmentId) {
        return a.segmentId - b.segmentId;
      }

      return a.tokenIndex - b.tokenIndex;
    })
    .map(toBlankTokenRef);
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
