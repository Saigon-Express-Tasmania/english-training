import { Certificate } from "@/views/home/sections/certificate";
import { Footer } from "@/views/home/sections/footer";
import { Header } from "@/views/home/sections/header";
import { HomeShell } from "@/views/home/components/home-shell";
import { CourseDetails } from "@/views/listening/sections/course-details";

import "./index.css";

export default function Listening() {
  return (
    <HomeShell>
      <Header />
      <CourseDetails />
      <Certificate />
      <Footer />
    </HomeShell>
  );
}
