import { About } from "@/views/home/sections/about";
import { Banner } from "@/views/home/sections/banner";
import { Blog } from "@/views/home/sections/blog";
import { Brand } from "@/views/home/sections/brand";
import { Certificate } from "@/views/home/sections/certificate";
import { ChooseUs } from "@/views/home/sections/choose-us";
import { Counter } from "@/views/home/sections/counter";
import { ExploreCourse } from "@/views/home/sections/explore-course";
import { Features } from "@/views/home/sections/features";
import { Footer } from "@/views/home/sections/footer";
import { Header } from "@/views/home/sections/header";
import { Testimonials } from "@/views/home/sections/testimonials";
import { HomeShell } from "@/views/home/components/home-shell";

import "./index.css";

export default function Home() {
  return (
    <HomeShell>
      <Header />
      <Banner />
      <Brand />
      <Features />
      <ExploreCourse />
      <About />
      <ChooseUs />
      <Counter />
      <Testimonials />
      <Blog />
      <Certificate />
      <Footer />
    </HomeShell>
  );
}
