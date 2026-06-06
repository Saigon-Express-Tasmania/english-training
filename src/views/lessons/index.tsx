import { Certificate } from "@/views/home/sections/certificate";
import { Footer } from "@/views/home/sections/footer";
import { Header } from "@/views/home/sections/header";
import { HomeShell } from "@/views/home/components/home-shell";
import { Breadcrumb } from "@/views/lessons/sections/breadcrumb";
import { CourseListView } from "@/views/lessons/sections/course-list-view";

import "./index.css";

export default function Lessons() {
  return (
    <HomeShell>
      <Header />
      <Breadcrumb />
      <CourseListView />
      <Certificate />
      <Footer />
    </HomeShell>
  );
}
