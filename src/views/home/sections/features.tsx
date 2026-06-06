"use client";

import { features } from "@/assets/data/home";
import { images } from "@/assets/images";
import { EduImage } from "@/views/home/edu-image";
import {
  EduCarouselArrows,
  EduCarouselSlide,
  EduCarouselViewport,
  useEduCarousel,
} from "@/views/home/components/edu-carousel";

export function Features() {
  const { emblaRef, scrollPrev, scrollNext, slideStyle } = useEduCarousel({
    slidesPerView: { default: 3, lg: 2, md: 2, sm: 2 },
    loop: true,
  });

  const arrowClassName =
    "slick-arrow rounded-circle hover-border-main-600 hover-bg-main-600 hover-text-white transition-1 !flex h-48 w-48 items-center justify-center border border-gray-100 text-xl";

  return (
    <section className="features relative overflow-hidden py-120">
      <EduImage
        src={images.shape2}
        alt="Image"
        className="shape two animation-scalation"
      />{" "}
      <EduImage
        src={images.shape4}
        alt="Image"
        className="shape six animation-walking"
      />
      <div className="container">
        <div className="section-heading text-center">
          <h2 className="wow bounceIn mb-24" data-aos="fade-up">
            Explore 4,000+ Free Online Courses For Students
          </h2>
          <p className="wow bounceInUp" data-aos="fade-up">
            Welcome to our diverse and dynamic course catalog. we&apos;re
            dedicated to providing you with access to high-quality education
          </p>
        </div>
        <div className="features-slider">
          <EduCarouselViewport emblaRef={emblaRef} slideStyle={slideStyle}>
            {features.map((feature, index) => (
              <EduCarouselSlide key={`${feature.title}-${index}`} slideStyle={slideStyle}>
                <div
                  className="px-8"
                  data-aos="zoom-in"
                  data-aos-duration={400 + index * 400}
                >
                  <div className="features-item item-hover animation-item bg-main-25 border-neutral-30 rounded-16 transition-1 hover-bg-main-600 hover-border-main-600 border">
                    <span className="rounded-circle mb-32 !flex h-110 w-110 items-center justify-center bg-white">
                      <EduImage
                        src={feature.icon}
                        className="animate__bounced"
                        alt="Image"
                      />
                    </span>
                    <h4 className="transition-1 item-hover__text mb-16">
                      {feature.title}
                    </h4>
                    <p className="transition-1 item-hover__text text-line-2">
                      {feature.description}
                    </p>
                    <a
                      href="course-list-view.html"
                      className="item-hover__text text-main-600 hover-text-decoration-underline transition-1 mt-24 !flex items-center gap-8"
                    >
                      View Category <i className="ph ph-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </EduCarouselSlide>
            ))}
          </EduCarouselViewport>
        </div>
        <EduCarouselArrows
          scrollPrev={scrollPrev}
          scrollNext={scrollNext}
          prevId="features-prev"
          nextId="features-next"
          prevClassName={`slick-prev ${arrowClassName}`}
          nextClassName={`slick-next ${arrowClassName}`}
          wrapperClassName="justify-content-center alter-arrow mt-40 flex items-center gap-16"
        />
      </div>
    </section>
  );
}
