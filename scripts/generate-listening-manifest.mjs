import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const listeningRoot = path.join(__dirname, "..", "public", "listening");
const manifestPath = path.join(listeningRoot, "manifest.json");

function listLessonFolders() {
  if (!fs.existsSync(listeningRoot)) {
    return [];
  }

  return fs
    .readdirSync(listeningRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function loadExistingManifest() {
  if (!fs.existsSync(manifestPath)) {
    return null;
  }

  try {
    const parsed = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));

    if (!Array.isArray(parsed)) {
      return null;
    }

    return new Map(
      parsed
        .filter((item) => typeof item?.name === "string")
        .map((item) => [item.name, item.status === "new" ? "new" : "old"]),
    );
  } catch {
    return null;
  }
}

function buildManifest(folders, existingManifest) {
  return folders.map((name) => {
    if (!existingManifest) {
      return { name, status: "old" };
    }

    if (existingManifest.has(name)) {
      return { name, status: existingManifest.get(name) };
    }

    return { name, status: "new" };
  });
}

function main() {
  const folders = listLessonFolders();
  const existingManifest = loadExistingManifest();
  const manifest = buildManifest(folders, existingManifest);

  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf-8");

  const newCount = manifest.filter((item) => item.status === "new").length;
  const oldCount = manifest.length - newCount;

  console.log(`Wrote ${manifestPath}`);
  console.log(`Lessons: ${manifest.length} (${oldCount} old, ${newCount} new)`);
}

main();
