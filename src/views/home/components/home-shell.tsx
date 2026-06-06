"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { ScrollAnimations } from "@/views/home/components/scroll-animations";

type HomeUiContextValue = {
  mobileMenuOpen: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
};

const HomeUiContext = createContext<HomeUiContextValue | null>(null);

export function useHomeUi() {
  const context = useContext(HomeUiContext);
  if (!context) {
    throw new Error("useHomeUi must be used within HomeShell");
  }
  return context;
}

export function HomeShell({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  const openMobileMenu = useCallback(() => {
    setMobileMenuOpen(true);
    document.body.classList.add("scroll-hide-sm");
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
    document.body.classList.remove("scroll-hide-sm");
  }, []);

  useEffect(() => {
    const onLoad = () => setLoading(false);
    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const header = document.querySelector(".header");
      header?.classList.toggle("fixed-header", scrollTop >= 260);

      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      setScrollProgress(progress);
      setShowProgress(scrollTop > 50);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const strokeDashoffset = 307.919 - scrollProgress * 307.919;

  return (
    <HomeUiContext.Provider
      value={{ mobileMenuOpen, openMobileMenu, closeMobileMenu }}
    >
      <div className={`preloader${loading ? "" : " hidden"}`} aria-hidden={!loading}>
        <span className="preloader-spinner" />
      </div>

      <div
        className={`overlay${mobileMenuOpen ? " show-overlay" : ""}`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />
      <div
        className={`side-overlay${mobileMenuOpen ? " show" : ""}`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      <button
        type="button"
        className={`progress-wrap${showProgress ? " active-progress" : ""}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <svg
          className="progress-circle svg-content"
          width="100%"
          height="100%"
          viewBox="-1 -1 102 102"
        >
          <path
            d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
            style={{ strokeDashoffset }}
          />
        </svg>
      </button>

      <ScrollAnimations ready={!loading} />
      {children}
    </HomeUiContext.Provider>
  );
}
