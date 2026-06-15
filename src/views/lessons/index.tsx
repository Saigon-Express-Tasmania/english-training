import { Certificate } from "@/views/home/sections/certificate";
import { Footer } from "@/views/home/sections/footer";
import { Header } from "@/views/home/sections/header";
import { HomeShell } from "@/views/home/components/home-shell";
import { listListeningLessonsSummary } from "@/views/listening/lib/load-lesson";
import { Breadcrumb } from "@/views/lessons/sections/breadcrumb";
import { ListeningLessonsList } from "@/views/lessons/sections/listening-lessons-list";

import "./index.css";

export default function Lessons() {
  const lessons = listListeningLessonsSummary();

  return (
    <HomeShell>
      <Header />
      <Breadcrumb />
      <ListeningLessonsList lessons={lessons} />
      <Certificate />
      <Footer />
    </HomeShell>
  );
}
