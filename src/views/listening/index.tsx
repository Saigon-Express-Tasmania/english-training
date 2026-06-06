import { Footer } from "@/views/home/sections/footer";
import { Header } from "@/views/home/sections/header";
import { HomeShell } from "@/views/home/components/home-shell";
import {
  DEFAULT_BLANK_PERCENTAGE_LIMIT,
  selectBlankTokens,
} from "@/views/listening/lib/assess-answers";
import { createShuffleSeed, loadListeningLesson } from "@/views/listening/lib/load-lesson";
import { ListeningLesson } from "@/views/listening/sections/listening-lesson";

import "./index.css";

export default function Listening() {
  const lesson = loadListeningLesson("lesson1");
  const shuffleSeed = createShuffleSeed();
  const blanks = selectBlankTokens(
    lesson.segments,
    DEFAULT_BLANK_PERCENTAGE_LIMIT,
    shuffleSeed,
  );

  return (
    <HomeShell>
      <Header />
      <ListeningLesson lesson={lesson} blanks={blanks} shuffleSeed={shuffleSeed} />
      <Footer />
    </HomeShell>
  );
}
