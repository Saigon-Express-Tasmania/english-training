"use client";

import { useMemo, useRef, useState } from "react";

import { confirmCheckWithEmptyBlanks } from "@/views/listening/lib/confirm-check-answers";
import { assessAnswers } from "@/views/listening/lib/assess-answers";
import type { VocabularyItem } from "@/views/listening/lib/collect-vocabulary";
import { ListeningUnlockButton } from "@/views/listening/components/listening-unlock-button";
import { WordTooltip } from "@/views/listening/components/word-tooltip";
import { VocabularySidebar } from "@/views/listening/components/vocabulary-sidebar";
import {
  ListeningAudioPlayer,
  type ListeningAudioPlayerHandle,
} from "@/views/listening/components/listening-audio-player";
import type {
  BlankTokenRef,
  ListeningLessonMetadata,
  ListeningSegment,
  ListeningToken,
} from "@/views/listening/types";

type ListeningLessonProps = {
  lesson: ListeningLessonMetadata;
  blanks: BlankTokenRef[];
  shuffleSeed: number;
  vocabularyWords: VocabularyItem[];
};

type WordBlankProps = {
  tokenKey: string;
  expectedWord: string;
  value: string;
  assessed: boolean;
  revealed: boolean;
  isCorrect: boolean | null;
  onChange: (value: string) => void;
};

function WordBlank({
  tokenKey,
  expectedWord,
  value,
  assessed,
  revealed,
  isCorrect,
  onChange,
}: WordBlankProps) {
  const widthCh = Math.max(expectedWord.length + 3, 6);

  if (assessed && revealed && isCorrect === false) {
    return (
      <span className="listening-blank-wrap">
        <span
          className="listening-blank listening-blank--revealed"
          style={{ width: `${widthCh}ch` }}
        >
          {expectedWord}
        </span>
      </span>
    );
  }

  let stateClass = "listening-blank";
  if (assessed && isCorrect === true) stateClass += " listening-blank--correct";
  if (assessed && isCorrect === false) stateClass += " listening-blank--incorrect";

  return (
    <span className="listening-blank-wrap">
      <input
        id={tokenKey}
        type="text"
        className={stateClass}
        style={{ width: `${widthCh}ch` }}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={assessed}
        aria-label="Fill in the missing word"
        autoComplete="off"
        spellCheck={false}
      />
    </span>
  );
}

function renderToken(
  segmentId: number,
  token: ListeningToken,
  tokenIndex: number,
  blankKeys: Set<string>,
  answers: Record<string, string>,
  assessed: boolean,
  revealed: boolean,
  results: Record<string, boolean>,
  onAnswerChange: (key: string, value: string) => void,
) {
  const tokenKey = `${segmentId}-${tokenIndex}`;

  if (blankKeys.has(tokenKey)) {
    return (
      <WordBlank
        key={tokenKey}
        tokenKey={tokenKey}
        expectedWord={token.word}
        value={answers[tokenKey] ?? ""}
        assessed={assessed}
        revealed={revealed}
        isCorrect={assessed ? results[tokenKey] : null}
        onChange={(value) => onAnswerChange(tokenKey, value)}
      />
    );
  }

  return (
    <WordTooltip key={tokenKey} translation={token.translation} className="listening-token">
      {token.word}
    </WordTooltip>
  );
}

type SegmentRowProps = {
  segment: ListeningSegment;
  isPlaying: boolean;
  onPlay: (segment: ListeningSegment) => void;
  blankKeys: Set<string>;
  answers: Record<string, string>;
  assessed: boolean;
  revealed: boolean;
  results: Record<string, boolean>;
  onAnswerChange: (key: string, value: string) => void;
};

function SegmentRow({
  segment,
  isPlaying,
  onPlay,
  blankKeys,
  answers,
  assessed,
  revealed,
  results,
  onAnswerChange,
}: SegmentRowProps) {
  return (
    <div className="listening-segment">
      <button
        type="button"
        className={`listening-segment-play${isPlaying ? " listening-segment-play--active" : ""}`}
        onClick={() => onPlay(segment)}
        aria-label={`Play sentence ${segment.segment_id}`}
      >
        <i className={`ph-${isPlaying ? "fill" : "bold"} ph-play`}></i>
      </button>
      <p className="listening-segment-text">
        {segment.tokens.map((token, tokenIndex) =>
          renderToken(
            segment.segment_id,
            token,
            tokenIndex,
            blankKeys,
            answers,
            assessed,
            revealed,
            results,
            onAnswerChange,
          ),
        )}
      </p>
    </div>
  );
}

export function ListeningLesson({
  lesson,
  blanks,
  shuffleSeed,
  vocabularyWords,
}: ListeningLessonProps) {
  const playerRef = useRef<ListeningAudioPlayerHandle>(null);

  const blankKeys = useMemo(() => new Set(blanks.map((blank) => blank.key)), [blanks]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [assessed, setAssessed] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [score, setScore] = useState<{ correct: number; total: number } | null>(null);
  const [results, setResults] = useState<Record<string, boolean>>({});
  const [playingSegmentId, setPlayingSegmentId] = useState<number | null>(null);

  function clearPlayingSegment() {
    setPlayingSegmentId(null);
  }

  function playSegment(segment: ListeningSegment) {
    setPlayingSegmentId(segment.segment_id);
    playerRef.current?.playFrom(segment.audio_timestamp_start);
  }

  function handleAnswerChange(key: string, value: string) {
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  function submitAssessment() {
    const assessment = assessAnswers(blanks, answers);
    setResults(assessment.results);
    setScore({ correct: assessment.correct, total: assessment.total });
    setAssessed(true);
  }

  async function handleCheckAnswers() {
    const filledCount = blanks.filter(
      (blank) => (answers[blank.key] ?? "").trim() !== "",
    ).length;

    if (filledCount < blanks.length) {
      const confirmed = await confirmCheckWithEmptyBlanks({
        filledCount,
        totalBlanks: blanks.length,
      });

      if (!confirmed) {
        return;
      }
    }

    submitAssessment();
  }

  function handleRevealAnswers() {
    setRevealed(true);
  }

  function handleTryAgain() {
    setAnswers({});
    setAssessed(false);
    setRevealed(false);
    setScore(null);
    setResults({});
  }

  const scorePercent =
    score && score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  return (
    <section
      className="listening-lesson bg-main-25 py-120"
      data-shuffle-seed={shuffleSeed}
    >
      <div className="container">
        <div className="row gap-y-[1.5rem]">
          <div className="col-12 col-xl-8">
            <div className="listening-lesson__card border-neutral-30 rounded-12 border bg-white p-32">
              <h1 className="listening-lesson__title mb-16">{lesson.title}</h1>
              <p className="listening-lesson__intro text-neutral-700 mb-32">
                Listen to the audio and fill in the missing words. The hardest vocabulary
                is left blank for you to complete.
              </p>

              <div className="listening-lesson__player-wrap">
                <ListeningAudioPlayer
                  ref={playerRef}
                  src={lesson.audio}
                  onPause={clearPlayingSegment}
                  onFinish={clearPlayingSegment}
                />
              </div>

              <span className="border-bottom border-main-100 my-32 block"></span>

              <h2 className="mb-16 text-xl font-semibold">Transcript</h2>
              <div className="listening-transcript">
                {lesson.segments.map((segment) => (
                  <SegmentRow
                    key={segment.segment_id}
                    segment={segment}
                    isPlaying={playingSegmentId === segment.segment_id}
                    onPlay={playSegment}
                    blankKeys={blankKeys}
                    answers={answers}
                    assessed={assessed}
                    revealed={revealed}
                    results={results}
                    onAnswerChange={handleAnswerChange}
                  />
                ))}
              </div>

              <div className="listening-lesson__actions mt-40 flex flex-wrap items-center gap-16">
                {!unlocked ? <ListeningUnlockButton onUnlock={() => setUnlocked(true)} /> : null}

                {!assessed ? (
                  <button
                    type="button"
                    className="btn btn-main rounded-pill !flex items-center justify-center gap-8"
                    onClick={() => {
                      void handleCheckAnswers();
                    }}
                  >
                    Check Answers
                    <i className="ph-bold ph-check-circle flex text-lg"></i>
                  </button>
                ) : (
                  <>
                    {!revealed && unlocked ? (
                      <button
                        type="button"
                        className="btn btn-main rounded-pill !flex items-center justify-center gap-8"
                        onClick={handleRevealAnswers}
                      >
                        Reveal Answers
                        <i className="ph-bold ph-eye flex text-lg"></i>
                      </button>
                    ) : null}
                    <button
                      type="button"
                      className="btn btn-outline-main rounded-pill !flex items-center justify-center gap-8"
                      onClick={handleTryAgain}
                    >
                      Try Again
                      <i className="ph-bold ph-arrow-counter-clockwise flex text-lg"></i>
                    </button>
                  </>
                )}
              </div>

              {assessed && score ? (
                <div
                  className={`listening-results mt-32 rounded-12 p-24${
                    scorePercent >= 80
                      ? " listening-results--good"
                      : scorePercent >= 50
                        ? " listening-results--ok"
                        : " listening-results--low"
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  <h3 className="mb-8 text-lg font-semibold">Your score</h3>
                  <p className="mb-0">
                    You got <strong>{score.correct}</strong> out of{" "}
                    <strong>{score.total}</strong> correct ({scorePercent}%).
                    {scorePercent >= 80
                      ? " Great job!"
                      : scorePercent >= 50
                        ? " Keep practicing — listen again and try the blanks you missed."
                        : " Listen once more, then fill in the blanks and check again."}
                  </p>
                  <p className="listening-results__hint mt-12 mb-0 text-sm">
                    {revealed
                      ? "Correct answers are shown in place for any blanks you missed."
                      : unlocked
                        ? "Use Reveal Answers when you want to see the correct words."
                        : "Unlock with PIN to reveal the correct words."}
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <div className="col-12 col-xl-4">
            <VocabularySidebar
              words={vocabularyWords}
              unlocked={unlocked}
              onUnlock={() => setUnlocked(true)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
