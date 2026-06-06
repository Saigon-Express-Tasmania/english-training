"use client";

import { useState } from "react";
import {
  averageRating,
  curriculumLessons,
  curriculumSections,
  enrollToday,
  idealFor,
  lessonIntro,
  lessonOutro,
  lessonTitle,
  reviews,
  sortOptions,
  whatYouWillLearn,
  whyChooseThisCourse,
} from "@/assets/data/listening";
import { images } from "@/assets/images";
import { EduImage } from "@/views/home/edu-image";

function ReviewStars({ size = "text-xl" }: { size?: string }) {
  return (
    <div className="mb-16 flex items-center gap-8">
      {Array.from({ length: 4 }).map((_, index) => (
        <span key={index} className={`text-warning-600 flex font-medium ${size}`}>
          <i className="ph-fill ph-star"></i>
        </span>
      ))}
      <span className={`text-warning-600 flex font-medium ${size}`}>
        <i className="ph-fill ph-star-half"></i>
      </span>
    </div>
  );
}

function CurriculumItem({ title }: { title: string }) {
  return (
    <div className="curriculam-item">
      <a
        href="javascript:void(0)"
        className="hover-text-main-600 block font-medium text-neutral-500"
      >
        <span className="flex items-center gap-12">
          <i className="ph-bold ph-video-camera flex text-xl"></i>
          <span className="text-line-1">{title}</span>
        </span>
      </a>
      <div className="mt-24 flex items-center justify-between gap-8">
        <a
          href="lesson-details.html"
          className="text-main-600 hover-text-decoration-underline transition-1 fw-semibold flex items-center gap-8"
          tabIndex={0}
        >
          View Profile <i className="ph ph-arrow-right"></i>
        </a>
        <span className="flex flex-shrink-0 items-center gap-12">
          30:25 <i className="ph ph-lock-key flex text-xl"></i>
        </span>
      </div>
    </div>
  );
}

function CurriculumAccordion() {
  const defaultOpen =
    curriculumSections.find((section) => section.defaultOpen)?.id ??
    curriculumSections[0].id;
  const [openPanel, setOpenPanel] = useState<string>(defaultOpen);

  return (
    <div className="accordion common-accordion style-three" id="accordionExampleTwo">
      {curriculumSections.map((section) => {
        const isOpen = openPanel === section.id;
        return (
          <div key={section.id} className="accordion-item">
            <h2 className="accordion-header bg-main-25">
              <button
                className={`accordion-button bg-main-25${isOpen ? "" : " collapsed"}`}
                type="button"
                aria-expanded={isOpen}
                aria-controls={section.id}
                onClick={() => setOpenPanel(isOpen ? "" : section.id)}
              >
                {section.title}
              </button>
            </h2>
            <div
              id={section.id}
              className={`accordion-collapse collapse${isOpen ? " show" : ""}`}
            >
              <div className="accordion-body bg-main-25 p-0">
                {curriculumLessons.map((lesson) => (
                  <CurriculumItem key={`${section.id}-${lesson}`} title={lesson} />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function CourseDetails() {
  return (
    <section className="course-details bg-main-25 py-120">
      <div className="container">
        <div className="row gap-y-[1.5rem]">
          <div className="col-xl-8">
            <div className="course-details__content border-neutral-30 rounded-12 border bg-white p-12">
              <video
                id="player"
                className="player"
                controls
                poster={images.courseDetailsImg.src}
              />
              <div className="p-20">
                <h2 className="mt-24 mb-24">{lessonTitle}</h2>
                <p className="text-neutral-700">{lessonIntro}</p>
                <span className="border-bottom border-main-100 my-32 block"></span>
                <h3 className="mb-16">What You Will Learn:</h3>
                <ul className="list-dotted flex-column flex gap-24">
                  {whatYouWillLearn.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <span className="border-bottom border-main-100 my-32 block"></span>
                <h4 className="mb-16">Why Choose This Course:</h4>
                <ul className="list-dotted flex-column flex gap-24">
                  {whyChooseThisCourse.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <span className="border-bottom border-main-100 my-32 block"></span>
                <h5 className="mb-16">Ideal For:</h5>
                <ul className="list-dotted flex-column flex gap-24">
                  {idealFor.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <span className="border-bottom border-main-100 my-32 block"></span>
                <h6 className="mb-16">Enroll Today:</h6>
                <ul className="list-dotted flex-column flex gap-24">
                  {enrollToday.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="mt-24 text-neutral-700">{lessonOutro}</p>
              </div>
            </div>

            <div className="border-neutral-30 rounded-12 mt-24 border bg-white p-32">
              <h5 className="mb-0">Average Reviews</h5>
              <span className="border-neutral-30 my-32 block border border-dashed"></span>
              <div className="flex-sm-row flex-column flex gap-36">
                <div className="rounded-16 flex-column bg-main-600 !flex flex-shrink-0 items-center justify-center px-40 py-24 text-center text-white">
                  <h2 className="mb-8 text-white">{averageRating.score}</h2>
                  <div className="flex items-center justify-center gap-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <span
                        key={index}
                        className="text-15 flex font-medium text-white"
                      >
                        <i className="ph-fill ph-star"></i>
                      </span>
                    ))}
                    <span className="text-15 flex font-medium text-white">
                      <i className="ph-fill ph-star-half"></i>
                    </span>
                  </div>
                  <span className="mt-8 text-gray-500">{averageRating.ratingCount}</span>
                </div>
                <div className="flex-grow-1">
                  {averageRating.breakdown.map((item, index) => (
                    <div
                      key={`${item.star}-${item.percent}`}
                      className={`flex items-center gap-20${index < averageRating.breakdown.length - 1 ? " mb-8" : ""}`}
                    >
                      <div className="flex items-center gap-8">
                        <span className="text-warning-600 flex text-lg font-medium">
                          <i className="ph-fill ph-star"></i>
                        </span>
                        <span className="flex-shrink-0 text-gray-900">{item.star}</span>
                      </div>
                      <div
                        className="progress rounded-pill h-12 w-100 bg-white"
                        role="progressbar"
                        aria-label="Basic example"
                        aria-valuenow={item.percent}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div
                          className="progress-bar bg-main-600 rounded-pill"
                          style={{ width: `${item.percent}%` }}
                        ></div>
                      </div>
                      <span className="flex-shrink-0 text-gray-900">
                        {item.percent}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <span className="border-neutral-30 my-32 block border border-dashed"></span>
              <div className="mb-24 flex flex-wrap items-center justify-between gap-16">
                <h6 className="mb-0">All Reviews</h6>
                <div className="flex items-center gap-16">
                  <div className="flex items-center gap-8">
                    <span className="flex-shrink-0 text-neutral-500">Sort By : </span>
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
                </div>
              </div>

              {reviews.map((review, index) => (
                <div
                  key={review.name}
                  className={`border-neutral-30 rounded-12 bg-main-25 border p-32${index > 0 ? " mt-24" : ""}`}
                >
                  <ReviewStars />
                  <p className="text-neutral-700">{review.quote}</p>
                  <span className="border-neutral-30 my-24 block border border-dashed"></span>
                  <div className="flex items-center gap-24">
                    <EduImage
                      src={review.image}
                      alt="Image"
                      className="rounded-circle cover-img h-60 w-60"
                    />
                    <div>
                      <h6 className="mb-8 text-xl font-medium">{review.name}</h6>
                      <span className="text-sm text-neutral-700">{review.role}</span>
                    </div>
                  </div>
                  <span className="border-neutral-30 my-24 block border border-dashed"></span>
                  <div className="flex flex-wrap items-center gap-40">
                    <button
                      type="button"
                      className="like-button hover-text-main-600 !flex items-center gap-8 text-neutral-500"
                    >
                      <span className="like-button__icon flex text-xl">
                        <i className="ph-bold ph-thumbs-up"></i>
                      </span>
                      <span className="like-button__text">{review.likes}</span>
                    </button>
                    <a
                      href="#commentForm"
                      className="hover-text-main-600 flex items-center gap-8 text-neutral-500"
                    >
                      <i className="ph-bold ph-chat-centered-text flex text-xl"></i> Reply
                    </a>
                  </div>
                  {review.showReplyInput && review.replyAvatar ? (
                    <div className="mt-24 flex items-center gap-20">
                      <EduImage
                        src={review.replyAvatar}
                        alt="Image"
                        className="rounded-circle cover-img h-60 w-60"
                      />
                      <input
                        className="common-input rounded-pill border-neutral-30 bg-white py-16"
                        placeholder="Join the discussion..."
                      />
                    </div>
                  ) : null}
                </div>
              ))}

              <button
                type="button"
                className="btn btn-main rounded-pill mt-40 !flex items-center justify-center gap-8"
              >
                See All Reviews <i className="ph-bold ph-arrow-up-right flex text-lg"></i>
              </button>
            </div>

            <div className="border-neutral-30 rounded-12 mt-24 border bg-white p-32">
              <form action="#" id="commentForm">
                <h5 className="mb-0">Write a Review</h5>
                <span className="border-neutral-30 my-32 block border border-dashed"></span>
                <div className="mb-24">
                  <label htmlFor="name" className="mb-12 text-lg font-medium text-neutral-700">
                    Name
                  </label>
                  <input
                    className="common-input bg-main-25 rounded-pill"
                    id="name"
                    placeholder="Enter Name..."
                  />
                </div>
                <div className="mb-24">
                  <label htmlFor="email" className="mb-12 text-lg font-medium text-neutral-700">
                    Email
                  </label>
                  <input
                    type="email"
                    className="common-input bg-main-25 rounded-pill"
                    id="email"
                    placeholder="Enter Email..."
                  />
                </div>
                <div className="mb-24">
                  <label className="mb-12 text-lg font-medium text-neutral-700">
                    Star Reviews
                  </label>
                  <div id="half-star-rating">
                    <div className="rating-group">
                      <input
                        className="rating__input rating__input--none"
                        name="rating2"
                        id="rating2-0"
                        value="0"
                        type="radio"
                      />
                      <label aria-label="0 stars" className="rating__label" htmlFor="rating2-0">
                        &nbsp;
                      </label>
                      <label
                        aria-label="0.5 stars"
                        className="rating__label rating__label--half"
                        htmlFor="rating2-05"
                      >
                        <i className="rating__icon rating__icon--star ph-fill ph-star-half"></i>
                      </label>
                      <input
                        className="rating__input"
                        name="rating2"
                        id="rating2-05"
                        value="0.5"
                        type="radio"
                      />
                      <label aria-label="1 star" className="rating__label" htmlFor="rating2-10">
                        <i className="rating__icon rating__icon--star ph-fill ph-star"></i>
                      </label>
                      <input
                        className="rating__input"
                        name="rating2"
                        id="rating2-10"
                        value="1"
                        type="radio"
                      />
                      <label
                        aria-label="1.5 stars"
                        className="rating__label rating__label--half"
                        htmlFor="rating2-15"
                      >
                        <i className="rating__icon rating__icon--star ph-fill ph-star-half"></i>
                      </label>
                      <input
                        className="rating__input"
                        name="rating2"
                        id="rating2-15"
                        value="1.5"
                        type="radio"
                      />
                      <label aria-label="2 stars" className="rating__label" htmlFor="rating2-20">
                        <i className="rating__icon rating__icon--star ph-fill ph-star"></i>
                      </label>
                      <input
                        className="rating__input"
                        name="rating2"
                        id="rating2-20"
                        value="2"
                        type="radio"
                      />
                      <label
                        aria-label="2.5 stars"
                        className="rating__label rating__label--half"
                        htmlFor="rating2-25"
                      >
                        <i className="rating__icon rating__icon--star ph-fill ph-star-half"></i>
                      </label>
                      <input
                        className="rating__input"
                        name="rating2"
                        id="rating2-25"
                        value="2.5"
                        type="radio"
                        defaultChecked
                      />
                      <label aria-label="3 stars" className="rating__label" htmlFor="rating2-30">
                        <i className="rating__icon rating__icon--star ph-fill ph-star"></i>
                      </label>
                      <input
                        className="rating__input"
                        name="rating2"
                        id="rating2-30"
                        value="3"
                        type="radio"
                      />
                      <label
                        aria-label="3.5 stars"
                        className="rating__label rating__label--half"
                        htmlFor="rating2-35"
                      >
                        <i className="rating__icon rating__icon--star ph-fill ph-star-half"></i>
                      </label>
                      <input
                        className="rating__input"
                        name="rating2"
                        id="rating2-35"
                        value="3.5"
                        type="radio"
                      />
                      <label aria-label="4 stars" className="rating__label" htmlFor="rating2-40">
                        <i className="rating__icon rating__icon--star ph-fill ph-star"></i>
                      </label>
                      <input
                        className="rating__input"
                        name="rating2"
                        id="rating2-40"
                        value="4"
                        type="radio"
                      />
                      <label
                        aria-label="4.5 stars"
                        className="rating__label rating__label--half"
                        htmlFor="rating2-45"
                      >
                        <i className="rating__icon rating__icon--star ph-fill ph-star-half"></i>
                      </label>
                      <input
                        className="rating__input"
                        name="rating2"
                        id="rating2-45"
                        value="4.5"
                        type="radio"
                      />
                      <label aria-label="5 stars" className="rating__label" htmlFor="rating2-50">
                        <i className="rating__icon rating__icon--star ph-fill ph-star"></i>
                      </label>
                      <input
                        className="rating__input"
                        name="rating2"
                        id="rating2-50"
                        value="5"
                        type="radio"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-24">
                  <label htmlFor="desc" className="mb-12 text-lg font-medium text-neutral-700">
                    Your Question
                  </label>
                  <textarea
                    id="desc"
                    className="common-input bg-main-25 rounded-24"
                    placeholder="Write you question..."
                  ></textarea>
                </div>
                <div className="mb-0">
                  <button
                    type="submit"
                    className="btn btn-main rounded-pill mt-40 !flex items-center justify-center gap-8"
                  >
                    Submit Review <i className="ph-bold ph-arrow-up-right flex text-lg"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="col-xl-4">
            <div className="course-details__sidebar border-neutral-30 rounded-12 border bg-white p-24">
              <CurriculumAccordion />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
