"use client";

import { counters } from "@/assets/data/home";
import { CounterValue } from "@/views/home/components/counter-value";

export function Counter() {
  return (
    <section className="counter-main py-120">
      <div className="container">
        <div className="row gap-y-[1.5rem]">
          {counters.map((item, index) => (
            <div
              key={item.label}
              className="col-xl-3 col-sm-6 col-xs-6"
              data-aos="fade-up"
              data-aos-duration={200 + index * 200}
            >
              <div
                className={`counter-item animation-item rounded-12 border-neutral-30 h-100 border px-16 py-32 text-center ${item.variant === "main" ? "bg-main-25" : "bg-main-two-25"}`}
              >
                <span
                  className={`text-40 rounded-circle box-shadow-md mx-auto mb-24 inline-flex h-80 w-80 items-center justify-center bg-white ${item.variant === "main" ? "text-main-600" : "text-main-two-600"}`}
                >
                  <i className={`animate__wobbles ph ${item.icon}`}></i>
                </span>
                <h2 className="display-four mb-16 text-neutral-700">
                  <CounterValue value={item.value} suffix={item.suffix} />
                </h2>
                <span className="text-lg text-neutral-500">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
