import fs from "fs";

const h = fs.readFileSync("f:/english-training/scripts/lesson-details.html", "utf8");
const body = h.match(/<body>([\s\S]*)<\/body>/)[1];

const sections = [
  "breadcrumb",
  "lesson-details",
  "course-details",
  "lesson-content",
];

for (const name of sections) {
  const re = new RegExp(`<section class="${name}[^"]*"[\\s\\S]*?<\\/section>`, "i");
  const m = body.match(re);
  console.log(name, m ? m[0].length : "none");
  if (m) {
    const pretty = m[0].replace(/></g, ">\n<");
    fs.writeFileSync(`f:/english-training/scripts/lesson-${name}.html`, pretty);
  }
}

// also try div-based main content
const main = body.match(/<section class="lesson-details[\s\S]*?<\/section>/);
if (main) {
  const classes = new Set();
  const re = /class="([^"]+)"/g;
  let m;
  while ((m = re.exec(main[0]))) {
    m[1].split(/\s+/).forEach((c) => classes.add(c));
  }
  console.log("classes sample:", [...classes].sort().slice(0, 40).join(", "));
}
