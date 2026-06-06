import { redirect } from "@/i18n/navigation";

type ListeningPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ListeningPage({ params }: ListeningPageProps) {
  const { locale } = await params;

  redirect({ href: "/listening/lesson1", locale });
}
