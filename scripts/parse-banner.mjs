import fs from "fs";

const h = fs.readFileSync("f:/english-training/tmp-eduall.html", "utf8");

function extract(tag, className) {
  const re = new RegExp(`<${tag}[^>]*class="${className.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[^>]*>[\\s\\S]*?<\\/${tag}>`, "i");
  const m = h.match(re);
  return m ? m[0] : null;
}

const banner = extract("section", "banner relative overflow-hidden py-80");
console.log("BANNER length:", banner?.length);
console.log(banner?.substring(0, 4000));
