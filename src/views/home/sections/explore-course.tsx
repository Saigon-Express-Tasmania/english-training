"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import { courseTabs, courses } from "@/assets/data/home";
import { images } from "@/assets/images";
import { EduImage } from "@/views/home/edu-image";

function CourseCard({
  course,
  duration,
}: {
  course: (typeof courses)[number];
  duration: number;
}) {
  return (
    <div
      className="col-lg-4 col-sm-6 wow fadeInUp"
      data-aos="fade-up"
      data-aos-duration={duration}
    >
      <div className="course-item rounded-16 box-shadow-md h-100 bg-white p-12">
        <div className="course-item__thumb rounded-12 relative overflow-hidden">
          <a href="course-details.html" className="h-100 w-100">
            <EduImage
              src={course.image}
              alt="Course Image"
              className="course-item__img rounded-12 cover-img transition-2"
            />
          </a>
          <div className="bg-main-600 rounded-pill inset-block-start-0 inset-inline-start-0 absolute z-1 ms-20 mt-20 flex items-center gap-8 px-24 py-12 text-white">
            <span className="flex text-2xl">
              <i className="ph ph-clock"></i>{" "}
            </span>
            <span className="text-lg font-medium">{course.duration}</span>
          </div>
          <button
            type="button"
            className="wishlist-btn text-main-two-600 inset-block-start-0 inset-inline-end-0 rounded-circle transition-2 absolute z-1 me-20 mt-20 !flex h-48 w-48 items-center justify-center bg-white text-2xl"
          >
            <i className="ph ph-heart"></i>
          </button>
        </div>
        <div className="course-item__content">
          <div>
            <h4 className="mb-28">
              <a href="course-details.html" className="link text-line-2">
                {course.title}
              </a>
            </h4>
            <div className="mb-16 flex flex-wrap items-center justify-between gap-8">
              <div className="flex items-center gap-8">
                <span className="flex text-2xl text-neutral-700">
                  <i className="ph-bold ph-video-camera"></i>{" "}
                </span>
                <span className="text-lg font-medium text-neutral-700">
                  {course.lessons}
                </span>
              </div>
              <div className="flex items-center gap-8">
                <span className="flex text-2xl text-neutral-700">
                  <i className="ph-bold ph-chart-bar"></i>{" "}
                </span>
                <span className="text-lg font-medium text-neutral-700">
                  {course.level}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-8">
              <div className="flex items-center gap-4">
                <span className="text-warning-600 flex text-2xl font-medium">
                  <i className="ph-fill ph-star"></i>{" "}
                </span>
                <span className="text-lg text-neutral-700">
                  {course.rating}{" "}
                  <span className="text-neutral-100">({course.reviews})</span>
                </span>
              </div>
              <div className="flex items-center gap-8">
                <span className="flex text-2xl text-neutral-700">
                  <EduImage
                    src={course.instructorImage}
                    alt="User Image"
                    className="object-fit-cover rounded-circle h-32 w-32"
                  />{" "}
                </span>
                <span className="text-lg font-medium text-neutral-700">
                  {course.instructor}
                </span>
              </div>
            </div>
          </div>
          <div className="border-top mt-28 flex items-center justify-between gap-8 border-0 border-dashed border-neutral-50 pt-24">
            <h4 className="text-main-two-600 mb-0">{course.price}</h4>
            <a
              href="apply-admission.html"
              className="text-main-600 hover-text-decoration-underline transition-1 fw-semibold flex items-center gap-8"
              tabIndex={0}
            >
              Enroll Now <i className="ph ph-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ExploreCourse() {
  const [activeTab, setActiveTab] = useState<(typeof courseTabs)[number]["id"]>(
    courseTabs[0].id
  );

  useEffect(() => {
    AOS.refresh();
  }, [activeTab]);

  return (
    <section className="explore-course bg-main-25 relative z-1 py-120">
      <EduImage
        src={images.shape2}
        alt="Image"
        className="shape one animation-scalation"
      />{" "}
      <EduImage
        src={images.shape6}
        alt="Image"
        className="shape three animation-walking"
      />
      <div className="container">
        <div
          className="section-heading style-flex gap-24 text-center"
          data-aos="fade-up"
        >
          <div className="section-heading__inner text-start">
            <h2 className="wow bounceIn mb-0">
              Explore 4,000+ Free Online Courses For Students
            </h2>
          </div>
          <div className="section-heading__content">
            <p className="section-heading__desc text-line-2 wow bounceInUp mt-0 text-start">
              Welcome to our diverse and dynamic course catalog. we&apos;re
              dedicated to providing you...
            </p>
            <a
              href="course-list-view.html"
              className="item-hover__text text-main-600 hover-text-decoration-underline transition-1 mt-24 !flex items-center gap-8"
              tabIndex={0}
            >
              See All Course <i className="ph ph-arrow-right"></i>
            </a>
          </div>
        </div>
        <ul
          className="nav nav-pills common-tab gap-16"
          id="pills-tab"
          role="tablist"
        >
          {courseTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <li key={tab.id} className="nav-item" role="presentation">
                <button
                  className={`nav-link rounded-pill bg-main-25 text-md !flex w-100 items-center justify-center gap-8 font-medium text-neutral-500${isActive ? " active" : ""}`}
                  id={`${tab.id}-tab`}
                  type="button"
                  role="tab"
                  aria-controls={tab.id}
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <i className={`ph-bold ${tab.icon} flex text-xl`}></i>{" "}
                  {tab.label}
                </button>
              </li>
            );
          })}
        </ul>
        <div className="tab-content mt-40" id="pills-tabContent">
          {courseTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <div
                key={tab.id}
                className={`tab-pane fade${isActive ? " show active" : ""}`}
                id={tab.id}
                role="tabpanel"
                aria-labelledby={`${tab.id}-tab`}
                tabIndex={0}
                hidden={!isActive}
              >
                <div className="row gap-y-[1.5rem]">
                  {courses.map((course, index) => (
                    <CourseCard
                      key={`${tab.id}-${course.title}`}
                      course={course}
                      duration={200 + index * 200}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
