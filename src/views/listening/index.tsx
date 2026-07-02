import { Footer } from "@/views/home/sections/footer";
import { Header } from "@/views/home/sections/header";
import { HomeShell } from "@/views/home/components/home-shell";
import {
  DEFAULT_BLANK_PERCENTAGE_LIMIT,
  selectBlankTokens,
} from "@/views/listening/lib/assess-answers";
import {
  collectHighDifficultyWords,
  shuffleVocabulary,
} from "@/views/listening/lib/collect-vocabulary";
import { createShuffleSeed, loadListeningLesson } from "@/views/listening/lib/load-lesson";
import { ListeningLesson } from "@/views/listening/sections/listening-lesson";

import "./index.css";

type ListeningProps = {
  lessonId: string;
  pinRequired?: boolean;
};

export default function Listening({ lessonId, pinRequired = true }: ListeningProps) {
  const lesson = loadListeningLesson(lessonId);
  const shuffleSeed = createShuffleSeed();
  const blanks = selectBlankTokens(
    lesson.segments,
    DEFAULT_BLANK_PERCENTAGE_LIMIT,
    shuffleSeed,
  );
  const vocabularyWords = shuffleVocabulary(
    collectHighDifficultyWords(lesson.segments),
    shuffleSeed,
  );

  return (
    <HomeShell>
      <Header />
      <ListeningLesson
        lesson={lesson}
        blanks={blanks}
        shuffleSeed={shuffleSeed}
        vocabularyWords={vocabularyWords}
        pinRequired={pinRequired}
      />
      <Footer />
    </HomeShell>
  );
}
