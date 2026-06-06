import fs from "fs";
import https from "https";
import path from "path";

const cssPath = "f:/english-training/src/app/globals.css";
let css = fs.readFileSync(cssPath, "utf8");

const bgImages = [
  "images/bg/banner-5-bg-img1.png",
  "images/bg/gradient-bg-2.png",
  "images/bg/gradient-bg.png",
  "images/shapes/child-future-bg-img1.png",
  "images/thumbs/banner-three-img1.png",
  "images/thumbs/banner-three-img2.png",
  "images/thumbs/banner-three-img3.png",
  "images/thumbs/instructor-dashboard-img3.png",
  "images/thumbs/student-dashbord-profile-photo-img1.png",
  "images/thumbs/testimonials-three-img3.png",
];

const base = "https://wowtheme7.com/tailwind/eduall/demo/";
const outDir = "f:/english-training/src/assets/images";

function download(url, dest) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    if (fs.existsSync(dest)) return resolve();
    const file = fs.createWriteStream(dest);
    https
      .get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          file.close();
          return download(res.headers.location || url, dest).then(resolve).catch(reject);
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
  for (const img of bgImages) {
    await download(base + img, path.join(outDir, img.replace("images/", "")));
    console.log("downloaded", img);
  }

  css = css.replaceAll("url(../images/", "url(../assets/images/");
  css = css.replace(
    /url\(\.\.\/imagesnode_modules\/slick-carousel\/slick\/[^)]+\)/g,
    "none"
  );

  fs.writeFileSync(cssPath, css);
  console.log("CSS paths fixed");
}

main().catch(console.error);
