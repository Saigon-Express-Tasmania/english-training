"use client";

import { useEffect, useRef, useState } from "react";

type CounterValueProps = {
  value: string;
  suffix?: string;
  duration?: number;
};

export function CounterValue({
  value,
  suffix = "",
  duration = 1200,
}: CounterValueProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState("0");
  const target = Number.parseInt(value, 10);

  useEffect(() => {
    const node = ref.current;
    if (!node || Number.isNaN(target)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const current = Math.round(target * progress);
            setDisplayValue(String(current));
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
          observer.unobserve(node);
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [duration, target]);

  return (
    <span ref={ref} className="counter">
      {displayValue}
      {suffix}
    </span>
  );
}
