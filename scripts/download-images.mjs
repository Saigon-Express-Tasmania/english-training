import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

const h = fs.readFileSync("f:/english-training/tmp-eduall.html", "utf8");
const images = [...new Set([...h.matchAll(/(?:src|href)="(images\/[^"]+)"/g)].map((m) => m[1]))];

const base = "https://wowtheme7.com/tailwind/eduall/demo/";
const outDir = "f:/english-training/src/assets/images";

function download(url, dest) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const file = fs.createWriteStream(dest);
    https
      .get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          file.close();
          return download(res.headers.location, dest).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          reject(new Error(`${url} => ${res.statusCode}`));
          return;
        }
        res.pipe(file);
        file.on("finish", () => file.close(resolve));
      })
      .on("error", reject);
  });
}

async function main() {
  console.log(`Downloading ${images.length} images...`);
  for (const img of images) {
    const dest = path.join(outDir, img.replace("images/", ""));
    if (fs.existsSync(dest)) {
      console.log("skip", img);
      continue;
    }
    try {
      await download(base + img, dest);
      console.log("ok", img);
    } catch (e) {
      console.error("fail", img, e.message);
    }
  }
}

main();
