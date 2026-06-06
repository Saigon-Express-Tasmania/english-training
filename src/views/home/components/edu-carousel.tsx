"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type BreakpointSlides = {
  default: number;
  xl?: number;
  lg?: number;
  md?: number;
  sm?: number;
};

type UseEduCarouselOptions = {
  slidesPerView?: BreakpointSlides;
  autoplay?: boolean;
  autoplayDelay?: number;
  loop?: boolean;
  fade?: boolean;
  onSelect?: (index: number) => void;
  selectedIndex?: number;
};

function getSlidesPerView(width: number, config: BreakpointSlides) {
  if (width < 576 && config.sm) return config.sm;
  if (width < 768 && config.md) return config.md;
  if (width < 992 && config.lg) return config.lg;
  if (width < 1400 && config.xl) return config.xl;
  return config.default;
}

export function useEduCarousel({
  slidesPerView = { default: 1 },
  autoplay = false,
  autoplayDelay = 2000,
  loop = true,
  fade = false,
  onSelect,
  selectedIndex,
}: UseEduCarouselOptions = {}) {
  const plugins = useMemo(
    () =>
      autoplay
        ? [Autoplay({ delay: autoplayDelay, stopOnInteraction: false })]
        : [],
    [autoplay, autoplayDelay]
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop, align: "start", duration: 25, containScroll: fade ? false : "trimSnaps" },
    plugins
  );

  const [visibleSlides, setVisibleSlides] = useState(slidesPerView.default);

  useEffect(() => {
    const updateSlides = () => {
      setVisibleSlides(getSlidesPerView(window.innerWidth, slidesPerView));
    };
    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, [slidesPerView]);

  useEffect(() => {
    emblaApi?.reInit();
  }, [emblaApi, visibleSlides]);

  useEffect(() => {
    if (!emblaApi || selectedIndex === undefined) return;
    if (emblaApi.selectedScrollSnap() !== selectedIndex) {
      emblaApi.scrollTo(selectedIndex);
    }
  }, [emblaApi, selectedIndex]);

  useEffect(() => {
    if (!emblaApi || !onSelect) return;
    const onSnap = () => onSelect(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSnap);
    onSnap();
    return () => {
      emblaApi.off("select", onSnap);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const slideStyle: CSSProperties | undefined = fade
    ? undefined
    : { ["--slide-size" as string]: `${100 / visibleSlides}%` };

  return {
    emblaRef,
    emblaApi,
    scrollPrev,
    scrollNext,
    slideStyle,
    fade,
    visibleSlides,
  };
}

type EduCarouselViewportProps = {
  emblaRef: ReturnType<typeof useEduCarousel>["emblaRef"];
  fade?: boolean;
  className?: string;
  containerClassName?: string;
  slideStyle?: CSSProperties;
  children: ReactNode;
};

export function EduCarouselViewport({
  emblaRef,
  fade = false,
  className,
  containerClassName,
  slideStyle,
  children,
}: EduCarouselViewportProps) {
  return (
    <div
      className={`edu-carousel__viewport${fade ? " edu-carousel__viewport--fade" : ""}${className ? ` ${className}` : ""}`}
      ref={emblaRef}
    >
      <div
        className={`edu-carousel__container${fade ? " edu-carousel__container--fade" : ""}${containerClassName ? ` ${containerClassName}` : ""}`}
        style={slideStyle}
      >
        {children}
      </div>
    </div>
  );
}

export function EduCarouselSlide({
  className,
  slideStyle,
  children,
}: {
  className?: string;
  slideStyle?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div
      className={`edu-carousel__slide${className ? ` ${className}` : ""}`}
      style={slideStyle}
    >
      {children}
    </div>
  );
}

export function EduCarouselArrows({
  scrollPrev,
  scrollNext,
  prevClassName,
  nextClassName,
  prevId,
  nextId,
  wrapperClassName,
}: {
  scrollPrev: () => void;
  scrollNext: () => void;
  prevClassName?: string;
  nextClassName?: string;
  prevId?: string;
  nextId?: string;
  wrapperClassName?: string;
}) {
  return (
    <div className={wrapperClassName}>
      <button
        type="button"
        id={prevId}
        className={prevClassName}
        onClick={scrollPrev}
        aria-label="Previous slide"
      >
        <i className="ph ph-caret-left"></i>
      </button>{" "}
      <button
        type="button"
        id={nextId}
        className={nextClassName}
        onClick={scrollNext}
        aria-label="Next slide"
      >
        <i className="ph ph-caret-right"></i>
      </button>
    </div>
  );
}