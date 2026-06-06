"use client";

import { useState } from "react";

import type { VocabularyItem } from "@/views/listening/lib/collect-vocabulary";

type VocabularySidebarProps = {
  words: VocabularyItem[];
};

export function VocabularySidebar({ words }: VocabularySidebarProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <aside className="listening-vocab border-neutral-30 rounded-12 border bg-white p-24">
      <div className="listening-vocab__header mb-12">
        <h2 className="listening-vocab__title mb-4 text-lg font-semibold">Key vocabulary</h2>
        <p className="listening-vocab__subtitle mb-0 text-sm text-neutral-500">
          Difficult words from this lesson
        </p>
      </div>

      <button
        type="button"
        className="btn btn-outline-main rounded-pill listening-vocab__toggle !flex w-100 items-center justify-center gap-8"
        onClick={() => setRevealed((current) => !current)}
        aria-expanded={revealed}
        aria-controls="listening-vocab-list"
      >
        {revealed ? (
          <>
            Hide words
            <i className="ph-bold ph-eye-slash flex text-lg"></i>
          </>
        ) : (
          <>
            Show words
            <i className="ph-bold ph-eye flex text-lg"></i>
          </>
        )}
      </button>

      {revealed ? (
        <ul id="listening-vocab-list" className="listening-vocab__list mt-16 mb-0">
          {words.map((item) => (
            <li key={item.word} className="listening-vocab__item">
              <span className="listening-vocab__word">{item.word}</span>
              <span className="listening-vocab__type">{item.type}</span>
              <span className="listening-vocab__translation">{item.translation}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="listening-vocab__placeholder mt-12 mb-0 text-sm text-neutral-500">
          {words.length} words available. Click the button above when you need a hint.
        </p>
      )}
    </aside>
  );
}
