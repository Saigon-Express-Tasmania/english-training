"use client";

import { useState } from "react";
import type { CourseItem } from "@/assets/data/home";
import {
  filterCategories,
  levelFilters,
  listCourses,
  paginationItems,
  popularTags,
  sortOptions,
  starFilters,
} from "@/assets/data/lessons";
import { EduImage } from "@/views/home/edu-image";

function CourseListCard({ course }: { course: CourseItem }) {
  return (
    <div className="col-12">
      <div className="course-item bg-main-25 rounded-16 border-neutral-30 list-view h-100 border p-12">
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
        <div className="course-item__content flex-grow-1">
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

export function CourseListView() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [priceMin, setPriceMin] = useState(10);
  const [priceMax, setPriceMax] = useState(560);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <section className="course-list-view py-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div
              className={`sidebar rounded-12 bg-main-25 border-neutral-30 border p-32${sidebarOpen ? " active" : ""}`}
            >
              <form action="#">
                <div className="mb-24 flex items-center justify-between">
                  <h4 className="mb-0">Filter</h4>
                  <button
                    type="button"
                    className="sidebar-close hover-text-main-600 text-xl text-neutral-500 lg:hidden"
                    onClick={closeSidebar}
                  >
                    <i className="ph-bold ph-x"></i>
                  </button>
                </div>
                <div className="relative">
                  <input
                    className="common-input rounded-pill pe-48"
                    placeholder="Enter Your Email..."
                  />
                  <button
                    type="submit"
                    className="translate-middle-y inset-inline-end-0 hover-text-main-600 absolute top-50 me-24 flex text-xl text-neutral-500"
                  >
                    <i className="ph-bold ph-magnifying-glass"></i>
                  </button>
                </div>
                <span className="border-neutral-30 my-24 block border border-dashed"></span>
                <h6 className="mb-24 text-lg font-medium">Types of Categories</h6>
                <div className="flex-column flex gap-16">
                  {filterCategories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center justify-between gap-16"
                    >
                      <div className="form-check common-check mb-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="categories"
                          id={category.id}
                        />
                        <label
                          className="form-check-label fw-normal flex-grow-1"
                          htmlFor={category.id}
                        >
                          {category.label}
                        </label>
                      </div>
                      <span className="text-neutral-500">{category.count}</span>
                    </div>
                  ))}
                </div>
                <a
                  href="course.html"
                  className="text-main-600 fw-semibold hover-text-decoration-underline mt-24 text-sm"
                >
                  See All{" "}
                </a>
                <span className="border-neutral-30 my-24 block border border-dashed"></span>
                <h6 className="mb-24 text-lg font-medium">Pricing scale</h6>
                <div className="custom--range">
                  <div id="slider-range" className="lessons-price-range">
                    <input
                      type="range"
                      className="lessons-price-range__min"
                      min={0}
                      max={1000}
                      value={priceMin}
                      onChange={(event) =>
                        setPriceMin(Math.min(Number(event.target.value), priceMax))
                      }
                    />
                    <input
                      type="range"
                      className="lessons-price-range__max"
                      min={0}
                      max={1000}
                      value={priceMax}
                      onChange={(event) =>
                        setPriceMax(Math.max(Number(event.target.value), priceMin))
                      }
                    />
                  </div>
                  <div className="custom--range__content">
                    <input
                      className="custom--range__prices text-md w-100 border-0 bg-transparent text-center text-start font-medium text-neutral-600 outline-0"
                      id="amount"
                      readOnly
                      value={`$${priceMin} - $${priceMax}`}
                    />
                  </div>
                </div>
                <span className="border-neutral-30 my-24 block border border-dashed"></span>
                <h6 className="mb-24 text-lg font-medium">Star Category</h6>
                <div className="flex-column flex gap-16">
                  {starFilters.map((star) => (
                    <div
                      key={star.id}
                      className="flex items-center justify-between gap-16"
                    >
                      <div className="form-check common-check mb-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="categories"
                          id={star.id}
                        />
                        <label
                          className="form-check-label fw-normal !flex flex-grow-1 items-center gap-8"
                          htmlFor={star.id}
                        >
                          <span className="text-warning-600 flex text-xl">
                            <i className="ph-fill ph-star"></i>{" "}
                          </span>
                          {star.stars} Star
                        </label>
                      </div>
                      <span className="text-neutral-500">{star.count}</span>
                    </div>
                  ))}
                </div>
                <span className="border-neutral-30 my-24 block border border-dashed"></span>
                <h6 className="mb-24 text-lg font-medium">Popular Tags</h6>
                <div className="flex flex-wrap items-center gap-12">
                  {popularTags.map((tag) => (
                    <a
                      key={tag}
                      href="course.html"
                      className="border-neutral-30 rounded-pill hover-border-main-600 hover-text-main-600 border bg-white px-20 py-12 text-neutral-500"
                    >
                      {tag}{" "}
                    </a>
                  ))}
                </div>
                <a
                  href="course.html"
                  className="text-main-600 fw-semibold hover-text-decoration-underline mt-24 text-sm"
                >
                  More Tags{" "}
                </a>
                <span className="border-neutral-30 my-24 block border border-dashed"></span>
                <h6 className="mb-24 text-lg font-medium">Level</h6>
                <div className="flex-column flex gap-16">
                  {levelFilters.map((level) => (
                    <div key={level.id} className="form-check common-check mb-0">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="categories"
                        id={level.id}
                      />
                      <label
                        className="form-check-label fw-normal flex-grow-1"
                        htmlFor={level.id}
                      >
                        {level.label}
                      </label>
                    </div>
                  ))}
                </div>
                <span className="border-neutral-30 my-24 block border border-dashed"></span>
                <button
                  type="reset"
                  className="btn btn-outline-main rounded-pill fw-semibold !flex w-100 items-center justify-center gap-16"
                >
                  <i className="ph-bold ph-arrow-clockwise flex text-lg"></i> Reset
                  Filters
                </button>
              </form>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="course-list-wrapper">
              <div className="mb-40 flex flex-wrap items-center justify-between gap-16">
                <span className="text-neutral-500">Showing 9 of 600 Results</span>
                <div className="flex items-center gap-16">
                  <div className="flex items-center gap-8">
                    <span className="flex-shrink-0 text-neutral-500">
                      Sort By :{" "}
                    </span>
                    <select
                      className="form-select rounded-pill bg-main-25 border-neutral-30 border py-8 ps-20 pe-28 font-medium text-neutral-700"
                      defaultValue="1"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="button"
                    className="list-bar-btn bg-main-600 rounded-8 !flex h-40 w-40 items-center justify-center text-xl text-white lg:!hidden"
                    onClick={() => setSidebarOpen(true)}
                  >
                    <i className="ph-bold ph-funnel"></i>
                  </button>
                </div>
              </div>
              <div className="row gap-y-[1.5rem]">
                {listCourses.map((course, index) => (
                  <CourseListCard key={index} course={course} />
                ))}
              </div>
            </div>
            <ul className="pagination justify-content-center mt-40 !flex flex-wrap items-center gap-12">
              {paginationItems.map((item, index) => (
                <li key={`${item.type}-${index}`} className="page-item">
                  <a
                    className="page-link fw-semibold bg-main-25 rounded-circle hover-bg-main-600 border-neutral-30 hover-border-main-600 hover-text-white !flex h-40 w-40 items-center justify-center p-0 text-neutral-700"
                    href={item.href}
                  >
                    {item.type === "prev" ? (
                      <i className="ph-bold ph-caret-left"></i>
                    ) : item.type === "next" ? (
                      <i className="ph-bold ph-caret-right"></i>
                    ) : (
                      item.label
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {sidebarOpen ? (
        <button
          type="button"
          className="lessons-filter-overlay show"
          aria-label="Close filter"
          onClick={closeSidebar}
        />
      ) : null}
    </section>
  );
}
