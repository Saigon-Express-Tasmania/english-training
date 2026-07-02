"use client";

import { useState } from "react";

import {
  levelFilters,
  popularTags,
  starFilters,
} from "@/assets/data/lessons";
import { Link } from "@/i18n/navigation";
import type { ListeningLessonSummary } from "@/views/listening/lib/load-lesson";

type ListeningLessonsListProps = {
  lessons: ListeningLessonSummary[];
};

const lessonAccents = [
  "blue",
  "violet",
  "teal",
  "amber",
  "rose",
  "indigo",
  "cyan",
  "emerald",
] as const;

type LessonAccent = (typeof lessonAccents)[number];

function getLessonAccent(lessonId: string): LessonAccent {
  const unitMatch = lessonId.match(/lesson-(\d+)/);
  const unit = unitMatch
    ? Number.parseInt(unitMatch[1], 10)
    : Number.parseInt(lessonId.replace(/^lesson/, "").split("-")[0] || "0", 10);

  return lessonAccents[(unit || 0) % lessonAccents.length];
}

function ListeningLessonCard({ lesson }: { lesson: ListeningLessonSummary }) {
  const isOld = lesson.status === "old";
  const accent = getLessonAccent(lesson.id);

  return (
    <div className="col-12">
      <article
        className={`listening-lesson-card ${
          isOld ? "listening-lesson-card--old" : `listening-lesson-card--${accent}`
        }`}
      >
        <div className="listening-lesson-card__visual" aria-hidden="true">
          <div className="listening-lesson-card__icon-wrap">
            <i className="ph-bold ph-headphones"></i>
          </div>
          <div className="listening-lesson-card__visual-glow"></div>
        </div>

        <div className="listening-lesson-card__body">
          <div className="listening-lesson-card__top">
            <span className="listening-lesson-card__id">{lesson.id}</span>
            {lesson.status === "new" ? (
              <span className="listening-lesson-badge">New</span>
            ) : null}
          </div>

          <h4 className="listening-lesson-card__title">
            <Link href={`/listening/${lesson.id}`} className="listening-lesson-card__link">
              {lesson.title}
            </Link>
          </h4>

          <div className="listening-lesson-card__meta">
            <span className="listening-lesson-card__chip">
              <i className="ph-bold ph-waveform"></i>
              {lesson.segmentCount} segment{lesson.segmentCount === 1 ? "" : "s"}
            </span>
            <span className="listening-lesson-card__chip">
              <i className="ph-bold ph-ear"></i>
              Listening
            </span>
          </div>
        </div>

        <div className="listening-lesson-card__action">
          <Link
            href={`/listening/${lesson.id}`}
            className={`listening-lesson-card__btn${
              isOld ? " listening-lesson-card__btn--old" : ""
            }`}
          >
            Start lesson
            <i className="ph-bold ph-arrow-right"></i>
          </Link>
        </div>
      </article>
    </div>
  );
}

export function ListeningLessonsList({ lessons }: ListeningLessonsListProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [priceMin, setPriceMin] = useState(10);
  const [priceMax, setPriceMax] = useState(560);

  const newCount = lessons.filter((lesson) => lesson.status === "new").length;
  const oldCount = lessons.filter((lesson) => lesson.status === "old").length;

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <section className="course-list-view py-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <aside
              className={`sidebar lessons-filter rounded-12${sidebarOpen ? " active" : ""}`}
            >
              <div className="lessons-filter__header">
                <div className="lessons-filter__header-main">
                  <div className="lessons-filter__header-icon" aria-hidden="true">
                    <i className="ph-bold ph-funnel"></i>
                  </div>
                  <div>
                    <h4 className="lessons-filter__title mb-0">Filters</h4>
                    <p className="lessons-filter__subtitle mb-0">
                      Find your next listening lesson
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="lessons-filter__close sidebar-close lg:hidden"
                  onClick={closeSidebar}
                  aria-label="Close filters"
                >
                  <i className="ph-bold ph-x"></i>
                </button>
              </div>

              <div className="lessons-filter__stats">
                <div className="lessons-filter__stat lessons-filter__stat--total">
                  <span className="lessons-filter__stat-value">{lessons.length}</span>
                  <span className="lessons-filter__stat-label">Total</span>
                </div>
                <div className="lessons-filter__stat lessons-filter__stat--new">
                  <span className="lessons-filter__stat-value">{newCount}</span>
                  <span className="lessons-filter__stat-label">New</span>
                </div>
                <div className="lessons-filter__stat lessons-filter__stat--old">
                  <span className="lessons-filter__stat-value">{oldCount}</span>
                  <span className="lessons-filter__stat-label">Old</span>
                </div>
              </div>

              <form action="#" className="lessons-filter__form">
                <div className="lessons-filter__search">
                  <i className="ph-bold ph-magnifying-glass"></i>
                  <input
                    className="lessons-filter__search-input"
                    placeholder="Search lessons..."
                  />
                </div>

                <div className="lessons-filter__section">
                  <div className="lessons-filter__section-head">
                    <span className="lessons-filter__section-icon lessons-filter__section-icon--violet">
                      <i className="ph-bold ph-squares-four"></i>
                    </span>
                    <h6 className="lessons-filter__section-title">Categories</h6>
                  </div>
                  <label className="lessons-filter__option lessons-filter__option--active" htmlFor="listening">
                    <span className="lessons-filter__option-main">
                      <input
                        className="lessons-filter__checkbox"
                        type="checkbox"
                        name="categories"
                        id="listening"
                        defaultChecked
                      />
                      <span className="lessons-filter__option-label">Listening</span>
                    </span>
                    <span className="lessons-filter__count">{lessons.length}</span>
                  </label>
                </div>

                <div className="lessons-filter__section">
                  <div className="lessons-filter__section-head">
                    <span className="lessons-filter__section-icon lessons-filter__section-icon--amber">
                      <i className="ph-bold ph-currency-circle-dollar"></i>
                    </span>
                    <h6 className="lessons-filter__section-title">Pricing scale</h6>
                  </div>
                  <div className="lessons-filter__range-card">
                    <div className="lessons-price-range">
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
                    <div className="lessons-filter__range-value">
                      ${priceMin} - ${priceMax}
                    </div>
                  </div>
                </div>

                <div className="lessons-filter__section">
                  <div className="lessons-filter__section-head">
                    <span className="lessons-filter__section-icon lessons-filter__section-icon--rose">
                      <i className="ph-bold ph-star"></i>
                    </span>
                    <h6 className="lessons-filter__section-title">Star category</h6>
                  </div>
                  <div className="lessons-filter__options">
                    {starFilters.map((star) => (
                      <label key={star.id} className="lessons-filter__option" htmlFor={star.id}>
                        <span className="lessons-filter__option-main">
                          <input
                            className="lessons-filter__checkbox"
                            type="checkbox"
                            name="categories"
                            id={star.id}
                          />
                          <span className="lessons-filter__option-label">
                            <i className="ph-fill ph-star lessons-filter__star"></i>
                            {star.stars} Star
                          </span>
                        </span>
                        <span className="lessons-filter__count">{star.count}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="lessons-filter__section">
                  <div className="lessons-filter__section-head">
                    <span className="lessons-filter__section-icon lessons-filter__section-icon--teal">
                      <i className="ph-bold ph-hash"></i>
                    </span>
                    <h6 className="lessons-filter__section-title">Popular tags</h6>
                  </div>
                  <div className="lessons-filter__tags">
                    {popularTags.map((tag, index) => (
                      <a
                        key={tag}
                        href="course.html"
                        className={`lessons-filter__tag lessons-filter__tag--${
                          lessonAccents[index % lessonAccents.length]
                        }`}
                      >
                        {tag}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="lessons-filter__section">
                  <div className="lessons-filter__section-head">
                    <span className="lessons-filter__section-icon lessons-filter__section-icon--indigo">
                      <i className="ph-bold ph-chart-line-up"></i>
                    </span>
                    <h6 className="lessons-filter__section-title">Level</h6>
                  </div>
                  <div className="lessons-filter__options">
                    {levelFilters.map((level) => (
                      <label key={level.id} className="lessons-filter__option" htmlFor={level.id}>
                        <span className="lessons-filter__option-main">
                          <input
                            className="lessons-filter__checkbox"
                            type="checkbox"
                            name="categories"
                            id={level.id}
                          />
                          <span className="lessons-filter__option-label">{level.label}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <button type="reset" className="lessons-filter__reset">
                  <i className="ph-bold ph-arrow-clockwise"></i>
                  Reset filters
                </button>
              </form>
            </aside>
          </div>

          <div className="col-lg-8">
            <div className="course-list-wrapper">
              <div className="lessons-results-bar mb-40">
                <div className="lessons-results-bar__summary">
                  <span className="lessons-results-bar__label">Showing results</span>
                  <strong>
                    {lessons.length} lesson{lessons.length === 1 ? "" : "s"}
                  </strong>
                </div>
                <button
                  type="button"
                  className="lessons-results-bar__toggle list-bar-btn lg:!hidden"
                  onClick={() => setSidebarOpen(true)}
                  aria-label="Open filters"
                >
                  <i className="ph-bold ph-funnel"></i>
                  Filters
                </button>
              </div>

              {lessons.length > 0 ? (
                <div className="row gap-y-[1.5rem]">
                  {lessons.map((lesson) => (
                    <ListeningLessonCard key={lesson.id} lesson={lesson} />
                  ))}
                </div>
              ) : (
                <p className="mb-0 text-neutral-500">No listening lessons found.</p>
              )}
            </div>
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
