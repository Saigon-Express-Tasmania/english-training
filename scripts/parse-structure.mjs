import fs from "fs";

const h = fs.readFileSync("f:/english-training/tmp-eduall.html", "utf8");

// Extract everything between body tags, split by major landmarks
const bodyMatch = h.match(/<body>([\s\S]*)<\/body>/);
if (!bodyMatch) {
  console.log("no body");
  process.exit(1);
}

const body = bodyMatch[1];

// Find landmarks
const landmarks = [
  "preloader",
  "header class",
  "section class=\"banner",
  "section class=\"features",
  "brand",
  "section class=\"explore-course",
  "section class=\"about",
  "section class=\"choose-us",
  "section class=\"counter-main",
  "section class=\"testimonials",
  "section class=\"blog",
  "certificate",
  "footer class",
];

for (const lm of landmarks) {
  const idx = body.indexOf(lm.includes("class") ? lm.replace(" class", ' class="').split('"')[0] + '"' : lm);
  console.log(lm, idx >= 0 ? idx : "NOT FOUND");
}

// Extract header through first section
const headerStart = body.indexOf("<header");
const bannerStart = body.indexOf('<section class="banner');
console.log("\nBetween header and banner:", body.substring(headerStart, bannerStart).substring(0, 500));
