import fs from "fs";

const h = fs.readFileSync("f:/english-training/tmp-eduall.html", "utf8");

const certIdx = h.indexOf("Get Certificate");
console.log("cert idx", certIdx);
console.log(h.substring(certIdx - 500, certIdx + 2000));

const courseIdx = h.indexOf("course-item");
console.log("\ncourse idx", courseIdx);
console.log(h.substring(courseIdx, courseIdx + 3500));
