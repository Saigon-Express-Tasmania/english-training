import fs from "fs";

const h = fs.readFileSync("f:/english-training/tmp-eduall.html", "utf8");

const sections = [...h.matchAll(/<section[^>]*class="([^"]+)"[^>]*>/g)].map((m) => m[1]);
console.log("sections:", sections.length);
sections.forEach((s, i) => console.log(i + 1, s.substring(0, 150)));

const footer = h.match(/<footer[\s\S]*?<\/footer>/);
console.log("\n--- FOOTER (first 2000) ---\n");
console.log(footer ? footer[0].substring(0, 2000) : "none");
