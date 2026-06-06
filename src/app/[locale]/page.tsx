import Home from "@/views/home";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default function HomePage(_props: HomePageProps) {
  return <Home />;
}
