import type { Metadata } from "next";
import "@phosphor-icons/web/regular";
import "@phosphor-icons/web/bold";
import "@phosphor-icons/web/fill";
import "./globals.css";

export const metadata: Metadata = {
  title: "EduAll | LMS, Tutors, Education & Online Course Tailwind CSS Template",
  description:
    "LMS, Tutors, Education & Online Course Tailwind CSS Template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
