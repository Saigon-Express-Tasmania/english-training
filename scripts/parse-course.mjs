import fs from "fs";

const h = fs.readFileSync("f:/english-training/tmp-eduall.html", "utf8");
const m = h.match(/<section class="explore-course[\s\S]*?<\/section>/);
if (!m) {
  console.log("no explore-course");
  process.exit(1);
}
const s = m[0];
console.log("section len", s.length);

const card = s.match(
  /<div class="course-item scale-hover-item[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/
);
console.log("\n--- CARD ---\n");
console.log(card ? card[0].substring(0, 3000) : "none");

const heading = s.match(/<div class="section-heading[\s\S]*?<\/div>\s*<\/div>/);
console.log("\n--- HEADING ---\n");
console.log(heading ? heading[0] : "none");

const tabs = s.match(/<ul class="nav nav-pills[\s\S]*?<\/ul>/);
console.log("\n--- TABS ---\n");
console.log(tabs ? tabs[0] : "none");

const cert = h.match(/<section class="certificate[\s\S]*?<\/section>/);
console.log("\n--- CERT ---\n");
console.log(cert ? cert[0] : "none");
