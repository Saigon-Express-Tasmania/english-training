import fs from "fs";

const h = fs.readFileSync("f:/english-training/tmp-eduall.html", "utf8");
const body = h.match(/<body>([\s\S]*)<\/body>/)[1];

const sectionNames = [
  "banner relative overflow-hidden py-80",
  "features relative overflow-hidden py-120",
  "brand",
  "explore-course bg-main-25 relative z-1 py-120",
  "about mash-bg-main mash-bg-main-two relative z-1 py-120",
  "choose-us mash-bg-main mash-bg-main-two relative z-1 pt-120",
  "counter-main py-120",
  "testimonials bg-main-25 relative z-1 py-120",
  "blog mash-bg-main mash-bg-main-two relative py-120",
];

function extractSection(classPrefix) {
  if (classPrefix === "brand") {
    const m = body.match(/<div class="brand[\s\S]*?<\/div><\/div><\/div><\/section>/);
    return m ? m[0] : null;
  }
  const escaped = classPrefix.replace(/ /g, " ");
  const re = new RegExp(
    `<section class="${escaped.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[\\s\\S]*?<\\/section>`,
    "i"
  );
  const m = body.match(re);
  return m ? m[0] : null;
}

const outDir = "f:/english-training/tmp-sections";
fs.mkdirSync(outDir, { recursive: true });

for (const name of sectionNames) {
  const html = extractSection(name);
  const fileName = name.split(" ")[0] + ".html";
  if (html) {
    fs.writeFileSync(`${outDir}/${fileName}`, html);
    console.log(fileName, html.length);
  } else {
    console.log("MISSING", name);
  }
}

// header
const header = body.match(/<header[\s\S]*?<\/header>/);
if (header) fs.writeFileSync(`${outDir}/header.html`, header[0]);

// certificate + footer
const cert = body.match(/<section class="certificate[\s\S]*?<\/section>/);
if (cert) fs.writeFileSync(`${outDir}/certificate.html`, cert[0]);

const footer = body.match(/<footer[\s\S]*?<\/footer>/);
if (footer) fs.writeFileSync(`${outDir}/footer.html`, footer[0]);

// brand section - try section tag
const brandSection = body.match(/<section class="brand[\s\S]*?<\/section>/);
console.log("brand section", brandSection ? brandSection[0].length : "not found");
