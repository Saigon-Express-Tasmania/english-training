import fs from "fs";

const js = fs.readFileSync("f:/english-training/tmp-app.bundle.js", "utf8");

const needles = [
  "features-slider",
  "brand-slider",
  "testimonials__slider",
  "testimonials__thumbs",
  "toggle-mobileMenu",
  "progress-wrap",
  "slidesToShow",
  "fixed-header",
  "preloader",
  "AOS.init",
  "new WOW",
  "vanilla-tilt",
];

for (const n of needles) {
  const idx = js.indexOf(n);
  if (idx >= 0) {
    console.log("\n===", n, "===\n");
    console.log(js.substring(Math.max(0, idx - 100), idx + 400));
  } else {
    console.log("NOT FOUND:", n);
  }
}
