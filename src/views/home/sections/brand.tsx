"use client";

import { brandLogos } from "@/assets/data/home";
import { EduImage } from "@/views/home/edu-image";
import {
  EduCarouselSlide,
  EduCarouselViewport,
  useEduCarousel,
} from "@/views/home/components/edu-carousel";

export function Brand() {
  const { emblaRef, slideStyle } = useEduCarousel({
    slidesPerView: { default: 7, xl: 6, lg: 4, md: 3, sm: 2 },
    autoplay: true,
    loop: true,
  });

  return (
    <div
      className="wow bounceInUp"
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-delay="500"
    >
      <div className="container--lg container">
        <div className="brand-box bg-main-25 border-neutral-30 rounded-16 border px-16 py-80">
          <h5 className="mb-40 text-center text-neutral-500">
            TRUSTED BY OVER 17,300 GREAT TEAMS
          </h5>
          <div className="container">
            <div className="brand-slider">
              <EduCarouselViewport emblaRef={emblaRef} slideStyle={slideStyle}>
                {brandLogos.map((logo, index) => (
                  <EduCarouselSlide
                    key={index}
                    className="brand-slider__item px-24"
                    slideStyle={slideStyle}
                  >
                    <EduImage src={logo} alt="Image" />
                  </EduCarouselSlide>
                ))}
              </EduCarouselViewport>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
