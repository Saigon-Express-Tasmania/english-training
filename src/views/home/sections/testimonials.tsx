"use client";

import { useState } from "react";
import { testimonials } from "@/assets/data/home";
import { images } from "@/assets/images";
import { EduImage } from "@/views/home/edu-image";
import {
  EduCarouselArrows,
  EduCarouselSlide,
  EduCarouselViewport,
  useEduCarousel,
} from "@/views/home/components/edu-carousel";

function StarRating() {
  return (
    <ul className="mb-16 flex items-center gap-8">
      <li className="text-warning-600 flex text-xl">
        <i className="ph-fill ph-star"></i>
      </li>
      <li className="text-warning-600 flex text-xl">
        <i className="ph-fill ph-star"></i>
      </li>
      <li className="text-warning-600 flex text-xl">
        <i className="ph-fill ph-star"></i>
      </li>
      <li className="text-warning-600 flex text-xl">
        <i className="ph-fill ph-star"></i>
      </li>
      <li className="text-warning-600 flex text-xl">
        <i className="ph-fill ph-star-half"></i>
      </li>
    </ul>
  );
}

export function Testimonials() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const contentCarousel = useEduCarousel({
    selectedIndex,
    onSelect: setSelectedIndex,
    loop: true,
  });

  const thumbsCarousel = useEduCarousel({
    selectedIndex,
    onSelect: setSelectedIndex,
    loop: true,
  });

  const arrowClassName =
    "slick-arrow rounded-circle hover-border-main-600 hover-bg-main-600 hover-text-white transition-1 !flex h-48 w-48 items-center justify-center border border-gray-100 text-xl";

  return (
    <section className="testimonials bg-main-25 relative z-1 py-120">
      <EduImage
        src={images.shape2}
        alt="Image"
        className="shape six animation-scalation"
      />{" "}
      <EduImage
        src={images.shape3}
        alt="Image"
        className="shape four animation-rotation"
      />
      <div className="container">
        <div className="row gap-y-[3rem]">
          <div className="col-lg-6">
            <div className="testimonials__thumbs-slider pe-lg-5 me-xxl-5">
              <EduCarouselViewport
                emblaRef={thumbsCarousel.emblaRef}
                className="edu-carousel__viewport--testimonial-thumbs"
              >
                {testimonials.map((item) => (
                  <EduCarouselSlide key={item.name}>
                    <div className="testimonials__thumbs">
                      <EduImage src={item.image} alt="Image" />
                    </div>
                  </EduCarouselSlide>
                ))}
              </EduCarouselViewport>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="testimonials__content">
              <div className="section-heading style-left">
                <div
                  className="wow bounceInDown mb-16 flex items-center gap-8"
                  data-aos="fade-down"
                >
                  <span className="bg-main-600 rounded-circle h-8 w-8"></span>
                  <h5 className="text-main-600 mb-0">What Our Students Say</h5>
                </div>
                <h2 className="wow bounceIn mb-24" data-aos="fade-up">
                  Testimonials from Happy Learners for EduAll
                </h2>
                <p
                  className="text-line-2 wow bounceInUp text-neutral-500"
                  data-aos="fade-up"
                >
                  16+ million Students are already learning on EduAll Platform
                </p>
              </div>
              <div className="testimonials__slider">
                <EduCarouselViewport emblaRef={contentCarousel.emblaRef}>
                  {testimonials.map((item) => (
                    <EduCarouselSlide key={item.name}>
                      <div className="testimonials-item">
                        <StarRating />
                        <p className="text-neutral-700">{item.quote}</p>
                        <h4 className="mt-48 mb-8">{item.name}</h4>
                        <span className="text-neutral-700">{item.role}</span>
                      </div>
                    </EduCarouselSlide>
                  ))}
                </EduCarouselViewport>
              </div>
              <EduCarouselArrows
                scrollPrev={contentCarousel.scrollPrev}
                scrollNext={contentCarousel.scrollNext}
                prevId="testimonials-prev"
                nextId="testimonials-next"
                prevClassName={`slick-prev ${arrowClassName}`}
                nextClassName={`slick-next ${arrowClassName}`}
                wrapperClassName="mt-40 flex items-center gap-16"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
