import Lessons from "@/views/lessons";

type LessonsPageProps = {
  params: Promise<{ locale: string }>;
};

export default function LessonsPage(_props: LessonsPageProps) {
  return <Lessons />;
}
