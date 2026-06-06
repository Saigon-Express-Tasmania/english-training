import { Footer } from "@/views/home/sections/footer";
import { Header } from "@/views/home/sections/header";
import { HomeShell } from "@/views/home/components/home-shell";
import { loadListeningLesson } from "@/views/listening/lib/load-lesson";
import { ListeningLesson } from "@/views/listening/sections/listening-lesson";

import "./index.css";

export default function Listening() {
  const lesson = loadListeningLesson("lesson1");

  return (
    <HomeShell>
      <Header />
      <ListeningLesson lesson={lesson} />
      <Footer />
    </HomeShell>
  );
}
