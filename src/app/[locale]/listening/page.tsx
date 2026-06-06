import Listening from "@/views/listening";

type ListeningPageProps = {
  params: Promise<{ locale: string }>;
};

export default function ListeningPage(_props: ListeningPageProps) {
  return <Listening />;
}
