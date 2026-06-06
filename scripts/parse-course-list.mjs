import fs from "fs";

const h = fs.readFileSync("f:/english-training/scripts/course-list-view.html", "utf8");
const body = h.match(/<body>([\s\S]*)<\/body>/)[1];

const breadcrumb = body.match(/<section class="breadcrumb[\s\S]*?<\/section>/);
console.log("breadcrumb", breadcrumb ? breadcrumb[0].length : "none");

const courseList = body.match(/<section class="course-list-view[\s\S]*?<\/section>/);
console.log("course-list-view", courseList ? courseList[0].length : "none");

if (courseList) {
  fs.writeFileSync("f:/english-training/scripts/course-list-section.html", courseList[0]);
  // Pretty print by inserting newlines before tags
  const pretty = courseList[0]
    .replace(/></g, ">\n<")
    .replace(/<\/div>/g, "</div>\n");
  fs.writeFileSync("f:/english-training/scripts/course-list-pretty.html", pretty);
}

if (breadcrumb) {
  fs.writeFileSync("f:/english-training/scripts/breadcrumb-section.html", breadcrumb[0]);
}

// Find all unique class names containing 'course'
if (courseList) {
  const classes = new Set();
  const re = /class="([^"]+)"/g;
  let m;
  while ((m = re.exec(courseList[0]))) {
    m[1].split(/\s+/).forEach((c) => {
      if (c.includes("course")) classes.add(c);
    });
  }
  console.log("course classes:", [...classes].sort().join(", "));
}
