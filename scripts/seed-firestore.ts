/**
 * Copies the content snapshot in seed-data.ts into Firestore, uploading any
 * image that is still a file in public/ to Cloudinary first.
 *
 *   bun run seed --dry-run     preview what each page will show (no credentials needed)
 *   bun run seed               write documents that don't exist yet
 *   bun run seed --overwrite   also replace documents that already exist
 *
 * Writing needs a service account key: Firebase console → Project settings →
 * Service accounts → Generate new private key. Keep the file outside this repo
 * and point GOOGLE_APPLICATION_CREDENTIALS at it. Uploads read CLOUDINARY_URL
 * from .env.local.
 */
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { v2 as cloudinary } from "cloudinary";
import { applicationDefault, initializeApp } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import {
  achievementLabel,
  achievementsFor,
  experienceFor,
  featuredWorks,
  sortByOrder,
  worksIn,
} from "../src/content/selectors";
import { COLLECTIONS, type Side, type Work } from "../src/content/types";
import { ACHIEVEMENTS, EXPERIENCE, WORKS } from "./seed-data";

const PUBLIC_DIR = "public";

const args = new Set(process.argv.slice(2));

function assertUniqueIds(collection: string, items: readonly { id: string }[]) {
  const seen = new Set<string>();
  for (const { id } of items) {
    if (seen.has(id)) throw new Error(`Duplicate id "${id}" in ${collection}`);
    seen.add(id);
  }
}

/** Local images (paths under public/) that a work points at but don't exist. */
function missingImages(works: readonly Work[]): string[] {
  return works.flatMap((work) =>
    work.image?.startsWith("/") && !existsSync(join(PUBLIC_DIR, work.image)) ? [work.image] : [],
  );
}

function printPreview() {
  const list = (titles: string[]) => (titles.length ? titles.join(" · ") : "(empty)");
  const works = sortByOrder(WORKS);

  console.log(`home featured: ${list(featuredWorks(works).map((w) => w.title))}`);
  for (const side of ["frontend", "data"] as Side[]) {
    console.log(`\n${side} page`);
    for (const section of ["case-study", "freelance", "personal"] as const) {
      console.log(`  ${section}: ${list(worksIn(works, side, section).map((w) => w.title))}`);
    }
    console.log(
      `  experience: ${list(experienceFor(sortByOrder(EXPERIENCE), side).map((e) => e.company))}`,
    );
    console.log(
      `  education: ${list(achievementsFor(sortByOrder(ACHIEVEMENTS), side).map(achievementLabel))}`,
    );
  }

  const missing = missingImages(WORKS);
  if (missing.length) console.log(`\nmissing images in public/: ${missing.join(", ")}`);
}

/**
 * Uploads each work's local image to Cloudinary and swaps in its URL. The id
 * includes a content hash, so a changed image gets a new URL and an unchanged
 * one is not stored twice.
 */
async function hostImages(works: readonly Work[]): Promise<Work[]> {
  return Promise.all(
    works.map(async (work) => {
      if (!work.image?.startsWith("/")) return work;

      const localPath = join(PUBLIC_DIR, work.image);
      const hash = createHash("sha256").update(readFileSync(localPath)).digest("hex").slice(0, 8);
      const result = await cloudinary.uploader.upload(localPath, {
        folder: "portfolio/works",
        public_id: `${work.id}-${hash}`,
        overwrite: false,
      });
      return { ...work, image: result.secure_url };
    }),
  );
}

async function writeCollection(
  db: Firestore,
  collection: string,
  items: readonly { id: string }[],
  overwrite: boolean,
) {
  const refs = items.map((item) => db.collection(collection).doc(item.id));
  const snapshots = await db.getAll(...refs);
  const batch = db.batch();
  let written = 0;

  snapshots.forEach((snapshot, index) => {
    if (snapshot.exists && !overwrite) return;
    const { id, ...data } = items[index];
    batch.set(refs[index], data);
    written++;
  });

  await batch.commit();
  console.log(`${collection}: wrote ${written}, skipped ${items.length - written} existing`);
}

async function seed() {
  const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (!keyPath) throw new Error("Set GOOGLE_APPLICATION_CREDENTIALS to your service account key file.");

  const keyProject: string = JSON.parse(readFileSync(keyPath, "utf8")).project_id;
  const siteProject = process.env.VITE_FIREBASE_PROJECT_ID;
  if (keyProject !== siteProject) {
    throw new Error(
      `The key is for "${keyProject}" but .env.local points the site at "${siteProject}". Seed the project the site reads from.`,
    );
  }

  const missing = missingImages(WORKS);
  if (missing.length) throw new Error(`Missing images in public/: ${missing.join(", ")}`);
  if (!process.env.CLOUDINARY_URL) throw new Error("Set CLOUDINARY_URL in .env.local.");

  initializeApp({ credential: applicationDefault(), projectId: keyProject });
  console.log(`Seeding ${keyProject}`);
  const db = getFirestore();
  // REST instead of gRPC: grpc-js crashes on Bun's HTTP/2 implementation.
  db.settings({ preferRest: true });
  const overwrite = args.has("--overwrite");

  await writeCollection(db, COLLECTIONS.works, await hostImages(WORKS), overwrite);
  await writeCollection(db, COLLECTIONS.achievements, ACHIEVEMENTS, overwrite);
  await writeCollection(db, COLLECTIONS.experience, EXPERIENCE, overwrite);
  if (!overwrite) console.log("Existing documents were left alone; pass --overwrite to replace them.");
}

assertUniqueIds(COLLECTIONS.works, WORKS);
assertUniqueIds(COLLECTIONS.achievements, ACHIEVEMENTS);
assertUniqueIds(COLLECTIONS.experience, EXPERIENCE);

if (args.has("--dry-run")) {
  printPreview();
} else {
  await seed();
}
