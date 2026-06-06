"use client";

import { useEffect } from "react";
import AOS from "aos";

type ScrollAnimationsProps = {
  ready?: boolean;
};

export function ScrollAnimations({ ready = true }: ScrollAnimationsProps) {
  useEffect(() => {
    if (!ready) return;

    AOS.init({
      offset: 40,
      duration: 1000,
      easing: "ease",
      once: false,
      mirror: false,
      anchorPlacement: "top-bottom",
    });

    let wow: { init: () => void } | undefined;

    void import("wow.js").then(({ default: WOW }) => {
      wow = new WOW({ live: false, mobile: true });
      wow.init();
      AOS.refresh();
    });

    const refresh = () => AOS.refresh();
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
    };
  }, [ready]);

  return null;
}
