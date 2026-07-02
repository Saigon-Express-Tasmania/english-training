import { notFound } from "next/navigation";

import { locales } from "@/i18n/routing";
import {
  getListeningLessonStatus,
  listListeningLessonIds,
  loadListeningLesson,
} from "@/views/listening/lib/load-lesson";
import Listening from "@/views/listening";

type ListeningLessonPageProps = {
  params: Promise<{ locale: string; lessonId: string }>;
};

export function generateStaticParams() {
  const lessonIds = listListeningLessonIds();

  return locales.flatMap((locale) =>
    lessonIds.map((lessonId) => ({
      locale,
      lessonId,
    })),
  );
}

export default async function ListeningLessonPage({ params }: ListeningLessonPageProps) {
  const { lessonId } = await params;

  try {
    loadListeningLesson(lessonId);
  } catch {
    notFound();
  }

  const status = getListeningLessonStatus(lessonId);
  const pinRequired = status !== "old";

  return <Listening lessonId={lessonId} pinRequired={pinRequired} />;
}
